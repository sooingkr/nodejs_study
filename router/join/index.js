var express = require('express');
var router = express.Router();
var path = require('path');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// /join get 
router.get('/', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../../public/join.html'));

    // failureFlash의 속성을 true로 지정할 경우 flash로 값을 전달할 수 있다.
    // flash는 세션에 flash영역을 생성해 일회성 메시지 전달에 이용된다.
    // req.flash('err','already joined user'); 처럼 저장하고 req.flash('err')처럼 가져올 수 있으나
    // passport내에서 실패시 error, info 라는 이름으로 전달하도록 설계되어있다.
    var msg = req.flash('error') || req.flash('info');

    res.render('join', {message : msg});
});

// /join post
// router.post('/', function(req, res){
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.password;
//     console.log(email);
//     // db insert create user

//     res.render('welcome',{name : req.body.name});
// });

// strategy에서 성공인 경우 호출됨(session에서 값을 뽑아 전달)
passport.serializeUser(function(user, done){
    console.log('passport session save : ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    // req.user 에 id값으로 전달하게 됨
    done(null, id);
});

// 이런 Strategy를 사용할거라고 등록해 놓는 작업
passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){

    var joinedEmail = `sooingkr@naver.com`;

    if(!email) {
        // return done(err);
    }

    if(joinedEmail == email){
        return done(null, false, {message: `already joined user`})
    } else {
        console.log('insert into db new user');
        return done(null, {email: email, id : '705'});
    }

    // var query = connection.query(`select * from user where email=?`, [email, function(err, rows){
    //     if(err) return done(err);

    //     if(rows.length){
    //         console.log('existed user');
    //         return done(null, false, {message: 'your email is already used'});
    //     } else {
                // var sql = {email: email, pw:password};
                // var query = connection.query('insert into user set ?', sql, function(err, rows) {
                //     if(err) throw err
                //     return done(null, {email : email, id : rows.insertId});
                // })
    //     }
    // }]);

}));


router.post('/',
  passport.authenticate('local-join', { 
      successRedirect: '/main',
      failureRedirect: '/join',
      failureFlash: true }) // passport에게 flash메시지를 사용할지 말지를 결정해주는 속성

);

module.exports = router;