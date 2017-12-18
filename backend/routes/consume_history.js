// ==================== 소비내역 저장 function ==================== //
var requestHistory = function(req, res, callback) {
    console.log('********** server-side requestHistory 호출됨 **********');
    var database = req.app.get('database');

    var u_num = Number(req.body.u_num);
    var cate_num = Number(req.body.cate_num);
    var content = req.body.content;
    var price = req.body.price;
    var c_time = req.body.c_time;
    var wasted = req.body.wasted;

    if (database) {
        var axios = require('axios');
        //savaHistory 메소드를 호출함으로써 DB에 값 저장 후 callback
        saveHistory(database, u_num, cate_num, content, price, c_time, wasted, function(err, result) {
            if (err) {
                throw err;
            }
            if (result) {
                res.redirect('http://localhost:8080');
            } else {
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>소비내역 추가 실패</h1>');
                res.end();
            }
        });
    } else {
        //DB접속에 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다</p></div>');
        res.end();
    }
};

var saveHistory = function(database, u_num, cate_num, content, price, c_time, wasted, callback) {
    console.log('********** server-side saveHistory 호출됨 **********');
    //pool에서 커넥션 객체 가져오기
    database.pool.getConnection(function(err, conn) {
        if (err) {
            //커넥션을 pool에 반환하기
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 Thread' + conn.threadId);
        //삽입할 데이터를 객체로 만들기 앞: DB컬럼명, 뒤: 파라미터로 받아온 컬럼명
        var data = {
            u_num: u_num,
            cate_num: cate_num,
            content: content,
            price: price,
            c_time: c_time,
            wasted: wasted
        };
        //conn 객체를 사용해서 sql 실행 (소비내역 저장 쿼리문)
        //set 모든 컬럼에 집어넣는 문법
        var exec = conn.query('insert into consume_history set ?', data, function(err, result) {
            //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
            conn.release();
            console.log('실행 sql : %s', exec.sql);
            if (err) {
                conn.release();
                console.log('sql 수행 중 에러발생.');
                console.dir(err);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
        conn.on('error', function(err) {
            conn.release();
            console.log('데이터베이스 연결 시 에러 발생함');
            console.dir(err);
            callback(err, null);
        });
    });
};

// ==================== 소비내역 수정 function ==================== //
var updateHistory = function(req, res, callback) {
    console.log('********** server-side updateHistory 호출됨 **********');
    var database = req.app.get('database');
    var paramConsumenum = Number(req.body.consume_num);
    var paramUnum = Number(req.body.u_num);
    var paramCatenum = Number(req.body.cate_num);
    var paramContent = req.body.content;
    var paramPrice = req.body.price;
    var paramCtime = req.body.c_time;
    var paramWasted = req.body.wasted;
    //database --> true : DB에 접근할 수 있는 상태
    if (database) {
        //editHistory 메소드를 호출함으로써 DB에 소비내역 값 수정 후 callback
        editHistory(database, paramConsumenum, paramUnum, paramCatenum, paramContent, paramPrice, paramCtime, paramWasted, function(err, result) {
            if (err) {
                throw err;
            } // 에러 처리
            if (result) {
                res.redirect('http://localhost:8080');
            } else {
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>소비내역 업데이트 실패</h1>');
                res.end();
            }
        });
    } else {
        //DB접속에 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다</p></div>');
        res.end();
    }
};

var editHistory = function(database, consume_num, u_num, cate_num, content, price, c_time, wasted, callback) {
    console.log('********** server-side editHistory 호출됨 **********');
    //pool에서 커넥션 객체 가져오기
    database.pool.getConnection(function(err, conn) {
        if (err) {
            //커넥션을 pool에 반환하기
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 Thread' + conn.threadId);
        //conn 객체를 사용해서 sql 실행 (소비내역 수정 쿼리문)
        var exec = conn.query('update consume_history set cate_num = ?, content = ?, price = ?, c_time = ?, wasted =? where u_num = ? and consume_num = ?', [cate_num, content, price, c_time, wasted, u_num, consume_num],
            function(err, result) {
                //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
                conn.release();
                console.log('실행 sql : %s', exec.sql);
                if (err) {
                    console.log('sql 수행 중 에러발생.');
                    console.dir(err);

                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        conn.on('error', function(err) {
            console.log('데이터베이스 연결 시 에러 발생함');
            console.dir(err);
            callback(err, null);
        });
    });

};

// ==================== 소비내역 삭제 function ==================== //
var deleteHistory = function(req, res, callback) {
    console.log('********** server-side deleteHistory 호출됨 **********');
    var database = req.app.get('database');
    var paramConsumenum = Number(req.body.consume_num);
    var paramUnum = Number(req.body.u_num);

    if (database) {
        var axios = require('axios');
        //delHistory 메소드를 호출함으로써 DB 값 삭제 후 callback
        delHistory(database, paramConsumenum, paramUnum, function(err, result) {
            if (err) {
                throw err;
            } // 에러 처리
            if (result) {
                res.redirect('http://localhost:8080');
            } else {
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>소비내역 삭제 실패</h1>');
                res.end();
            }
        });
    } else {
        //DB접속에 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다</p></div>');
        res.end();
    }
};

var delHistory = function(database, consume_num, u_num, callback) {
    console.log('********** server-side delHistory 호출됨 **********');
    //pool에서 커넥션 객체 가져오기
    database.pool.getConnection(function(err, conn) {
        if (err) {
            //커넥션을 pool에 반환하기
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 Thread' + conn.threadId);
        //conn 객체를 사용해서 sql 실행 (소비내역 삭제 쿼리문)
        var exec = conn.query('delete from consume_history where consume_num =?', consume_num,
            function(err, result) {
                //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
                conn.release();
                console.log('실행 sql : %s', exec.sql);
                if (err) {
                    conn.release();
                    console.log('sql 수행 중 에러발생.');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        conn.on('error', function(err) {
            conn.release();
            console.log('데이터베이스 연결 시 에러 발생함');
            console.dir(err);
            callback(err, null);
        });
    });

};

// ==================== 소비내역 리스트 function ==================== //
var read_consume_board = function(database, u_num, callback) {
    console.log('********** server-side read_consume_list 호출 **********');
    database.pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        //conn 객체를 사용해서 sql 실행 (소비내역 조회 쿼리문)
        var sql = 'select consume_num, u_num, cate_num,content,price,substring(c_time,1,10) as c_time,wasted from consume_history where u_num = ? order by c_time desc';
        var exec = conn.query(sql, [u_num], function(err, rows) {
          //결과가 있으면 if문 성립
            if (rows.length > 0) {
                conn.release();
                callback(null, rows);
            } else {
              //결과가 없으면 else문 성립
                conn.release();
                console.log('******* read_consume_board 메소드 일치하는 소비내역 없음 --> 길이=0 ********');
                callback(null, null);
            }
        });
        conn.on('error', function(err) {
            conn.release();
            console.log('데이터베이스 연결 시 에러 발생함');
            console.dir(err);
            callback(err, null);
        });
    });
};

var consumeList = function(req, res, callback) {
    console.log('********** server-side consumeList 호출 **********');
    var database = req.app.get('database');
    var u_num = req.body.u_num;

    if (database) {
      //read_consume_board 메소드를 호출함으로써 DB 조회 후 소비내역 callback
        read_consume_board(database, u_num, function(err, rows) {
            if (err) {
                console.error('read board 중 에러바생 ' + err.stack);
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h2>read board 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '<p>');
                res.end();
            }
            if (rows) {
              //소비내역이 있으면 실행
                var data = {};
                console.log('******* 소비내역 리스트 rows 있음 *******');
                data = rows;
                res.json(data);
            } else {
                console.log('******* 소비내역 리스트 rows 없음 *******');
                var data2 = {};
                res.json(data2);
            }
        });
    } else {
        //데이터베이스 접속이 실패 했을 경우
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다.</p></div>');
        res.end();
    }
};

// ========================= server-side 지난 목표기간 동안 낭비된 금액 카테고리별 출력 function =================== //
var wastedList = function(req, res, callback) {
    console.log('********** server-side wastedList 호출 **********');
    var database = req.app.get('database');
    var u_num = req.body.u_num;
    var start_date = Number(req.body.start_date); //현재 날짜 받아오기.
    if (database) {
      //wasted_used 메소드를 호출함으로써 DB 조회 후 낭비된 소비내역 callback
        wasted_used(database, u_num, start_date, function(err, rows) {
            if (err) {
                console.error('********** cate_used 에러 발생 **********' + err.stack);
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h2>cate_used 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                // 에러 처리
            }
            if (rows) {
              //낭비된 내역이 있으면 실행
                var data = {};
                data = rows;
                res.json(data);
                console.log('********** wasted_used 낭비된 내역 있음 (Wasted.vue로 response) **********')
                res.end();
            } else {
                console.log("********** wasted_used 낭비된 내역 없음 **********");
            }
        });
    } else {
        //DB접속에 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다</p></div>');
        res.end();
    }
};

var wasted_used = function(database, u_num, start_date, callback) {
    console.log('********** server-side wasted_used 호출 **********');
    database.pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        //conn 객체를 사용해서 sql 실행 (지난 목표기간 동안 낭비내역 조회 쿼리문)
        var exec = conn.query('select cate_num, sum(price) sum_price from consume_history where u_num = ? and wasted = 1 and c_time >= (select max(g_time) from goal where u_num = ? and g_endtime <= ?) and c_time <= ? group by cate_num', [u_num, u_num, start_date, start_date],
            function(err, rows) {
                if (rows.length > 0) {
                    conn.release();
                    console.log('********** 카테고리별 낭비금액 rows로 반환 **********');
                    callback(null, rows);
                } else {
                    conn.release();
                    console.log('********** 카테고리별 낭비금액 rows로 반환하지 못함 **********');
                    callback(null, null);
                }
            });
        conn.on('error', function(err) {
            conn.release();
            console.log('********** 데이터베이스 연결 시 에러 발생함 **********');
            console.dir(err);
            callback(err, null);
        });
    });
};

//모듈 exports
module.exports.requestHistory = requestHistory;
module.exports.updateHistory = updateHistory;
module.exports.consumeList = consumeList;
module.exports.deleteHistory = deleteHistory;
module.exports.wastedList = wastedList;
