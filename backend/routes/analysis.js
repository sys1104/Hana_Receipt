// ========================= server-side 카테고리별 목표대비 사용금액 분석 function =================== //
var used_goal_money = function(database, id, password, callback) {
  console.log('********** server-side 목표대비 사용금액 분석 function 호출 **********');
  var u_num = ''; //vue에서 받아와야 함!!!
  var consume_sum = 0;
  var goal_price = 0;
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    var exec = conn.query('select price from consume_history where cate_num = ? and time >= (select g_time from goal where cate_num = ?)', paramCatenum, paramCatenum, function(err, rows) {
      //select의 결과물은 배열로 들어온다. rows 변수...
      if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          consume_sum += rows[i].price;
        }
      } else {
        console.log('********** 사용내역이 없습니다.**********');
        callback(null, null);
      }
    });
    var exec2 = conn.query('select g_price from goal where cate_num = ?', paramCatenum, function(err, rows) {
      //select의 결과물은 배열로 들어온다. rows 변수...
      if (rows.length > 0) {
        goal_price = rows[0].g_price;
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

// ========================= server-side 총 항목 목표대비 사용금액 분석 function =================== //
var all_used_goal_money = function(database, id, password, callback) {
  console.log('********** server-side 총 항목 목표대비 사용금액 분석 function 호출 **********');
  var u_num = ''; //vue에서 받아와야 함!!!
  var consume_sum = 0;
  var goal_price = 0;
  database.pool.getConnection(function(err, conn) { //DB 접속
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    var exec = conn.query('select price from consume_history where time >= (select g_time from goal where cate_num = ?)', paramCatenum, paramCatenum, function(err, rows) {
      //select의 결과물은 배열로 들어온다. rows 변수...
      if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          consume_sum += rows[i].price;
        }
      } else {
        console.log('********** 사용내역이 없습니다.**********');
        callback(null, null);
      }
    });
    var exec2 = conn.query('select g_price from goal where cate_num = ?', paramCatenum, function(err, rows) {
      //select의 결과물은 배열로 들어온다. rows 변수...
      if (rows.length > 0) {
        goal_price = rows[0].g_price;
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
