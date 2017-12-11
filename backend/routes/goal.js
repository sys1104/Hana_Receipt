// ========================= server-side 목표 리스트 요청 function =================== //
var request_goal = function(req, res, callback) {
  console.log('********** server-side 목표 리스트 요청 function 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  if (database) {
    list_goal(database, u_num, function(err, rows) {
      if (err) {
        console.error('********** list_goal 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>cate_used 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        var data = {};
        data = rows;
        res.json(data);
        console.log('********** data json 형태로 Wasted.vue로 보냄 **********');
        console.log(data);
        res.end();
      } else {
        console.log("********** 사용내역 없음 **********");
      }
    });
  } else {
    //DB접속에 실패 했을 경우
    res.writeHead(200, {
      "Content-Type": 'text/html;charset=utf8'
    });
    res.write('<h1>데이터베이스 연결 실패</h1>');
    res.write('<div><p>DB에 연결 하지 못했습니다</p></div>');
    res.write("<br/><a href='/public/login2.html'>다시 로그인</a>");
    res.end();
  }
};

// ========================= server-side 목표리스트 출력 function =================== //
var list_goal = function(database, u_num, callback) {
  console.log('********** server-side wasted_used 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    // 'select * from goal where u_num = ?'
    var exec = conn.query('select g_num, u_num, cate_num, g_price, substring(g_time,1,10) g_time, substring(g_endtime,1,10) g_endtime from goal where g_endtime in (select max(g_endtime) max_endtime from goal where u_num = ?) and g_endtime > curdate() and u_num=?', [u_num, u_num],
      function(err, rows) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        conn.release();
        console.log('********** 실행 sql : %s ********** ', exec.sql);
        if (err) {
          conn.release();
          console.log('********** sql 수행 중 에러발생. ********** ');
          console.dir(err);
          callback(err, null);
          return;
        }
        callback(null, rows);
      });
    conn.on('error', function(err) {
      conn.release();
      console.log('********** 데이터베이스 연결 시 에러 발생함 **********');
      console.dir(err);
      callback(err, null);
    });
  });
};


// ==================== 목표 저장 파라미터 전달 function ==================== //
var save_goal = function(req, res, callback) {
  console.log('********** server-side save_goal 호출됨 **********');
  var database = req.app.get('database');
  var cate_num = req.body.cate_num;
  var g_price = req.body.g_price;
  var u_num = req.body.u_num;
  var g_time = req.body.g_time;
  var g_endtime = req.body.g_endtime;
  if (database) {
    var axios = require('axios');
    store_goal(database, u_num, cate_num, g_price, g_time, g_endtime, function(err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        console.dir(result);
        //일단 메인으로 redirect
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
    res.write("<br/><a href='/public/adduser.html'>다시 가입하기</a>");
    res.end();
  }
};

// ==================== 목표 DB 저장 function ==================== //
var store_goal = function(database, u_num, cate_num, g_price, g_time, g_endtime, callback) {
  console.log('********** server-side store_goal 호출됨 **********');
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
    console.log('카테넘렝쓰! : ' +  cate_num.length);
    //inserts배열에 넘겨받은 값들 push
    var inserts = [];
    for(var i=0; i < cate_num.length;i++){
      inserts.push([u_num, cate_num[i], g_price[i], g_time, g_endtime]);
    }

    var exec = conn.query({sql:'insert into goal(u_num, cate_num, g_price, g_time, g_endtime) values ?', values:[inserts]}, function(err, result) {
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


// ==================== 목표내역 수정 파라미터 전달 function ==================== //
var edit_goal = function(req, res, callback) {
  console.log('********** server-side edit_goal 호출됨 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var g_num = req.body.g_num;
  var cate_num = req.body.cate_num;
  var g_price = req.body.g_price;
  var g_time = req.body.g_time;
  var g_endtime = req.body.g_endtime;
  if (database) {
    var axios = require('axios');
    update_goal(database, u_num, g_num, cate_num, g_price, g_time, g_endtime, function(err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        console.dir(result);
        //일단 메인으로 redirect
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
    res.write("<br/><a href='/public/adduser.html'>다시 가입하기</a>");
    res.end();
  }
};

// ==================== 목표 DB 저장 function ==================== //
var update_goal = function(database, u_num, g_num, cate_num, g_price, g_time, g_endtime, callback) {
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
      g_price: g_price,
      g_time: g_time,
      g_endtime: g_endtime,
      g_num : g_num
    };
    //conn 객체를 사용해서 sql 실행
    //set 모든 컬럼에 집어넣는 문법
    var exec = conn.query('update goal set cate_num=?,g_price=?,g_time=?,g_endtime=? where u_num = ? and g_num=?',
     [cate_num, g_price, g_time, g_endtime, u_num, g_num], function(err, result) {
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

// ==================== 목표내역 삭제 파라미터 전달 function ==================== //
var delete_goal = function(req, res, callback) {
  console.log('********** server-side edit_goal 호출됨 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var g_num = req.body.g_num;
  if (database) {
    var axios = require('axios');
    remove_goal(database, u_num, g_num, function(err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        console.dir(result);
        //일단 메인으로 redirect
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
    res.write("<br/><a href='/public/adduser.html'>다시 가입하기</a>");
    res.end();
  }
};

// ==================== 목표 DB 삭제 function ==================== //
var remove_goal = function(database, u_num, g_num, callback) {
  console.log('********** server-side remove_goal 호출됨 **********');
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
      g_num: g_num,
    };
    //conn 객체를 사용해서 sql 실행
    //set 모든 컬럼에 집어넣는 문법
    var exec = conn.query('delete from goal where u_num = ? and g_num = ?', [u_num, g_num], function(err, result) {
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


module.exports.request_goal = request_goal;
module.exports.save_goal = save_goal;
module.exports.edit_goal = edit_goal;
module.exports.delete_goal = delete_goal;
