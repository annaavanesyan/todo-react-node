'use strict';

const randomString = require('randomstring');

class Util {
    /**
     * @param options
     * @return String
     */
    static generateRandomString(options = 16) {
        return randomString.generate(options);
    }

    /**
     * @param length
     * @return Number
     */
    static generateRandomNumeric(length = 16) {
        return randomString.generate({
            length,
            charset: 'numeric'
        });
    }
}

module.exports = Util;
