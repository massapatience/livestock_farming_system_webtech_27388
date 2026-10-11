const { Animal } = require('../models/postgres');

const create = async (req, res, next) => {
  try {
    const animal = await Animal.create({ ...req.body, farmerId: req.user.id });
    res.status(201).json(animal);
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const where = req.user.role === 'admin' ? {} : { farmerId: req.user.id };
    const animals = await Animal.findAll({ where });
    res.json(animals);
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    await animal.update(req.body);
    res.json(animal);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    await animal.destroy();
    res.json({ message: 'Animal deleted' });
  } catch (err) { next(err); }
};

module.exports = { create, getAll, getOne, update, remove };
