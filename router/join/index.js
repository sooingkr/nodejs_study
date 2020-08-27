var express = require('express');
var router = express.Router();

// /join get 
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

// /join post
router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;
    console.log(email);
    // db insert create user

    res.render('welcome',{name : req.body.name});
});

module.exports = router;