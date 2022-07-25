const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const accountRouter = require('./account.router');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'Conditional Token Api' });
});

router.use('/auth', authRouter);
router.use('/account', accountRouter);

module.exports = router;