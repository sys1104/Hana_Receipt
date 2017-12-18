<template>
<div class="col-md-12">
  <div class="row">
    <!-- 카테고리별 소비 Percent 그래프 -->
  <div id='myCategoryChart' class="col-md-8">
    <p id="my1-p">카테고리별 금액</p>
  </div>
  <!-- 목표대비 남은금액 표시 -->
  <div class="col-md-2">
    <p id="my1-p">남은 금액</p>
    <br>
    <ul v-for="(result,index) in final_result2">
      <li id="my-font" >
       <p id="my-p1">{{result | currency('',0)}}</p>
      </li>
    </ul>
  </div>
  <!-- 남은금액에 따른 범위별 평가 표시 -->
  <div class="col-md-2">
    <p id="my1-p">평가</p>
        <br>
    <ul v-for="(result,index) in final_result">
      <li id="my-font">
       <p id="my-p2" v-if="result=='매우 알뜰'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='알뜰'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='보통'" style="color:green">{{result}}</p>
       <p id="my-p2" v-if="result=='위험'" style="color:orange">{{result}}</p>
       <p id="my-p2" v-if="result=='매우 위험'" style="color:red">{{result}}</p>
       <p id="my-p2" v-if="result=='스튜핏!!'" style="color:purple">{{result}}</p>
      </li>
    </ul>
  </div>
  </div>
</div>
</template>

<script>
// 카테고리별 목표금액 그래프
import axios from 'axios'
export default {
  data() {
    //목표기간동안 카테고리별 소비내역을 차트에 설정
    return {
      results : [],
      results2 : [],
      final_result : [],
      final_result2 : [],
      myCategoryConfig: {
        type: "hbar",
        "font-family":"Arial",
        backgroundColor: "none",
        tooltip: {
          visible: false
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
                    // "padding-right":"20px",
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
                    "borderRadius":8
                },
          "plotarea":
           //top right bottom left
            {
                    "margin" :"20px 20px auto 70px"
                    // "margin":"100px 10px -200px 70px"
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
        ]
      }
    }
  },

  methods : {
    //범위별 상태(평가)알림을 위한 메소드
    resultComment(result_sum, result_min){
      //result_sum ==> 목표대비 소비한 내역 percent
      //result_min ==> 목표대비 소비내역을 차감한 금액 (남은금액)
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
      //reverse로 데이터 뽑기위한 코드
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
    //날짜를 계산하기 위한 코드
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
    console.log('---- MyCategoryChart의 start_date는 : ' + start_date);
    if (!this.$session.exists()) {
      console.log('********** 세션없음 (MyCategoryChart.vue) **********');
    } else {
      console.log('********** 세션있음 (MyCategoryChart.vue) **********');
      var unum = this.$session.get('session');
      //카테고리별 소비내역 차트를 위한 코드
      //DB 조회 후 결과 response받기.
      setTimeout(function() {
        axios({
          method: 'post',
          url: 'api/analysis/cate_used_goal_money',
          data: {
            u_num: unum,
            start_date: start_date
          }
        }).then((response) => {
          console.log('********** front-end cate_used_goal_money 응답 받음 **********');

          var cate_goal = {};
          cate_goal = response.data.cate_goal;
          var cate_used = {};
          if(JSON.stringify(response.data)=='{}'){
            console.log('@@ response.data가 없음(MyCategoryChart.vue) @@');
            self.myCategoryConfig.scaleX.labels.push('소비내역이 없어서');
            self.myCategoryConfig.series[0].values.push('차트가 제공되지 않습니다.');
          }else {
            cate_used = response.data.cate_used;
            var result_sum = ''; //result_sum ==> 목표기간 동안 소비내역 퍼센티지
            var result_min = ''; //result_min ==> 목표금액대비 소비내역 차감한 금액
            //각 카테고리별 목표기간동안 소비내역을 그래프에 출력하기위한 코드.(for 문)
            for (var i = 0; i < cate_goal.length; i++) {
              if (cate_used[i].cate_num == 1) {
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price  / cate_goal[i].g_price)*100)); //cate_used[i].sum_price
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 2) {
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('교통');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 3) {
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('식비');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 4) {
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min =(cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('패션/미용');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 5) {
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('주거/통신');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              } else if (cate_used[i].cate_num == 6){
                result_sum = Math.floor((cate_used[i].sum_price / cate_goal[i].g_price) * 100);
                result_min = (cate_goal[i].g_price - cate_used[i].sum_price);
                self.resultComment(result_sum, result_min);
                self.myCategoryConfig.scaleX.labels.push('기타');
                self.myCategoryConfig.series[1].values.push(Math.floor((cate_used[i].sum_price / cate_goal[i].g_price)*100));
                self.myCategoryConfig.series[0].values.push(100);
              }
            }
          }
          //zingchart render
          zingchart.render({
            id: 'myCategoryChart',
            data: self.myCategoryConfig,
            height: '75%',
            width: '100%'
          });

        });
      }, 200);
    }
  }
}
</script>
<!-- Vue Style을 위한 CSS -->
<style scoped>
#my-font{
  font-size: 30px;

}
#my-p1{

  font-size:22px;
  font-weight: bold;
}
#my-p2{

  font-size:22px;
  font-weight: bold;
}
#my1-p{
  color:black;
  font-weight: bold;
  font-size:25px;
}
</style>
