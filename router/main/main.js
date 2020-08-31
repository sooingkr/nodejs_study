var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var path = require('path');

// app.use('/main', main) 으로 요청시 main으로 시작되는 요청이 이리로 들어옴
// /main 이후 파라미터를 정의하면 됨

router.get('/', (req, res, next) => {
    // __dirname : root 경로를 자동으로 제공해줌
    // 보여줄 페이지를 sendFile을 통해 지정
    console.log('main js loaded', req.user);

    var id = req.user;
   // main page는 login이 될 때(즉, 세션정보가 있을때만) 접근이 가능하게 한다.
    if(!id) res.render('login');

    // path 모듈을 쓰면 상대경로로 합치기 편리하다.
    // res.sendFile(path.join(__dirname, "../../public/main.html"));

    res.render('main', {id : id});
});

// module.exports = / require('')
// export default n / import { var } from ''
module.exports = router;