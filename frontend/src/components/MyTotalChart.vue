<template>
<div class="row">
  <div class="col-md-12" id='myTotalChart'>
  </div>
</div>
</template>

<script>
// 나의 목표 금액 그래프 (Total)
import axios from 'axios'
export default {
  data() {
    //목표기간동안 소비내역을 차트에 설정
    return {
      result: '',
      goal_price: '',
      now_price: '',
      u_name: '',
      mytotalconfig: {
        graphset: [{
          type: "gauge",
          globals: {
            fontSize: 25
          },
          plotarea: {
            marginTop: 60
          },
          plot: {
            size: '100%',
            valueBox: {
              placement: 'center',
              text: '%v', //default
              fontSize: 30,
              rules: [{
                  rule: '%v > 0 && %v <= 20',
                  text: '%v%<br><br>매우 알뜰',
                  color: 'green'
                },
                {
                  rule: '%v > 20 && %v <= 40',
                  text: '%v%<br><br>알뜰',
                  color: '#29B6F6'
                },
                {
                  rule: '%v > 40 && %v <= 60',
                  text: '%v%<br><br>보통',
                  color: '#FFA726'
                },
                {
                  rule: '%v > 60 && %v <= 80',
                  text: '%v%<br><br>위험',
                  color: '#EF5350'
                },
                {
                  rule: '%v > 80 && 100 >= %v',
                  text: '%v%<br><br>매우 위험',
                  color: 'red'
                },
                {
                  rule: '%v>100',
                  text: '100% 초과',
                  color: 'purple'
                }
              ]
            }
          },
          tooltip: {
            borderRadius: 5
          },
          scaleR: {
            aperture: 180,
            minValue: 0,
            maxValue: 100,
            step: 20,
            center: {
              visible: false
            },
            tick: {
              visible: false
            },
            item: {
              offsetR: 0,
              rules: [{
                // rule:'%i == 4',
                // offsetX:0
              }]
            },
            ring: {
              size: 50,
              rules: [{
                  rule: '%v > -20 && %v <= 0',
                  backgroundColor: 'green'
                },
                {
                  rule: '%v > 0 && %v <= 20',
                  backgroundColor: '#29B6F6'
                },
                {
                  rule: '%v > 20 && %v <= 40',
                  backgroundColor: '#FFA726'
                },
                {
                  rule: '%v > 40 && %v <= 60',
                  backgroundColor: '#EF5350'
                },
                {
                  rule: '%v > 60 && %v <= 80',
                  backgroundColor: 'red'
                },
                // {
                //   rule:'%v > 80 && %v <= 100',
                //   backgroundColor:'red'
                // }
              ]
            }
          },
          series: [{
            values: [], // starting value
            backgroundColor: 'black',
            indicator: [10, 10, 10, 10, 0.75],
            animation: {
              effect: 1,
              method: 1,
              sequence: 6,
              speed: 800
            },
          }]
        }]
      }
    }
  },
  created() {
    var self = this;
    //날짜 계산을 위한 코드
    var date = new Date();
    var year = date.getFullYear();
    var month = new String(date.getMonth() + 1);
    var day = new String(date.getDate());
    // 한자리수일 경우 0을 채워준다.
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var start_date = year + '' + month + '' + day;
    if (!this.$session.exists()) {
      console.log('********** 세션없음 (MyTotalChart.vue) **********');
    } else {
      console.log('********** 세션있음 (MyTotalChart.vue) **********');
      var unum = this.$session.get('session');
      //목표대비 소비내역 차트를 위한 코드
      //DB 조회 후 결과 response받기.
      setTimeout(function() {
        axios({
          method: 'post',
          url: 'api/analysis/all_used_goal_money',
          data: {
            u_num: unum,
            start_date: start_date
          }
        }).then((response) => {
          console.log('********** all_used_goal_money 응답 받음 **********');
          var all_used = {};
          all_used = response.data.all_used;
          var all_goal = {};
          all_goal = response.data.all_goal;
          var used_goal = ((all_used[0].sum_price) / (all_goal[0].g_price) * 100);
          //100% 넘어가면 101로 처리. (목표금액 대비 소비내역이 초과되었을 경우)
          if (used_goal > 100) {
            used_goal = 101;
          }
          //목표금액, 현재까지 소비내역, 사용자명 각 변수에 저장
          self.mytotalconfig.graphset[0].series[0].values.push(Math.floor(used_goal));
          self.goal_price = all_goal[0].g_price;
          self.now_price = all_used[0].sum_price;
          self.u_name = all_goal[0].u_name;

          zingchart.render({
            id: 'myTotalChart',
            data: self.mytotalconfig,
            height: '400px',
            width: '500px'
          });
        });
      }, 200);
    }
  }
}
</script>
