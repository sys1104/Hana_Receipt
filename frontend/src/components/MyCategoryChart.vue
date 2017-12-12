<template>
<div>
  <div id='myCategoryChart'></div>
  <!-- 현재상태 역순 -->
  <div class="col-md-3 col-md-offset-2">
    <ul v-for="(result,index) in final_result">
      <li>
        현재 상태 : {{result}}
      </li>
    </ul>
  </div>
  <!-- 남은금액 역순 -->
  <div class="col-md-3 col-md-offset-2">
    <ul v-for="(result,index) in final_result2">
      <li>
        목표대비 남은 금액 : {{result}}
      </li>
    </ul>
  </div>
</div>
</template>




<script>
// 카테고리별 목표금액 그래프
import axios from 'axios'
export default {
  data() {
    return {
      results : [],
      results2 : [],
      final_result : [],
      final_result2 : [],
      myCategoryConfig: {
        type: "hbar",
        backgroundColor: "lightgrey",
        tooltip: {
          visible: false
        },
        scaleX: {
          lineColor: "transparent",
          tick: {
            visible: false
          },
          labels: [],
          item: {
            fontColor: "#000000",
            fontSize: 20
          }
        },
        scaleY: {
          visible: false,
          lineColor: "transparent",
          guide: {
            visible: false
          },
          tick: {
            visible: false
          }
        },
        plotarea: {
          marginLeft: "200",
          marginTop: "30",
          marginBottom: "0"
        },
        plot: {
          stacked: true,
          barsSpaceLeft: "20px",
          barsSpaceRight: "20px",
          valueBox: {
            visible: true,
            text: "%v0%",
            fontColor: "black",
            fontSize: 20
          },
          tooltip: {
            borderWidth: 0,
            borderRadius: 2
          },
          animation: {
            effect: 3,
            sequence: 3,
            method: 3
          }
        },
        series: [{
            values: [], //배열 형식으로 지정해야함
            borderRadius: "50px 0px 0px 50px",
            backgroundColor: "#E71D36",
            rules: [{
                rule: "%i === 0",
                backgroundColor: "#E71D36"
              },
              {
                rule: "%i === 1",
                backgroundColor: "#2EC4B6"
              },
              {
                rule: "%i === 2",
                backgroundColor: "#FF9F1C"
              },
              {
                rule: "%i === 3",
                backgroundColor: "#20A665"
              },
              {
                rule: "%i === 4",
                backgroundColor: "#E71D36"
              },
              {
                rule: "%i === 5",
                backgroundColor: "#2EC4B6"
              }
            ]
          },
          {
            values: [], //배열 형식으로 지정해야함
            borderRadius: "0px 50px 50px 0px",
            backgroundColor: "#E71D36",
            //alpha : 0.8,
            rules: [{
                rule: "%i === 0",
                backgroundColor: "#e85d6f"
              },
              {
                rule: "%i === 1",
                backgroundColor: "#90eae2"
              },
              {
                rule: "%i === 2",
                backgroundColor: "#f7be70"
              },
              {
                rule: "%i === 3",
                backgroundColor: "#5FAD47"
              },
              {
                rule: "%i === 4",
                backgroundColor: "#e85d6f"
              },
              {
                rule: "%i === 5",
                backgroundColor: "#90eae2"
              }
            ]
          }
        ]
      }
    }
  },
  methods : {
    resultComment(result_sum, result_min){
      console.log('result_sum : ' + result_sum);
      var re2 = result_sum*10;
      if(re2 >=0 && re2 <= 20){
        this.results.push('매우 알뜰');
        this.results2.push(result_min);
      }else if(re2 > 20 && re2 <= 40){
        this.results.push("알뜰");
        this.results2.push(result_min);
      }else if(re2 > 40 && re2 <= 60){
        this.results.push("보통");
        this.results2.push(result_min);
      }else if(re2 > 60 && re2 <= 80){
        this.results.push("위험");
        this.results2.push(result_min);
      }else if(re2 > 80 && re2 <= 100){
        this.results.push("아주위험");
        this.results2.push(result_min);
      }else {
        this.results.push("스튜핏!!");
        this.results2.push(result_min);
      }
      var test01 = [];
      var test02 = [];
      for(var i = this.results.length-1; i > -1; i--){
        test01.push(this.results[i]);
        test02.push(this.results2[i]);
      }
      this.final_result = test01;
      this.final_result2 = test02;
    }
  },
  created() {
    var self = this;
    var now = new Date();
    var today = now.getDay();
    var startDate = '';
    startDate = now.setDate(now.getDate() - (today - 1));
    startDate = new Date(startDate);
    var startDate_date = startDate.getDate();
    if (startDate_date < 10) {
      startDate_date = '0' + startDate_date;
    }
    var startDate_month = startDate.getMonth() + 1;
    if (startDate_month < 10) {
      startDate_month = '0' + startDate_month;
    }
    var startDate_year = startDate.getFullYear();
    var start_date = startDate_year + '' + startDate_month + '' + startDate_date;
    console.log(start_date);
    if (!this.$session.exists()) {
      console.log('********** 세션이 없습니다. **********');
    } else {
      console.log('********** 세션이 있습니다. **********');
      // this.u_num = this.$session.getAll();
      console.log('세션 값 확인 ' + this.$session.get('session'));
      var unum = this.$session.get('session');
      setTimeout(function() {
        axios({
          method: 'post',
          url: 'api/analysis/cate_used_goal_money',
          data: {
            u_num: unum,
            start_date: start_date
          }
        }).then((response) => {
          console.log('********** cate_used_goal_money 응답 받음 **********');

          var cate_goal = {};
          cate_goal = response.data.cate_goal;
          var cate_used = {};
          if(JSON.stringify(response.data)=='{}'){
            console.log('@@@@@@@@@@@@@@@@@@@@값이 없다!!!!!!!!!!!!!!!!!!!!!!!1');
            self.myCategoryConfig.scaleX.labels.push('소비내역이 없어서');
            self.myCategoryConfig.series[0].values.push('차트가 제공되지 않습니다.');
          }else {
            cate_used = response.data.cate_used;

            var result_sum = '';
            var result_min = '';
            for (var i = 0; i < cate_used.length; i++) {
              result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10);
              console.log(cate_used[i].cate_num + ' ++++++++++++++++++ ' + (cate_used[i].sum_price / cate_goal[i].g_price));
              if (cate_used[i].cate_num == 1) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                console.log(result_min + '리민값');
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              } else if (cate_used[i].cate_num == 2) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('교통');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              } else if (cate_used[i].cate_num == 3) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('식비');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              } else if (cate_used[i].cate_num == 4) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('패션/미용');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              } else if (cate_used[i].cate_num == 5) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('주거/통신');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              } else if (cate_used[i].cate_num == 6){
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('기타');
                self.myCategoryConfig.series[0].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 10));
              }
            }
          }
          zingchart.render({
            id: 'myCategoryChart',
            data: self.myCategoryConfig,
            height: '70%',
            width: '99%'
          });
        });
      }, 300);
    }
  }
}
</script>
