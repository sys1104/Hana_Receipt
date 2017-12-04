// ==================== 목표 요구 function ==================== //
var requestGoal = function(req, res, callback) {
  console.log('********** server-side requestGoal 호출됨 **********');
  var database = req.app.get('database');
  //유저 넘버에 임의로 2대입 (아직 로그인 미구현이라 Test용도) --> 이에따라 세션부분 주석처리

  // if (req.session.user) {
  //   console.log('********** 사용자 세션 확인하였습니다. **********');
  //   {
  //     var paramId = req.session.user.name;
  //     database.pool.getConnection(function(err, conn) {
  //       if (err) {
  //         if (conn) {
  //           conn.release();
  //         }
  //         callback(err, null);
  //         return;
  //       }
  //       console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
  //       var exec = conn.query('select u_num from user where u_id=?', paramId, function(err, rows) {
  //         if (rows.length > 0) {
  //           console.log('********** u_num 은 %s ' + rows[0].u_num + ' **********');
  //           u_num = rows[0].u_num;
  //         }
  //       });
  //       conn.on('error', function(err) {
  //         console.log('데이터베이스 연결 시 에러 발생함');
  //         console.dir(err);
  //         callback(err, null);
  //       });
  //     });
  //   }
  // }
  var u_num = '';
  var cate_num = '';
  var g_price = req.body.g_price;
  var g_time = req.body.g_time;

  if (database) {
    var axios = require('axios');
    saveGoal(database, u_num, cate_num, g_price, g_time, function(err, result) {
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

// ==================== 목표 저장 function ==================== //
var saveGoal = function(database, u_num, cate_num, g_price, g_time, callback) {
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
      g_time: g_time
    };
    //conn 객체를 사용해서 sql 실행
    //set 모든 컬럼에 집어넣는 문법
    var exec = conn.query('insert into goal set ?', data, function(err, result) {
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

// ==================== 소비내역 수정 function ==================== //
var updateGoal = function(req, res, callback) {
  console.log('********** server-side updateGoal 호출됨 **********');
  var database = req.app.get('database');
  var u_num = '';
  if (req.session.user) {
    console.log('********** 사용자 세션 확인하였습니다. **********'); {
      var paramId = req.session.user.name;
      database.pool.getConnection(function(err, conn) {
        if (err) {
          if (conn) {
            conn.release();
          }
          callback(err, null);
          return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        var exec = conn.query('select u_num from user where u_id=?', paramId, function(err, rows) {
          if (rows.length > 0) {
            console.log('********** u_num 은 %s ' + rows[0].u_num + ' **********');
            u_num = rows[0].u_num;
          }
        });
        conn.on('error', function(err) {
          console.log('데이터베이스 연결 시 에러 발생함');
          console.dir(err);
          callback(err, null);
        });
      });
    }
  }
  // var paramUnum = req.body.u_num;
  var paramCatenum = Number(req.body.cate_num);
  var paramContent = req.body.content;
  var paramPrice = req.body.price;
  var paramTime = req.body.time;
  var paramWasted = req.body.wasted;
  //database --> true : DB에 접근할 수 있는 상태
  if (database) {
    var axios = require('axios');
    editHistory(database, u_num, paramCatenum, paramContent, paramPrice, paramTime, paramWasted, function(err, result) {
      if (err) {
        throw err;
      } // 에러 처리
      if (result) {
        console.dir(result);
        res.redirect('http://localhost:8080');
      } else {
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>소비내역 업데이트 실패</h1>');
        res.write("<br/><a href='/public/adduser.html'>다시 되돌아가기</a>");
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
    res.write("<br/><a href='/public/adduser.html'>다시 되돌아가기</a>");
    res.end();
  }
};

var editHistory = function(database, u_num, cate_num, content, price, time, wasted, callback) {
  console.log('********** editHistory 호출됨 **********');
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
    //conn 객체를 사용해서 sql 실행
    var exec = conn.query('update consume_history set cate_num = ?, content = ?, price = ?, time = ?, wasted =? where u_num = ?',
      cate_num, content, price, time, wasted, u_num,
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

module.exports.requestHistory = requestHistory;
module.exports.updateHistory = updateHistory;
