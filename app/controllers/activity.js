const activityService = require('../services/activity');

const findAll = async(req, res, next) => {
  try {
    const { type, athlete_id } = req.query;

    const activities = await activityService.findAll({ type, athlete_id });

    return res.status(200).json({
      status: true,
      response: activities,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const findById = async(req, res, next) => {
  try {
    const { id } = req.params;

    const activity = await activityService.findById(id);

    return res.status(200).json({
      status: true,
      response: activity,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const destroy = async(req, res, next) => {
  try {
    const { id } = req.params;

    const activity = await activityService.destroy(id);

    return res.status(200).json({
      status: true,
      response: activity,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  findById,
  findAll,
  destroy
};
