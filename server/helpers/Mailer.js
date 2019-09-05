'use strict';

const _ = require('lodash');

const { Sendgrid } = require('../components');
const config = require('../config');

class Mailer {
    static async sendActivation(user, template) {
        Sendgrid.send(
            _.extend(
                {
                    data: {
                        firstName: _.get(user, 'firstName'),
                        activationCode: user.emailVerificationCode,
                        link: `${config.get.URL}/v1/users/activation?token=${(await user.getActivationToken()).token}`
                    },
                    to: [user.email]
                },
                template
            )
        );
    }
}