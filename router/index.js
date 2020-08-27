var express = require('express');
var router = express.Router();
var path = require('path');

var main = require('./main/main');
var email = require('./email/email');
var join = require('./join/index');

// url routing
router.get('/', (req, res, next) => {
    // __dirname : root 경로를 자동으로 제공해줌
    // 보여줄 페이지를 sendFile을 통해 지정
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

// /main/~
router.use('/main',  main);
// /email/~
router.use('/email', email);
router.use('/join', join);

module.exports = router;