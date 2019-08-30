'use strict';

const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    console.log('inside the router');
    next();
});

router.get('/ping', (req, res) => res.send('pong'));

module.exports = router;
