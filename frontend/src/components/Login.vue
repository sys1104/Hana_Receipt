<template>
<div class="col-md-10" id="login" style="width:300px; display:inline-block;">
  <h2>로그인</h2>
  <div class="form-group form-horizontal">
    <input type="text" placeholder="아이디" v-model="u_id" class="form-control" name="u_id">
  </div>
  <div class="form-group">
    <input type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
  </div>
  <button @click="login" class="btn btn-primary">로그인</button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      u_id: '',
      u_pw: ''
    }
  },
  methods: {
    login() {
      console.log('********** front-end login 호출 **********');
      var id = this.u_id;
      var pw = this.u_pw;
      if (id == '' || pw == '') {
        this.errinfo = '';
        this.classFade = '';
      } else {
        axios({
          method: 'post',
          url: 'api/user/login',
          data: {
            u_id: id,
            u_pw: pw
          }
        }).then(function(response) {
          console.log('********** 로그인완료 **********');
          alert('로그인 성공');
        })
      }
    }
  },
  created() {
    console.log('login')
  }
}
</script>
