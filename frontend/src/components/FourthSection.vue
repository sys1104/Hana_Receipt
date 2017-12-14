<template id="fourth-section">
      <div class="container-fluid" id="hi">
          <div class="container">

        <br>
        <div class="row">
          <div class="col-md-12">
            <!-- 첫번째 그래프 -->
           <my-used-month></my-used-month>
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
import MyUsedMonth from './MyUsedMonth.vue'
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
        MyUsedMonth,
        // PercentageChart
    },

}
</script>

<style scoped>
    #hi{
        background-color:#FAFAFA;
    }
</style>
