const _ = require('lodash');
const Activity = require('../models/activity');

const create = async (data) => {
  try {
    const activity = new Activity(data);
    const saveActivity = await activity.save();

    return Promise.resolve(saveActivity);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findOrCreate = async (data) => {
  try {
    const activity = await Activity.findOne({ id: data.id });

    if (!activity) {
      const insert = await Activity.create(data);

      return Promise.resolve(insert);
    }

    return Promise.resolve(activity);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findAll = async (params = {}) => {
  try {
    const filters = {};
    if (params.athlete_id && params.athlete_id !== '') {
      filters['athlete.id'] = params.athlete_id;
    }
    if (params.type && params.type !== '') {
      filters.type = params.type;
    }

    const activities = await Activity.find(filters).sort({ start_date: -1 });
    return Promise.resolve(activities);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findById = async (id) => {
  try {
    const activity = await Activity.findOne({ id });
    if (!activity) throw new Error(`activity with id ${id} not found`);

    return Promise.resolve(activity);
  } catch (err) {
    return Promise.reject(err);
  }
}

const update = async (id, update) => {
  try {
    const activity = await Activity.findById(id);
    if (!activity) throw new Error(`activity with id ${id} not found`);

    const updateActivity = await Activity.updateOne({ _id: id }, {
      $set: update
    });

    return Promise.resolve(updateActivity);
  } catch (err) {
    return Promise.reject(err);
  }
}

const destroy = async (id) => {
  try {
    const activity = await Activity.findOne({ id });
    if (!activity) throw new Error(`activity with id ${id} not found`);

    const deleteActivity = await Activity.deleteOne({ id });

    return Promise.resolve(deleteActivity);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  create,
  findOrCreate,
  findById,
  findAll,
  update,
  destroy
};
