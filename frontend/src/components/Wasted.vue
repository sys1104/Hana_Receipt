<template>
<div class="container">
  <h2>목표 관리</h2>
  <br><br>
  <hr>
  <div class="col-md-12">

    <div class="col-md-offset-3 col-md-6 box-container">
      <h3>지난 주 낭비된 금액</h3>
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
          <td>카테고리</td>
          <td>금액</td>
        </tr>
        <tr class="table-body" v-for="(result,index) in results">
          <td>
            <select type="button" v-model="result.cate_num" disabled class="form-control">
              <option value="1">생활/쇼핑</option>
              <option value="2">교통</option>
              <option value="3">식비</option>
              <option value="4">패션/미용</option>
              <option value="5">주거/통신</option>
              <option value="6">미분류</option>
             </select>
          </td>
          <td>{{info = result.sum_price}}</td>
        </tr>
      </table>
      <hr>
      <h3 class="text-right">총액 : {{sum}}원</h3>
    </div>

  </div>
</div>
</template>


<script>
import axios from 'axios'



export default {
  data: function() {
    return {
      results: '',
      info:{},
      sum:{}
    }
  },
  methods: {
    calculateDate() {
      console.log('********** front-end  호출 **********');
      var today = new date();
      console.log(today);
    }
  },
  created() {
    var self = this;
    var now = new Date();
    var today = now.getDay();
    var startDate = '';
    var endDate = '';
    if (today != 1) {
      startDate = now.setDate(now.getDate() - (today + 6));
      startDate = new Date(startDate);
    }
    endDate = now.setDate(now.getDate() + 6);
    endDate = new Date(endDate);
    var startDate_date = startDate.getDate();
    if(startDate_date < 10){
      startDate_date = '0'+startDate_date;
    }
    var startDate_month = startDate.getMonth() + 1;
    if(startDate_month < 10){
      startDate_month = '0'+startDate_month;
    }
    var startDate_year = startDate.getFullYear();
    var start_date = startDate_year + '' + startDate_month + '' + startDate_date;
    var endDate_date = endDate.getDate();
    if(endDate_date < 10){
      endDate_date = '0'+endDate_date;
    }
    var endDate_month = endDate.getMonth() + 1;
    if(endDate_month < 10){
      endDate_month = '0' + endDate_month ;
    }
    var endDate_year = endDate.getFullYear();
    var end_date = endDate_year + '' + endDate_month + '' + endDate_date;
    console.log(start_date);
    console.log(end_date);
    axios({
      method: 'post',
      url: 'api/consume_history/wastedList',
      data: {
        u_num: this.$session.get('session'),
        start_date: start_date,
        end_date: end_date
      }
    }).then(function(response) {
      self.results = response.data;
      // for( var i in self.results){
      //   self.sum += i.sum_price;
      // }
      for(var i=0; i<self.results.length;i++){
        self.sum += parseInt(self.results[i].sum_price);
      }
      console.log('셀프섬값 : ' + self.sum);

    })
  }
}
</script>
