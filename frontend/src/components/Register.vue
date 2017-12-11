<template>

<div class="table-users" id="register" style="width:1000px; display:inline-block; margin-top:200px">
    <navi></navi>
    <div class="header">회원가입</div>
    <br>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="아이디" v-model="u_id" class="form-control" name="u_id" id="u_id">
      </div>
      <div class="form-group">
        <input type="password" style="width:930px; margin-left:30px" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw" id="u_pw">
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="이름" v-model="u_name" class="form-control" name="u_name" id="u_name">
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone" id="u_phone">
      </div>
      <div class="form-group">
        <input type="email" style="width:930px; margin-left:30px" placeholder="이메일" v-model="u_email" class="form-control" name="u_email" id="u_email">
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="직업" v-model="u_job" class="form-control" name="u_job" id="u_job">
      </div>
      <div class="form-group">
        <input type="number" style="width:930px; margin-left:30px" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary" id="u_salary">
      </div>
      <button @click.prevent="addUser" class="btn" style="width:200px; background-color:#327a81; color:white; font-weight:bold">가입</button>
      <br><br>
      <!-- <famous :stories="stories"></famous> -->
      <!-- <famous></famous> -->
    </div>
</div>
</template>
<!-- jQuery (부트스트랩의 자바스크립트 플러그인을 위해 필요한) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- 모든 합쳐진 플러그인을 포함하거나 (아래) 필요한 각각의 파일들을 포함하세요 -->
<!-- Respond.js 으로 IE8 에서 반응형 기능을 활성화하세요 (https://github.com/scottjehl/Respond) -->
<script src="/resources/bootstrap/js/respond.js"></script>
<script>
import axios from 'axios'
import Navi from './Navi.vue'
import ajax from 'ajax'

// $(document).ready(function() {
// $(function() {
//   //#id에서 포커스가 벗어나면
//   $("#u_id").blur(function() {
//     //userInput에 들어 있는 내용을 토대로
//     // querystring 생성
//     var userInput = $(this);
//     var param = $(userInput).serialize();
//     console.log(param);
//     //ajax 통신 시작
//     $.ajax({
//       url: '/api/user/user_dup_check',
//       data: param,
//       dataType: 'json',
//       type: 'get',
//       success: function(data) {
//         if (data.msg === 'ok') {
//           $(userInput).css('border', '1px solid green');
//         } else {
//           $(userInput).css('border', '1px solid red');
//           window.alert('이미 사용중인 아이디입니다.');
//         }
//       }
//     });
//   });
// });

export default {
  data: function() {
    return {
      u_id: '',
      u_pw: '',
      u_name: '',
      u_phone: '',
      u_email: '',
      u_job: '',
      u_salary: ''
    }
  },
  components: {
    Navi
  },
  methods: {
    addUser() {
      console.log('********** front-end addUser 호출 **********');
      var id = this.u_id;
      var pw = this.u_pw;
      var name = this.u_name;
      var phone = this.u_phone;
      var email = this.u_email;
      var job = this.u_job;
      var salary = this.u_salary;
      if (name == '' || pw == '') {
        this.errinfo = '';
        this.classFade = ''
      } else {
        axios({
          method: 'post',
          url: 'api/user/signup',
          data: {
            u_id: id,
            u_pw: pw,
            u_name: name,
            u_phone: phone,
            u_email: email,
            u_job: job,
            u_salary: salary
          }
        }).then(function(response) {
          if(response.data.error){
            alert('중복된 아이디가 있습니다.');
          }
          console.log('********** 회원가입완료 **********');
          alert('회원가입이 완료되었습니다');
          setTimeout("window.location.href = './login'",1000)
        })
      }
    }
  },
  // props:['stories'],
  created() {
    console.log('register')
  }
}
</script>

<style scoped>
body {
    background-color: #91ced4;
}

body * {
    box-sizing: border-box;
}

.header {
    background-color: #327a81;
    color: white;
    font-size: 1.5em;
    padding: 1rem;
    text-align: center;
    text-transform: uppercase;
}

.table-users {
    border: 1px solid #327a81;
    border-radius: 10px;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
    max-width: calc(100% - 2em);
    margin: 1em auto;
    overflow: hidden;
    width: 800px;
}

table {
    width: 100%;
}

table td,
table th {
    color: #2b686e;
    padding: 10px;
    font-weight: bold;
}

table td {
    text-align: center;
    vertical-align: middle;
}

table td:last-child {
    font-size: 0.95em;
    line-height: 1.4;
    text-align: left;
}

table th {
    background-color: #daeff1;
    font-weight: bold;
}

table tr:nth-child(2n) {
    background-color: white;
}

table tr:nth-child(2n+1) {
    background-color: #edf7f8;
}

@media screen and (max-width: 700px) {
    table,
    tr,
    td {
        display: block;
    }
    td:first-child {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 100px;
    }
    td:not(:first-child) {
        clear: both;
        margin-left: 100px;
        padding: 4px 20px 4px 90px;
        position: relative;
        text-align: left;
    }
    td:not(:first-child):before {
        color: #91ced4;
        content: '';
        display: block;
        left: 0;
        position: absolute;
    }
    td:nth-child(2):before {
        content: 'Name:';
    }
    td:nth-child(3):before {
        content: 'Email:';
    }
    td:nth-child(4):before {
        content: 'Phone:';
    }
    td:nth-child(5):before {
        content: 'Comments:';
    }
    tr {
        padding: 10px 0;
        position: relative;
    }
    tr:first-child {
        display: none;
    }
}

@media screen and (max-width: 500px) {
    .header {
        background-color: transparent;
        color: white;
        font-size: 2em;
        font-weight: 700;
        padding: 0;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    td:first-child {
        background-color: #c8e7ea;
        border-bottom: 1px solid #91ced4;
        border-radius: 10px 10px 0 0;
        position: relative;
        top: 0;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        width: 100%;
    }
    td:not(:first-child) {
        margin: 0;
        padding: 5px 1em;
        width: 100%;
    }
    td:not(:first-child):before {
        font-size: .8em;
        padding-top: 0.3em;
        position: relative;
    }
    td:last-child {
        padding-bottom: 1rem !important;
    }
    tr {
        background-color: white !important;
        border: 1px solid #6cbec6;
        border-radius: 10px;
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
        margin: 0.5rem 0;
        padding: 0;
    }
    .table-users {
        border: none;
        box-shadow: none;
        overflow: visible;
    }
}
</style>