
<template>
<div id='myCategoryChart'></div>
</template>




<script>
// 카테고리별 목표금액 그래프
import axios from 'axios'
export default {
  data() {
    return {

    }
  },
  beforeMount() {
    var self = this;
    // this.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
    if (!this.$session.exists()) {
      console.log('********** 세션이 없습니다. **********');
    } else {
      console.log('********** 세션이 있습니다. **********');
      // this.u_num = this.$session.getAll();
      console.log('세션 값 확인 ' + this.$session.get('session'));
      axios({
        method: 'post',
        url: 'api/analysis/cate_used_goal_money',
        data: {
          u_num: this.$session.get('session'),
        }
      }).then((response) => {
        console.log('********** cate_used_goal_money 응답 받음 **********');
        console.log(response.data.cate_used);
        console.log(response.data.goal_money);
        var cate_used = {};
        cate_used = response.data.cate_used;
        var labels = [];
        for (var i = 0; i < cate_used.length; i++) {
          if (cate_used[i].cate_num == 1) {
            self.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
          } else if (cate_used[i].cate_num == 2) {
            self.myCategoryConfig.scaleX.labels.push('교통');
          } else if (cate_used[i].cate_num == 3) {
            self.myCategoryConfig.scaleX.labels.push('식비');
          } else if (cate_used[i].cate_num == 4) {
            self.myCategoryConfig.scaleX.labels.push('패션/미용');
          } else if (cate_used[i].cate_num == 5) {
            self.myCategoryConfig.scaleX.labels.push('주거/통신');
          } else {
            self.myCategoryConfig.scaleX.labels.push('기타');
          }
        }
          zingchart.render({
          id: 'myCategoryChart',
          data: this.chart,
          height: '70%',
          width: '99%'
        });
          });
        }
      },
  mounted() {
    console.log('*********** 차트 렌더링 mounted **********');

    console.log(this.myCategoryConfig.scaleX.labels)
  }
}
</script>
