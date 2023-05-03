const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Wallet App',
    version: '1.0.0',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/api/*.js'],
};

module.exports = swaggerOptions;
