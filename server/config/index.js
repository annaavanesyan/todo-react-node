'use strict';

require('dotenv').config();
const path = require('path');
const config = require('nconf');

config.argv().env();

const defaults = {
    NODE_ENV: 'development',
    db: {
        host: config.get('POSTGRES_HOST'),
        database: config.get('POSTGRES_DB'),
        dialect: config.get('POSTGRES_DIALECT'),
        username: config.get('POSTGRES_USERNAME'),
        password: config.get('POSTGRES_PASSWORD'),
        logging: JSON.parse(config.get('POSTGRES_LOGGING'))
    }
};

config.file({ file: path.join(__dirname, 'main.json') });
config.defaults(defaults);

module.exports = config;
