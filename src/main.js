'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const config = require('./config');

const app = new express();

/** DATABASE **/
const db = require('./data');

/** MIDDLEWARES **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** ROUTES **/
app.use('/', routes);

/** SERVER CONFIGURATION **/
const server = require('http').createServer(app);
const port = process.env.PORT || config.get('PORT');

server.listen(port, () => { console.info(`Server is running on port: ${port}`) });
