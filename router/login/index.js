var express = require('express');
var router = express.Router();
var path = require('path');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// /join get 
router.get('/', (req, res, next) => {
    var msg = req.flash('error') || req.flash('info');

    res.render('login', {message : msg});
});


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
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){

    var loginSuccessEmail = `sooingkr@naver.com`;

    if(!email) {
        // return done(err);
    }

    if(loginSuccessEmail == email){
        return done(null, {email : email, id : 705});
    } else {
        return done(null, false, {message : 'fail to login'});
    }
}));

// User customized
router.post('/', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
        if(err) res.status(500).json(err);
        if(!user){return res.status(401).json(info.message);}
      
        req.login(user, function(err){
            if(err) {return next(err); }
            return res.json(user);
        })
    })(req, res, next);
})

module.exports = router;