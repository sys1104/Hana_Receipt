<template id="second-section">
<div v-if="$session.exists() == true" class="container-fluid" id="hi">
  <br>
  <!-- percentageChart1,2,3,4 컴포넌트 import를 위한 섹션 -->
  <div class="container">
    <h2 class="text-center">소비내역 비교하기</h2>
    <br>
    <div class="row">
      <div class="offset-7 col-md-6">
        <select v-model="chart_select" class="form-control" style="width:50%; margin-left:30px">
              <option value="2">전체 이용자와 비교</option>
              <option value="3">동일 성별&연령 비교</option>
              <option value="4">동일 직업군과 비교</option>
            </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <!-- 나의 소비내역 차트 (카테고리별 비중) -->
        <percentage-chart1></percentage-chart1>
      </div>
      <div class="col-md-6">
        <!-- 전체 이용자 소비내역 차트(카테고리별 비중) -->
        <percentage-chart2 v-show="chart_select==2"></percentage-chart2>
        <!-- 동일 성별/연령 비교 차트(카테고리별 비중) -->
        <percentage-chart3 v-show="chart_select==3"></percentage-chart3>
        <!-- 동일 직업군 비교 차트(카테고리별 비중) -->
        <percentage-chart4 v-show="chart_select==4"></percentage-chart4>
      </div>
    </div>
  </div>
  <br>
</div>
</template>

<script>
import axios from 'axios'
import PercentageChart1 from './PercentageChart1.vue'
import PercentageChart2 from './PercentageChart2.vue'
import PercentageChart3 from './PercentageChart3.vue'
import PercentageChart4 from './PercentageChart4.vue'
export default {
  data() {
    return {
      u_num: '',
      results: '',
      chart_select: 2,
    }
  },
  components: {
    PercentageChart1,
    PercentageChart2,
    PercentageChart3,
    PercentageChart4
  }
}
</script>
<!-- Vue Style을 위한 CSS -->
<style scoped>
#second-section {
  background-color: lightGrey;
}
</style>
