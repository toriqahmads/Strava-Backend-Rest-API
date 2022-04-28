const Athlete = require('../models/athlete');

const create = async (data) => {
  try {
    const athlete = new Athlete(data);
    const saveAthlete = await athlete.save();

    return Promise.resolve(saveAthlete);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findOrCreate = async (data) => {
  try {
    const athlete = await Athlete.findOne({ athlete_id: data.athlete_id });

    if (!athlete) {
      const insert = await Athlete.create(data);

      return Promise.resolve(insert);
    }

    return Promise.resolve(athlete);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findById = async (id) => {
  try {
    const athlete = await Athlete.findOne({ athlete_id: id });
    if (!athlete) throw new Error(`athlete with id ${id} not found`);

    return Promise.resolve(athlete);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findAll = async () => {
  try {
    const athletes = await Athlete.find();

    return Promise.resolve(athletes);
  } catch (err) {
    return Promise.reject(err);
  }
}

const update = async (id, update) => {
  try {
    const athlete = await Athlete.findById(id);
    if (!athlete) throw new Error(`athlete with id ${id} not found`);

    const updateAthlete = await Athlete.updateOne({ _id: id }, {
      $set: update
    });

    return Promise.resolve(updateAthlete);
  } catch (err) {
    return Promise.reject(err);
  }
}

const destroy = async (id) => {
  try {
    const athlete = await Athlete.findById(id);
    if (!athlete) throw new Error(`athlete with id ${id} not found`);

    const deleteAthlete = await Athlete.deleteOne({ _id: id });

    return Promise.resolve(deleteAthlete);
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
