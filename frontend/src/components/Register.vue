<template>
<div id="register" style="width:300px; display:inline-block;">
  <h2>회원가입</h2>
  <div class="form-group">
    <input type="text" placeholder="아이디" v-model="u_id" class="form-control" name="u_id">
  </div>
  <div class="form-group">
    <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
  </div>
  <div class="form-group">
    <input type="text" placeholder="이름" v-model="u_name" class="form-control" name="u_name">
  </div>
  <div class="form-group">
    <input type="text" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone">
  </div>
  <div class="form-group">
    <input type="email" placeholder="이메일" v-model="u_email" class="form-control" name="u_email">
  </div>
  <div class="form-group">
    <input type="text" placeholder="직업" v-model="u_job" class="form-control" name="u_job">
  </div>
  <div class="form-group">
    <input type="number" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary">
  </div>
  <button @click.prevent="addUser" class="btn btn-success">가입</button>
  <!-- <famous :stories="stories"></famous> -->
  <!-- <famous></famous> -->
</div>
</template>

<script>
import axios from 'axios'
import Famous from './Famous.vue'
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
    Famous
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
