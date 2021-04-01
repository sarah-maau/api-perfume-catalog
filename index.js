require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const cors = require('cors');

// Swagger configuration
// visible from localhost:port/api-docs
const expressSwagger = require('express-swagger-generator')(app);

let options = require('./config-swagger.json');

options.basedir = __dirname;

options.swaggerDefinition.host = `localhost:${port}`;

expressSwagger(options)

const perfumeRouter = require('./app/routers/perfumeRouter');
const intensityRouter = require('./app/routers/intensityRouter');
const scentRouter = require('./app/routers/scentRouter');
const genderRouter = require('./app/routers/genderRouter');
const tagRouter = require('./app/routers/tagRouter');

// autorisation : tout le monde peut venir chercher l'info
app.use(cors());

app.use(express.json());

app.use(
    '/api', 
    perfumeRouter,
    intensityRouter,
    scentRouter,
    genderRouter,
    tagRouter,
);

app.listen(port, () => console.log(`Listening on port ${port}`));