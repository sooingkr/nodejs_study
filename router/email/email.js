var express = require('express');
var router = express.Router();

// /email/로시작하는 router

router.post('/form', (req, res, next) => {
    // req.body를 통해 파라미터를 가져올 수 있다.
    var params = req.body;
    console.log(params);
    // res.send('<h1>POST</h1>');

    // [ ejs template ] : embedded js : html파일안에 js가 있는 템플릿
    // npm install ejs -- save // ejs를 통해 페이지로 파라미터를 static하게 전달할 수 있다.
    // default로 /views 하위의 페이지를 인식한다.
    // 파일의 확장자는 .ejs로 생성해야한다.
    res.render('test', { // views 폴더 하위의 test.ejs 파일을 찾아 로드한다. 전달할 파라미터는 객체로 전달
        email : params.email,
        nameParam : params.nameParam
    });
    // test.ejs 파일에서 <%= email %> 등과 같이 꺼내서 사용
});

router.post('/ajax', function(req, res){

    // 요청받은 파라미터를 가져옴(bodyParser 통해서)
    var reqParams = req.body;
    
    // 응답 객체 세팅
    var resData = {
        result : 'Success',
        resultMsg : 'Success'
    }

    resData.email = reqParams.email;
    resData.name = reqParams.name;

    // json 타입으로 응답함
    res.json(resData);

});

module.exports = router;