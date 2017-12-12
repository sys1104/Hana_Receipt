// ========================= server-side 카테고리별 목표대비 사용금액 분석 function =================== //
var cate_used_goal_money = function(req, res, callback) {
  console.log('********** server-side 목표대비 사용금액 분석 function 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = req.body.start_date;
  if (database) {
    var data = {};
    cate_used(database, u_num, start_date, function(err, rows) {
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
        console.log('********** cate_used **********');
        console.log('********** data.cate_used ' + rows + ' *********');
        data.cate_used = rows;
        cate_goal(database, u_num, start_date, function(err, rows2) {
          if (err) {
            console.error('********** goal_money 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>goal_money 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            console.log('********** cate_goal ' + rows2 + ' **********');
            data.cate_goal = rows2;
            console.log('********** 프론트로 제이슨 형태로 데이터를 보냄 *********');
            console.log(data.cate_used);
            console.log(data.cate_goal);
            res.json(data);
            res.end();
          } else {
            console.log("********** 사용내역 없음 **********");
          }
        });
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
var cate_used = function(database, u_num, start_date, callback) {
  console.log('********** server-side cate_used 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    var exec = conn.query('select cate_num, sum(price) as sum_price from (select * from consume_history where u_num = ? and cate_num in (select cate_num from goal where u_num = ? and g_time <= ? and g_endtime >= ?) and c_time >= (select max(g_time) from goal where u_num = ? and g_time <= ? and g_endtime >= ?) and c_time <= (select max(g_endtime) from goal where u_num = ? and g_time <= ? and g_endtime >= ?)) as sub_goal group by cate_num', [u_num, u_num, start_date, start_date, u_num, start_date,start_date, u_num, start_date, start_date],
      function(err, rows) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표대비 사용금액 rows로 반환 **********');
          console.log(rows);
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 사용내역이 없습니다.**********');
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

// ========================= server-side 카테고리별 목표 사용금액 분석 function =================== //
var cate_goal = function(database, u_num, start_date, callback) {
  console.log('********** server-side cate_goal 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    var exec = conn.query('select cate_num, g_price, g_time, g_endtime from goal where u_num = ? and g_time <= ? and g_endtime >= ? and cate_num in (select cate_num from consume_history where u_num = ? and c_time >= (select max(g_time) from goal where u_num = ?) and c_time <= (select max(g_endtime) from goal where u_num = ?))', [u_num, start_date, start_date,u_num,u_num,u_num],
      function(err, rows2) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows2.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표 사용금액 rows로 반환 **********');
          callback(null, rows2);
        } else {
          conn.release();
          console.log('********** 사용내역이 없습니다.**********');
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

// ========================= server-side 총 항목 목표대비 사용금액 분석 function =================== //
var all_used_goal_money = function(req, res, callback) {
  console.log('********** server-side 총 항목 목표대비 사용금액 분석 function 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var start_date = req.body.start_date;
  if (database) {
    var data = {};
    all_used(database, u_num, start_date, function(err, rows) {
      if (err) {
        console.error('********** all_used 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>cate_used 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        data.all_used = rows;
        all_goal(database, u_num, start_date, function(err, rows2) {
          if (err) {
            console.error('********** goal_money 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>goal_money 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            data.all_goal = rows2;
            console.log(data);
            console.log('********** all_used_goal_money //' + data + ' **********');
            res.json(data);
            res.end();
          } else {
            console.log("********** 사용내역 없음 **********");
          }
        });
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

// ========================= server-side 사용자 총 사용금액 분석 function =================== //
var all_used = function(database, u_num, start_date, callback) {
  console.log('********** server-side all_used 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    var exec = conn.query('select sum(price) as sum_price from (select * from consume_history where u_num = ? and cate_num in (select cate_num from goal where u_num = ?) and c_time >= (select max(g_time) from goal where u_num = ? and g_time <= ? and g_endtime >= ?) and c_time <= (select max(g_endtime) from goal where u_num = ? and g_time <= ? and g_endtime >= ?)) as sub_goal', [u_num, u_num, u_num, start_date, start_date, u_num, start_date, start_date],
      function(err, rows) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표대비 사용금액 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 사용내역이 없습니다.**********');
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

// ========================= server-side 총 목표 금액 분석 function =================== //
var all_goal = function(database, u_num, start_date, callback) {
  console.log('********** server-side all_goal 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    // select sum(g_price) as g_price from goal where u_num = ? and g_time <= ? and g_endtime >= ?
    var exec = conn.query('select sum(g_price) as g_price, B.u_name u_name from goal A, user B where A.u_num=B.u_num and A.u_num = ? and A.g_time <= ? and A.g_endtime >= ?',
      [u_num, start_date, start_date],
      function(err, rows2) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows2.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표 사용금액 rows로 반환 **********');
          callback(null, rows2);
        } else {
          conn.release();
          console.log('********** 사용내역이 없습니다.**********');
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


// ========================= server-side 다른 사람과 평균 비교분석 function =================== //
var compare_user_other = function(req, res, callback) {
  console.log('********** server-side 다른 사람과 평균 비교분석 compare_user_other function 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = req.body.start_date; //front단에서 오늘 기준으로 주일의 시작
  var end_date = req.body.end_date; //front단에서 오늘 기준으로 주일의 마지막날로 정의한 것을 받아옴
  if (database) {
    var data = {};
    compare_user(database, u_num, start_date, end_date, function(err, rows) {
      if (err) {
        console.error('********** all_used 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>cate_used 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        data.compare_user = rows;
        compare_other(database, start_date, end_date, function(err, rows2) {
          if (err) {
            console.error('********** goal_money 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>goal_money 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            data.compare_other = rows2;
            res.json(data);
            console.log('********** compare_user_other / server-side requested' + data + ' **********');
            res.end();
          } else {
            console.log("********** 사용내역 없음 **********");
          }
        });
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

// ========================= server-side 사용자 총 카테고리별 사용금액 분석 function =================== //
var compare_user = function(database, u_num, start_date, end_date, callback) {
  console.log('********** server-side compare_user 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    // select cate_num, sum(price) as sum_price from (select * from consume_history where u_num = ? and c_time >= ? and c_time <= ?) as sub_consume_history group by cate_num
    var exec = conn.query('select A.cate_num, sum(price) as sum_price, B.u_name as u_name from (select * from consume_history where u_num = ? and c_time >= ? and c_time <= ?) as A, user B where A.u_num = B.u_num group by cate_num', [u_num, start_date, end_date],
      function(err, rows) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표대비 사용금액 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 사용내역이 없습니다.**********');
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

// ========================= server-side 다른 사람 총 카테고리별 사용금액 평균 분석  function =================== //
var compare_other = function(database, start_date, end_date, callback) {
  console.log('********** server-side compare_other 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();

      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    var exec = conn.query('select cate_num, avg(price) as avg_price from (select * from consume_history where c_time >= ? and c_time <= ?) as sub_consume_history group by cate_num', [start_date, end_date],
      function(err, rows2) {
        //select의 결과물은 배열로 들어온다. rows 변수...
        if (rows2.length > 0) {
          conn.release();
          console.log('********** 카테고리별 총 사용자 평균 사용금액 rows로 반환 **********');
          callback(null, rows2);
        } else {
          conn.release();

          console.log('********** 사용내역이 없습니다.**********');
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

module.exports.cate_used_goal_money = cate_used_goal_money;
module.exports.all_used_goal_money = all_used_goal_money;
module.exports.compare_user_other = compare_user_other;
