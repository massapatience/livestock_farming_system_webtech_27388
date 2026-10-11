const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/postgres');
const { publishToQueue } = require('../services/rabbitmq');

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role: role || 'farmer' });

    publishToQueue('email_queue', {
      to: email,
      subject: 'Welcome to Livestock System',
      html: `<h2>Welcome, ${name}!</h2><p>Your account has been created successfully.</p>`,
    });

    res.status(201).json({ message: 'Registration successful', token: generateToken(user) });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(user), user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
};

const googleCallback = (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
};

const getMe = (req, res) => {
  const { id, name, email, role } = req.user;
  res.json({ id, name, email, role });
};

module.exports = { register, login, googleCallback, getMe };
