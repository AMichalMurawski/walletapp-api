const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const walletRouter = require('./routes/api/wallet');
const categoriesRouter = require('./routes/api/categories');
const transactionsRouter = require('./routes/api/transactions');
const swaggerRouter = require('./routes/api/swagger');
const cookieParser = require('cookie-parser');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const corsConfig = {
  origin: false,
  credentials: true,
};

app.use(logger(formatsLogger));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

require('./config/config-passport');
app.use('/api/wallet', walletRouter);
app.use('/api/wallet', categoriesRouter);
app.use('/api/wallet', transactionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/docs', swaggerRouter);
app.use(express.static('./public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
