<template id="test">
      <div class="container" id="hi">
        <br>
        <h2 class="text-center text-uppercase text-secondary mb-0">목표금액 : {{results | currency('',0)}}</h2>
        <h5 class="text-center text-uppercase text-secondary mb-0">- 기간 : {{start_date}}~ {{end_date}} -</h5>
        <hr class="star-dark mb-5">

          <div class="col-md-12">
            <!-- 첫번째 그래프 -->
           <my-total-chart></my-total-chart>
          </div>


      </div>
</template>

<style>
  #hi{
    background-color : white;
  }
</style>

<script>
import axios from 'axios'
import MyTotalChart from './MyTotalChart.vue'
// import MyCategoryChart from './MyCategoryChart.vue'
// import PercentageChart from './PercentageChart.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
        start_date : '',
        end_date : '',
      }
    },
    components : {
        MyTotalChart,
        // MyCategoryChart,
        // PercentageChart
    },
    methods : {
        getDate(){
          axios({
          method: 'post',
          url: 'api/goal/request_goal',
          data: {
            u_num: this.$session.get('session'),
            request_code : 1
          }
        }).then((response) => {
          console.log('********** request_goal 응답 받음');
          this.start_date = response.data[0].g_time;
          this.end_date = response.data[0].g_endtime;
          // for(var i=0; i<response.length; i++){
          //   self.results
          // }
        });
        }
    },
    created() {
      this.getDate();
      var self = this;
      var now = new Date();
      var today = now.getDay();
      var startDate = '';
      startDate = now.setDate(now.getDate() - (today - 1));
      startDate = new Date(startDate);
      var startDate_date = startDate.getDate();
      if (startDate_date < 10) {
        startDate_date = '0' + startDate_date;
      }
      var startDate_month = startDate.getMonth() + 1;
      if (startDate_month < 10) {
        startDate_month = '0' + startDate_month;
      }
      var startDate_year = startDate.getFullYear();
      var start_date = startDate_year + '' + startDate_month + '' + startDate_date;
      console.log(start_date);
      axios({
        method: 'post',
        url: 'api/analysis/all_used_goal_money',
        data: {
          u_num: this.$session.get('session'),
          start_date: start_date
        }
      }).then((response) => {
        console.log('********** all_used_goal_money 응답 받음 => 목표금액합산**********');
        var all_used = {};
        all_used = response.data.all_used;
        var all_goal = {};
        all_goal = response.data.all_goal;
        // for(var i=0; i<response.length; i++){
        //   self.results
        // }
        self.results = all_goal[0].g_price;
        console.log('목표금액 합산 : ' + self.results);
      });
    }
}

</script>
