const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = require('../../utils/swagger');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

module.exports = router;
