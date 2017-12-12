<template id="second-section">
      <div class="container-fluid" id="hi">
          <div class="container">
          
        <br>
        <div class="row">
          <div class="col-md-12">
            <!-- 첫번째 그래프 -->
           <my-category-chart></my-category-chart>
          </div>
          <div>
        </div>
        </div>
        </div>
      </div>
</template>

<style scoped>
  #hi{
    background-color : white;
  }
</style>

<script>
import axios from 'axios'
// import MyTotalChart from './MyTotalChart.vue'
import MyCategoryChart from './MyCategoryChart.vue'
// import PercentageChart from './PercentageChart.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
      }
    },
    components : {
        // MyTotalChart,
        MyCategoryChart,
        // PercentageChart
    },

}
</script>

<style scoped>
    #hi{
        background-color:#FAFAFA;
    }
</style>