// ==================== 소비내역 저장 function ==================== //
var requestHistory = function(req, res, callback) {
  console.log('********** server-side requestHistory 호출됨 **********');
  var database = req.app.get('database');

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
  var u_num = Number(req.body.u_num);
  var cate_num = Number(req.body.cate_num);
  var content = req.body.content;
  var price = req.body.price;
  var time = req.body.time;
  var wasted = req.body.wasted;

  if (database) {
    var axios = require('axios');
    saveHistory(database, u_num, cate_num, content, price, time, wasted, function(err, result) {
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

var saveHistory = function(database, u_num, cate_num, content, price, time, wasted, callback) {
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
      time: time,
      wasted: wasted
    };
    //conn 객체를 사용해서 sql 실행
    //set 모든 컬럼에 집어넣는 문법
    var exec = conn.query('insert into consume_history set ?', data, function(err, result) {
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
var updateHistory = function(req, res, callback) {
  console.log('********** updateHistory 호출됨 **********');
  var database = req.app.get('database');
  var paramConsumenum = Number(req.body.consume_num);
  var paramUnum = Number(req.body.u_num);
  var paramCatenum = Number(req.body.cate_num);
  var paramContent = req.body.content;
  var paramPrice = req.body.price;
  var paramTime = req.body.time;
  var paramWasted = req.body.wasted;
  //database --> true : DB에 접근할 수 있는 상태
  if (database) {
    var axios = require('axios');
    editHistory(database, paramConsumenum, paramUnum, paramCatenum, paramContent, paramPrice, paramTime, paramWasted, function(err, result) {
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

var editHistory = function(database, consume_num, u_num, cate_num, content, price, time, wasted, callback) {
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
    // select consume_num from consume_history
    //conn 객체를 사용해서 sql 실행
    var exec = conn.query('update consume_history set cate_num = ?, content = ?, price = ?, time = ?, wasted =? where u_num = ? and consume_num = ?',
      [cate_num, content, price, time, wasted, u_num, consume_num],
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
  console.log('********** deleteHistory 호출됨 **********');
  var database = req.app.get('database');
  var paramConsumenum = Number(req.body.consume_num);
  var paramUnum = Number(req.body.u_num);

  if (database) {
    var axios = require('axios');
    delHistory(database, paramConsumenum, paramUnum, function(err, result) {
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
        res.write('<h1>소비내역 삭제 실패</h1>');
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

var delHistory = function(database, consume_num, u_num, callback) {
  console.log('********** delHistory 호출됨 **********');
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
    var exec = conn.query('delete from consume_history where consume_num =?', consume_num,
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

// ==================== 소비내역 리스트 function ==================== //
var read_consume_board = function(database, callback) {
  console.log('read board list 호출');
  console.dir(database);
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터 베이스 연결 스레드 아이디 : ' + conn.threadID);
    //칼럼명을 배열로 만들기
    var sql = 'select * from consume_history order by time';
    // var columns = [post_num];
    var exec = conn.query(sql, function(err, rows) {
      //select의 결과물은 배열로 들어온다. -rows 변수..
      if (rows.length > 0) {
        callback(null, rows);
      } else {
        console.log('일치하는 사용자 없음');
        callback(null, null);
      }
    });
    conn.on('error', function(err) {
      console.log('데이터베이스 연결 시 에러 발생함');
      console.dir(err);
      callback(err, null);
    });
  });
};

var consumeList = function(req, res) {
  console.log('consumeList들어옴~');
  //아이디와 패스워드 받고 dB에 접근
  //database --> true : DB에 접근 할 수 있는 상태
  var database = req.app.get('database');
  console.dir(database);
  // var paramPostNum = req.query.tmp_post_num;

  if (database) {
    read_consume_board(database, function(err, rows) {

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
        var data = {};
        //데이터베이스 접속이 성공 했을 경우
        // console.dir(rows);
        // console.log(rows);
        console.log('하이루 리스트보여줄까~?');
        data = rows;
        res.json(data);

      } else {
        //데이터베이스 접속이 실패 했을 경우
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h1>read board 실패</h1>');
        res.write('<div><p>확인하세요.</p></div>');
        res.end();
      }
    });
  } else {
    //데이터베이스 접속이 실패 했을 경우
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h1>데이터베이스 연결 실패</h1>');
    res.write('<div><p>DB에 연결 하지 못했습니다.</p></div>');
    res.write('<br/> <a href="/public/login2.html">다시 로그인 </a>');
    res.end();
  }
};


// ========================= server-side 1주일간 낭비되는 금액 카테고리별 출력 function =================== //
var wasted_category_list = function(req, res, callback) {
  console.log('********** server-side 목표대비 사용금액 분석 function 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = Number(req.body.start_date); //front단에서 오늘 기준으로 주일의 시작
  var end_date = Number(req.body.end_date); //front단에서 오늘 기준으로 주일의 마지막날로 정의한 것을 받아옴
  console.log(start_date);
  console.log(end_date);
  if (database) {

    wasted_used(database, u_num, start_date, end_date, function(err, rows) {
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
        var data = {};
        data = rows;
        res.json(data);
        console.log('********** data json 형태로 Wasted.vue로 보냄 **********')
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

// ========================= server-side 카테고리별 사용금액 분석 function =================== //
var wasted_used = function(database, u_num, start_date, end_date, callback) {
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
    var exec = conn.query('select cate_num, sum(price) from consume_history where u_num = ? and wasted = 1 and time >= ? and time <= ? group by cate_num',
      [u_num, start_date, end_date],
      function(err, rows) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows.length > 0) {
          console.log('********** 카테고리별 낭비금액 rows로 반환 **********');
          console.log(rows);
          callback(null, rows);
        } else {
          console.log('********** 사용내역이 없습니다.**********');
          callback(null, null);
        }
      });
    conn.on('error', function(err) {
      console.log('********** 데이터베이스 연결 시 에러 발생함 **********');
      console.dir(err);
      callback(err, null);
    });
  });
};


module.exports.requestHistory = requestHistory;
module.exports.updateHistory = updateHistory;
module.exports.consumeList = consumeList;
module.exports.deleteHistory = deleteHistory;
module.exports.wasted_category_list = wasted_category_list;
