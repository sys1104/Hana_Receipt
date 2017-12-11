<template>
<div>
  <div class="col-md-6" id='myTotalChart'>

  </div>
  <div class="col-md-6">
      <h4 style="color:green">{{result}}</h4>
      <h4>{{u_name}}님은 현재 목표금액 {{goal_price}}원 중 {{now_price}}원을 사용하고 있습니다.</h4>
  </div>
</div>

</template>

<script>
// 나의 목표 금액 그래프
import axios from 'axios'
export default {
  data() {
    return {
      result : '',
      goal_price : '',
      now_price : '',
      u_name : '',
      mytotalconfig: {
        graphset: [{
          type: "bar",
          x: 55,
          y: 40,
          height: "100%",
          width: "100%",
          title: {
            text: "나의 목표",
            y: "80%",
            fontColor: "#515151",
            bold: true
          },
          scaleY: {
            lineColor: "none",
            values: "0:100:10",
            guide: {
              visible: true
            },
            tick: {
              margin: 3,
              lineWidth: 4,
              size: 15,
              lineColor: "#5F5F5F",
              placement: "outter",
              rules: [{
                rule: "%i % 2 == 1",
                lineWidth: 2
              }]
            },
            minorTicks: 4,
            minorTick: {
              lineColor: "#C1C1C1",
              placement: "inner",
              size: 7
            },
            item: {
              fontSize: 16,
              rules: [{
                rule: "%i % 2 == 1",
                visible: false
              }]
            }
          },
          "scale-y-2": {
            values: "0:100:10",
            lineColor: "none",
            item: {
              visible: false
            },
            guide: {
              visible: false
            },
            tick: {
              placement: "inner",
              size: 40,
              padding: 0,
              margin: 0,
              offsetX: 50,
              lineColor: "#fff",
              rules: [{
                rule: "%i == 0 || %i == 10",
                visible: false
              }]
            }
          },
          plot: {
            barsOverlap: "100%",
            borderRadius: 2,
            hoverState: {
              visible: false
            },
            tooltip: {
              visible: false
            }
          },
          plotarea: {
            marginBottom: "30%",
            marginTop: "0%",
            _marginRight: "0%"
          },
          scaleX: {
            visible: false
          },
          series: [{
              values: [100],
              backgroundColor: "#fff",
              borderWidth: 4,
              borderColor: "#C1C1C1",
              maxTrackers: 0,
              barWidth: "100%",
              tooltip: {
                visble: false
              }
            },
            {
              values: [],
              backgroundColor: "#F8B237",
              barWidth: "93%",
              maxTrackers: 0,
              tooltip: {
                visble: false
              },
              valueBox: {
                text: "%v",
                placement: "bottom-out",
                offsetY: 0,
                fontSize: 28,
                fontColor: "#515151",
              }
            }
          ]
        }]
      }
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
          self.mytotalconfig.graphset[0].series[1].values.push(Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100));
          if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) >=0 && (Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) <= 20){
            self.result = "매우 알뜰";
          }else if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) > 20 && (Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) <= 40){
            self.result = "알뜰";
          }else if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) > 40 && (Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) <= 60){
            self.result = "보통";
          }else if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) > 60 && (Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) <= 80){
            self.result = "위험";
          }else if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) > 80 && (Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) <= 100){
            self.result = "매우 위험";
          }
          self.goal_price = all_goal[0].g_price;
          self.now_price = all_used[0].sum_price;
          self.u_name = all_goal[0].u_name;
          zingchart.render({
            id: 'myTotalChart',
            data: self.mytotalconfig,
            height: '70%',
            width: '99%'
          });
        });
    }
  }
}
</script>
