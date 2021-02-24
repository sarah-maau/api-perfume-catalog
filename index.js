require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const cors = require('cors');

// configuration de Swagger 
// visible depuis localhost:port/api-docs
const expressSwagger = require('express-swagger-generator')(app);

let options = require('./config-swagger.json');

options.basedir = __dirname;

options.swaggerDefinition.host = `localhost:${port}`;

expressSwagger(options)

const router = require('./app/router');

// autorisation : tout le monde peut venir chercher l'info
app.use(cors());

app.use(express.json());

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}`));