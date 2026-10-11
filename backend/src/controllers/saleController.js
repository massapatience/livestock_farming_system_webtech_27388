const { Sale, Animal } = require('../models/postgres');

const create = async (req, res, next) => {
  try {
    const sale = await Sale.create({ ...req.body, farmerId: req.user.id });
    await Animal.update({ status: 'sold' }, { where: { id: req.body.animalId } });
    res.status(201).json(sale);
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const where = req.user.role === 'admin' ? {} : { farmerId: req.user.id };
    const sales = await Sale.findAll({ where, include: [{ association: 'animal' }], order: [['saleDate', 'DESC']] });
    res.json(sales);
  } catch (err) { next(err); }
};

const getSummary = async (req, res, next) => {
  try {
    const where = req.user.role === 'admin' ? {} : { farmerId: req.user.id };
    const sales = await Sale.findAll({ where });
    const total = sales.reduce((sum, s) => sum + s.amount, 0);
    res.json({ totalSales: sales.length, totalRevenue: total });
  } catch (err) { next(err); }
};

module.exports = { create, getAll, getSummary };
