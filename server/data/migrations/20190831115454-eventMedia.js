'use strict';

const _ = require('lodash');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('eventMedia', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            eventId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'event',
                    key: 'id'
                }
            },
            media: {
                type: Sequelize.STRING
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('eventMedia', {});
    }
};
