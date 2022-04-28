const athleteService = require('../services/athlete');

const findById = async(req, res, next) => {
  try {
    const { id } = req.params;

    const athlete = await athleteService.findById(id);

    return res.status(200).json({
      status: true,
      response: athlete,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

const findAll = async(req, res, next) => {
  try {
    const athletes = await athleteService.findAll();

    return res.status(200).json({
      status: true,
      response: athletes,
      message: null
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  findById,
  findAll
};
