<template>
<div id='myTotalChart'></div>
</template>

<script>
// 나의 목표 금액 그래프
import axios from 'axios'
export default {
  data() {
    return {
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
          url: 'api/analysis/all_used_goal_money',
          data: {
            u_num: unum
          }
        }).then((response) => {
          console.log('********** all_used_goal_money 응답 받음 **********');
          console.log(response.data.all_used);
          console.log(response.data.all_goal);
          var all_used = {};
          all_used = response.data.all_used;
          var all_goal = {};
          all_goal = response.data.all_goal;
          console.log(Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100));
          self.mytotalconfig.graphset[0].series[1].values.push(Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100));
          zingchart.render({
            id: 'myTotalChart',
            data: self.mytotalconfig,
            height: '70%',
            width: '99%'
          });
        });
      }, 0)
    }
  }
}
</script>
