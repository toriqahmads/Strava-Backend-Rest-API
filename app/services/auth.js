const jwt = require('jsonwebtoken');
const strava = require('../providers/strava');
const athleteService = require('../services/athlete');
const Log = require('../models/log');
const Authentication = require('../models/authentication');
const JwtError = require('../exceptions/jwt-token');
const JwtRefreshError = require('../exceptions/jwt-refresh-token');

/**
 * Get ouauth login uri
 * @returns {String}
 */
const getLogin = () => {
  return strava.getLoginUri();
}

/**
 * Authenticate athlete by code from oauth process
 * @param {String} code
 * @returns {Promise<Object>}
 */
const login = async (code) => {
  try {
    const response = await strava.exchangeCode(code);

    const athlete_data = {
      athlete_id: response.athlete.id,
      username: response.athlete.username,
      firstname: response.athlete.firstname,
      lastname: response.athlete.lastname,
      sex: response.athlete.sex,
      premium: response.athlete.premium,
      profile_picture: response.athlete.profile,
      friends: response.athlete.friends,
      followers: response.athlete.followers
    };

    const athlete = await athleteService.findOrCreate(athlete_data);

    const auth_data = {
      athlete_id: response.athlete.id,
      access_token: response.access_token,
      refresh_token: response.access_token,
      expires_at: response.expires_at,
      expires_in: response.expires_in
    };

    const authentication = await signJwtToken(auth_data);
    await Log.create({ athlete_id: response.athlete.id, type: 'login' });

    return Promise.resolve({
      athlete,
      authentication
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * deauthorize from strava
 * @param {Object} payload
 * @returns {Promise}
 */
const logout = async (payload) => {
  try {
    const { access_token, athlete_id } = payload;
    const deauthorize = await strava.logout(access_token);

    const isExist = await Authentication.findOne({ athlete_id });
    if (isExist) {
      await Authentication.deleteOne({ athlete_id });
    }

    await Log.create({ athlete_id, type: 'logout' });
    return Promise.resolve(deauthorize);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Sign jwt token
 * @param {Object} payload
 * @returns {Promise<Object<string, string>>}
 */
const signJwtToken = async (payload) => {
  try {
    const {
      JWT_SECRET,
      JWT_REFRESH_SECRET,
      JWT_REFRESH_EXPIRED
    } = process.env;

    const jwt_token = jwt.sign(payload, JWT_SECRET, { expiresIn: payload.expires_in });
    const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRED });

    const auth_data = {
      athlete_id: payload.athlete_id,
      jwt_token,
      refresh_token,
    };

    const isExist = await Authentication.findOne({ athlete_id: payload.athlete_id });
    if (isExist) {
      await Authentication.updateOne({ athlete_id: payload.athlete_id }, {
        $set: {
          jwt_token,
          refresh_token
        }
      });
    } else {
      await Authentication.create(auth_data);
    }

    return Promise.resolve({ jwt_token, refresh_token });
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Get new access token from strava with refres token
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
const refreshAccessTokenExpired = async (payload) => {
  try {
    const { expires_at, refresh_token } = payload;
    if (expires_at < Math.floor(Date.now() / 1000)) {
      const new_token = await strava.refreshToken(refresh_token);
      payload = new_token;
    }

    return Promise.resolve(payload);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Verify and decode jwt token
 * @param {String} jwt_token
 * @returns {Promise<Object>}
 */
const verifyAndDecodeJwtToken = async (jwt_token) => {
  try {
    const isExist = await Authentication.findOne({ jwt_token });
    if (!isExist) {
      throw new JwtError();
    }

    const { JWT_SECRET } = process.env;

    const verify = jwt.verify(jwt_token, JWT_SECRET);
    if (!verify) {
      await Authentication.updateOne({ jwt_token }, {
        $set: {
          jwt_token: null
        }
      });

      throw new JwtError();
    }

    return Promise.resolve(jwt.decode(jwt_token));
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Verify and decode jwt refresh token
 * @param {String} refresh_token
 * @returns {Promise<Object>}
 */
const verifyAndDecodeRefreshToken = async (refresh_token) => {
  try {
    const isExist = await Authentication.findOne({ refresh_token });
    if (!isExist) {
      throw new JwtRefreshError();
    }

    const { JWT_REFRESH_SECRET } = process.env;

    const verify = jwt.verify(refresh_token, JWT_REFRESH_SECRET);
    if (!verify) {
      await Authentication.updateOne({ refresh_token }, {
        $set: {
          refresh_token: null
        }
      });

      throw new JwtRefreshError();
    }

    return Promise.resolve(jwt.decode(refresh_token));
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Sign new jwt token from jwt refresh token
 * @param {String} refresh_token
 * @returns {Promise<Object>}
 */
const refreshToken = async (refresh_token) => {
  try {
    let verify = await verifyAndDecodeRefreshToken(refresh_token);
    const { iat, exp, ...decoded } = verify;
    const refresh_strava_token = await refreshAccessTokenExpired(decoded);

    verify = { ...decoded, ...refresh_strava_token };
    const sign_new_token = await signJwtToken(verify);
    await Log.create({ athlete_id: verify.athlete_id, type: 'refresh' });

    return Promise.resolve(sign_new_token);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  login,
  logout,
  getLogin,
  verifyAndDecodeJwtToken,
  verifyAndDecodeRefreshToken,
  refreshAccessTokenExpired,
  refreshToken
};
