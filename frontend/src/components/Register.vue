<template>
<div class="table-users" id="register" style="width:1000px; display:inline-block; margin-top:200px">
    <!-- Navi import -->
    <navi></navi>
    <!-- 회원가입 form -->
      <h3>회원가입</h3><br>
      <img src="img/invoice.png" style="height:200px; margin-bottom:50px">
    <br>
      <div class="form-group" style=" margin-right:10px">
        <input type="text" style="width:830px; display:inline-block;" placeholder="아이디" v-model="u_id" class="form-control" name="u_id" id="u_id" >
        <button @click.prevent="dupCheck" class="btn" style="background-color:#327a81; color:white; font-weight:bold">중복 체크</button>
      </div>
      <div class="form-group">
        <input type="password" style="width:930px; margin-left:30px" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw" id="u_pw">
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="이름" v-model="u_name" class="form-control" name="u_name" id="u_name">
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="나이" v-model="u_age" class="form-control" name="u_age" id="u_age">
      </div>
      <div class="form-group">
        <select v-model="u_gender" class="form-control" name="u_gender" id="u_gender" style="width:930px; margin-left:30px" placeholder="성별">
        <option value="">성별 선택</option>
        <option value="1">남자</option>
        <option value="2">여자</option>
        </select>
      </div>
      <div class="form-group">
        <input type="text" style="width:930px; margin-left:30px" placeholder="휴대폰번호" v-model="u_phone" class="form-control" name="u_phone" id="u_phone">
      </div>
      <div class="form-group">
        <input type="email" style="width:930px; margin-left:30px" placeholder="이메일" v-model="u_email" class="form-control" name="u_email" id="u_email">
      </div>
      <div class="form-group">
        <select v-model="u_job" class="form-control" name="u_job" id="u_job" style="width:930px; margin-left:30px" placeholder="직업">
        <option value="">직업 선택</option>
        <option value="회사원">회사원</option>
        <option value="자영업자">자영업자</option>
        <option value="농축산업자">농축산업자</option>
        <option value="공무원">공무원</option>
        <option value="학생">학생</option>
        <option value="주부">주부</option>
        <option value="기타">기타</option>
        </select>
      </div>
      <div class="form-group">
        <input type="number" style="width:930px; margin-left:30px" placeholder="연봉" v-model="u_salary" class="form-control" name="u_salary" id="u_salary">
      </div>
      <button @click.prevent="addUser" class="btn" style="width:300px; background-color:#327a81; color:white; font-weight:bold">가입</button>
      <br><br>
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

export default {
  data: function() {
    return {
      u_id: '',
      u_pw: '',
      u_name: '',
      u_age: '',
      u_gender: '',
      u_phone: '',
      u_email: '',
      u_job: '',
      u_salary: '',
      dup_chk : -1
    }
  },
  components: {
    Navi
  },
  methods: {
    //가입버튼 클릭시 실행되는 메소드
    addUser() {
      console.log('********** front-end addUser 호출 **********');
      var id = this.u_id;
      var pw = this.u_pw;
      var name = this.u_name;
      var age = this.u_age;
      var gender = this.u_gender;
      var phone = this.u_phone;
      var email = this.u_email;
      var job = this.u_job;
      var salary = this.u_salary;
      //빈 값이 입력되면 alert창 처리와 중복ID 체크.
      if(job<=0 || id.length==0 || pw.length==0 || name.length==0 || age.length==0 || gender.length==0 || phone.length==0 || email.length==0 || salary<=0){
        alert('필수항목을 입력하세요');
      }else if(this.dup_chk==true) {
        alert('중복된 아이디가 있습니다.');
        this.dup_chk=-1;
      }else if(this.dup_chk==-1){
        alert('아이디 중복 체크를 해주세요');
      }
      //필수항목 입력, 아이디 중복체크 O , 중복아이디 X
      else if(this.dup_chk==false) {
        //DB에 회원가입 정보 추가
        axios({
          method: 'post',
          url: 'api/user/signup',
          data: {
            u_id: id,
            u_pw: pw,
            u_name: name,
            u_age: age,
            u_gender: gender,
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
          setTimeout("window.location.href = './login'",0)
        })
      }
    },
    //중복 ID 체크하는 메소드.
    dupCheck() {
      console.log('********** front-end dupCheck() 호출 **********');
      var id = this.u_id;
      var self = this;
      if(id.length>0){
      axios({
          method: 'post',
          url: 'api/user/dup_check',
          data: {
            u_id: id,
          }
        }).then(function(response) {
          if(response.data.dup_check==true){
            alert('중복된 아이디가 있습니다.');
            self.dup_chk = response.data.dup_check;
          }else if(response.data.dup_check==false){
            alert('중복된 아이디가 없습니다.');
            self.dup_chk = response.data.dup_check;
          }
        })
      }else{
        alert('아이디를 입력하세요');
      }
    }
  },
  created() {
    console.log('Register.vue created()')
  }
}
</script>
<!-- Vue Style을 위한 CSS -->
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
