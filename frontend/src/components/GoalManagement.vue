<template>
<div id="insertGoal" class="table-users" style="width:1000px; margin-top:180px">
  <navi></navi>
  <div class="header">목표 관리</div>
  <br>
  <!-- 지난 목표기간동안 낭비된 내역 import -->
  <wasted></wasted>
  <br>
  <!-- 설정한 목표 리스트 import -->
  <goal-list></goal-list>
  <br>
  <div class="table-users" style="width:100%">
    <div class="header">목표 저장</div>
    <br>

    <!-- 목표 저장 form -->
    <div class="form-group" v-if="flag==false">
      <div v-if="info0==false" class="form-group" style="width:35%;">
        <label class="form-control">목표기간</label>
      </div>
      <div v-if="info0==false" class="form-group" style="width:23%">
        <input type="date" placeholder="시작날짜" v-model="g_time" class="form-control" name="g_time" style="text-align:center">
      </div>
      <div v-if="info0==false" class="form-group" style="width:3%">
        <p style="font-size:30px; margin-top:15px">~</p>
      </div>
      <div v-if="info0==false" class="form-group" style="width:23%; margin-top:-30px">
        <button @click="week()" class="btn ab c">일주일 후</button>
        <button @click="month()" class="btn ab c">한달 후</button>
        <input type="date" placeholder="마지막날짜" v-model="g_endtime" class="form-control" name="g_endtime" style="text-align:center">
      </div>

      <div v-if="info1==false" class="form-group" style="width:35%">
        <label class="form-control">생활/쇼핑</label>
        <input type="hidden" v-model="cate_num.cate_num1" class="form-control" value="1" name="cate_num1">
      </div>
      <div v-if="info1==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price1" class="form-control" name="g_price1" style="text-align:center">
      </div>

      <div v-if="info2==false" class="form-group" style="width:35%">
        <label class="form-control">교통</label>
        <input type="hidden" v-model="cate_num.cate_num2" class="form-control" value="2" name="cate_num2">
      </div>
      <div v-if="info2==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price2" class="form-control" name="g_price2" style="text-align:center">
      </div>

      <div v-if="info3==false" class="form-group" style="width:35%">
        <label class="form-control">식비</label>
        <input type="hidden" v-model="cate_num.cate_num3" class="form-control" value="3" name="cate_num3">
      </div>
      <div v-if="info3==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price3" class="form-control" name="g_price3" style="text-align:center">
      </div>

      <div v-if="info4==false" class="form-group" style="width:35%">
        <label class="form-control">패션/미용</label>
        <input type="hidden" v-model="cate_num.cate_num4" class="form-control" value="4" name="cate_num4">
      </div>
      <div v-if="info4==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price4" class="form-control" name="g_price4" style="text-align:center">
      </div>

      <div v-if="info5==false" class="form-group" style="width:35%">
        <label class="form-control">주거/통신</label>
        <input type="hidden" v-model="cate_num.cate_num5" class="form-control" value="5" name="cate_num5">
      </div>
      <div v-if="info5==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price5" class="form-control" name="g_price5" style="text-align:center">
      </div>

      <div v-if="info6==false" class="form-group" style="width:35%">
        <label class="form-control">미분류</label>
        <input type="hidden" v-model="cate_num.cate_num6" class="form-control" value="6" name="cate_num6">
      </div>
      <div v-if="info6==false" class="form-group" style="width:50%">
        <input type="text" placeholder=" 목표금액" v-model="g_price.g_price6" class="form-control" name="g_price6" style="text-align:center">
      </div>
    </div>
    <div>
      <br>
      <button @click.prevent="goalStore" class="btn c form-control" style="width:50%;">저 장</button>
    </div>
    <br>
  </div>
  <br>
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
      flag: false,
      info0: false,
      info1: false,
      info2: false,
      info3: false,
      info4: false,
      info5: false,
      info6: false,
      results: '',
      results1: [],
      resultsEnd: '',
      resultsStart: '',
      u_num: '',
      g_num: '',
      cate_num: {
        cate_num1: 1,
        cate_num2: 2,
        cate_num3: 3,
        cate_num4: 4,
        cate_num5: 5,
        cate_num6: 6,
      },
      g_time: '',
      g_endtime: '',
      g_price: {
        g_price1: '',
        g_price2: '',
        g_price3: '',
        g_price4: '',
        g_price5: '',
        g_price6: '',
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
    //설정한 목표 리스트를 보여주기위한 메소드
    showGoal() {
      console.log('********** front-end showGoal 호출 **********');
      if (this.results1.length > 0) {
        this.info0 = true;
      }
      for (var j = 0; j < this.results1.length; j++) {
        if (this.cate_num.cate_num1 == this.results1[j]) {
          this.info1 = true;
        }
        if (this.cate_num.cate_num2 == this.results1[j]) {
          this.info2 = true;
        }
        if (this.cate_num.cate_num3 == this.results1[j]) {
          this.info3 = true;
        }
        if (this.cate_num.cate_num4 == this.results1[j]) {
          this.info4 = true;
        }
        if (this.cate_num.cate_num5 == this.results1[j]) {
          this.info5 = true;
        }
        if (this.cate_num.cate_num6 == this.results1[j]) {
          this.info6 = true;
        }
      }
    },
    //목표 설정 후 저장버튼 클릭시 실행되는 메소드
    goalStore() {
      console.log('********** front-end goalStore 호출 **********');
      var u_num = this.u_num;
      var cate_num = [];
      var g_price = [];
      var self = this;
      if (this.info0 == true) {
        var g_time = this.resultsStart;
        var g_endtime = this.resultsEnd;
      } else {
        var g_time = this.g_time;
        var g_endtime = this.g_endtime;
      }
      if (!(this.g_price.g_price1 == '')) {
        cate_num.push(this.cate_num.cate_num1);
        g_price.push(this.g_price.g_price1);
      }
      if (!(this.g_price.g_price2 == '')) {
        cate_num.push(this.cate_num.cate_num2);
        g_price.push(this.g_price.g_price2);
      }
      if (!(this.g_price.g_price3 == '')) {
        cate_num.push(this.cate_num.cate_num3);
        g_price.push(this.g_price.g_price3);
      }
      if (!(this.g_price.g_price4 == '')) {
        cate_num.push(this.cate_num.cate_num4);
        g_price.push(this.g_price.g_price4);
      }
      if (!(this.g_price.g_price5 == '')) {
        cate_num.push(this.cate_num.cate_num5);
        g_price.push(this.g_price.g_price5);
      }
      if (!(this.g_price.g_price6 == '')) {
        cate_num.push(this.cate_num.cate_num6);
        g_price.push(this.g_price.g_price6);
      }
      var sub = this.g_endtime - this.g_time;
      //날짜 값에서 '-'문자 제거
      var gTimeDay = this.g_time.replace(/\-/g, '');
      var endTimeDay = this.g_endtime.replace(/\-/g, '');
      var subDay = endTimeDay - gTimeDay;

      //입력 값이 없으면
      if (g_price.length <= 0) {
        alert('값을 입력하세요');
        //입력 값이 0보다 커야함
      } else if (this.g_price.g_price1 <= 0 && this.g_price.g_price2 <= 0 && this.g_price.g_price3 <= 0 && this.g_price.g_price4 <= 0 && this.g_price.g_price5 <= 0 && this.g_price.g_price6 <= 0) {
        alert('양수만 입력 가능합니다');
      } else if (this.g_time >= this.g_endtime) {
        alert('종료일은 시작일 이후만 입력 가능합니다.');
      }else {
        axios({
          method: 'post',
          url: 'api/goal/save_goal',
          data: {
            u_num: this.$session.get('session'),
            cate_num: cate_num,
            g_time: g_time,
            g_endtime: g_endtime,
            g_price: g_price
          }
        }).then(function(response) {
          console.log('********** 목표내역 저장완료 **********');
          setTimeout("window.location.href = './goal_management'", 0)
        })
      }
    },
    //오늘 날짜 구하는 메소드
    getToday() {
      console.log('********** front-end getToday 호출 **********')
      var today = new Date();
      var dd = today.getDate();
      var ddNext = today.getDate() + 1;
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      console.log(yyyy + '-' + mm + '-' + dd);
      this.g_time = yyyy + '-' + mm + '-' + dd;
      this.g_endtime = yyyy + '-' + mm + '-' + ddNext;
    },
    //목표 기간을 일주일 후로 설정
    week() {
      console.log('********** front-end week 호출 **********');
      var year = this.g_endtime.substring(0, 4);
      var month = this.g_endtime.substring(5, 7);
      var day = this.g_endtime.substring(8, 10);
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var start_date = '' + month + '/' + day + '/' + year + '';
      var date = new Date(start_date);
      var end_date = start_date;
      var daysago = 7;
      var start_date = new Date(date.setDate(date.getDate() + daysago));
      var year2 = start_date.getFullYear();
      var month2 = new String(start_date.getMonth() + 1);
      var day2 = new String(start_date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month2.length == 1) {
        month2 = "0" + month2;
      }
      if (day2.length == 1) {
        day2 = "0" + day2;
      }
      start_date = year2 + '' + month2 + '' + day2;
      this.g_endtime = year2 + '-' + month2 + '-' + day2;
    },
    //목표 기간을 한달 후로 설정
    month() {
      console.log('********** front-end month 호출 **********');
      var year = this.g_endtime.substring(0, 4);
      var month = this.g_endtime.substring(5, 7);
      var day = this.g_endtime.substring(8, 10);
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var start_date = '' + month + '/' + day + '/' + year + '';
      var date = new Date(start_date);
      var end_date = start_date;
      var daysago = 30;
      var start_date = new Date(date.setDate(date.getDate() + daysago));
      var year2 = start_date.getFullYear();
      var month2 = new String(start_date.getMonth() + 1);
      var day2 = new String(start_date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month2.length == 1) {
        month2 = "0" + month2;
      }
      if (day2.length == 1) {
        day2 = "0" + day2;
      }
      start_date = year2 + '' + month2 + '' + day2;
      this.g_endtime = year2 + '-' + month2 + '-' + day2;
    }
  },
  created() {
    var self = this;
    //목표 DB 조회 후 리스트 response받기.
    axios({
      method: 'post',
      url: 'api/goal/request_goal',
      data: {
        u_num: this.$session.get('session')
      }
    }).then(function(response) {
      try {
        self.results = response.data;
        self.resultsStart = self.results[0].g_time;
        self.resultsEnd = self.results[0].g_endtime;
        for (var i = 0; i < self.results.length; i++) {
          self.results1.push(self.results[i].cate_num);
        }
        //설정한 목표 리스트만 보여주기위해 showGoal 메소드 실행
        self.showGoal();
      } catch (e) {
        console.log('********* 목표 리스트 없음 ********');
      }
    })
    this.getToday();
  }
}
</script>
<!-- Vue Style을 위한 CSS -->
<style scoped>
.box-container {
  border-style: solid;
  border-width: 2px;
  padding: 10px;
}

.table-header {
  font-size: 20px;
  font-weight: bold;
}

.table-color {
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

.form-group {
  display: inline-block;
  vertical-align: middle
}

.input {
  text-align: center;
}

input::-webkit-input-placeholder {
  color: #2C3E50;
}

.ab {
  width: 104px;
  height: 28px;
  font-size: 13px;
  text-align: center;
  margin-bottom: 5px;
}

.c {
  background-color: #327a81;
  color: white;
  font-weight: bold
}
</style>
