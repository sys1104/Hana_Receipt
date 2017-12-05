<template>

<div class="container">
    <navi></navi>
    <div id="register" style="width:300px; display:inline-block; margin-top:200px">

      <h2>회원가입</h2>
      <div class="form-group">
        <input type="text" placeholder="아이디" v-model="u_id" class="form-control" name="u_id" id="u_id">
      </div>
      <div class="form-group">
        <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw" id="u_pw">
      </div>
      <div class="form-group">
        <input type="text" placeholder="이름" v-model="u_name" class="form-control" name="u_name" id="u_name">
      </div>
      <div class="form-group">
        <input type="text" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone" id="u_phone">
      </div>
      <div class="form-group">
        <input type="email" placeholder="이메일" v-model="u_email" class="form-control" name="u_email" id="u_email">
      </div>
      <div class="form-group">
        <input type="text" placeholder="직업" v-model="u_job" class="form-control" name="u_job" id="u_job">
      </div>
      <div class="form-group">
        <input type="number" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary" id="u_salary">
      </div>
      <button @click.prevent="addUser" class="btn btn-success">가입</button>
      <!-- <famous :stories="stories"></famous> -->
      <!-- <famous></famous> -->
    </div>
</div>
</template>
<!-- jQuery (부트스트랩의 자바스크립트 플러그인을 위해 필요한) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- 모든 합쳐진 플러그인을 포함하거나 (아래) 필요한 각각의 파일들을 포함하세요 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<!-- Respond.js 으로 IE8 에서 반응형 기능을 활성화하세요 (https://github.com/scottjehl/Respond) -->
<script src="/resources/bootstrap/js/respond.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script>
import axios from 'axios'
import Navi from './Navi.vue'

// $(document).ready(function() {
//   //#id에서 포커스가 벗어나면
//   $("#u_id").blur(function() {
//     //userInput에 들어 있는 내용을 토대로
//     // querystring 생성
//     var userInput = $(this);
//     var param = $(userInput).serialize();
//     console.log(param);
//     //ajax 통신 시작
//     $.ajax({
//       url: '/api/user/dup-check',
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
      var pwd = this.u_pw;
      var name = this.u_name;
      var phone = this.u_phone;
      var email = this.u_email;
      var job = this.u_job;
      var salary = this.u_salary;
      if (name == '' || pwd == '') {
        this.errinfo = '';
        this.classFade = ''
      } else {
        axios({
          method: 'post',
          url: 'api/user/signup',
          data: {
            u_id: id,
            u_pwd: pwd,
            u_name: name,
            u_phone: phone,
            u_email: email,
            u_job: job,
            u_salary: salary
          }
        }).then(function(response) {
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
