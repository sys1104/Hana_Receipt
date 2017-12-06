<template>
<div id="app">
  <navi></navi>
  <div class="container">
    <wasted></wasted>
    <table class="table table-striped table-hover table-responsive">
      <tr class="table-header">
        <!-- <td>소비번호</td> -->
        <td>카테고리</td>
        <td>목표기간</td>
        <td>절약목표금액</td>
      </tr>
      <div class="col-md-offset-3">
        <br>
        <form class="form-inline">
          <div class="form-group">
            <tr class="table-body" v-for="(result,index) in results" v-if="index>= (page-1)*numberInpage && index<numberInpage*page">
              <!-- 리스트 화면 -->
              <td>
                <select v-if="flag==false" v-model="result.cate_num" disabled class="form-control">
                  <option value="1">생활/쇼핑</option>
                  <option value="2">교통</option>
                  <option value="3">식비</option>
                  <option value="4">패션/미용</option>
                  <option value="5">주거/통신</option>
                  <option value="6">미분류</option>
                </select>
              </td>
              <td v-if="flag==false">{{result.g_time}}</td>
              <td v-if="flag==false">{{result.g_price}}</td>
              <td><button v-if="flag==false" class="btn btn-primary" @click="edit_click(result)">수정</button></td>
              <td>
                <select v-if="flag==true && (result.consume_num == result3)" v-model="result.cate_num" class="form-control" name="cate_num">
                  <option value="1">생활/쇼핑</option>
                  <option value="2">교통</option>
                  <option value="3">식비</option>
                  <option value="4">패션/미용</option>
                  <option value="5">주거/통신</option>
                  <option value="6">미분류</option>
                 </select>
                <select v-if="flag==true && (result.consume_num != result3)" v-model="result.cate_num" class="form-control" disabled>
                   <option value="1">생활/쇼핑</option>
                   <option value="2">교통</option>
                   <option value="3">식비</option>
                   <option value="4">패션/미용</option>
                   <option value="5">주거/통신</option>
                   <option value="6">미분류</option>
                  </select>
              </td>
              <td>
                <input class="form-control" name="g_time" v-if="flag==true && (result.g_num == result3)" v-model='info2=result.g_time' />
                <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_time' disabled/>
              </td>
              <td>
                <input class="form-control" name="g_price" v-if="flag==true && (result.g_num == result3)" v-model='info2=result.g_price' />
                <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_price' disabled/>
              </td>
              <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-success" @click="edit_goal(result)">완료</button></td>
              <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-danger" @click="delete_goal(result)">삭제</button></td>
            </tr>
          </div>
          <div v-if="list_total != page_num">
            <ul class="list-group">
              <li class="list-group-item">
                <button class="btn btn-danger" @click="pageto(pageIndex-2, list_total, page_num)" v-if="pageIndex != 1">prev</button>
                <span>Page {{pageIndex}} of {{page_total}}</span>
                <button class="btn btn-danger" @click="pageto(pageIndex, list_total, page_num)" v-if="nextBtn != 0">next</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <br><br>
      <div class="col-md-8">
        <button @click="requestGoal" class="btn btn-primary form-control">추가하기</button>
      </div>
      <br><br>
      <div class="form-group col-md-8">
        <button class="btn btn-warning form-control">절약 목표로 설정하기</button>
      </div>
    </table>
  </div>
</div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import Login from './Login'
import Wasted from './Wasted'
import Navi from './Navi'
export default {
  name: 'app',
  data: function() {
    return {
      results: '',
      g_num: '',
      u_num: '',
      cate_num: '',
      g_price: '',
      g_time: '',
      info0: '',
      info1: '',
      info2: '',
      info3: '',
      info4: '',
      flag: false,
      result3: '',
      list_total: {},
      page_num: '',
      page: 1,
      pageIndex: 1,
      nextBtn: {},
      page_total: {}
    }
  },
  components: {
    Wasted,
    Navi,
    VPaginator: VuePaginator
  },
  methods: {
    pageto(number, total_length, p_num) {
    if (number * p_num > total_length || (number + 1) * p_num > total_length) {
      this.nextBtn = 0;
    } else {
      this.nextBtn = 1;
    }
    this.pageIndex = number + 1;

    //prev, next 버튼 클릭시 0일 때 page처리
    if (number == 0) {
      this.page = 1;
    } else {
      this.page = this.pageIndex;
    }
  },
  //date포맷 변경 function
  // dateFormatChange(date) {
  //   var options = {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit"
  //   };
  //   return date.toLocaleTimeString("ko-KR", options);
  // },
  //수정 후 완료클릭시 실행되는 function
  edit_goal(result) {
    console.log('********** front-end editConsume 호출 **********');
    var u_num = result.u_num;
    var g_num = result.g_num;
    var cate_num = result.cate_num;
    var g_price = result.g_price;
    var g_time = result.g_time;
    axios({
      method: 'post',
      url: 'api/goal/edit_goal',
      data: {
        u_num: u_num,
        g_num: g_num,
        cate_num: cate_num,
        g_price: g_price,
        g_time: g_time,
      }
    }).then(function(response) {
      console.log('********** 소비내역 수정완료 **********');
      alert('목표 수정이 완료되었습니다');
      setTimeout("window.location.href = './goal_management'", 1000)
    })
  },
  //수정 클릭시 실행되는 function
  editClick(result) {
    console.log('********** front-end editClick 호출 **********');
    // this.flag = true;
    console.log('result2.g_num : ' + result.g_num);
    // if(result.consume_num){
    this.flag = true;
    // }
    this.result3 = result.g_num;
  },
  //삭제 클릭시 실행되는 function
  delete_goal(result) {
    var u_num = result.u_num;
    var g_num = result.g_num;
    axios({
      method: 'post',
      url: 'api/goal/delete_goal',
      data: {
        u_num: u_num,
        g_num: g_num
      }
    }).then(function(response) {
      console.log('********** 소비내역 삭제완료 **********');
      alert('목표 삭제가 완료되었습니다');
      setTimeout("window.location.href = './goal_management'", 1000)
    })
  }
},
created() {
  console.log('stories Created()')
  var self = this;
  axios({
    method: 'get',
    url: 'api/goal/request_goal',
    data: {}
  }).then(function(response) {
    self.results = response.data;
    self.list_total = Number(response.data.length);
    //pagination -> 전체 페이지수와 소비내역리스트 전체 길이
    if (self.list_total >= 10) {
      self.page_num = 10;
    } else {
      self.page_num = self.list_total;
    }
    self.page_total = parseInt(self.list_total / self.page_num) + 1;
    console.log('********** 목표내역 리스트 **********');
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
