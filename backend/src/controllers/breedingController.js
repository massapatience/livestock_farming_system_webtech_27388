const { Breeding, Animal } = require('../models/postgres');

const create = async (req, res, next) => {
  try {
    const breeding = await Breeding.create(req.body);
    await Animal.update({ status: 'pregnant' }, { where: { id: req.body.femaleId } });
    res.status(201).json(breeding);
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const records = await Breeding.findAll({ order: [['matingDate', 'DESC']] });
    res.json(records);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const record = await Breeding.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Breeding record not found' });
    await record.update(req.body);
    res.json(record);
  } catch (err) { next(err); }
};

module.exports = { create, getAll, update };
