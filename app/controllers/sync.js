const syncService = require('../services/sync');

const sync = async (req, res, next) => {
  try {
    const response = await syncService.sync(req.user.access_token);

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
  sync
};
