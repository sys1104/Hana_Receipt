<template id="second-section">
      <div v-if="$session.exists() == true" class="container-fluid" id="hi">
        <br>
      <div class="container">
        <h2 class="text-center">소비내역 비교하기</h2>
          <!-- <hr class="star-dark mb-5"> -->
          <br>
          <br>
        <div class="row">
          <div class="col-md-6">
            <!-- 첫번째 그래프 -->
           <percentage-chart1></percentage-chart1>
          </div>
          <div class="col-md-6">
            <!-- 두번째 그래프 -->
            <percentage-chart2></percentage-chart2>
          </div>
          <!-- <div>
        </div> -->
      </div>
      </div>
      </div>
</template>

<style>
</style>

<script>
import axios from 'axios'
// import MyTotalChart from './MyTotalChart.vue'
// import MyCategoryChart from './MyCategoryChart.vue'
import PercentageChart1 from './PercentageChart1.vue'
import PercentageChart2 from './PercentageChart2.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
      }
    },
    components : {
        // MyTotalChart,
        // MyCategoryChart,
        PercentageChart1,
        PercentageChart2
    },

}
</script>

<style scoped>
    #second-section{
        background-color:lightGrey;
    }
</style>
