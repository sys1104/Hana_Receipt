<template id="second-section">
  <!-- 해당 컴포넌트는 로그인 되었을 때만 출력 (MyCategoryChart 포함) -->
  <div v-show="$session.exists() == true" class="container-fluid" id="hi">
      <div class="container">
        <br>
        <!-- 세션이 있고 목표금액이 있을 경우 출력 -->
        <div v-if="$session.exists() == true && goal_price != null" class="row">

          <div class="col-md-12">
            <br>
            <h2 class="text-center">카테고리별 소비 내역</h2>
            <br>
            <!-- MyCategoryChart import -->
            <my-category-chart></my-category-chart>
            <br>
          </div>
        </div>
      </div>

      <!-- 세션이 있고 목표금액이 없을 경우 출력 -->
      <div v-show="$session.exists() == true && goal_price == null" class="container" id="hi">
        <br>
        <h2 class="text-center">카테고리별 소비 내역</h2>
        <div class="col-md-12" style="margin-bottom:10%">
          <br>
          <h5>목표금액을 설정해주세요.</h5>
          <br>
          <router-link to="/goal_management"><button id="white" class="btn btn-danger btn-lg">목표 설정 하러가기</button></router-link>
        </div>
      </div>
      <br>
    </div>
</template>

<style scoped>
  #hi{
    background-color : white;
  }
</style>

<script>
import axios from 'axios'
import MyCategoryChart from './MyCategoryChart.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
        goal_price : null,
      }
    },
    components : {
        MyCategoryChart
    },
    created() {
      var self = this;
      //날짜 구하기위한 코드
      var date = new Date();
      var year = date.getFullYear();
      var month = new String(date.getMonth() + 1);
      var day = new String(date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var start_date = year + '' + month + '' + day;
      //DB 조회 후 결과 response받기. (목표금액)
      axios({
        method: 'post',
        url: 'api/analysis/all_used_goal_money',
        data: {
          u_num: this.$session.get('session'),
          start_date: start_date
        }
      }).then((response) => {
        var all_used = {};
        all_used = response.data.all_used || response.data.all_goal;
        var all_goal = {};
        all_goal = response.data.all_goal;
        self.results = all_goal[0].g_price;
        self.goal_price = all_goal[0].g_price;
      });
    }
}
</script>
<!-- Vue Style을 위한 CSS -->
<style scoped>
    #hi{
        background-color:#FAFAFA;
    }
</style>
