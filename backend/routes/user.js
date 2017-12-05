// ============================= 로그인 function ============================//
var login = function(req, res, callback) {
    console.log('********** server-side login 호출 **********');
    var database = req.app.get('database');
    var paramId = req.body.u_id || req.query.u_id;
    var paramPw = req.body.u_pw || req.query.u_pw;
    if (database) {
        var axios = require('axios');
        //사용자 인증 함수 호출 authUser
        authUser(database, paramId, paramPw, function(err, rows) {
            if (err) {
                console.error('********** 로그인 중 에러 발생 **********' + err.stack);
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h2>로그인 도중 데이터베이스 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
            } // 에러 처리
            if (rows) {
                var data = {};
                data = rows[0].u_num;
                res.json(data);
                console.log(data);
                res.end();
                //doc가 존재하면 로그인 성공
                // req.session.user = {
                //   name: paramId,
                //   authorized: true
                // };
                console.log("********** user 세션 생성 **********");
                // res.writeHead(200, {
                //   "Content-Type": 'text/html;charset=utf8'
                // });
                // var isUser = {
                //   isUser: true
                // };
                // if (req.session.user) {
                //   console.log('********** 세션 유지 **********');
                //   req.app.render('main', isUser, function(err, html) {
                //      if (err) {
                //        throw err;
                //      }
                //      console.log(html);
                //      res.end(html);
                //    });
                // } else {
                //   console.log('********** 세션 생성 안됨 **********');
                // }
            } else {
                //docs가 존재하지 않으면 로그인 실패
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>로그인 실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 확인하세요</p></div>');
                res.write("<br/><a href='/public/login_select.html'>다시 로그인</a>");
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
        res.write("<br/><a href='/public/login2.html'>다시 로그인</a>");
        res.end();
    }
};


// ============================= 아이디, 비밀번호 인증 function ============================//
var authUser = function(database, id, password, callback) {
    console.log('********** server-side authUser 호출 **********');
    var crypto = require('crypto'); //암호화 모듈 호출
    database.pool.getConnection(function(err, conn) { //DB 접속
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        var columns = ['u_num', 'u_id', 'u_pw', 'u_salt'];
        var tablename = 'user';
        //물음표가 두개 연속으로 붙으면 컬럼이나 테이블 이름을 뜻한다
        var exec = conn.query('select ?? from ?? where u_id=?', [columns, tablename, id], function(err, rows) {
            //select의 결과물은 배열로 들어온다. rows 변수...
            if (rows.length > 0) {
                console.log('********** 아이디 [%s]가 일치하는 사용자 찾았습니다. 패스워드 비교 시작하겠습니다. **********', id);
                var salt = rows[0].u_salt;
                var u_pw = rows[0].u_pw;
                var userHashPass = crypto.createHash("sha512").update(password + salt).digest('hex');
                if (u_pw === userHashPass) {
                    console.log('********** 일치하는 사용자의 아이디는 ' + rows[0].u_id + '**********');
                    callback(null, rows);
                } else {
                    console.log('********** 비밀번호가 일치하지 않습니다. **********');
                }
            } else {
                console.log('********** 일치하는 사용자가 없습니다. **********');
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


// ============================= 로그아웃 function ============================//
var logout = function(req, res, callback) {
    if (req.session.user) {
        console.log('********** 로그아웃 되었습니다. ********** ');
        //세션 삭제 시에는 destroy 메소드 활용
        req.session.destroy(function(err) {
            if (err) {
                throw err;
            } //오류 발생시 처리
            console.log('********** 세션 삭제 성공. 로그아웃 되었습니다. ********** ');
            res.redirect('/public/index');

        });
    } else {
        console.log('********** 세션이 존재하지 않습니다. ********** ');
    }
};

//============================== 회원가입 function =================================//
var signup = function(req, res, callback) {
    var database = req.app.get('database');
    console.log('********** server-side signup 호출됨 **********');
    var paramId = req.body.u_id;
    var paramPw = req.body.u_pw;
    var paramName = req.body.u_name;
    var paramPhone = req.body.u_phone;
    var paramEmail = req.body.u_email;
    var paramJob = req.body.u_job;
    var paramSalary = req.body.u_salary;
    //아이디와 패스워드 받고 DB에 접근
    //database --> true : DB에 접근할 수 있는 상태
    if (database) {
        var axios = require('axios');
        addUser(database, paramId, paramPw, paramName, paramPhone, paramEmail, paramJob, paramSalary, function(err, result) {
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
                res.write('<h1>사용자 추가 실패</h1>');
                res.write("<br/><a href='/public/adduser.html'>다시 가입하기</a>");
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

// ============================= 사용자추가 function ============================//
var addUser = function(database, id, pwd, name, phone, email, job, salary, callback) {
    console.log('********** server-side addUser 호출됨 **********');
    var crypto = require('crypto');
    var salt = Math.round((new Date().valueOf() * Math.random())) + "";
    var password = pwd;
    var hashpass = crypto.createHash("sha512").update(password + salt).digest('hex');
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
            u_id: id,
            u_pw: hashpass,
            u_salt: salt,
            u_name: name,
            u_phone: phone,
            u_email: email,
            u_job: job,
            u_salary: salary
        };
        //conn 객체를 사용해서 sql 실행
        //set 모든 컬럼에 집어넣는 문법
        var exec = conn.query('insert into user set ?', data, function(err, result) {
            //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
            conn.release();
            console.log('********** 실행 sql : %s ********** ', exec.sql);
            if (err) {
                console.log('********** sql 수행 중 에러발생. ********** ');
                console.dir(err);
                callback(err, null);
                return;
            }
            callback(null, result);


            // res.redirect('/public/main.html');
            // res.end();

        });
        conn.on('error', function(err) {
            console.log('**********  데이터베이스 연결 시 에러 발생함 ********** ');
            console.dir(err);
            callback(err, null);
        });
    });
};

// ======================= 회원정보 출력 function =================== //
var showUser = function(database, req, res, callback) {
    console.log('********** server-side showUser 호출됨 **********');
    var u_num = ''; //vue에서 받아와야 함!!!
    u_num = req.body.u_num;
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
        var paramPw = req.body.u_pw;
        var paramName = req.body.u_name;
        var paramPhone = req.body.u_phone;
        var paramEmail = req.body.u_email;
        var paramJob = req.body.u_job;
        var paramSalary = req.body.u_salary;
        //conn 객체를 사용해서 sql 실행
        //set 모든 컬럼에 집어넣는 문법
        var exec = conn.query('select * from user where u_num=?', u_num, function(err, rows) {
            //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
            conn.release();
            console.log('********** 실행 sql : %s ********** ', exec.sql);
            if (err) {
                console.log('********** sql 수행 중 에러발생. ********** ');
                console.dir(err);
                callback(err, null);
                return;
            }
            callback(null, rows);
            // res.redirect('/public/main.html');
            // res.end();
        });
        conn.on('error', function(err) {
            console.log('**********  데이터베이스 연결 시 에러 발생함 ********** ');
            console.dir(err);
            callback(err, null);
        });
    });
};


// ========================= 회원정보 수정 function =================//

var editUser = function(database, req, res, callback) {
    console.log('********** server-side editUser 호출됨 **********');
    var u_num = ''; //vue에서 받아와야 함!!!
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
        var paramPw = req.body.u_pw;
        var paramName = req.body.u_name;
        var paramPhone = req.body.u_phone;
        var paramEmail = req.body.u_email;
        var paramJob = req.body.u_job;
        var paramSalary = req.body.u_salary;
        //conn 객체를 사용해서 sql 실행
        //set 모든 컬럼에 집어넣는 문법
        var exec = conn.query('update user set u_pw=?,u_salt=?,u_name=?,u_phone=?,u_email=?,u_job=?,u_salary=? where u_num=?',
            paramPw, paramName, pararmPhone, paramEmail, paramJob, paramSalary, u_num,
            function(err, result) {
                //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
                conn.release();
                console.log('********** 실행 sql : %s ********** ', exec.sql);
                if (err) {
                    console.log('********** sql 수행 중 에러발생. ********** ');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
                // res.redirect('/public/main.html');
                // res.end();
            });
        conn.on('error', function(err) {
            console.log('**********  데이터베이스 연결 시 에러 발생함 ********** ');
            console.dir(err);
            callback(err, null);
        });
    });
};

// ========================= 회원탈퇴 function =================//

var leaveUser = function(database, req, res, callback) {
    console.log('********** server-side leaveUser 호출됨 **********');
    var u_num = ''; //vue에서 받아와야 함!!!
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
        //conn 객체를 사용해서 sql 실행
        //set 모든 컬럼에 집어넣는 문법
        var exec = conn.query('delete from user where u_num = ?', u_num, function(err, result) {
            //쿼리 작업 수행 후 반드시 연결을 해제 해야 한다.
            conn.release();
            console.log('********** 실행 sql : %s ********** ', exec.sql);
            if (err) {
                console.log('********** sql 수행 중 에러발생. ********** ');
                console.dir(err);
                callback(err, null);
                return;
            }
            callback(null, result);
            // res.redirect('/public/main.html');
            // res.end();
        });
        conn.on('error', function(err) {
            console.log('**********  데이터베이스 연결 시 에러 발생함 ********** ');
            console.dir(err);
            callback(err, null);
        });
    });
};


//======================== 테스트 함수 ==========================//

var read_user_board = function(database, callback) {
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
        var sql = 'select * from user';
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

var loadContents = function(req, res) {
    //아이디와 패스워드 받고 dB에 접근
    //database --> true : DB에 접근 할 수 있는 상태
    var database = req.app.get('database');
    console.dir(database);
    // var paramPostNum = req.query.tmp_post_num;

    if (database) {
        read_user_board(database, function(err, rows) {

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
                console.dir(rows);
                console.log('하이루 리스트보여줄까~?');
                // data.msg = 'ok';
                data = rows;
                console.dir('서버측에서 리절트!' + data);
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

module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.singup = showUser;
module.exports.singup = editUser;
module.exports.singup = leaveUser;
module.exports.loadContents = loadContents;