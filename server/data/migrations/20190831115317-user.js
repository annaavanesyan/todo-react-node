'use strict';

const _ = require('lodash');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            username: {
                unique: true,
                type: Sequelize.STRING
			},
			email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            avatar: {
                type: Sequelize.STRING
            },
            motto: {
                type: Sequelize.TEXT
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            emailVerificationCode: {
                type: Sequelize.INTEGER
            },
            forgotPasswordCode: {
                type: Sequelize.INTEGER
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user', {});
    }
};
