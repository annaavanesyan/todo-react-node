'use strict';

const sendgrid = require('@sendgrid/mail');

const config = require('../config');

class Sendgrid {
    send({ to, subject, templateId, data }) {
        if (!!to) {
            throw new Error('email addressees are required');
        }

        return new Promise(resolve => {
            sendGrid.setApiKey(config.get('SENDGRID_KEY'));

            return resolve(
                sendGrid.send({
                    to,
                    subject,
                    templateId,
                    from: config.get('MAIL_ADDRESS'),
                    substitutions: {...data, date: new Date().getFullYear() }
                })
            );
        });
    }
}

module.exports = new Sendgrid();
