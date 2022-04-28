const authService = require('../services/auth');

const getLogin = async (req, res, next) => {
  try {
    const uri = authService.getLogin();

    return res.status(200).send({
      status: true,
      response: {
        uri
      },
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code || code === '') {
      return res.status(401).send({
        status: false,
        response: null,
        message: `Strava authentication failed`
      });
    }

    const response = await authService.login(code);

    return res.status(200).send({
      status: true,
      response,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const logout = async (req, res, next) => {
  try {
    const response = await authService.logout(req.user);

    return res.status(200).send({
      status: true,
      response,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const response = await authService.refreshToken(refresh_token);

    return res.status(200).send({
      status: true,
      response,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  login,
  logout,
  getLogin,
  refreshToken
};
