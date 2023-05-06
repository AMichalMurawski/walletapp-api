const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Wallet App - API',
    version: '1.0.0',
    description: 'Group project API for Wallet APP',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'Wallet App - in progress',
      url: '',
    },
  },
  components: {
    schemas: {
      userSchema: {
        $ref: 'models/usersModel.js',
      },
    },
  },
  host: 'localhost:3030',
  basePath: '/',
  tags: [
    {
      name: 'Auth Controller',
    },
    {
      name: 'Users Controller',
    },
    {
      name: 'Wallet Controller',
    },
    {
      name: 'Transactions Controller',
    },
    {
      name: 'Transactions Categories',
    },
    {
      name: 'Transactions Summary',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:3030/',
      description: 'Development server',
    },
    {
      url: '',
      description: 'Web server - in progress on Heroku',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/api/*.js', './models/*.js', './config/*.js'],
};

module.exports = swaggerOptions;
