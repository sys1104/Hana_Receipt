<template>
<div class="row">
  <div class="col-md-8"><p id="my1-p">카테고리별 금액</p><div id='myCategoryChart' style="margin-bottom: 0%; margin-top:-10%" ></div></div>
   <!-- style="margin-bottom: -14%;" -->
   <!-- style="margin-top:2%" -->
  <!-- 현재상태 역순 -->

  <div class="col-md-2" style="margin-bottom: -50%;">
    <p id="my1-p">남은 금액</p>
    <ul v-for="(result,index) in final_result2">
      <br>
      <li id="my-font">
       <p id="my-p1" v-if="final_result2.length==1" style="margin-top:110px;">{{result | currency('',0)}} 원</p>
      </li>
    </ul>
  </div>

  <div class="col-md-2" style="margin-bottom: -50%;">
    <p id="my1-p">평가</p>
    <ul v-for="(result,index) in final_result">
      <br>
      <li id="my-font">
       <p id="my-p2" v-if="result=='매우 알뜰'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='알뜰'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='보통'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='위험'" style="color:orange">{{result}}</p>
       <p id="my-p2" v-if="result=='매우 위험' && final_result.length==2" style="color:red; margin-top:50px;">{{result}}</p>
       <p id="my-p2" v-if="result=='매우 위험' && final_result.length==1" style="color:red; margin-top:110px;">{{result}}</p>

       <p id="my-p2" v-if="result=='스튜핏!!'" style="color:purple">{{result}}</p>


      </li>
    </ul>
  </div>
  <!-- 남은금액 역순 -->
  <!-- <div class="col-md-2" style="margin-bottom: 18%;">
    평가
    <ul v-for="(result,index) in final_result">
      <li id="my-font">
        <br>
        <p>{{result}}</p>
      </li>
    </ul>
  </div> -->
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
            // "title":{
            //     "text":"나의 카테고리별 금액",
            //     "font-family":"Arial",
            //     "background-color":"none",
            //     "font-color":"black",
            //     "font-size":"25px",
            // },
        //     "labels":[
        //         {
        //             "text":"카테고리",
        //             "font-size":"12px",
        //             "font-color":"#black",
        //             "x":"2%",
        //             "y":"12%"
        //         },
        //         {
        //             "text":"사용금액",
        //             "font-size":"12px",
        //             "font-color":"black",
        //             "x":"50%",
        //             "y":"12%"
        //         }
        //     ],
        backgroundColor: "none",
        tooltip: {
          visible: false
        },
        "plotarea":{
                "margin-right":"50px",
                "margin-bottom":"70px",
                "margin-left":"95px"
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
                "visible":true,
                "guide":{
                    "visible":true
                }
            },
          "plot":{
                    "bars-overlap":"100%",
                    "borderRadius":8,
                    "bar-space":"50px"
                },
                "plotarea":{
                    "margin":"50px -50px -100px 90px"
                },
      series: [
          {
                 //목표금액
                    "values":[],
                    "bar-width":"35px",
                    "background-color":"#f2f2f2",
                    "border-color": "#e8e3e3",
                    "border-width":2,
                    "fill-angle":90,
                    //  "value-box":{
                    //     "placement":"left",
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
                        "font-color":"black",
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
          //      // 문자열
          //   values: [], //배열 형식으로 지정해야함
          //           "value-box":{
          //               "placement":"over",
          //               "text":"%v",
          //               "font-color":"red",
          //               "font-size":"14px",
          //               "alpha":0.6
          //           },
          //           "rules":[
          //               {
          //                   "rule":"%i==0",
          //               },
          //               {
          //                   "rule":"%i==1",
          //               },
          //               {
          //                   "rule":"%i==2",
          //               },
          //               {
          //                   "rule":"%i==3",
          //               },
          //               {
          //                   "rule":"%i==4",
          //               },
          //               {
          //                   "rule":"%i==5",
          //               }
          //           ]
          // }
        ]
      }
    }
  },

  methods : {
    resultComment(result_sum, result_min){
      console.log('result_sum : ' + result_sum);
      var re2 = result_sum;
      //0~20
      if(re2 >=0 && re2 <= 20){
        this.results.push('매우 알뜰');
        this.results2.push(result_min);
      //21~40  
      }else if(re2 > 20 && re2 <= 40){
        this.results.push("알뜰");
        this.results2.push(result_min);
      //41~60  
      }else if(re2 > 40 && re2 <= 60){
        this.results.push("보통");
        this.results2.push(result_min);
      //61~80
      }else if(re2 > 60 && re2 <= 80){
        this.results.push("위험");
        this.results2.push(result_min);
      //81~100  
      }else if(re2 > 80 && re2 <= 100){
        this.results.push("매우 위험");
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
    var date = new Date();
    var year = date.getFullYear();
    var month = new String(date.getMonth()+1);
    var day = new String(date.getDate());
    // 한자리수일 경우 0을 채워준다.
    if(month.length == 1){
      month = "0" + month;
    }
    if(day.length == 1){
      day = "0" + day;
    }
    var start_date = year + '' + month + '' + day;
    console.log('myCategoryChart start_date는 ' + start_date);
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
            for (var i = 0; i < cate_goal.length; i++) {
              result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
              console.log(cate_used[i].cate_num + ' ++++++++++++++++++ ' + (cate_used[i].sum_price / cate_goal[i].g_price));
              console.log('ㅎㅇ!!' + cate_goal.length);
              if (cate_used[i].cate_num == 1 && cate_goal[i].g_price > 1) {  
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                console.log(result_min + '리민값');
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price  / cate_goal[i].g_price)*100)); //cate_used[i].sum_price
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 2 && cate_goal[i].g_price > 1) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('교통');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 3) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('식비');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 4) {
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('패션/미용');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 5) {
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('주거/통신');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 6){
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('기타');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              }
            }

          }
          zingchart.render({
            id: 'myCategoryChart',
            data: self.myCategoryConfig,
            height: '70%',
            width: '100%'
          });
        });
      }, 300);
    }
  }
}
</script>
<style scoped>
#my-font{
  font-size: 30px;

}
#my-p1{

  font-size:22px;
  line-height: 1.4em;
  font-weight: bold;
}
#my-p2{

  font-size:22px;
  line-height: 1.4em;
  font-weight: bold;
}
#my1-p{
  color:black;
  font-weight: bold;
  font-size:25px;
}
/* .em{
  line-height:1.1em;
} */
</style>
