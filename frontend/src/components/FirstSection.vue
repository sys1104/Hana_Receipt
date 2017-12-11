<template id="test">
      <div class="container" id="hi">
        <br>

        <h2 class="text-center text-uppercase text-secondary mb-0">목표금액 : {{results}}</h2>
        <hr class="star-dark mb-5">
        
          <div class="col-md-12">
            <!-- 첫번째 그래프 -->
           <my-total-chart></my-total-chart>
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
import MyTotalChart from './MyTotalChart.vue'
// import MyCategoryChart from './MyCategoryChart.vue'
// import PercentageChart from './PercentageChart.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
      }
    },
    components : {
        MyTotalChart,
        // MyCategoryChart,
        // PercentageChart
    },
    created() {
      var self = this;
      axios({
        method: 'post',
        url: 'api/analysis/all_used_goal_money',
        data: {
          u_num: this.$session.get('session')
        }
      }).then((response) => {
        console.log('********** all_used_goal_money 응답 받음 => 목표금액합산**********');
        var all_used = {};
        all_used = response.data.all_used;
        var all_goal = {};
        all_goal = response.data.all_goal;
        // for(var i=0; i<response.length; i++){
        //   self.results
        // }
        self.results = all_goal[0].g_price;
        console.log('목표금액 합산 : ' + self.results);
      });
    }
}
// <template id="test">
//       <!-- Portfolio Grid Section -->
//     <section class="portfolio" id="portfolio">
//       <div class="container">
//         <h2 class="text-center text-uppercase text-secondary mb-0">ㅎㅇ</h2>
//         <hr class="star-dark mb-5">
//         <h4 class="text-center">절약 목표는  원 입니다.</h4>

//         <div class="row">
//           <div class="col-md-4">
//             <a class="d-block mx-auto" href="#portfolio-modal-2">
//               <!-- <div class="portfolio-item-caption d-flex position-absolute h-100 w-100"> -->
//                   <!-- <i class="fa fa-search-plus fa-3x"></i> -->
//                   <!-- </div> -->
//               <div>
//                 <!-- 첫번째 그래프 -->
//                   <my-total-chart></my-total-chart>
//               </div>
//             </a>
//           </div>
//           <div class="col-md-4">
//             <a class="d-block mx-auto" href="#portfolio-modal-2">
//               <!-- <div class="portfolio-item-caption d-flex position-absolute h-100 w-100"> -->
//                   <!-- <i class="fa fa-search-plus fa-3x"></i> -->
//                   <!-- </div> -->
//               <div>
//                 <!-- 두번째 그래프 -->
//                   <my-category-chart></my-category-chart>
//               </div>
//             </a>
//           </div>
//           <div class="col-md-4">
//             <a class="d-block mx-auto" href="#portfolio-modal-3">
//               <!-- <div class="portfolio-item-caption d-flex position-absolute h-100 w-100"> -->
//                   <!-- <i class="fa fa-search-plus fa-3x"></i> -->
//               <!-- </div> -->
//               <div>
//                 <!-- 세번째 그래프 -->
//                 <PercentageChart></PercentageChart>
//               </div>
//             </a>
//           </div>
//         </div>
//         <div>
//           <h4> 솔루션 </h4>
//         </div>
//       </div>

//     </section>
// </template>
</script>
