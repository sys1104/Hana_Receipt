<template id="fourth-section">
<div v-show="$session.exists() == true" id='hi'>
  <div class="container">
    <br>
    <h2>나의 소비 키워드</h2>
  <h7>내가 자주 소비한 내역을 확인해보세요</h7>
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
