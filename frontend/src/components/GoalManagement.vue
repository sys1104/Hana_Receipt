<template>
<div id="insertGoal">
  <navi></navi>
  <div class="container" style="display:inline-block">
    <wasted></wasted>
    <goal-list></goal-list>
    <h2>목표 저장하기</h2>
    <!-- class="row" 추가 -->
    <div class="row" v-if="flag==false">
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
</style>
