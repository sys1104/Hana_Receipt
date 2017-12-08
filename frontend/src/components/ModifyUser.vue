<template>

<div class="table-users" id="register" style="width:1000px; display:inline-block; margin-top:200px">
    <navi></navi>
      <div class="header">회원정보 수정</div>
      <br>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">아이디 </p>
        <input type="text" style="width:780px; margin-left:10px" placeholder="아이디" v-model="u_id" class="form-control" name="u_id" disabled>
      </div>
      <!-- <div class="form-group">
        <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
      </div> -->
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">이름 </p>
        <input type="text" style="width:780px; margin-left:10px" placeholder="이름" v-model="u_name" class="form-control" name="u_name" disabled>
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">휴대폰 번호 </p>
        <input type="text" style="width:780px; margin-left:10px" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">이메일 </p>
        <input type="email" style="width:780px; margin-left:10px" placeholder="이메일" v-model="u_email" class="form-control" name="u_email">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">직업 </p>
        <input type="text" style="width:780px; margin-left:10px" placeholder="직업" v-model="u_job" class="form-control" name="u_job">
      </div>
      <div class="form-group">
        <p class="text-left" style="margin-left:20px">연봉</p>
        <input type="number" style="width:780px; margin-left:10px" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary">
      </div>
      <br>
      <button @click.prevent="modifyUser" class="btn" style="width:200px; background-color:#327a81; color:white; font-weight:bold">수 정</button>
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
