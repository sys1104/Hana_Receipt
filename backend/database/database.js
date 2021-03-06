var mysql = require('mysql'); //mysql 모듈
var database = {}; //데이터베이스 객체
var pool = {}; //풀 객체
database.init = function(app, config) { //데이터베이스 초기화
    console.log('********** database.init 호출됨 **********');
    connect(app, config);
};

function connect(app, config) {
    pool = mysql.createPool({ //connection poll 생성
        connectionLimit: 500, //500개의 커넥션까지 가능
        host: '13.124.106.226', //DB 서버 IP 주소
        user: 'root',
        password: 'thddudtn',
        database: 'hana_receipt',
        debug: 'false'
    });
    console.log('********** 커넥션 풀 생성 ***********');
    database.pool = pool;
    app.set('database', database);
}
module.exports = database;
