var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var connection = require('./dbsetting');
/**
 * 1. npm install express -- save // save : package.json에 기록되는 옵션으로 나중에 npm install 수행시 package.json에 있는 파일을
 *   한번에 설치할 수 있게 해준다.(보통 node_modules는 git등에 올리지 않기 때문)
 * 2. npm install nodemon -g // global로 설치, nodemon을 통해 실시간 변동사항마다 재실행할 필요가 없게 된다.
 *   ex) nodemon app.js 로 실행
 * 
*/

// 이미지 경로, import하는 js파일 등(리소스)을 static 파일이라하는데 이 경로를 지정해 주어야 사용가능하다.
// 미들웨어를 통해 아래처럼 등록 가능(public 하위 경로 인식)
app.use(express.static('public'));

// get, post 요청에서 전달된 파라미터를 받아오기 위해 사용
// npm install body-parser
app.use(bodyParser.json()); // json 파라미터 허용
app.use(bodyParser.urlencoded({extended : true})); // urlencoding된 파라미터 허용

// view engine을 ejs로 세팅해줘야함
app.set('view engine', 'ejs');
app.set('views', './views'); // views 로 사용될 폴더 경로 지정(생략시 기본 루트 아래 views로 지정됨)

app.listen(3000, (req, res) => {
    console.log('server start 3000 port');
});

// url routing
// get 요청
app.get('/', (req, res, next) => {
    // __dirname : root 경로를 자동으로 제공해줌
    // 보여줄 페이지를 sendFile을 통해 지정
    res.sendFile(__dirname + "/public/main.html");
});

// post 요청
app.post('/email_post', (req, res, next) => {
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

app.post('/ajax_test', function(req, res){

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

app.post('/ajax_test_using_db', function(req, res){

    // 요청받은 파라미터를 가져옴(bodyParser 통해서)
    var reqParams = req.body;
    
    // 응답 객체 세팅
    var resData = {};

    connection.query(`SELECT name from user where email=${reqParams.email}`, function(err, rows, fields) {
        if (err) throw err;
        
        if(rows[0]){
            resData.result = "Success";
            resData.name = rows[0].name;
        } else {
            resData.result = "none";
            resData.name = "";
        }
    });

    // json 타입으로 응답함
    res.json(resData);

});

