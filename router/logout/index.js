var express = require('express');
var router = express.Router();

// /logout/
router.get('/', function(req, res){
    req.logout();
    res.redirect('/main');
});

module.exports = router;