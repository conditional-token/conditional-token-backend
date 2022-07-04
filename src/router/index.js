const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'Conditional Token Api' });
});

router.use('/auth', authRouter);

module.exports = router;