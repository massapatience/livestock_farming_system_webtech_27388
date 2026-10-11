const { HealthRecord } = require('../models/mongo');
const { Animal } = require('../models/postgres');
const { publishToQueue } = require('../services/rabbitmq');

const create = async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.body.animalId);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    const record = await HealthRecord.create({ ...req.body, animalTag: animal.tagNumber, vetId: req.user.id, vetName: req.user.name });

    if (record.nextDueDate) {
      publishToQueue('email_queue', {
        to: req.user.email,
        subject: `Upcoming ${record.recordType} reminder`,
        html: `<p>Reminder: ${record.recordType} for animal <b>${animal.tagNumber}</b> is due on <b>${record.nextDueDate}</b>.</p>`,
      });
    }

    res.status(201).json(record);
  } catch (err) { next(err); }
};

const getByAnimal = async (req, res, next) => {
  try {
    const records = await HealthRecord.find({ animalId: req.params.animalId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const records = await HealthRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) { next(err); }
};

module.exports = { create, getByAnimal, getAll };
