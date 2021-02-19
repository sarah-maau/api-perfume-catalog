require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3300;
const router = require('./app/router');

app.use(express.json());

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}`));