<template id="second-section">
      <div class="container" id="hi">
        <br>

        <hr class="star-dark mb-5">
        <div class="row">
          <div class="col-md-6">
            <!-- 첫번째 그래프 -->
           <PercentageChart></PercentageChart>
          </div>
          <div class="col-md-4">
            <!-- 두번째 그래프 -->
           <!-- <my-category-chart></my-category-chart> -->
          </div>
          <div class="col-md-4">
          </div>
          <div>
        </div>
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