'use strict';

const _ = require('lodash');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            username: {
                type: DataTypes.STRING,
                validate: {
                    len: [2, 50],
                    is: /^[a-zA-Z0-9-_']+$/i
                },
                unique: {
                    message: 'unique.username'
                }
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: {
                    message: 'unique.email'
                },
                validate: {
                    isEmail: true
                }
            },
            firstName: {
                type: DataTypes.STRING,
                validate: { len: [2, 50] }
            },
            lastName: {
                type: DataTypes.STRING,
                validate: { len: [2, 50] }
            },
            avatar: {
                type: DataTypes.STRING
            },
            motto: {
                type: DataTypes.TEXT
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    is: /(?=.*\d)(?=.*[a-z])(?=.*[!@#\\^&\])(?=.*[A-Z]).{6,}/
                }
            },
            emailVerificationCode: {
                type: DataTypes.INTEGER
            },
            forgotPasswordCode: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'user',
            setterMethods: {
                username(value) {
                    this.setDataValue('username', value ? _.trim(value) : null);
                },
                email(value) {
                    this.setDataValue(
                        'email',
                        value ? validator.normalizeEmail(value) : null
                    );
                },
                firstName(value) {
                    this.setDataValue(
                        'firstName',
                        value ? _.trim(value) : null
                    );
                },
                lastName(value) {
                    this.setDataValue('lastName', value ? _.trim(value) : null);
                }
            }
        }
    );

    user.addHook('beforeSave', async user => {
        if (user.isNewRecord || user.changed('password')) {
            accessTokenSalt = config.get('SALT');
            user.password = await Security.generatePasswordHash(user.password);
        }
    });

    user.prototype.comparePassword = function(candidatePassword = '') {
        return Security.validatePassword(candidatePassword, this.password);
    };

    user.prototype.generateToken = function() {
        return {
            type: 'jwt',
            access: jwt.sign({ id: this.id }, config.get('SALT'))
        };
    };

    user.prototype.fields = async function() {
        const model = this.get();
        const hiddenFields = [];

        return _.omit(model, hiddenFields);
    };

    return user;
};
