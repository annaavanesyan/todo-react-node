'use strict';

const _ = require('lodash');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('event', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
			},
			avatar: {
				type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('event', {});
    }
};
