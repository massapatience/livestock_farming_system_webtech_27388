const { User } = require('../models/postgres');

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) { next(err); }
};

const updateRole = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ role: req.body.role });
    res.json({ message: 'Role updated', user });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAll, updateRole, remove };
