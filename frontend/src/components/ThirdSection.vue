<template id="second-section">
      <div v-if="$session.exists() == true" class="container-fluid" id="hi">
        <br>
      <div class="container">
        <h2 class="text-center">소비내역 비교하기</h2>
          <!-- <hr class="star-dark mb-5"> -->
          <br>
        <div class="row">
          <div class="offset-7 col-md-6">
            <!-- <button @click.prevent="chart_select=2" class="btn btn-primary">전체 이용자와 비교</button>
            <button @click.prevent="chart_select=3" class="btn btn-primary">동일 직업군과 비교</button> -->
            <select v-model="chart_select" class="form-control" style="width:50%; margin-left:30px">
              <option value="2">전체 이용자와 비교</option>
              <option value="3">동일 직업군과 비교</option>
            </select>
          </div>

        </div>  
        <div class="row">
          <div class="col-md-6">
            <!-- 첫번째 그래프 -->
           <percentage-chart1></percentage-chart1>
          </div>
          <div class="col-md-6">
            <!-- 두번째 그래프 -->                        
            <percentage-chart2 v-show="chart_select==2"></percentage-chart2>
            <percentage-chart3 v-show="chart_select==3"></percentage-chart3>
          </div>
          <!-- <div>
        </div> -->
      </div>
      </div>
      <br>
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
import PercentageChart3 from './PercentageChart3.vue'
export default {
    data() {
      return {
        u_num : '',
        results : '',
        chart_select : 2,
      }
    },
    components : {
        // MyTotalChart,
        // MyCategoryChart,
        PercentageChart1,
        PercentageChart2,
        PercentageChart3
    },

}
</script>

<style scoped>
    #second-section{
        background-color:lightGrey;
    }
</style>
