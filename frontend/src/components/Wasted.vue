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
        <tr class="table-body" v-for="result in results">
          <td>
            {{result}}
          </td>
        </tr>
      </table>
      <hr>
      <h3 class="text-right">총액 : 원</h3>
    </div>

  </div>
</div>
</template>


<script>
import axios from 'axios'



export default {
  data: function() {
    return {
      results: ''
    }
  },
  methods: {
    calculateDate() {
      console.log('********** front-end addUser 호출 **********');
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
      startDate = now.setDate(now.getDate() - (today - 1));
      startDate = new Date(startDate);
    }
    endDate = now.setDate(now.getDate() + 6);
    endDate = new Date(endDate);
    var startDate_date = startDate.getDate();
    var startDate_month = startDate.getMonth() + 1;
    var startDate_year = startDate.getFullYear();
    var start_date = startDate_year + '' + startDate_month + '' + startDate_date;
    var endDate_date = endDate.getDate();
    var endDate_month = endDate.getMonth() + 1;
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
    })
  }
}
</script>
