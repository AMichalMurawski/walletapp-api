const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const walletRouter = require('./routes/api/wallet');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require('./config/config-passport');
app.use('/api/wallet', walletRouter);
app.use('/api/users', usersRouter);
app.use(express.static('./public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;