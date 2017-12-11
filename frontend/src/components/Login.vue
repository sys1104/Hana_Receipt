<template>
<div id="login" class="table-users" style="margin-top:200px">
  <navi></navi>
      <br><br>
      <img src="img/invoice.png" style="height:200px">
      <br><br><p style="color:black; font-weight:bold; font-size:30px">Welcome to Hana Receipt</p><br>
    <div class="form-group form-horizontal" style="margin-left:50px;width:650px">
      <input @keydown.enter="login" type="text" placeholder="아이디" v-model="u_id" class="form-control fui-user" name="u_id">
    </div>
    <div class="form-group" style="margin-left:50px;width:650px">
      <input @keydown.enter="login" type="password" placeholder="패스워드" v-model="u_pw" class="form-control" name="u_pw">
    </div>
    <button @click="login" style="width:300px; font-size:20px; margin-top:50px; margin-bottom:20px" class="btn btn-success">Log in</button>
  </div>
</template>

<script>
import axios from 'axios'
import Navi from './Navi.vue'
export default {
  data: function() {
    return {
      u_id: '',
      u_pw: '',
      u_num : '',
    }
  },  
  components: {
    Navi
  },
  methods: {
    login() {
      if(this.u_id.length<=0 || this.u_pw.length<=0){
        alert('아이디 또는 비밀번호를 입력하세요')
      }else{
        var self = this;
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
            // console.log('리스폰스옴')
            // console.log(response.data.u_id);
            if(response.data.u_id==self.u_id){
              console.log('********** 로그인완료 **********');
              self.result = response.data;
              console.log(self.result);
              self.$session.start()
              self.$session.set('session',self.result.u_num)
              console.log('세션 만듦')
              console.log('세션 값 확인 '+ self.$session.get('session'))
              setTimeout("window.location.href = './'",0)
            }else{
              alert('아이디 또는 비밀번호를 확인하세요')
            }
          })
        }      
      }

    } //login


  },
  created() {
    console.log('login')
  },
  mounted() {

  }
}
</script>
<style>
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
            background-color: white;
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
            border: 1px solid lightgrey;
            border-radius: 10px;
            box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
            max-width: calc(100% - 2em);
            margin: 1em auto;
            overflow: hidden;
            width: 800px;
            background-color: #1ABC9C
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