// ========================= server-side 카테고리별 목표대비 사용금액 분석 function =================== //
var cate_used_goal_money = function(req, res, callback) {
  console.log('********** server-side 목표대비 사용금액 분석(cate_used_goal_money) 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var start_date = req.body.start_date;
  if (database) {
    var data = {};
    //cate_used 메소드를 호출함으로써 DB 조회 후 카테고리별 사용금액 callback
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
        console.log('********** cate_used 메소드 rows 있음 **********');
        // data객체에 cate_used로 부터의 결과 담기.
        data.cate_used = rows;
        //cate_goal 메소드를 호출함으로써 DB 조회 후 목표기간과 카테고리별 목표금액 callback
        cate_goal(database, u_num, start_date, function(err, rows2) {
          if (err) {
            console.error('********** cate_goal 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>cate_goal 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            console.log('********** cate_goal 메소드 rows2 있음 **********');
            // data객체에 cate_goal 부터의 결과 담기.
            data.cate_goal = rows2;
            console.log('********** data.cate_used / data.cate_goal JSON DATA 보냄 *********');
            res.json(data);
            res.end();
          } else {
            console.log("********** cate_goal 메소드 rows2 없음 **********");
          }
        });
      } else {
        console.log("********** cate_used 메소드 rows 없음 **********");
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

// ========================= server-side 카테고리별 사용금액(목표기간 동안) 분석 function =================== //
var cate_used = function(database, u_num, start_date, callback) {
  console.log('********** server-side cate_used 호출 **********');
  //cate_used 메소드를 호출함으로써 DB 조회 후 카테고리별 사용금액 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (목표기간에 해당하는 카테고리별 사용금액 조회 쿼리문)
    var exec = conn.query('select cate_num, sum(price) as sum_price from (select * from consume_history where u_num = ? and cate_num in (select cate_num from goal where u_num = ? and g_time = (select max(g_time) from goal where u_num = ?) and g_endtime = (select max(g_endtime) from goal where u_num = ?) and c_time >= (select max(g_time) from goal where u_num = ? and g_time <= ? and g_endtime >= ?) and c_time <= (select max(g_endtime) from goal where u_num = ? and g_time <= ? and g_endtime >= ?))) as sub_goal group by cate_num order by cate_num;', [u_num, u_num, u_num, u_num, u_num, start_date, start_date, u_num, start_date, start_date],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 카테고리별 목표대비 사용금액 rows로 반환 **********');
          console.log(rows);
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 카테고리별 목표대비 사용금액 없음 **********');
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

// ========================= server-side 카테고리별 목표금액 분석 function =================== //
var cate_goal = function(database, u_num, start_date, callback) {
  //cate_goal 메소드를 호출함으로써 DB 조회 후 목표기간과 카테고리별 목표금액 callback
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
    //conn 객체를 사용해서 sql 실행 (목표기간과 카테고리별 목표금액 조회 쿼리문)
    var exec = conn.query('select cate_num, g_price, g_time, g_endtime from goal where u_num = ? and g_time <= ? and g_endtime >= ? and cate_num in (select cate_num from consume_history where u_num = ? and c_time >= (select max(g_time) from goal where u_num = ?) and c_time <= (select max(g_endtime) from goal where u_num = ?)) order by cate_num', [u_num, start_date, start_date, u_num, u_num, u_num],
      function(err, rows2) {
        if (rows2.length > 0) {
          conn.release();
          console.log('********** 목표기간 / 카테고리별 목표금액 rows2로 반환 **********');
          callback(null, rows2);
        } else {
          conn.release();
          console.log('********** 카테고리별 목표금액 없음 **********');
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
  console.log('********** server-side 모든 항목 목표대비 사용금액 분석(all_used_goal_money) 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var start_date = req.body.start_date;
  if (database) {
    var data = {};
    //all_used 메소드를 호출함으로써 DB 조회 후 목표기간동안 모든 카테고리 소비내역 총합 callback
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
        // data객체에 all_used로 부터의 결과 담기.
        data.all_used = rows;
        //all_goal 메소드를 호출함으로써 DB 조회 후 모든 카테고리 목표금액 총합 callback
        all_goal(database, u_num, start_date, function(err, rows2) {
          if (err) {
            console.error('********** all_goal 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>all_goal 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            // data객체에 all_goal로 부터의 결과 담기.
            data.all_goal = rows2;
            console.log('********** all_used / all_goal JSON DATA로 보냄 **********');
            res.json(data);
            res.end();
          } else {
            console.log("********** all_goal 목표금액 없음 **********");
          }
        });
      } else {
        console.log("********** all_used 목표기간동안 소비내역 없음 **********");
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

// ========================= server-side 사용자 총 사용금액(목표기간 동안) 분석 function =================== //
var all_used = function(database, u_num, start_date, callback) {
  console.log('********** server-side all_used 호출 **********');
  //all_used 메소드를 호출함으로써 DB 조회 후 목표기간동안 모든 카테고리 소비내역 총합 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (목표기간동안 모든 카테고리 소비내역 총합 조회 쿼리문)
    var exec = conn.query('select sum(price) as sum_price from (select * from consume_history where u_num = ? and cate_num in (select cate_num from goal where u_num = ?) and c_time >= (select max(g_time) from goal where u_num = ? and g_time <= ? and g_endtime >= ?) and c_time <= (select max(g_endtime) from goal where u_num = ? and g_time <= ? and g_endtime >= ?)) as sub_goal', [u_num, u_num, u_num, start_date, start_date, u_num, start_date, start_date],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 목표기간동안 모든 카테고리 소비내역 총합 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 목표기간동안 모든 카테고리 소비내역 없음 **********');
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
  //all_goal 메소드를 호출함으로써 DB 조회 후 모든 카테고리 목표금액 총합 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    // console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
    //conn 객체를 사용해서 sql 실행 (모든 카테고리 목표금액 총합 조회 쿼리문)
    var exec = conn.query('select sum(g_price) as g_price, B.u_name u_name from goal A, user B where A.u_num=B.u_num and A.u_num = ? and A.g_time <= ? and A.g_endtime >= ?', [u_num, start_date, start_date],
      function(err, rows2) {
        if (rows2.length > 0) {
          conn.release();
          console.log('********** 모든 카테고리 목표금액 총합 rows로 반환 **********');
          callback(null, rows2);
        } else {
          conn.release();
          console.log('********** 모든 카테고리 목표금액 총합 없음 **********');
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
var compare_user_user = function(req, res, callback) {
  console.log('********** server-side 다른 사람과 평균 비교분석 compare_user_user 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = req.body.start_date; //front단에서 오늘 기준으로 한달전 날짜 받아옴
  var end_date = req.body.end_date; //front단에서 현재 날짜 받아옴
  if (database) {
    var data = {};
    //compare_user 메소드를 호출함으로써 DB 조회 후 사용자의 카테고리별 지난 한달간 소비내역 callback
    compare_user(database, u_num, start_date, end_date, function(err, rows) {
      if (err) {
        console.error('********** compare_user 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>compare_user 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        // data객체에 compare_user로 부터의 결과 담기.
        data.compare_user = rows;
        console.log('********** compare_user 사용자의 지난 한달간 소비내역 JSON DATA 보냄 **********');
        res.json(data);
        res.end();
      } else {
        console.log("********** compare_user 사용자의 지난 한달간 소비내역 없음 **********");
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

// ========================= server-side 사용자 총 카테고리별 사용금액 분석 function =================== //
var compare_user = function(database, u_num, start_date, end_date, callback) {
  //compare_user 메소드를 호출함으로써 DB 조회 후 사용자의 카테고리별 지난 한달간 소비내역 callback
  console.log('********** server-side compare_user 호출 **********');
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (사용자의 카테고리별 지난 한달간 소비내역 조회 쿼리문)
    var exec = conn.query('select A.cate_num, sum(price) as sum_price, B.u_name as u_name from (select * from consume_history where u_num = ? and c_time >= ? and c_time <= ?) as A, user B where A.u_num = B.u_num group by cate_num', [u_num, start_date, end_date],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 사용자의 지난 한달간 소비내역 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 사용자의 지난 한달간 소비내역 없음 **********');
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
  console.log('********** server-side 다른 사람과 평균 비교분석 compare_user_other 호출 **********');
  var database = req.app.get('database');
  var start_date = req.body.start_date; //front단에서 오늘 기준으로 한달전 날짜 받아옴
  var end_date = req.body.end_date; //front단에서 현재 날짜 받아옴
  if (database) {
    var data = {};
    //compare_other 메소드를 호출함으로써 DB 조회 후 다른 이용자의 카테고리별 지난 한달간 소비내역 callback
    compare_other(database, start_date, end_date, function(err, rows) {
      if (err) {
        console.error('********** compare_other 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>compare_other 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        // data객체에 compare_other로 부터의 결과 담기.
        data.compare_other = rows;
        console.log('********** compare_user_other 다른 이용자의 지난 한달간 소비내역 JSON DATA 보냄**********');
        res.json(data);
        res.end();
      } else {
        console.log("********** compare_user_other 다른 이용자의 지난 한달간 소비내역 없음 **********");
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

// ========================= server-side 다른 사람 총 카테고리별 사용금액 평균 분석  function =================== //
var compare_other = function(database, start_date, end_date, callback) {
  console.log('********** server-side compare_other 호출 **********');
  //compare_other 메소드를 호출함으로써 DB 조회 후 다른 이용자의 카테고리별 지난 한달간 소비내역 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (다른 이용자의 카테고리별 지난 한달간 평균 소비내역 조회 쿼리문)
    var exec = conn.query('select cate_num, avg(sum_price) as avg_price from (select u_num, cate_num, sum(price) as sum_price from consume_history where c_time >= ? and c_time <= ? group by u_num, cate_num) as sub_consume_history group by cate_num', [start_date, end_date],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 다른 이용자의 지난 한달간 평균 소비내역 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();

          console.log('********** 다른 이용자의 지난 한달간 평균 소비내역 없음 **********');
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


// ========================= server-side 성별과 연령대에 따른 평균 비교분석 function =================== //
var compare_user_other_genderAge = function(req, res, callback) {
  console.log('********** server-side 다른 사람과 평균 비교분석 compare_user_other_genderAge 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = req.body.start_date; //front단에서 오늘 기준으로 한달전 날짜 받아옴
  var end_date = req.body.end_date; //front단에서 현재 날짜 받아옴
  if (database) {
    var data = {};
    //compare_other 메소드를 호출함으로써 DB 조회 후 다른 이용자의 성별/연령별 지난 한달간 소비내역 평균 callback
    compare_other_genderAge(database, u_num, start_date, end_date, function(err, rows) {
      if (err) {
        console.error('********** compare_other_genderAge 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>compare_other_genderAge 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        data.compare_other = rows;
        console.log('********** compare_other_genderAge 다른 이용자의 성별/연령별 JSON DATA 보냄 **********');
        res.json(data);
        res.end();
      } else {
        console.log("**********compare_other_genderAge 소비내역 없음 **********");
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

// ========================= server-side 성별과 연령대에 따른 다른 이용자의 평균 분석 function =================== //
var compare_other_genderAge = function(database, u_num, start_date, end_date, callback) {
  console.log('********** server-side compare_other_genderAge 호출 **********');
  //compare_other 메소드를 호출함으로써 DB 조회 후 다른 이용자의 성별/연령별 지난 한달간 소비내역 평균 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (다른 이용자의 성별/연령별 지난 한달간 소비내역 평균 조회 쿼리문)
    var exec = conn.query('select cate_num, avg(sum_price) as avg_price, left((select u_age from user where u_num = ?),1) * 10 as u_age, (select u_gender from user where u_num = ?) as u_gender from (select u_num, cate_num, sum(price) as sum_price from consume_history where c_time >= ? and c_time <= ? and u_num in (select u_num from user where u_gender = (select u_gender from user where u_num = ?) and u_age >= (select left((select u_age from user where u_num = ?),1) * 10) and u_age <= (select left((select u_age from user where u_num = ?),1) * 10 + 10)) group by u_num, cate_num) as sub_consume_history group by cate_num', [u_num, u_num, start_date, end_date, u_num, u_num, u_num],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 성별/연령별 지난 한달간 소비내역 평균 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 성별/연령별 지난 한달간 소비내역 평균 없음 **********');
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


// ========================= server-side 직업에 따른 평균 비교분석 function =================== //
var compare_user_other_job = function(req, res, callback) {
  console.log('********** server-side 다른 사람과 평균 비교분석 compare_user_other_job 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num; //vue에서 받아와야 함!!!
  var start_date = req.body.start_date; //front단에서 오늘 기준으로 한달전 날짜 받아옴
  var end_date = req.body.end_date; //front단에서 현재 날짜 받아옴
  if (database) {
    var data = {};
    //compare_other_job 메소드를 호출함으로써 DB 조회 후 사용자의 직업에 다른 이용자의 지난 한달간 소비내역 평균 callback
    compare_other_job(database, u_num, start_date, end_date, function(err, rows) {
      if (err) {
        console.error('********** compare_other_job 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>compare_other_job 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        data.compare_other = rows;
        console.log('********** compare_user_other 직업에 따른 지난 한달간 소비내역 평균 JSON DATA 보냄 **********');
        res.json(data);
        res.end();
      } else {
        console.log("********** compare_user_other 직업에 따른 지난 한달간 소비내역 평균 없음 **********");
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

// ========================= server-side 사용자의 직업에 따른 다른 이용자의 사용금액 분석 function =================== //
var compare_other_job = function(database, u_num, start_date, end_date, callback) {
  console.log('********** server-side compare_other_job 호출 **********');
  //compare_other_job 메소드를 호출함으로써 DB 조회 후 사용자의 직업에 다른 이용자의 지난 한달간 소비내역 평균 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (사용자의 직업에 따른 다른 이용자의 지난 한달간 소비내역 평균 조회 쿼리문)
    var exec = conn.query('select cate_num, avg(sum_price) as avg_price, (select u_job from user where u_num = ?) as u_job from (select u_num, cate_num, sum(price) as sum_price from consume_history where c_time >= ? and c_time <= ? and u_num in (select u_num from user where u_job = (select u_job from user where u_num = ?)) group by u_num, cate_num) as sub_consume_history group by cate_num',
    [u_num, start_date, end_date, u_num],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 직업에 따른 다른 이용자의 지난 한달간 소비내역 평균 rows로 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 직업에 따른 다른 이용자의 지난 한달간 소비내역 평균 없음 **********');
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


// ========================= server-side 소비자 키워드 워드클라우드 분석 function =================== //
var word_cloud_history = function(req, res, callback) {
  console.log('********** server-side 소비내역 품목이름 추출 word_cloud_history 호출 **********');
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  if (database) {
    var data = {};
    //word_cloud_month 메소드를 호출함으로써 DB 조회 후 사용자의 지난 한달간 소비내역의 품목이름 callback
    word_cloud_month(database, u_num, function(err, rows) {
      if (err) {
        console.error('********** word_cloud_month 에러 발생 **********' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>word_cloud_month 에러 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();
        // 에러 처리
      }
      if (rows) {
        data = rows;
        console.log('********** 사용자의 지난 한달간 소비내역의 품목이름 JSON DATA 보냄 **********');
        res.json(data);
        res.end();
      } else {
        console.log('********** 사용자의 지난 한달간 소비내역의 품목이름 없음 **********');
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

// ========================= server-side 소비자 키워드 분석 function =================== //
var word_cloud_month = function(database, u_num, callback) {
  console.log('********** server-side word_cloud_month 호출 **********');
  //word_cloud_month 메소드를 호출함으로써 DB 조회 후 사용자의 지난 한달간 소비내역의 품목이름 callback
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (사용자의 지난 한달간 소비내역의 품목이름 조회 쿼리문)
    var exec = conn.query('select * from consume_history where u_num  = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 31 DAY)', [u_num],
      function(err, rows) {
        if (rows.length > 0) {
          conn.release();
          console.log('********** 사용자의 지난 한달간 소비내역의 품목이름 rows 반환 **********');
          callback(null, rows);
        } else {
          conn.release();
          console.log('********** 사용자의 지난 한달간 소비내역의 품목이름 rows 없음 **********');
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
module.exports.cate_used_goal_money = cate_used_goal_money;
module.exports.all_used_goal_money = all_used_goal_money;
module.exports.compare_user_user = compare_user_user;
module.exports.compare_user_other = compare_user_other;
module.exports.compare_user_other_genderAge = compare_user_other_genderAge;
module.exports.compare_user_other_job = compare_user_other_job;
module.exports.word_cloud_history = word_cloud_history;
