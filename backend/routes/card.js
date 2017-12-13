// CREATE TABLE card
// (
//     `card_num`      INT            NOT NULL    AUTO_INCREMENT,
//     `card_name`     VARCHAR(45)    NULL,
//     `card_check`    INT            NULL,
//     `domestic`      INT            NULL,
//     `card_img`      VARCHAR(100)    NULL,
//     `card_benefit`  VARCHAR(255)    NULL,
//     `card_life`     INT    NULL,
//     PRIMARY KEY (card_num)
// );

// ==================== 카드 혜택별 조회 function ==================== //
var card_benefit_search = function(database, result_benefit_priority, callback) {
  console.log('********** card_benefit_search 호출 **********');
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //칼럼명을 배열로 만들기
    var sql = 'select * from card where card_benefit like ?';
    var exec = conn.query(sql, '%' + result_benefit_priority + '%', function(err, rows) {
      //select의 결과물은 배열로 들어온다. -rows 변수..
      if (rows.length > 0) {
        conn.release();
        callback(null, rows);
      } else {
        conn.release();
        console.log('일치하는 카드 없음!!');
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

var user_benefit_search = function(database, u_num, card_benefit, callback) {
  console.log('********** user_benefit_search 호출 **********');
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //칼럼명을 배열로 만들기
    // select * from consume_history where u_num  = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 31 DAY)
    var sql = 'select A.cate_num, sum(price) as sum_price, B.u_job as u_job, B.u_age as u_age, B.u_gender as u_gender from (select * from consume_history where u_num = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 31 DAY)) as A, user B where A.u_num = B.u_num group by cate_num';
    var exec = conn.query(sql, u_num, function(err, rows) {
      //select의 결과물은 배열로 들어온다. -rows 변수..
      if (rows.length > 0) {
        conn.release();
        callback(null, rows);
      } else {
        conn.release();
        console.log('일치하는 사용자와 카테고리 없음!!');
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

var card_benefit_list = function(req, res, callback) {
  console.log('********** card_benefit_list 호출 **********');
  //database --> true : DB에 접근 할 수 있는 상태
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var card_benefit = req.body.card_benefit;

  if (database) {
    var data = {};
    user_benefit_search(database, u_num, card_benefit, function(err, rows) {

      if (err) {
        console.error('card검색 중 에러발생 ' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>read board 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '<p>');
        res.end();
      }
      if (rows) {
        var result_benefit_priority = [];
        result_benefit_priority = benefit_value(rows);  //우선순위 구하는 메소드 호출
        console.log('최종 베네핏 우선순위 1위 : ' + result_benefit_priority[0]);
        card_benefit_search(database, result_benefit_priority[0], function(err, rows2) {
          if (err) {
            console.error('********** user_benefit_search 에러 발생 **********' + err.stack);
            res.writeHead(200, {
              "Content-Type": 'text/html;charset=utf8'
            });
            res.write('<h2>goal_money 에러 발생</h2>');
            res.write('<p>' + err.stack + '</p>');
            res.end();
            // 에러 처리
          }
          if (rows2) {
            console.log('********** card_benefit_search ' + rows2 + ' **********');
            if(rows2.length > 1){
              for(var p=1; p<3; p++){
                console.log(rows2[p]);
                // rows2.card_benefit.search(result_benefit_priority[p]);
                // console.log('!!!!!!!!!!!!!!!!!!!!!!----- : ' + rows2.card_benefit.search(result_benefit_priority[p]));
              }
            }
            // data.cate_goal = rows2;
            console.log('********** 프론트로 제이슨 형태로 데이터를 보냄 *********');
            console.log(data.cate_used);
            console.log(data.cate_goal);
            res.json(data);
            res.end();
          } else {
            console.log("********** 찾아온 카드~~ 없음 **********");
          }
        });
        // console.log('-------user_benefit_search ---- rows있음 ---------');
        // data = rows;
        // res.json(data);
      } else {
        console.log('rows없음');
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
    res.write('<br/> <a href="/public/login2.html">다시 로그인 </a>');
    res.end();
  }
};

// ==================== 혜택별 카드추천 function==================== //
var benefit_value = function(rows){
  console.log('----------benefit_value 메소드 호출--------------');
  //카테고리별 가중치
  var sum = 0;  //sum_price 총합
  var result = [];
  var result2 = [];
  var result_cate = ''; //제일 비중 큰 카테고리명(또는 번호)
  var result_priority = '';  //제일 비중 큰 카테고리의 수치
  var u_job = ''; //직업명 알아오기
  var u_age = ''; //나이 알아오기
  var u_gender = '';  //성별 알아오기
  for(var i= 0; i<rows.length; i++){
    sum += rows[i].sum_price;
    u_job = rows[i].u_job;
  }
  for(var j=0; j<rows.length; j++){
    result.push(rows[j].cate_num);
    result2.push((rows[j].sum_price / sum)*100);
  }

  // var temp = -1;
  var refuel = 0,
      mart = 0,
      edu = 0,
      movie = 0,
      shop = 0,
      travel = 0,
      hospi = 0,
      transport = 0,
      communi = 0,
      coffee = 0,
      value1 = 50;
  for(var k=0; k<result.length; k++){
    console.log('이거슨 리절트 : ' + result[k]);
    console.log('이거슨 리절트2 : ' + result2[k]);
    if(result[k] == 1){
      result_cate = "생활/쇼핑";
      refuel += result2[k]*1.7;
      mart += result2[k]*1.8;
      edu += result2[k]*1.2;
      movie += result2[k]*1.5;
      shop += result2[k]*2.0;
      travel += result2[k]*1.1;
      hospi += result2[k]*1.1;
    }
    if(result[k] == 2){
      result_cate = "교통";
      refuel += result2[k]*1.5;
      transport += result2[k]*2.0;
    }
    if(result[k] == 3){
      result_cate = "식비";
      mart += result2[k]*2.0;
      travel += result2[k]*1.6;
      coffee += result2[k]*1.9;
      hospi += result2[k]*1.1;
    }
    if(result[k] == 4){
      result_cate = "패션/미용";
      mart += result2[k]*1.6;
      edu += result2[k]*1.4;
      shop += result2[k]*1.8;
      hospi += result2[k]*1.2;
    }
    if(result[k] == 5){
      result_cate = "주거/통신";
      communi += result2[k]*1.8;
      hospi += result2[k]*1.3;
    }
    if(result[k] == 6){
      result_cate = "기타";
      refuel += result2[k];
      mart += result2[k];
      edu += result2[k];
      movie += result2[k];
      shop += result2[k];
      travel += result2[k];
      hospi += result2[k];
      communi += result2[k];
      coffee += result2[k];
    }
  }
  var value2 = 50;
  console.log('카테랑 : ' + result_cate +' 가격비율 : '+ result_priority + ' 직업은 : ' + u_job + ' 테스트로 마트값 : ' + mart);

  //직업별 가중치
  if(u_job == '회사원'){
    refuel += value2*1.8;
    mart += value2*1.5;
    edu += value2*1.2;
    movie += value2*1.3;
    shop += value2*1.8;
    travel += value2*1.1;
    hospi += value2;
    transport += value2*1.9;
    communi += value2*1.8;
    coffee += value2*1.8;
  }else if(u_job == '자영업'){
    refuel += value2*1.8;
    mart += value2*1.7;
    edu += value2*1.2;
    movie += value2*1.1;
    shop += value2*1.8;
    travel += value2;
    hospi += value2*1.1;
    transport += value2*1.6;
    communi += value2*1.9;
    coffee += value2*1.2;
  }else if(u_job == '농축산업'){
    refuel += value2*1.9;
    mart += value2*1.9;
    edu += value2*1.2;
    movie += value2;
    shop += value2*1.5;
    travel += value2*1.1;
    hospi += value2*1.7;
    transport += value2*1.4;
    communi += value2*1.5;
    coffee += value2*1.2;
  }else if(u_job == '공무원'){
    refuel += value2*1.6;
    mart += value2*1.8;
    edu += value2*1.8;
    movie += value2*1.2;
    shop += value2*1.8;
    travel += value2*1.2;
    hospi += value2*1.1;
    transport += value2*1.6;
    communi += value2*1.8;
    coffee += value2*1.2;
  }else if(u_job == '학생'){
    refuel += value2;
    mart += value2*1.3;
    edu += value2*1.8;
    movie += value2*1.6;
    shop += value2*1.8;
    travel += value2*1.3;
    hospi += value2*1.1;
    transport += value2*1.8;
    communi += value2*1.6;
    coffee += value2*1.4;
  }else if(u_job == '주부'){
    refuel += value2*1.5;
    mart += value2*2.0;
    edu += value2*1.8;
    movie += value2*1.3;
    shop += value2*1.9;
    travel += value2*1.2;
    hospi += value2*1.4;
    transport += value2*1.5;
    communi += value2*1.6;
    coffee += value2*1.8;
  }else if(u_job == '기타'){
    refuel += value2;
    mart += value2;
    edu += value2;
    movie += value2;
    shop += value2;
    travel += value2;
    hospi += value2;
    transport += value2;
    communi += value2;
    coffee += value2;
  }

  //성별과 연령별 가중치
  var value3 = 30;
  if(u_age >= 10 && u_age < 20 && (u_gender == 1)){
    refuel += value3*1;
    mart += value3*1.6;
    edu += value3*1.8;
    movie += value3*1.6;
    shop += value3*1.5;
    travel += value3*1.1;
    hospi += value3*1.1;
    transport += value3*1.7;
    communi += value3*1.7;
    coffee += value3*1.7;
  }else if(u_age >= 20 && u_age < 30 && (u_gender == 1)){
    refuel += value3*1.2;
    mart += value3*1.7;
    edu += value3*1.5;
    movie += value3*1.5;
    shop += value3*1.7;
    travel += value3*1.2;
    hospi += value3*1.1;
    transport += value3*1.9;
    communi += value3*1.9;
    coffee += value3*1.7;
  }else if(u_age >= 30 && u_age < 40 && (u_gender == 1)){
    refuel += value3*1.9;
    mart += value3*1.7;
    edu += value3*1.4;
    movie += value3*1.4;
    shop += value3*1.7;
    travel += value3*1.2;
    hospi += value3*1.2;
    transport += value3*1.9;
    communi += value3*1.9;
    coffee += value3*1.7;
  }else if(u_age >= 40 && u_age < 50 && (u_gender == 1)){
    refuel += value3*2.0;
    mart += value3*1.7;
    edu += value3*1.5;
    movie += value3*1.4;
    shop += value3*1.7;
    travel += value3*1.4;
    hospi += value3*1.2;
    transport += value3*1.8;
    communi += value3*1.9;
    coffee += value3*1.6;
  }else if(u_age >= 50 && u_age < 60 && (u_gender == 1)){
    refuel += value3*2.0;
    mart += value3*1.7;
    edu += value3*1.3;
    movie += value3*1.5;
    shop += value3*1.7;
    travel += value3*1.5;
    hospi += value3*1.3;
    transport += value3*1.7;
    communi += value3*1.8;
    coffee += value3*1.5;
  }else if(u_age >= 60 && u_age < 70 && (u_gender == 1)){
    refuel += value3*1.8;
    mart += value3*1.8;
    edu += value3*1.1;
    movie += value3*1.2;
    shop += value3*1.7;
    travel += value3*1.7;
    hospi += value3*1.8;
    transport += value3*1.3;
    communi += value3*1.8;
    coffee += value3*1.5;
  }else if(u_age >= 70 && (u_gender == 1)){
    refuel += value3*1;
    mart += value3*1.6;
    edu += value3*1.5;
    movie += value3*1.7;
    shop += value3*1.7;
    travel += value3*1.7;
    hospi += value3*1.9;
    transport += value3*1.2;
    communi += value3*1.4;
    coffee += value3*1.5;
  }else if(u_age >= 10 && u_age < 20 && (u_gender == 2)){
    refuel += value3*1;
    mart += value3*1.6;
    edu += value3*1.5;
    movie += value3*1.7;
    shop += value3*1.6;
    travel += value3*1.1;
    hospi += value3*1.1;
    transport += value3*1.9;
    communi += value3*1.9;
    coffee += value3*1.9;
  }else if(u_age >= 20 && u_age < 30 && (u_gender == 2)){
    refuel += value3*1.1;
    mart += value3*1.6;
    edu += value3*1.6;
    movie += value3*1.8;
    shop += value3*1.9;
    travel += value3*1.2;
    hospi += value3*1.1;
    transport += value3*1.9;
    communi += value3*1.9;
    coffee += value3*1.9;
  }else if(u_age >= 30 && u_age < 40 && (u_gender == 2)){
    refuel += value3*1.2;
    mart += value3*1.9;
    edu += value3*1.5;
    movie += value3*1.6;
    shop += value3*2.0;
    travel += value3*1.2;
    hospi += value3*1.2;
    transport += value3*1.9;
    communi += value3*1.9;
    coffee += value3*1.9;
  }else if(u_age >= 40 && u_age < 50 && (u_gender == 2)){
    refuel += value3*1.4;
    mart += value3*2.0;
    edu += value3*1.6;
    movie += value3*1.5;
    shop += value3*1.9;
    travel += value3*1.4;
    hospi += value3*1.4;
    transport += value3*1.9;
    communi += value3*1.8;
    coffee += value3*1.9;
  }else if(u_age >= 50 && u_age < 60 && (u_gender == 2)){
    refuel += value3*1.5;
    mart += value3*2.0;
    edu += value3*1.6;
    movie += value3*1.5;
    shop += value3*1.8;
    travel += value3*1.5;
    hospi += value3*1.5;
    transport += value3*1.8;
    communi += value3*1.7;
    coffee += value3*1.9;
  }else if(u_age >= 60 && u_age < 70 && (u_gender == 2)){
    refuel += value3*1.1;
    mart += value3*1.9;
    edu += value3*1.1;
    movie += value3*1.3;
    shop += value3*1.6;
    travel += value3*1.5;
    hospi += value3*1.8;
    transport += value3*1.2;
    communi += value3*1.3;
    coffee += value3*1.7;
  }else if(u_age >= 70 && (u_gender == 2)){
    refuel += value3*1.1;
    mart += value3*1.8;
    edu += value3*1.1;
    movie += value3*1.2;
    shop += value3*1.5;
    travel += value3*1.5;
    hospi += value3*1.8;
    transport += value3*1.2;
    communi += value3*1.2;
    coffee += value3*1.7;
  }
  var total_result = [];
  var count = 0;
  total_result = [refuel, mart, edu, movie, shop, travel, hospi, transport, communi, coffee];
  console.log('토탈 리절트 : ' + total_result);
  var temp = -1;
  var temp2 = -1;
  var priority = [];
  for(var r=0; r<3; r++){
    for(var y=0; y<total_result.length; y++){
      // temp2 = total_result[y];
      if(total_result[y] > temp){
        temp = total_result[y];
        result_priority = temp;
        // total_result[y] = 0;
        count = y;
        console.log('y 값 : ' + y);
        console.log('temp 값 : ' + temp);
      }
    }
    console.log('토탈 리절트 [카운트] : ' + total_result[count]);
    if(count == 0){
      priority.push('주유');
    }else if (count == 1) {
      priority.push('마트');
    }else if (count == 2) {
      priority.push('교육');
    }else if (count == 3) {
      priority.push('영화');
    }else if (count == 4) {
      priority.push('쇼핑');
    }else if (count == 5) {
      priority.push('여행');
    }else if (count == 6) {
      priority.push('병원/약국');
    }else if (count == 7) {
      priority.push('교통');
    }else if (count == 8) {
      priority.push('통신');
    }else if (count == 9) {
      priority.push('커피');
    }
    total_result[count] = 0;
    temp = -1;
  }
  // total_result.pop(count);
  console.log('최종 우선순위 : ' + result_priority);
  console.log('다시 토탈 리절트 : ' + total_result);
  console.log('priority 3위까지 : ' + priority);

  return priority;
};
module.exports.card_benefit_list = card_benefit_list;