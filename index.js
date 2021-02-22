require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const expressSwagger = require('express-swagger-generator')(app);

let options = require('./config-swagger.json');
options.basedir = __dirname;
options.swaggerDefinition.host = `localhost:${port}`;

expressSwagger(options)

const router = require('./app/router');

app.use(express.json());

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}`));