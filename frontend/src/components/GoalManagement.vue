<template>
  <!-- <div id="insertGoal" class="table-users" style="margin-top:150px">
      <navi></navi>
  <div class="header">목표 관리</div>
  <br>
  <div class="container">
    <wasted></wasted>
    <div class="col-md-10; table-users">
    <div class="header">목표 저장하기</div>
    <div class="form-group">
      <select v-model="cate_num" class="form-control" name="cate_num">
        <option value="1">생활/쇼핑</option>
        <option value="2">교통</option>
        <option value="3">식비</option>
        <option value="4">패션/미용</option>
        <option value="5">주거/통신</option>
        <option value="6">미분류</option>
       </select>
    </div>
    <div class="form-group">
      <input type="text" placeholder="목표기간" v-model="g_time" class="form-control" name="g_time"> -->
<div id="insertGoal" class="table-users" style="width:1000px; margin-top:180px">
  <navi></navi>
  <div class="header">목표 관리</div>
    <br>
    <wasted></wasted>
    <br>
    <goal-list></goal-list>
    <br>
    <div class="header">목표 저장</div>
    <br>
    <!-- class="row" 추가 -->
    <div class="form-group" v-if="flag==false">
      <div v-if="info0==false" class="form-group" style="width:20%;">
        <label class="form-control">목표기간</label>
        <!-- <input type="hidden" v-model="cate_num" class="form-control" value="1" name="cate_num"> -->
      </div>
      <div v-if="info0==false" class="form-group" style="width:30%">
        <input type="text" placeholder="시작날짜" v-model="g_time" class="form-control" name="g_time">
      </div>
      <div v-if="info0==false" class="form-group" style="width:30%">
        <input type="text" placeholder="마지막날짜" v-model="g_endtime" class="form-control" name="g_endtime">
      </div>
<!-- results1[0]!=cate_num.cate_num1 && results1[1]!=cate_num.cate_num1 && results1[2]!=cate_num.cate_num1 && results1[3]!=cate_num.cate_num1 &&results1[4]!=cate_num.cate_num1 && results1[5]!=cate_num.cate_num1 -->
      <div v-if="info1==false"class="form-group" style="width:30%">
        <label class="form-control">생활/쇼핑</label>
        <input type="hidden" v-model="cate_num.cate_num1" class="form-control" value="1" name="cate_num1">
      </div>
      <div v-if="info1==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price1" class="form-control" name="g_price1">
      </div>

      <div v-if="info2==false"class="form-group" style="width:30%">
        <label class="form-control">교통</label>
        <input type="hidden" v-model="cate_num.cate_num2" class="form-control" value="2" name="cate_num2">
      </div>
      <div v-if="info2==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price2" class="form-control" name="g_price2">
      </div>

      <div v-if="info3==false"class="form-group" style="width:30%">
        <label class="form-control">식비</label>
        <input type="hidden" v-model="cate_num.cate_num3" class="form-control" value="3" name="cate_num3">
      </div>
      <div v-if="info3==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price3" class="form-control" name="g_price3">
      </div>

      <div v-if="info4==false"class="form-group" style="width:30%">
        <label class="form-control">패션/미용</label>
        <input type="hidden" v-model="cate_num.cate_num4" class="form-control" value="4" name="cate_num4">
      </div>
      <div v-if="info4==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price4" class="form-control" name="g_price4">
      </div>

      <div v-if="info5==false"class="form-group" style="width:30%">
        <label class="form-control">주거/통신</label>
        <input type="hidden" v-model="cate_num.cate_num5" class="form-control" value="5" name="cate_num5">
      </div>
      <div v-if="info5==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price5" class="form-control" name="g_price5">
      </div>

      <div v-if="info6==false"class="form-group" style="width:30%">
        <label class="form-control">미분류</label>
        <input type="hidden" v-model="cate_num.cate_num6" class="form-control" value="6" name="cate_num6">
      </div>
      <div v-if="info6==false"class="form-group" style="width:50%">
        <input type="text" placeholder="목표금액" v-model="g_price.g_price6" class="form-control" name="g_price6">
      </div>
    </div>
    <button @click.prevent="goalStore" class="btn btn-success">저장</button>
  </div>
</div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import Login from './Login.vue'
import Wasted from './Wasted.vue'
import InsertGoal from './InsertGoal.vue'
import Navi from './Navi.vue'
import GoalList from './GoalList.vue'
export default {
  data: function() {
    return {
      flag:false,
      info0:false,
      info1:false,
      info2:false,
      info3:false,
      info4:false,
      info5:false,
      info6:false,
      results:'',
      results1:[],
      resultsEnd:'',
      resultsStart:'',
      u_num:'',
      g_num:'',
      cate_num: {
        cate_num1:1,
        cate_num2:2,
        cate_num3:3,
        cate_num4:4,
        cate_num5:5,
        cate_num6:6,
      },
      g_time: '',
      g_endtime:'',
      g_price: {
        g_price1:'',
        g_price2:'',
        g_price3:'',
        g_price4:'',
        g_price5:'',
        g_price6:'',
      },
    }
  },
  components: {
    Wasted,
    Navi,
    InsertGoal,
    GoalList
  },
  methods: {
    showGoal(){
      if(this.results1.length > 0){
        this.info0 = true;
      }
      for(var j=0; j < this.results1.length; j++){
        if(this.cate_num.cate_num1 == this.results1[j]){
          this.info1 = true;
        }
        if(this.cate_num.cate_num2 == this.results1[j]){
          this.info2 = true;
        }
        if(this.cate_num.cate_num3 == this.results1[j]){
          this.info3 = true;
        }
        if(this.cate_num.cate_num4 == this.results1[j]){
          this.info4 = true;
        }
        if(this.cate_num.cate_num5 == this.results1[j]){
          this.info5 = true;
        }
        if(this.cate_num.cate_num6 == this.results1[j]){
          this.info6 = true;
        }
      }
    },
    goalStore() {
      console.log('********** front-end goalStore 호출 **********');
      var u_num = this.u_num;
      var cate_num = [];
      var g_price = [];
      if(this.info0 == true){
        var g_time = this.resultsStart;
        var g_endtime = this.resultsEnd;
      }else{
        var g_time = this.g_time;
        var g_endtime = this.g_endtime;
      }
      if(!(this.g_price.g_price1=='')){
        cate_num.push(this.cate_num.cate_num1);
        g_price.push(this.g_price.g_price1);
      }
      if(!(this.g_price.g_price2=='')){
        cate_num.push(this.cate_num.cate_num2);
        g_price.push(this.g_price.g_price2);
      }
      if(!(this.g_price.g_price3=='')){
        cate_num.push(this.cate_num.cate_num3);
        g_price.push(this.g_price.g_price3);
      }
      if(!(this.g_price.g_price4=='')){
        cate_num.push(this.cate_num.cate_num4);
        g_price.push(this.g_price.g_price4);
      }
      if(!(this.g_price.g_price5=='')){
        cate_num.push(this.cate_num.cate_num5);
        g_price.push(this.g_price.g_price5);
      }
      if(!(this.g_price.g_price6=='')){
        cate_num.push(this.cate_num.cate_num6);
        g_price.push(this.g_price.g_price6);
      }

        axios({
          method: 'post',
          url: 'api/goal/save_goal',
          data: {
            u_num:this.$session.get('session'),
            cate_num: cate_num,
            g_time: g_time,
            g_endtime: g_endtime,
            g_price: g_price
          }
        }).then(function(response) {
          console.log('********** 목표내역 저장완료 **********');
          alert('목표내역 저장 완료되었습니다');
          setTimeout("window.location.href = './goal_management'",1000)
        })
    },
      getToday(){
        console.log('getToday!')
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
          dd='0'+dd
        }
        if(mm<10) {
          mm='0'+mm
        }
        console.log(yyyy + '-'+ mm + '-' + dd);
        this.g_time = yyyy + '-'+ mm + '-' + dd;
      }

  },

  created(){
    console.log('GoalManagement created()')

    var self  = this;

    axios({
    method: 'post',
    url: 'api/goal/request_goal',
    data:{
      u_num:this.$session.get('session')
    }
  }).then(function (response) {
        self.results = response.data;
        self.list_total = Number(response.data.length);
        self.resultsStart = self.results[0].g_time;
        self.resultsEnd = self.results[0].g_endtime;
        for(var i=0;i<self.results.length;i++){
          self.results1.push(self.results[i].cate_num);
        }
        console.log('********** 골매니지먼트에서 호출한 목표 리스트 **********');
        self.showGoal();
      })

    this.getToday();

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
    .table-color{
        background-color: lightgrey;
    }

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
