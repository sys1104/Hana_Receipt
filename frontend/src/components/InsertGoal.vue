<template>
<div id="stories" style="width:100%">
  <h2>소비내역 목록</h2>
  <table class="table table-striped table-hover table-responsive">
    <tr class="table-header">
      <!-- <td>소비번호</td> -->
      <td>카테고리</td>
      <td>기간</td>
      <td>금액</td>
    </tr>
    <!-- v-if="index < page_num" -->
    <tr class="table-body" v-for="(result, index) in results" v-if="(index >= (page-1)*page_num) && (index < page_num*page)">
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
      <!-- <td v-if="flag==false">{{result.consume_num}}</td> -->
      <td v-if="flag==false">{{result.g_time}}</td>
      <td v-if="flag==false">{{result.g_price}}</td>
      <td><button v-if="flag==false" class="btn btn-primary" @click="editClick(result)">수정</button></td>
      <!-- 수정버튼 클릭시 -->
      <td>
        <select v-if="flag==true && (result.g_num == result3)" v-model="result.cate_num" class="form-control" name="cate_num">
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
        <select v-if="flag==true && (result.g_num != result3)" v-model="result.cate_num" class="form-control" disabled>
              <option value="1">생활/쇼핑</option>
              <option value="2">교통</option>
              <option value="3">식비</option>
              <option value="4">패션/미용</option>
              <option value="5">주거/통신</option>
              <option value="6">미분류</option>
             </select>
      </td>
      <!-- <td><input class="form-control" name="cate_num" v-if="flag==true && (result.consume_num == result3)" v-model='info1=result.cate_num'/></td> -->
      <td>
        <input class="form-control" name="content" v-if="flag==true && (result.g_num == result3)" v-model='info2=result.g_time' />
        <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_time' disabled/>
      </td>
      <!-- <td><input class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.content' disabled/></td> -->
      <td>
        <input class="form-control" name="price" v-if="flag==true && (result.g_num == result3)" v-model='info3=result.g_price' />
        <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_price' disabled/>
      </td>
      <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-success" @click="editConsume(result)">완료</button></td>
      <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-danger" @click="delConsume(result)">삭제</button></td>
    </tr>

    <!-- 페이지네이션 -->
    <div v-if="list_total != page_num">
      <ul class="list-group">
        <li class="list-group-item">
          <button class="btn btn-danger" @click="pageto(pageIndex-2, list_total, page_num)" v-if="pageIndex != 1">prev</button>
          <span>Page {{pageIndex}} of {{page_total}}</span>
          <button class="btn btn-danger" @click="pageto(pageIndex, list_total, page_num)" v-if="nextBtn != 0">next</button>
        </li>
      </ul>
    </div>
  </table>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    // editing: true
    return {
      results: '',
      g_num: '',
      cate_num: '',
      g_time: '',
      g_price: '',
      c_time: '',
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
    VPaginator: VuePaginator
  },
  methods: {
    pageto(number, total_length, p_num) {
      //마지막 페이지에서 next버튼을 hide하기 위한 코드
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

    //수정 후 완료클릭시 실행되는 function
    editConsume(result) {
      console.log('********** front-end editConsume 호출 **********');
      var g_num = result.g_num;
      var u_num = result.u_num;
      var cate_num = result.cate_num;
      var g_time = result.g_time;
      var g_price = result.g_price;
      axios({
        method: 'post',
        url: 'api/consume_history/updateHistory',
        data: {
          g_num: g_num,
          u_num: u_num,
          cate_num: cate_num,
          g_time: g_time,
          g_price: g_price,
        }
      }).then(function(response) {
        console.log('********** 목표내역 수정완료 **********');
        alert('목표내역 수정이 완료되었습니다');
        setTimeout("window.location.href = './goal_management'", 0)
      })
    },
    //수정 클릭시 실행되는 function
    editClick(result) {
      console.log('********** front-end editClick 호출 **********');
      this.flag = true;
      this.result3 = result.g_num;
    },
    //삭제 클릭시 실행되는 function
    delConsume(result) {
      var g_num = result.g_num;
      var unum = result.u_num;
      axios({
        method: 'post',
        url: 'api/consume_history/deleteHistory',
        data: {
          g_num: g_num,
          u_num: unum
        }
      }).then(function(response) {
        console.log('********** 목표내역 삭제완료 **********');
        alert('목표내역 삭제가 완료되었습니다');
        setTimeout("window.location.href = './goal_management'", 0)
      })
    }
  },
  created() {
    console.log('InsertGoal Created()')
    var self = this;

    axios({
      method: 'get',
      url: 'api/consume_history/consumeList',
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
      console.log('********** 소비내역 리스트 **********');
    })
  }
}
</script>
<style>
input::-webkit-input-placeholder {
  color: #2C3E50;
}
</style>
