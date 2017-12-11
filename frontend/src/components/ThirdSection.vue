<template id="second-section">
      <div class="container-fluid" id="hi">
        <br>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!-- 첫번째 그래프 -->
           <PercentageChart></PercentageChart>
          </div>
          <div class="col-md-12 col-md-offset-2">
            <!-- 두번째 그래프 -->
           <h4>두영님은 <strong>패션/쇼핑</strong>에 가장 많은 비용을 지출하고 있습니다.</h4>
           <h4>다른 이용자는 주거/통신에 가장 많은 비용을 지출하고 있습니다.</h4>
          </div>
          <div class="col-md-4">
              
          </div>
          <div>
        </div>
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
import PercentageChart from './PercentageChart.vue'

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
        PercentageChart
    },

}
</script>

<style scoped>
    #second-section{
        background-color:lightGrey;
    }
</style>