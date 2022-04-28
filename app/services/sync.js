const _ = require('lodash');
const strava = require('../providers/strava');
const activityService = require('../services/activity');

const sync = async (access_token) => {
  try {
    const today = new Date();
    const three_days_ago = (new Date().setDate(today.getDate() - 3));

    const params = {
      before: Math.floor(today.getTime() / 1000),
      after: Math.floor(three_days_ago / 1000)
    };

    let activities = await strava.getActivities({
      access_token,
      params
    });

    if (activities && activities.length > 0) {
      activities = await Promise.all(activities.map(async (activity) => {
        return await activityService.findOrCreate(activity);
      }));
    }

    return Promise.resolve(activities);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  sync
};
