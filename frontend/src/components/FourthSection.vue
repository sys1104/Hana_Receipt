<template id="fourth-section">
<div v-show="$session.exists() == true" id='hi'>
  <div class="container">
    <br>
  <h2>워드클라우드</h2>
      <div>
        <word-cloud></word-cloud>
      </div>
      <!-- <div>
        <my-used-month></my-used-month>
      </div> -->
   
      
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
import WordCloud from './WordCloud.vue'
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
        WordCloud
        // PercentageChart
    },

}
</script>

<style scoped>
    #hi{
        background-color:#FAFAFA;
    }
</style>
