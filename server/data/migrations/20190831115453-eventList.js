'use strict';

const _ = require('lodash');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('eventList', {
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
            item: {
                type: Sequelize.STRING
            },
            isDone: {
                type: Sequelize.BOOLEAN
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('eventList', {});
    }
};
