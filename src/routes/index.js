'use strict';

const Router = require('koa-router');

const router = new Router({ prefix: '/v1' });

router.get('/ping', ctx => ctx.ok('pong'));

module.exports = router;
