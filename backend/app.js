//  ====================== 모듈 ==========================//
var express = require('express'), //익스프레스(미들웨어) 모듈
  http = require('http'), //http 모듈
  path = require('path'), //경로 path 모듈
  cors = require('cors'), //ajax로 요청 시 필요 모듈
  bodyParser = require('body-parser'), //html body 모듈
  cookieParser = require('cookie-parser'), //쿠키 모듈
  expressSession = require('express-session'), //세션 모듈
  jayson = require('jayson'), //jayson 모듈 불러오기
  static = require('serve-static'), //경로 지정 모듈
  expressErrorHandler = require('express-error-handler'), //에러 처리 모듈
  config = require('./config'), //설정 모듈(config.js 불러오기)
  database = require('./database/database'), //데이터베이스 모듈 불러오기(database.js)
  route_loader = require('./routes/route_loader'), //라우팅 모듈 불러오기(route_loader.js)
  handler_loader = require('./handler/handler_loader'); //핸들러 로더(handler_loader.js) 불러오기
// ======================== 설정 ========================= //
var app = express(); //익스프레스 객체 생성 및 기본 속성 설정
//======================= 미들웨어  ========================//
console.log('********** config.server_port : %d **********', config.server_port);
app.set('port', process.env.PORT || config.server_port);
// public 폴더를 /public으로 접근 가능 하도록 설정
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/login', function(req, res) {
  res.render('user_login');
});
app.use('/logout', function(req, res) {
  res.render('user_logout');
});
app.use('/signup', function(req, res) {
  res.render('add_user');
});
// body-parser 등록
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors()); //Cross Origin Resource Sharing
app.use(bodyParser.json());
// cookie, session 설정
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));
app.set('views', __dirname + '/views'); //템플릿 폴더 지정
app.set('view engine', 'ejs'); //ejs 뷰 엔진 설정
// ======== route_loader를 이용한 라우터 초기화(등록) =========//
route_loader.init(app, express.Router());
//★★JSON-RPC 핸들러 등록 초기화는 라우터 밑에 존재 해야 한다.★★
var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
//핸들러 로더 초기화하기
handler_loader.init(jayson, app, jsonrpc_api_path);
//=========error 핸들러 추가(제일 마지막에 추가 해야 함)========//
var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
// ===================== 서버 실행=========================//
http.createServer(app).listen(app.get('port'), function() {
  console.log('********** Express 서버 실행 **********');
  database.init(app, config);
});
