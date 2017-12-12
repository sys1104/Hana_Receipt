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
        "font-family":"Arial",
            "title":{
                "text":"나의 카테고리별 금액",
                "font-family":"Arial",
                "background-color":"none",
                "font-color":"#A4A4A4",
                "font-size":"18px"
            },
            "labels":[
                {
                    "text":"카테고리",
                    "font-size":"12px",
                    "font-color":"#9d9d9d",
                    "x":"0%",
                    "y":"12%"
                },
                {
                    "text":"사용금액",
                    "font-size":"12px",
                    "font-color":"#9d9d9d",
                    "x":"30%",
                    "y":"12%"
                }
            ],
        backgroundColor: "none",
        tooltip: {
          visible: false
        },
        "plotarea":{
                "margin":"60px 20px 20px 60px"
            },
        scaleX: {
                "line-color":"none",
                "labels":[],
                "tick":{
                    "visible":false
                },
                "guide":{
                    "visible":false
                },
                "item":{
                    "font-size":"14px",
                    "padding-right":"20px",
                    "auto-align":true,
                    "rules":[
                        {
                            "rule":"%i==0",
                            "font-color":"#FA8452"
                        },
                        {
                            "rule":"%i==1",
                            "font-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==2",
                            "font-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==3",
                            "font-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==4",
                            "font-color":"#6FA6DF"
                        },
                        {
                            "rule":"%i==5",
                            "font-color":"#E85D6F"
                        }
                    ]
                }
            },
        scaleY:{
                "visible":false,
                "guide":{
                    "visible":false
                }
            },
       "plot":{
                "bars-overlap":"100%",
                "borderRadius":8
            },
            // "plotarea":{
            //     "margin":"60px 20px 20px 140px"
            // },
        series: [
          { 
            
            //목표금액
           // values: [], //배열 형식으로 지정해야함
           
                    "values":[],
                    "bar-width":"40px",
                    "background-color":"#f2f2f2",
                    "border-color": "#e8e3e3",
                    "border-width":2,
                    "fill-angle":90,
                    //  "value-box":{
                    //     "placement":"top-out",
                    //     "padding":"200px",
                    //     "text":"목표 %v원",
                    //     "decimals":0,
                    //     "font-color":"#A4A4A4",
                    //     "font-size":"14px",
                    //     "alpha":0.6
                    // },
                    "tooltip":{
                        "visible":false
                    }
          },
          { 
             // 사용금액
            values: [], //배열 형식으로 지정해야함
            "bar-width":"32px",
                    "max-trackers":0,
                    "value-box":{
                        "placement":"top-out",
                        "text":"%v %",
                        "decimals":0,
                        "font-color":"#A4A4A4",
                        "font-size":"14px",
                        "alpha":0.6
                    },
                    "rules":[
                        {
                            "rule":"%i==0",
                            "background-color":"#FA8452"
                        },
                        {
                            "rule":"%i==1",
                            "background-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==2",
                            "background-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==3",
                            "background-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==4",
                            "background-color":"#6FA6DF"
                        },
                        {
                            "rule":"%i==5",
                            "background-color":"#E85D6F"
                        }
                    ]
          },
          // {

          // }
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
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 2) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('교통');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 3) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('식비');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 4) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('패션/미용');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 5) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('주거/통신');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 6){
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('기타');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*10));
                self.myCategoryConfig.series[0].values.push(100);
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
