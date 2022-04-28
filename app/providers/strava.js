const axios = require('axios');

/**
 * Get authentication uri from strava
 * @returns {String}
 */
const getLoginUri = () => {
  const {
    STRAVA_OAUTH_URI,
    STRAVA_CLIENT_ID,
    STRAVA_SCOPE,
    STRAVA_REDIRECT_URI,
    STRAVA_APPROVAL_PROMPT
  } = process.env;

  const uri = `${STRAVA_OAUTH_URI}/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${STRAVA_REDIRECT_URI}&scope=${STRAVA_SCOPE}&approval_prompt=${STRAVA_APPROVAL_PROMPT}&response_type=code`;

  return uri;
}

/**
 * Exchange code from user oauth to token
 * @param {String} code
 * @returns {Promise<Object>}
 */
const exchangeCode = async (code) => {
  try {
    const {
      STRAVA_ENDPOINT_API,
      STRAVA_CLIENT_ID,
      STRAVE_CLIENT_SECRET
    } = process.env;

    const response = await axios.post(`${STRAVA_ENDPOINT_API}/oauth/token`, {
      code,
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVE_CLIENT_SECRET,
      grant_type: 'authorization_code'
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Get new access token with refresh token
 * @param {String} refresh_token
 * @returns {Promise<Object>}
 */
const refreshToken = async (refresh_token) => {
  try {
    const {
      STRAVA_ENDPOINT_API,
      STRAVA_CLIENT_ID,
      STRAVE_CLIENT_SECRET
    } = process.env;

    const response = await axios.post(`${STRAVA_ENDPOINT_API}/oauth/token`, {
      refresh_token,
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVE_CLIENT_SECRET,
      grant_type: 'refresh_token'
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Get recent athlete's activities
 * @param {Object} params filter of activity
 * @param {String} access_token string of strava access token
 * @returns {Promise<Array<Object>>}
 */
const getActivities = async ({ params, access_token }) => {
  try {
    const {
      STRAVA_ENDPOINT_API
    } = process.env;

    const response = await axios.get(`${STRAVA_ENDPOINT_API}/athlete/activities`, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * deauthorize from strava
 * @param {String} access_token
 * @returns {Promise}
 */
const logout = async (access_token) => {
  try {
    const {
      STRAVA_OAUTH_URI
    } = process.env;

    const response = await axios.post(`${STRAVA_OAUTH_URI}/deauthorize`, {
      access_token
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  logout,
  getLoginUri,
  exchangeCode,
  refreshToken,
  getActivities,
};
