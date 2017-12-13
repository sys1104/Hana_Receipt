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
      if (rows.length > 0) {
        conn.release();
        callback(null, rows);
      } else {
        conn.release();
        console.log('-----like로 일치하는 카드 없음!!');
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

var card_benefit_search_check = function(database, result_benefit_priority, callback) {
  console.log('********** card_benefit_search_check 호출 (학생 또는 20살 미만) **********');
  database.pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    //체크카드는 값 : 0 , 신용카드는 값 : 1
    var sql = 'select * from card where card_benefit like ? and card_check = 0';
    var exec = conn.query(sql, '%' + result_benefit_priority + '%', function(err, rows) {
      if (rows.length > 0) {
        conn.release();
        callback(null, rows);
      } else {
        conn.release();
        console.log('-----like로 일치하는 카드 없음!!22222');
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
    // select * from consume_history where u_num  = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 31 DAY)
    var sql = 'select A.cate_num, sum(price) as sum_price, B.u_job as u_job, B.u_age as u_age, B.u_gender as u_gender from (select * from consume_history where u_num = ? and c_time <= curdate() and c_time >= DATE_SUB(curdate(), INTERVAL 31 DAY)) as A, user B where A.u_num = B.u_num group by cate_num';
    var exec = conn.query(sql, u_num, function(err, rows) {
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
  var database = req.app.get('database');
  var u_num = req.body.u_num;
  var card_benefit = req.body.card_benefit;

  if (database) {
    var data = {};
    user_benefit_search(database, u_num, card_benefit, function(err, rows) {

      if (err) {
        console.error('카드 검색 중 에러발생 ' + err.stack);
        res.writeHead(200, {
          "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h2>read board 중 에러 발생</h2>');
        res.write('<p>' + err.stack + '<p>');
        res.end();
      }
      if (rows) {
        var result_benefit_priority = [];
        //cate_num, sum_price, u_job, u_age, u_gender를 담은 rows를 메소드 인자로 넣어준다.
        //benefit_value메소드를 통해 상위 3개의 세부 카테고리명을 리턴 받는다.
        result_benefit_priority = benefit_value(rows);  //우선순위 구하는 메소드 호출
        console.log('최종 베네핏 우선순위 1위 : ' + result_benefit_priority[0]);
        console.log('최종 베네핏 우선순위 2위 : ' + result_benefit_priority[1]);
        console.log('최종 베네핏 우선순위 3위 : ' + result_benefit_priority[2]);
        console.log('유잡은 : ' + rows[0].u_job);
        console.log('나이은 : ' + rows[0].u_age);

        if(rows[0].u_job == '학생' || rows[0].u_age < 20){
          card_benefit_search_check(database, result_benefit_priority[0], function(err, rows2) {
            if (err) {
              console.error('********** user_benefit_search 에러 발생 **********' + err.stack);
              res.writeHead(200, {
                "Content-Type": 'text/html;charset=utf8'
              });
              res.write('<h2>goal_money 에러 발생</h2>');
              res.write('<p>' + err.stack + '</p>');
              res.end();
            }

            if (rows2) {
              console.log('********** card_benefit_search메소드 -> row2값 있음 **********');
              console.log('디비에서 뽑아온 카드 갯수 check카드 : ' + rows2.length);
              console.log(rows2[0].card_check);
              console.log(rows2[1].card_check);
              var match_card2 = [];
              if(rows2.length > 3){
                for(var p=0; p<rows2.length; p++){
                  if(rows2[p].card_benefit.match(result_benefit_priority[1])){
                    match_card2.push(rows2[p]);
                  }
                  console.log('----------뽑자--------' + rows2[p].card_benefit);
                }
                console.log('두번째 우선순위까지 매치된 카드 : ' + match_card2);
                data = match_card2;
                console.log('********** 프론트로 제이슨 형태로 데이터를 보냄 (체크카드)*********');
                res.json(data);
                res.end();
              }else if(rows2.length <= 3){
                console.log('-----rows2 갯수가 3이하라서 그냥 json(data)보내요!체크카드----------')
                data = rows2;
                res.json(data);
                res.end();
              }

            } else {
              console.log("********** DB에서 찾아온 카드~~ 없음용 **********");
            }
          }); //card_benefit_search_check 끝
        }else{
          card_benefit_search(database, result_benefit_priority[0], function(err, rows2) {
            if (err) {
              console.error('********** user_benefit_search 에러 발생 **********' + err.stack);
              res.writeHead(200, {
                "Content-Type": 'text/html;charset=utf8'
              });
              res.write('<h2>goal_money 에러 발생</h2>');
              res.write('<p>' + err.stack + '</p>');
              res.end();
            }

            if (rows2) {
              console.log('********** card_benefit_search메소드 -> row2값 있음 **********');
              console.log('디비에서 뽑아온 카드 갯수 : ' + rows2.length);
              var match_card = [];
              if(rows2.length > 3){
                for(var p=0; p<rows2.length; p++){
                  if(rows2[p].card_benefit.match(result_benefit_priority[1])){
                    match_card.push(rows2[p]);
                  }
                  console.log('----------뽑자--------' + rows2[p].card_benefit);
                }
                console.log('두번째 우선순위까지 매치된 카드 : ' + match_card);
              }else if(rows2.length <= 3){
                console.log('-----rows2 갯수가 3이하라서 그냥 json(data)보내요!----------')
                data = rows2;
                res.json(data);
                res.end();
              }
              data = match_card;
              console.log('********** 프론트로 제이슨 형태로 데이터를 보냄 *********');
              res.json(data);
              res.end();
            } else {
              console.log("********** DB에서 찾아온 카드~~ 없음용 **********");
            }
          }); //card_benefit_search 끝
        }
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

// ==================== 혜택별 카드추천 우선순위 function==================== //
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
  console.log('카테랑 : ' + result_cate +' 가격비율 : '+ result_priority + ' 직업은 : ' + u_job + ' 테스트로 마트값 : ' + hospi);

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
  //1)카테고리별 2)직업별 3)성별,연령별 --> 세부 카테고리별 합산을 total_result배열에 저장
  total_result = [refuel, mart, edu, movie, shop, travel, hospi, transport, communi, coffee];
  console.log('토탈 리절트 : ' + total_result);
  var temp = -1;
  var temp2 = -1;
  var priority = [];

  //10개의 세부 카테고리 중 상위 3개 뽑아내는 이중for문
  for(var r=0; r<3; r++){
    for(var y=0; y<total_result.length; y++){
      if(total_result[y] > temp){
        temp = total_result[y];
        result_priority = temp;
        count = y;
        console.log('y 값 : ' + y);
        console.log('temp 값 : ' + temp);
      }
    }
    // console.log('토탈 리절트 [카운트] : ' + total_result[count]);
    //위 y-for문을 돌고나와서 count 인덱스에 있는 값이 가장 큰 값이므로 if문을 통해 이름화 시킨다.
    //그 후 그 인덱스 자리의 값을 0으로 만들고 temp=-1로 리셋.
    //그럼 다시 y-for문을 돌며 가장 큰 값(실질적으로는 두번 째 큰값)을 찾는다.. 반복 (총 3회)
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
  console.log('최종 우선순위 : ' + result_priority);
  console.log('다시 토탈 리절트 : ' + total_result);
  console.log('priority 3위까지 : ' + priority);
  //상위 3가지 세부 카테고리를 배열에 담아 리턴한다.
  return priority;
};
module.exports.card_benefit_list = card_benefit_list;
