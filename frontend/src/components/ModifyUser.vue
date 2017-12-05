<template>

<div class="container">
    <navi></navi>
    <div id="register" style="width:300px; display:inline-block; margin-top:200px">
      
      <h2>회원정보 수정</h2>
      <div class="form-group">
        <p class="text-left">아이디 </p>
        <input type="text" placeholder="아이디" v-model="u_id" class="form-control" name="u_id">
      </div>
      <!-- <div class="form-group">
        <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
      </div> -->
      <div class="form-group">
        <p class="text-left">이름 </p>
        <input type="text" placeholder="이름" v-model="u_name" class="form-control" name="u_name">
      </div>
      <div class="form-group">
        <p class="text-left">휴대폰 번호 </p>
        <input type="text" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone">
      </div>
      <div class="form-group">
        <p class="text-left">이메일 </p>
        <input type="email" placeholder="이메일" v-model="u_email" class="form-control" name="u_email">
      </div>
      <div class="form-group">
        <p class="text-left">직업 </p>
        <input type="text" placeholder="직업" v-model="u_job" class="form-control" name="u_job">
      </div>
      <div class="form-group">
        <p class="text-left">연봉</p>
        <input type="number" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary">
      </div>
      <button @click.prevent="modifyUser" class="btn btn-success">수정</button>
      <!-- <famous :stories="stories"></famous> -->
      <!-- <famous></famous> -->
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Navi from './Navi.vue'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)

export default {
  data: function() {
    return {
      u_num: '',
      u_id: '',
      u_pw: '',
      u_name: '',
      u_phone: '',
      u_email: '',
      u_job: '',
      u_salary: '',
      result : '',
    }
  },
  components: {
    Navi
  },
  methods: {
    getUserInfo() {
        
    }, 
    modifyUser() {
      console.log('********** front-end modifyUser 호출 **********');
      // var id = this.u_id;
      // var pwd = this.u_pw;
      // var name = this.u_name;
      var phone = this.u_phone;
      var email = this.u_email;
      var job = this.u_job;
      var salary = this.u_salary;
      var num = this.$session.get('session');
      console.log('연봉 샘플데이터 '+salary)
      axios({
          method: 'post',
          url: 'api/user/modifyUser',
          data: {
            u_num: num,
            // u_id: id,
            // u_name: name,
            u_phone: phone,
            u_email: email,
            u_job: job,
            u_salary: salary
          }
        }).then(function(response) {
          console.log('********** 회원정보 수정 **********');
          alert('회원정보 수정이 완료되었습니다');
          setTimeout("window.location.href = './'",1000)
      })
    }
  },
  // props:['stories'],
  created() {
    var self = this;
    // this.u_id = self.result[0];
    // this.u_name = '송영수'
    if (!this.$session.exists()) {
        console.log('세션 없음');
        }else{
        console.log('세션 있음')
        // this.u_num = this.$session.getAll();
        console.log('세션 값 확인 '+ this.$session.get('session'))

        }
      axios({
          method: 'post',
          url: 'api/user/showUser',
          data: {
            u_num: this.$session.get('session'),

          }
      }).then(function(response) {
          console.log('********** showUser 응답 받음 **********');
          console.log(response.data);
          self.u_id = response.data[0].u_id
          self.u_name = response.data[0].u_name
          self.u_phone = response.data[0].u_phone
          self.u_email = response.data[0].u_email
          self.u_job = response.data[0].u_job
          self.u_salary = response.data[0].u_salary
          

          // this.u_id = response.data.u_id;
          
          // response.data.u_name = this.u_name;
          // setTimeout("window.location.href = './modifyUser'",1000)
      })    
  }
}
</script>
