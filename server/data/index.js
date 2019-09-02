'use strict';

const fs = require('fs');
const path = require('path');
const _words = require('lodash/words');
const Sequelize = require('sequelize');

const {
    host,
    logging,
    dialect,
    password,
    username,
    database
} = require('../config').get('db');
const db = {};

const sequelize = new Sequelize(database, username, password, {
    logging: logging ? console.log : false,
    operatorsAliases: Sequelize.Op.Aliases,
    freezeTableName: true,
    dialect,
    host
});

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== path.basename(__filename) &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

    if (db[modelName].addScopes) {
        db[modelName].addScopes(db);
    }
});

db.generateSearchQuery = (string, fields = ['firstName', 'lastName']) => {
    const permArr = [];
    const newArray = [];
    const usedChars = [];

    let strings = _words(string);

    if (strings.length > 5) {
        strings = [
            strings[0],
            strings[1],
            strings[2],
            strings[3],
            strings[4],
            strings.slice(5, strings.length).join(' ')
        ];
    }

    for (let i = 0; i < fields.length; i++) {
        newArray.push(sequelize.col(fields[i]));
        if (fields.length !== i + 1) {
            newArray.push(' ');
        }
    }

    const columns = sequelize.fn('concat', ...newArray);

    function generateQueryString(input) {
        let i, ch;

        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length === 0) {
                permArr.push(
                    sequelize.where(columns, {
                        $iLike: `%${usedChars.slice().join('%')}%`
                    })
                );
            }
            generateQueryString(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }

        return permArr;
    }

    return { $or: generateQueryString(strings) };
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
