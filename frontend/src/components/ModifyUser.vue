<template>

<div class="table-users" id="register" style="width:1000px; display:inline-block; margin-top:200px">
    <navi></navi>
    <br>
    <h3>회원정보 수정</h3>
     <br>
      <img src="img/invoice.png" style="height:200px; margin-bottom:50px">
      <br><br>
      <div class="form-group" style=" margin-right:10px">
        <p class="text-left" style="margin-left:20px;display:inline-block">아이디 </p>
        <input type="text" style="width:790px; margin-left:28px;display:inline-block" placeholder="아이디" v-model="u_id" class="form-control" name="u_id" disabled>
      </div>
      <!-- <div class="form-group">
        <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
      </div> -->
      <div class="form-group">
        <p class="text-left" style="margin-left:20px; display:inline-block">이름 </p>
        <input type="text" style="width:790px; margin-left:30px;display:inline-block" placeholder="이름" v-model="u_name" class="form-control" name="u_name" disabled>
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:-12px;display:inline-block">휴대폰 번호 </p>
        <input type="text" style="width:790px; margin-left:10px;display:inline-block" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px;display:inline-block">이메일 </p>
        <input type="email" style="width:790px; margin-left:19px;display:inline-block" placeholder="이메일" v-model="u_email" class="form-control" name="u_email">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px;display:inline-block">직업 </p>
        <input type="text" style="width:790px; margin-left:30px;display:inline-block" placeholder="직업" v-model="u_job" class="form-control" name="u_job">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px;display:inline-block">연봉</p>
        <input type="number" style="width:790px; margin-left:30px;display:inline-block" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary">
      </div>
      <br><br>
      <button @click.prevent="modifyUser" class="btn" style="width:200px; background-color:#327a81; color:white; font-weight:bold; margin-right:50px;">수 정</button>
      <button @click.prevent="deleteAccount" class="btn" style="width:200px; background-color:red; color:white; font-weight:bold">탈퇴</button>
      
      <br><br><br>
      <!-- <famous :stories="stories"></famous> -->
      <!-- <famous></famous> -->
    </div>
</template>

<script>
import axios from 'axios'
import Navi from './Navi.vue'


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
      // var pwd = this.u_pw;
      var name = this.u_name;
      var phone = this.u_phone;
      var email = this.u_email;
      var job = this.u_job;
      var salary = this.u_salary;
      var num = this.$session.get('session');
      console.log('폰 샘플데이터 '+phone)
      axios({
          method: 'post',
          url: 'api/user/modifyUser',
          data: {
            u_num: num,
            u_name: name,
            u_phone: phone,
            u_email: email,
            u_job: job,
            u_salary: salary
          }
        }).then(function(response) {
          console.log('********** 회원정보 수정 **********');
          alert('회원정보 수정이 완료되었습니다');
          setTimeout("window.location.href = './'",0)
      })
    },
    deleteAccount(){
      var num = this.$session.get('session');
      var self = this;
      if(confirm('정말 탈퇴하시겠습니까?')){
         axios({
          method: 'post',
          url: 'api/user/delete_account',
          data: {
            u_num: num,
          }
        }).then(function(response) {
          console.log('********** 회원탈퇴 완료**********');
          alert('회원탈퇴 완료!');
          self.$session.destroy();
          console.log('세션 확인' + self.$session.get('session'));
          setTimeout("window.location.href = './'",0)
          })        
      }
         
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
          // setTimeout("window.location.href = './modifyUser'",0)
      })
  }
}
</script>
<style scoped>
      .box-container{
                  border-style: solid;
                  border-width: 2px;
                  padding: 10px;
              }
              .table-header{
                  font-size: 20px;
                  font-weight: bold;
              }

              body {
                  background-color: #fafafa;
              }

              body * {
                  box-sizing: border-box;
              }

              .header {
                  background-color: #fafafa;
                  color: #fafafa;
                  font-size: 1.5em;
                  padding: 1rem;
                  text-align: center;
                  text-transform: uppercase;
              }

              .table-users {
                  border: 1px solid #fafafa;
                  border-radius: 10px;
                  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
                  max-width: calc(100% - 2em);
                  margin: 1em auto;
                  overflow: hidden;
                  width: 800px;
                  background-color: #FAFAFA
              }

              .table-users {
                      border: none;
                      box-shadow: none;
                      overflow: visible;
                  }
              
              input::-webkit-input-placeholder {
                  color: #2C3E50;
              }
</style>
