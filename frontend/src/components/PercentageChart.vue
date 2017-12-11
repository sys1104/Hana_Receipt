
<template>
<div id='percentageChart'></div>
</template>

<script>
// 나와 이용자 평균 percentage
import axios from 'axios'
export default {
  data() {
    return {
      percentageConfig: {
        "layout": "h",
        "globals": {
          "font-family": "Roboto"
        },
        "graphset": [
          // 첫번째 파이
          {
            "type": "pie",
            "background-color": "none",
            "legend": {
              "background-color": "none",
              "border-width": 0,
              "shadow": false,
              "layout": "float",
              "margin": "auto auto 8% auto",
              "margin-top" : "80%",
              "font-size" : 100,
              "marker": {
                "border-radius": 3,
                "border-width": 0
              },
              "item": {
                "color": "%backgroundcolor"
              }
            },
            "plotarea": {
              "background-color": "none",
              "border-color": "none",
              "border-width": 1,
              "border-radius": 3,
              "margin": "15% 5%"
            },
            "labels": [{
              "x": "45%",
              "y": "47%",
              "width": "10%",
              "text": "나의 평균 소비",
              "font-size": 18
            }],
            "plot": {
              "size": 100,
              "slice": 70,
              "margin-right": 100,
              "border-width": 0,
              "shadow": 0,
              "value-box": {
                "visible": false
              },
              "tooltip": {
                "text": "%v원",
                "shadow": false,
                "border-radius": 3
              }
            },
            "series": [{
                "values": [],
                "text": '생활/쇼핑',
                "background-color": "#E85D6F",
                "font-size": 18
          
              },
              {
                "values": [],
                "text": '교통',
                "background-color": "#F7BE70"
              },
              {
                "values": [],
                "text": '식비',
                "background-color": "#90EAE2"
              },
              {
                "values": [],
                "text": '패션/미용',
                "background-color": "blue"
              },
              {
                "values": [],
                "text": '주거/통신',
                "background-color": "red"
              },
              {
                "values": [],
                "text": '기타',
                "background-color": "black"
              }
            ]
          },
          // 두번째 파이
          {
            "type": "pie",
            "background-color": "none",
            "legend": {
              "background-color": "none",
              "border-width": 0,
              "shadow": false,
              "layout": "float",
              "margin": "auto auto 8% auto",
              "margin-top" : "80%",
              "marker": {
                "border-radius": 3,
                "border-width": 0
              },
              "item": {
                "color": "%backgroundcolor"
              }
            },
            "title": {
              // "text":"카테고리별 평균 소비량",
              "background-color": "none",
              "color": "#626262",
              "font-size": 32,
              "x": -52,
              "y": 80
            },
            "plotarea": {
              "background-color": "none",
              "border-color": "none",
              "border-width": 1,
              "border-radius": 3,
              "margin": "10% 5%"
            },
            "labels": [{
              "x": "45%",
              "y": "47%",
              "width": "10%",
              "text": "이용자 평균 소비",
              "font-size": 18
            }],
            "plot": {
              "size": 100,
              "slice": 70,
              "border-width": 0,
              "shadow": 0,
              "value-box": {
                "visible": false
              },
              "margin-top" : "30px",
              // 마우스 올릴 때
              "tooltip": {
                "text": "%v원",
                "shadow": false,
                "border-radius": 3,
                "font-size" : 50
              }
            },
            "series": [{
                "values": [],
                "text": '생활/쇼핑',
                "background-color": "#E85D6F"
              },
              {
                "values": [],
                "text": '교통',
                "background-color": "#F7BE70"
              },
              {
                "values": [],
                "text": '식비',
                "background-color": "#90EAE2"
              },
              {
                "values": [],
                "text": '패션/미용',
                "background-color": "blue"
              },
              {
                "values": [],
                "text": '주거/통신',
                "background-color": "red"
              },
              {
                "values": [],
                "text": '기타',
                "background-color": "black"
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    var self = this;
    // this.myCategoryConfig.scaleX.labels.push('생활/쇼핑');
    if (!this.$session.exists()) {
      console.log('********** 세션이 없습니다. **********');
    } else {
      console.log('********** 세션이 있습니다. **********');
      // this.u_num = this.$session.getAll();
      console.log('세션 값 확인 ' + this.$session.get('session'));
      var unum = this.$session.get('session');
      var now = new Date();
      var today = now.getDay();
      var startDate = '';
      var endDate = '';
      startDate = now.setDate(now.getDate() - (today + 2));
      startDate = new Date(startDate);
      endDate = now.setDate(now.getDate() + 7);
      endDate = new Date(endDate);
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
      var endDate_date = endDate.getDate();
      if (endDate_date < 10) {
        endDate_date = '0' + endDate_date;
      }
      var endDate_month = endDate.getMonth() + 1;
      if (endDate_month < 10) {
        endDate_month = '0' + endDate_month;
      }
      var endDate_year = endDate.getFullYear();
      var end_date = endDate_year + '' + endDate_month + '' + endDate_date;
      setTimeout(function() {
        axios({
          method: 'post',
          url: 'api/analysis/compare_user_other',
          data: {
            u_num: unum,
            start_date: start_date,
            end_date: end_date
          }
        }).then((response) => {
          console.log('********** compare_user_other 응답 받음 **********');
          var compare_user = {};
          compare_user = response.data.compare_user;
          var compare_other = {};
          compare_other = response.data.compare_other;
          for (var i = 0; i < compare_user.length; i++) {
            if (compare_user[i].cate_num == 1) {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 2) {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 3) {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 4) {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 5) {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            } else {
              self.percentageConfig.graphset[0].series[i].values.push(compare_user[i].sum_price);
            }
          }
          for (var k = 0; k < compare_other.length; k++) {
            if (compare_other[k].cate_num == 1) {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 2) {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 3) {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 4) {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 5) {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            } else {
              self.percentageConfig.graphset[1].series[k].values.push(compare_other[k].avg_price);
            }
          }
          zingchart.render({
            id: 'percentageChart',
            data: self.percentageConfig,
            height: '70%',
            width: '99%'
          });
        });
      }, 600);
    }
  }
}
</script>
