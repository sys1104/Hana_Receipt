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
    <button @click="login" style="width:300px; font-size:20px; margin-top:50px; margin-bottom:20px" class="btn btn-primary">Log in</button>
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
        .table-color{
            background-color: lightgrey;
        }

        body {
            background-color: #327a81;
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
            border: 1px solid #DADADA;
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
            font-weight: 300;
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