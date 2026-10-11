const { FeedInventory } = require('../models/postgres');
const { publishToQueue } = require('../services/rabbitmq');

const create = async (req, res, next) => {
  try {
    const feed = await FeedInventory.create({ ...req.body, farmerId: req.user.id });
    res.status(201).json(feed);
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const where = req.user.role === 'admin' ? {} : { farmerId: req.user.id };
    const feeds = await FeedInventory.findAll({ where });
    res.json(feeds);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const feed = await FeedInventory.findByPk(req.params.id);
    if (!feed) return res.status(404).json({ message: 'Feed record not found' });
    await feed.update(req.body);

    if (feed.quantity <= feed.minThreshold) {
      publishToQueue('email_queue', {
        to: req.user.email,
        subject: 'Low Feed Stock Alert',
        html: `<p>Warning: <b>${feed.feedType}</b> stock is low (${feed.quantity} ${feed.unit}). Please restock.</p>`,
      });
    }

    res.json(feed);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const feed = await FeedInventory.findByPk(req.params.id);
    if (!feed) return res.status(404).json({ message: 'Feed record not found' });
    await feed.destroy();
    res.json({ message: 'Feed record deleted' });
  } catch (err) { next(err); }
};

module.exports = { create, getAll, update, remove };
