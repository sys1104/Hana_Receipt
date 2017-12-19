// ==================== 카드 혜택별 조회 (신용/체크) function ==================== //
var card_benefit_search = function(database, result_benefit_priority, callback) {
  console.log('********** server-side card_benefit_search 호출 **********');
  //card_benefit_search 메소드를 호출함으로써 DB 조회 후 혜택에 해당하는 카드 리스트 callback
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (혜택에 해당하는 카드 조회 쿼리문)
    var sql = 'select * from card where card_benefit like ?';
    var exec = conn.query(sql, '%' + result_benefit_priority + '%', function(err, rows) {
      if (rows.length > 0) {
        conn.release();
        console.log('********** 1차 우선 혜택 일치하는 내용 rows 반환 **********');
        callback(null, rows);
      } else {
        conn.release();
        console.log('********** 1차 우선 혜택 일치하는 내용 없음 **********');
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
// ==================== 카드 혜택별 조회 (체크) function ==================== //
var card_benefit_search_check = function(database, result_benefit_priority, callback) {
  console.log('********** card_benefit_search_check 호출 (학생 또는 20살 미만) **********');
  //card_benefit_search_check 메소드를 호출함으로써 DB 조회 후 혜택에 해당하는 카드 리스트 callback (체크카드만)
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //체크카드는 값 : 0 , 신용카드는 값 : 1
    //conn 객체를 사용해서 sql 실행 (혜택에 해당하는 카드 조회 쿼리문 - 체크카드만)
    var sql = 'select * from card where card_benefit like ? and card_check = 0';
    var exec = conn.query(sql, '%' + result_benefit_priority + '%', function(err, rows) {
      if (rows.length > 0) {
        conn.release();
        console.log('********** 1차 우선 혜택 일치하는 내용 rows반환 (체크카드) **********');
        callback(null, rows);
      } else {
        conn.release();
        console.log('********** 1차 우선 혜택 일치하는 내용 없음 (체크카드) **********');
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

// ==================== 카드 추천을 위한 사용자의 정보 분석 function ==================== //
var user_benefit_search = function(database, u_num, card_benefit, callback) {
  console.log('********** user_benefit_search 호출 **********');
  //user_benefit_search 메소드를 호출함으로써 DB 조회 후 카테고리별 지난 한달간 소비내역 합계와 직업, 나이, 성별 callback
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //conn 객체를 사용해서 sql 실행 (사용자의 카테고리별 지난 한달간 소비내역 합계와 직업, 나이, 성별 조회 쿼리문)
    var sql = 'select A.cate_num, sum(price) as sum_price, B.u_job as u_job, B.u_age as u_age, B.u_gender as u_gender from (select * from consume_history where u_num = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 30 DAY)) as A, user B where A.u_num = B.u_num group by cate_num';
    var exec = conn.query(sql, u_num, function(err, rows) {
      if (rows.length > 0) {
        conn.release();
        console.log('********** 사용자의 카테고리별 소비내역, 직업, 나이, 성별 조회 rows 반환 **********');
        callback(null, rows);
      } else {
        conn.release();
        console.log('********** 사용자의 카테고리별 소비내역, 직업, 나이, 성별 조회결과 없음 **********');
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

// ==================== 카드 추천 알고리즘 function ==================== //
var card_benefit_list = function(req, res, callback) {
  console.log('********** card_benefit_list 호출 **********');
  //카드 추천을 위한 알고리즘 시작
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var card_benefit = req.body.card_benefit;

  if (database) {
    var data = {};
    //user_benefit_search 메소드를 호출함으로써 DB 조회 후 카테고리별 지난 한달간 소비내역 합계와 직업, 나이, 성별 callback
    user_benefit_search(database, u_num, card_benefit, function(err, rows) {

      if (err) {
        console.error('user_benefit_search 카드 검색 중 에러발생 ' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>user_benefit_search 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '<p>');
        res.end();
      }
      if (rows) {
        var result_benefit_priority = [];
        //cate_num, sum_price, u_job, u_age, u_gender를 담은 rows를 메소드 인자로 넣어준다.
        //benefit_value메소드를 통해 상위 3개의 세부 카테고리명을 리턴 받는다.
        result_benefit_priority = benefit_value(rows); //우선순위 구하는 메소드 호출
        console.log('********** 최종 혜택 우선순위 1위 : ' + result_benefit_priority[0] + ' **********');
        console.log('********** 최종 혜택 우선순위 2위 : ' + result_benefit_priority[1] + ' **********');
        console.log('********** 최종 혜택 우선순위 3위 : ' + result_benefit_priority[2] + ' **********');
        console.log('********** 직업은 : ' + rows[0].u_job + ' **********');
        console.log('********** 나이는 : ' + rows[0].u_age + ' **********');

        //학생이거나 미성년자면 체크카드만 나오게함.(if~else 구문 사용)
        if (rows[0].u_job == '학생' || rows[0].u_age < 20) {
          //체크카드만 조회
          card_benefit_search_check(database, result_benefit_priority[0], function(err, rows2) {
            if (err) {
              console.error('********** card_benefit_search_check 에러 발생 **********' + err.stack);
              res.writeHead(200, {
                "Content-Type": 'text/html;charset=utf8'
              });
              res.write('<h2>card_benefit_search_check 에러 발생</h2>');
              res.write('<p>' + err.stack + '</p>');
              res.end();
            }

            if (rows2) {
              console.log('********** card_benefit_search_check메소드 -> row2값 있음 **********');
              console.log('********** DB에서 검색된 체크카드 개수 : ' + rows2.length + ' **********');
              var match_card2 = [];
              if (rows2.length > 3) {
                for (var p = 0; p < rows2.length; p++) {
                  if (rows2[p].card_benefit.match(result_benefit_priority[1])) {
                    match_card2.push(rows2[p]);
                  }
                  console.log('********** 체크카드 혜택' + rows2[p].card_benefit + ' **********');
                }
                console.log('두번째 우선순위까지 매치된 체크카드: ' + match_card2 + ' **********');
                data = match_card2;
                console.log('********** 두번째 우선순위까지 매치된 체크카드 JSON DATA 보냄 *********');
                res.json(data);
                res.end();
              } else if (rows2.length <= 3) {
                console.log('********* DB에서 검색된 체크카드 개수가 3이하, JSON DATA 보냄 *********');
                data = rows2;
                res.json(data);
                res.end();
              }
            } else {
              console.log('********** DB에서 검색된 체크카드 없음 **********');
            }
          }); //card_benefit_search_check 끝
        } else {
          // 체크/신용카드 둘다
          card_benefit_search(database, result_benefit_priority[0], function(err, rows2) {
            if (err) {
              console.error('********** card_benefit_search 에러 발생 **********' + err.stack);
              res.writeHead(200, {
                "Content-Type": 'text/html;charset=utf8'
              });
              res.write('<h2>card_benefit_search 에러 발생</h2>');
              res.write('<p>' + err.stack + '</p>');
              res.end();
            }

            if (rows2) {
              console.log('********** card_benefit_search메소드 -> row2값 있음 **********');
              console.log('********** DB에서 검색된 신용/체크카드 개수: ' + rows2.length + ' **********');
              var match_card = [];
              if (rows2.length > 3) {
                for (var p = 0; p < rows2.length; p++) {
                  if (rows2[p].card_benefit.match(result_benefit_priority[1])) {
                    match_card.push(rows2[p]);
                  }
                  console.log('********** 신용/체크카드 혜택: ' + rows2[p].card_benefit + ' **********');
                }
                console.log('두번째 우선순위까지 매치된 신용/체크카드: ' + match_card + ' **********');
              } else if (rows2.length <= 3) {
                console.log('********* DB에서 검색된 신용/체크카드 개수가 3이하, JSON DATA 보냄 *********');
                data = rows2;
                res.json(data);
                res.end();
              }
              data = match_card;
              console.log('********** 두번째 우선순위까지 매치된 신용/체크카드 JSON DATA 보냄 *********');
              res.json(data);
              res.end();
            } else {
              console.log('********** DB에서 검색된 신용/체크카드 없음 **********');
            }
          }); //card_benefit_search 끝
        }
      } else {
        console.log('********** user_benefit_search rows 없음(User X) **********');
        console.log('********** user_benefit_search rows없으므로 빈 JSON DATA 보냄 **********');
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

// ==================== 혜택별 카드추천 우선순위 분석 (가중치 적용) function==================== //
var benefit_value = function(rows) {
  console.log('********** benefit_value 메소드 호출 **********');
  //사용자의 소비패턴과 직업, 연령을 고려하여 가중치 적용을 위한 메소드

  //카테고리별 가중치
  var sum = 0; //sum_price 총합
  var result = []; //카테고리넘버 담기
  var result2 = []; //각 카테고리별 합을 총합으로 나눈 후 *100하여 퍼센티지 구함.
  var result_cate = ''; //제일 비중 큰 카테고리명(또는 번호)
  var result_priority = ''; //제일 비중 큰 카테고리의 수치
  for (var i = 0; i < rows.length; i++) {
    sum += rows[i].sum_price;
    result.push(rows[i].cate_num);
    result2.push((rows[i].sum_price / sum) * 100);
  }
  var refuel = 0,
    mart = 0,
    edu = 0,
    movie = 0,
    shop = 0,
    travel = 0,
    hospi = 0,
    transport = 0,
    communi = 0,
    coffee = 0;

  var value_salaryman = 50;
  var value_tradespeople = 52;
  var value_farmer = 53;
  var value_civil = 53;
  var value_student = 53;
  var value_housewife = 53;
  var value_other = 50;
  //직업별 가중치
  if (rows[0].u_job == '회사원') {
    refuel += value_salaryman * 1.8;
    mart += value_salaryman * 1.5;
    edu += value_salaryman * 1.2;
    movie += value_salaryman * 1.3;
    shop += value_salaryman * 1.8;
    travel += value_salaryman * 1.1;
    hospi += value_salaryman;
    transport += value_salaryman * 1.9;
    communi += value_salaryman * 1.8;
    coffee += value_salaryman * 1.8;
  } else if (rows[0].u_job == '자영업') {
    refuel += value_tradespeople * 1.8;
    mart += value_tradespeople * 1.7;
    edu += value_tradespeople * 1.2;
    movie += value_tradespeople * 1.1;
    shop += value_tradespeople * 1.5;
    travel += value_tradespeople * 1.0;
    hospi += value_tradespeople * 1.1;
    transport += value_tradespeople * 1.6;
    communi += value_tradespeople * 1.9;
    coffee += value_tradespeople * 1.2;
  } else if (rows[0].u_job == '농축산업') {
    refuel += value_farmer * 1.9;
    mart += value_farmer * 1.9;
    edu += value_farmer * 1.2;
    movie += value_farmer;
    shop += value_farmer * 1.5;
    travel += value_farmer * 1.1;
    hospi += value_farmer * 1.7;
    transport += value_farmer * 1.4;
    communi += value_farmer * 1.5;
    coffee += value_farmer * 1.2;
  } else if (rows[0].u_job == '공무원') {
    refuel += value_civil * 1.6;
    mart += value_civil * 1.8;
    edu += value_civil * 1.8;
    movie += value_civil * 1.2;
    shop += value_civil * 1.8;
    travel += value_civil * 1.2;
    hospi += value_civil * 1.1;
    transport += value_civil * 1.6;
    communi += value_civil * 1.8;
    coffee += value_civil * 1.2;
  } else if (rows[0].u_job == '학생') {
    refuel += value_student;
    mart += value_student * 1.3;
    edu += value_student * 1.8;
    movie += value_student * 1.6;
    shop += value_student * 1.8;
    travel += value_student * 1.3;
    hospi += value_student * 1.1;
    transport += value_student * 1.8;
    communi += value_student * 1.6;
    coffee += value_student * 1.4;
  } else if (rows[0].u_job == '주부') {
    refuel += value_housewife * 1.5;
    mart += value_housewife * 2.0;
    edu += value_housewife * 1.8;
    movie += value_housewife * 1.3;
    shop += value_housewife * 1.9;
    travel += value_housewife * 1.2;
    hospi += value_housewife * 1.4;
    transport += value_housewife * 1.5;
    communi += value_housewife * 1.6;
    coffee += value_housewife * 1.8;
  } else if (rows[0].u_job == '기타') {
    refuel += value_other;
    mart += value_other;
    edu += value_other;
    movie += value_other;
    shop += value_other;
    travel += value_other;
    hospi += value_other;
    transport += value_other;
    communi += value_other;
    coffee += value_other;
  }

  //성별과 연령별 가중치
  var value_men10 = 50;
  var value_men20 = 50;
  var value_men30 = 52;
  var value_men40 = 53;
  var value_men50 = 54;
  var value_men60 = 54;
  var value_men70 = 54;
  var value_women10 = 50;
  var value_women20 = 50;
  var value_women30 = 52;
  var value_women40 = 53;
  var value_women50 = 54;
  var value_women60 = 54;
  var value_women70 = 54;
  if (rows[0].u_age >= 10 && rows[0].u_age < 20 && (rows[0].u_gender == 1)) {
    refuel += value_men10 * 1;
    mart += value_men10 * 1.6;
    edu += value_men10 * 1.8;
    movie += value_men10 * 1.6;
    shop += value_men10 * 1.5;
    travel += value_men10 * 1.1;
    hospi += value_men10 * 1.1;
    transport += value_men10 * 1.7;
    communi += value_men10 * 1.7;
    coffee += value_men10 * 1.7;
  } else if (rows[0].u_age >= 20 && rows[0].u_age < 30 && (rows[0].u_gender == 1)) {
    refuel += value_men20 * 1.2;
    mart += value_men20 * 1.7;
    edu += value_men20 * 1.5;
    movie += value_men20 * 1.5;
    shop += value_men20 * 1.7;
    travel += value_men20 * 1.2;
    hospi += value_men20 * 1.1;
    transport += value_men20 * 1.9;
    communi += value_men20 * 1.9;
    coffee += value_men20 * 1.6;
  } else if (rows[0].u_age >= 30 && rows[0].u_age < 40 && (rows[0].u_gender == 1)) {
    refuel += value_men30 * 2.0;
    mart += value_men30 * 1.7;
    edu += value_men30 * 1.4;
    movie += value_men30 * 1.4;
    shop += value_men30 * 1.6;
    travel += value_men30 * 1.2;
    hospi += value_men30 * 1.2;
    transport += value_men30 * 1.7;
    communi += value_men30 * 1.7;
    coffee += value_men30 * 1.5;
  } else if (rows[0].u_age >= 40 && rows[0].u_age < 50 && (rows[0].u_gender == 1)) {
    refuel += value_men40 * 2.2;
    mart += value_men40 * 1.7;
    edu += value_men40 * 1.5;
    movie += value_men40 * 1.4;
    shop += value_men40 * 1.7;
    travel += value_men40 * 1.4;
    hospi += value_men40 * 1.2;
    transport += value_men40 * 1.8;
    communi += value_men40 * 1.9;
    coffee += value_men40 * 1.6;
  } else if (rows[0].u_age >= 50 && rows[0].u_age < 60 && (rows[0].u_gender == 1)) {
    refuel += value_men50 * 2.1;
    mart += value_men50 * 1.7;
    edu += value_men50 * 1.3;
    movie += value_men50 * 1.5;
    shop += value_men50 * 1.7;
    travel += value_men50 * 1.5;
    hospi += value_men50 * 1.3;
    transport += value_men50 * 1.7;
    communi += value_men50 * 1.8;
    coffee += value_men50 * 1.5;
  } else if (rows[0].u_age >= 60 && rows[0].u_age < 70 && (rows[0].u_gender == 1)) {
    refuel += value_men60 * 1.8;
    mart += value_men60 * 1.8;
    edu += value_men60 * 1.1;
    movie += value_men60 * 1.2;
    shop += value_men60 * 1.7;
    travel += value_men60 * 1.7;
    hospi += value_men60 * 1.8;
    transport += value_men60 * 1.3;
    communi += value_men60 * 1.8;
    coffee += value_men60 * 1.5;
  } else if (rows[0].u_age >= 70 && (rows[0].u_gender == 1)) {
    refuel += value_men70 * 1;
    mart += value_men70 * 1.6;
    edu += value_men70 * 1.5;
    movie += value_men70 * 1.7;
    shop += value_men70 * 1.7;
    travel += value_men70 * 1.7;
    hospi += value_men70 * 1.9;
    transport += value_men70 * 1.2;
    communi += value_men70 * 1.4;
    coffee += value_men70 * 1.5;
  } else if (rows[0].u_age >= 10 && rows[0].u_age < 20 && (rows[0].u_gender == 2)) {
    refuel += value_women10 * 1;
    mart += value_women10 * 1.6;
    edu += value_women10 * 1.5;
    movie += value_women10 * 1.7;
    shop += value_women10 * 1.6;
    travel += value_women10 * 1.1;
    hospi += value_women10 * 1.1;
    transport += value_women10 * 1.9;
    communi += value_women10 * 1.9;
    coffee += value_women10 * 1.9;
  } else if (rows[0].u_age >= 20 && rows[0].u_age < 30 && (rows[0].u_gender == 2)) {
    refuel += value_women20 * 1.1;
    mart += value_women20 * 1.6;
    edu += value_women20 * 1.6;
    movie += value_women20 * 1.8;
    shop += value_women20 * 1.9;
    travel += value_women20 * 1.2;
    hospi += value_women20 * 1.1;
    transport += value_women20 * 1.9;
    communi += value_women20 * 1.9;
    coffee += value_women20 * 1.9;
  } else if (rows[0].u_age >= 30 && rows[0].u_age < 40 && (rows[0].u_gender == 2)) {
    refuel += value_women30 * 1.2;
    mart += value_women30 * 1.9;
    edu += value_women30 * 1.5;
    movie += value_women30 * 1.6;
    shop += value_women30 * 2.0;
    travel += value_women30 * 1.2;
    hospi += value_women30 * 1.2;
    transport += value_women30 * 1.9;
    communi += value_women30 * 1.9;
    coffee += value_women30 * 1.9;
  } else if (rows[0].u_age >= 40 && rows[0].u_age < 50 && (rows[0].u_gender == 2)) {
    refuel += value_women40 * 1.4;
    mart += value_women40 * 2.0;
    edu += value_women40 * 1.6;
    movie += value_women40 * 1.5;
    shop += value_women40 * 1.9;
    travel += value_women40 * 1.4;
    hospi += value_women40 * 1.4;
    transport += value_women40 * 1.9;
    communi += value_women40 * 1.8;
    coffee += value_women40 * 1.9;
  } else if (rows[0].u_age >= 50 && rows[0].u_age < 60 && (rows[0].u_gender == 2)) {
    refuel += value_women50 * 1.5;
    mart += value_women50 * 2.0;
    edu += value_women50 * 1.6;
    movie += value_women50 * 1.5;
    shop += value_women50 * 1.8;
    travel += value_women50 * 1.5;
    hospi += value_women50 * 1.5;
    transport += value_women50 * 1.8;
    communi += value_women50 * 1.7;
    coffee += value_women50 * 1.9;
  } else if (rows[0].u_age >= 60 && rows[0].u_age < 70 && (rows[0].u_gender == 2)) {
    refuel += value_women60 * 1.1;
    mart += value_women60 * 1.9;
    edu += value_women60 * 1.1;
    movie += value_women60 * 1.3;
    shop += value_women60 * 1.6;
    travel += value_women60 * 1.5;
    hospi += value_women60 * 1.8;
    transport += value_women60 * 1.2;
    communi += value_women60 * 1.3;
    coffee += value_women60 * 1.7;
  } else if (rows[0].u_age >= 70 && (rows[0].u_gender == 2)) {
    refuel += value_women70 * 1.1;
    mart += value_women70 * 1.8;
    edu += value_women70 * 1.1;
    movie += value_women70 * 1.2;
    shop += value_women70 * 1.5;
    travel += value_women70 * 1.5;
    hospi += value_women70 * 1.8;
    transport += value_women70 * 1.2;
    communi += value_women70 * 1.2;
    coffee += value_women70 * 1.7;
  }

  for (var k = 0; k < result.length; k++) {
    console.log('********** 혜택 결과: ' + result[k] + ' **********'); //카테고리 넘버
    console.log('********** 혜택 결과: ' + result2[k] + ' **********'); //각 카테고리별 합을 총합으로 나눈 후 *100하여 퍼센티지 구함.
    if (result[k] == 1) {
      result_cate = "생활/쇼핑";
      refuel += result2[k] * 1.6;
      mart += result2[k] * 1.7;
      edu += result2[k] * 1.6;
      movie += result2[k] * 1.5;
      shop += result2[k] * 1.8;
      communi += result2[k] * 1.5;
      travel += result2[k] * 1.4;
      transport += result2[k] * 1.2;
      coffee += result2[k] * 1.6;
      hospi += result2[k] * 1.5;
    } else if (result[k] == 2) {
      result_cate = "교통";
      refuel += result2[k] * 1.7;
      mart += result2[k] * 1.3;
      edu += result2[k] * 1.2;
      movie += result2[k] * 1.4;
      shop += result2[k] * 1.4;
      communi += result2[k] * 1.3;
      travel += result2[k] * 1.2;
      transport += result2[k] * 2.0;
      coffee += result2[k] * 1.4;
      hospi += result2[k] * 1.4;
    } else if (result[k] == 3) {
      result_cate = "식비";
      refuel += result2[k] * 1.6;
      mart += result2[k] * 1.9;
      edu += result2[k] * 1.3;
      movie += result2[k] * 1.3;
      shop += result2[k] * 1.5;
      communi += result2[k] * 1.3;
      travel += result2[k] * 1.2;
      transport += result2[k] * 1.4;
      coffee += result2[k] * 1.6;
      hospi += result2[k] * 1.5;
    } else if (result[k] == 4) {
      result_cate = "패션/미용";
      refuel += result2[k] * 1.2;
      mart += result2[k] * 1.8;
      edu += result2[k] * 1.6;
      movie += result2[k] * 1.5;
      shop += result2[k] * 1.7;
      communi += result2[k] * 1.4;
      travel += result2[k] * 1.6;
      transport += result2[k] * 1.5;
      coffee += result2[k] * 1.7;
      hospi += result2[k] * 1.2;
    } else if (result[k] == 5) {
      result_cate = "주거/통신";
      refuel += result2[k] * 1.4;
      mart += result2[k] * 1.6;
      edu += result2[k] * 1.5;
      movie += result2[k] * 1.3;
      shop += result2[k] * 1.2;
      communi += result2[k] * 1.8;
      travel += result2[k] * 1.3;
      transport += result2[k] * 1.3;
      coffee += result2[k] * 1.2;
      hospi += result2[k] * 1.2;
    } else if (result[k] == 6) {
      result_cate = "기타";
      refuel += result2[k];
      mart += result2[k];
      edu += result2[k];
      movie += result2[k];
      shop += result2[k];
      travel += result2[k];
      transport += result2[k];
      hospi += result2[k];
      communi += result2[k];
      coffee += result2[k];
    }
  }

  var total_result = [];
  var count = 0;
  //1)카테고리별 2)직업별 3)성별,연령별 --> 세부 카테고리별 합산을 total_result배열에 저장
  total_result = [refuel, mart, edu, movie, shop, travel, hospi, transport, communi, coffee];
  console.log('********** 총 합 결과 : ' + total_result + ' **********');
  var temp = -1;
  var temp2 = -1;
  var priority = [];

  //10개의 세부 카테고리 중 상위 3개 뽑아내는 이중for문
  for (var r = 0; r < 3; r++) {
    for (var y = 0; y < total_result.length; y++) {
      if (total_result[y] > temp) {
        temp = total_result[y];
        result_priority = temp;
        count = y;
        console.log('y 값 : ' + y);
        console.log('temp 값 : ' + temp);
      }
    }
    //위 y-for문을 돌고나와서 count 인덱스에 있는 값이 가장 큰 값이므로 if문을 통해 이름화 시킨다.
    //그 후 그 인덱스 자리의 값을 0으로 만들고 temp=-1로 리셋.
    //그럼 다시 y-for문을 돌며 가장 큰 값(실질적으로는 두번 째 큰값)을 찾는다.. 반복 (총 3회)
    if (count == 0) {
      priority.push('주유');
    } else if (count == 1) {
      priority.push('마트');
    } else if (count == 2) {
      priority.push('교육');
    } else if (count == 3) {
      priority.push('영화');
    } else if (count == 4) {
      priority.push('쇼핑');
    } else if (count == 5) {
      priority.push('여행');
    } else if (count == 6) {
      priority.push('병원/약국');
    } else if (count == 7) {
      priority.push('교통');
    } else if (count == 8) {
      priority.push('통신');
    } else if (count == 9) {
      priority.push('커피');
    }
    total_result[count] = 0;
    temp = -1;
  }
  console.log('********** 최종 우선순위 : ' + result_priority + ' **********');
  console.log('********** total_result : ' + total_result + '**********');
  console.log('********** priority 3위까지 : ' + priority + '**********');
  //상위 3가지 세부 카테고리를 배열에 담아 리턴한다.
  return priority;
};

//모듈 exports
module.exports.card_benefit_list = card_benefit_list;
