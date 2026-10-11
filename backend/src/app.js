const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/animals',  require('./routes/animals'));
app.use('/api/health',   require('./routes/health'));
app.use('/api/breeding', require('./routes/breeding'));
app.use('/api/feed',     require('./routes/feed'));
app.use('/api/sales',    require('./routes/sales'));
app.use('/api/users',    require('./routes/users'));

app.get('/api/health-check', (_, res) => res.json({ status: 'OK' }));

app.use(errorHandler);

module.exports = app;
