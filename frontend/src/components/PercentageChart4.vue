
<template>
<div>
  <div id='percentageChart4'></div>
  <div class="col-md-12 col-md-offset-2">
    <!-- 사용자와 동일 직업군 비교(percentageChart4)의 결과 글로 나타내기 -->
    <h5>다른 이용자는 <p><{{category}}></p>에 많은 비용을 지출하고 있습니다</h5>
  </div>
</div>
</template>

<script>
// 동일 직업군 비교 차트(기간 : 현재 날짜로 부터 한달전) --> percentageChart4
import axios from 'axios'
export default {
  data() {
    return {
      category: '',
      percentageConfig: {
        // 동일 직업군 비교 차트(파이차트)
        graphset: [{
          type: "pie",
          backgroundColor: "none",
          plot: {
            borderColor: "white",
            borderWidth: 1,
            // slice: ,
            valueBox: {
              placement: 'out',
              text: '%t\n%npv%',
              fontFamily: "Open Sans"
            },
            tooltip: {
              fontSize: '18',
              fontFamily: "Open Sans",
              padding: "5 10",
              text: "%npv%"
            },
            animation: {
              effect: 2,
              method: 5,
              speed: 500,
              sequence: 1
            }
          },
          subtitle: {
            offsetX: 10,
            offsetY: 0,
            fontColor: "#8e99a9",
            fontFamily: "Open Sans",
            fontSize: "20",
            text: '',
            align: "center"
          },
          plotarea: {
            margin: "0 0 0 0"
          },
          series: [{
              "values": [],
              "text": '생활/쇼핑',
              "background-color": "#50ADF5"
            },
            {
              "values": [],
              "text": '교통',
              "background-color": "#FF7965"
            },
            {
              "values": [],
              "text": '식비',
              "background-color": "#FFCB45"
            },
            {
              "values": [],
              "text": '패션/미용',
              "background-color": "#6877e5"
            },
            {
              "values": [],
              "text": '주거/통신',
              "background-color": "#6FB07F"
            },
            {
              "values": [],
              "text": '기타',
              "background-color": "#2C3E50"
            }
          ]
        }]
      }
    }
  },
  created() {
    var self = this;
    if (!this.$session.exists()) {
      console.log('********** 세션없음 (percentageChart4.vue) **********');
    } else {
      console.log('********** 세션있음 (percentageChart4.vue) **********');
      var unum = this.$session.get('session');
      //날짜 구하기위한 코드
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
      var end_date = start_date;
      var daysago = 30;
      start_date = new Date(date - (3600000 * 24 * daysago));
      var year2 = start_date.getFullYear();
      var month2 = new String(start_date.getMonth() + 1);
      var day2 = new String(start_date.getDate());
      // 한자리수일 경우 0을 채워준다.
      if (month2.length == 1) {
        month2 = "0" + month2;
      }
      if (day2.length == 1) {
        day2 = "0" + day2;
      }
      start_date = year2 + '' + month2 + '' + day2;
      setTimeout(function() {
        //DB 조회 후 현재날짜로 부터 지난 한달간 소비내역 데이터 response받기. (동일 직업군)
        axios({
          method: 'post',
          url: 'api/analysis/compare_user_other_job',
          data: {
            u_num: unum,
            start_date: start_date,
            end_date: end_date
          }
        }).then((response) => {
          console.log('********** compare_user_other_job 응답 받음 **********');
          var compare_other = {};
          compare_other = response.data.compare_other;
          self.percentageConfig.graphset[0].subtitle.text = compare_other[0].u_job + ' 직업군의 평균 소비내역';

          //카테고리 넘버에 맞는 카테고리명 지정 후 차트에 값(비율) 적용하기.
          var temp = -1;
          for (var k = 0; k < compare_other.length; k++) {
            if (compare_other[k].avg_price > temp) {
              self.category = compare_other[k].cate_num;
              temp = compare_other[k].avg_price;
              if (self.category == 1) {
                self.category = "생활/쇼핑";
              } else if (self.category == 2) {
                self.category = "교통";
              } else if (self.category == 3) {
                self.category = "식비";
              } else if (self.category == 4) {
                self.category = "패션/미용";
              } else if (self.category == 5) {
                self.category = "주거/통신";
              } else if (self.category == 6) {
                self.category = "기타";
              }
            }

            //카테고리별 소비내역 비율 지정 후 차트에 적용.(동일 직업군)
            if (compare_other[k].cate_num == 1) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price); //'생활/쇼핑'
            } else if (compare_other[k].cate_num == 2) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price); //'교통'
            } else if (compare_other[k].cate_num == 3) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 4) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 5) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price);
            } else if (compare_other[k].cate_num == 6) {
              self.percentageConfig.graphset[0].series[compare_other[k].cate_num - 1].values.push(compare_other[k].avg_price);
            }
          }
          //zingchart render
          zingchart.render({
            id: 'percentageChart4',
            data: self.percentageConfig,
            height: '430px',
            width: '430px'
          });
        });
      }, 600);
    }
  }
}
</script>
<!-- Vue Style을 위한 CSS -->
<style scoped>
@import 'https://fonts.googleapis.com/css?family=Open+Sans';
p {
  font-size: 50px;
  color: orange;
}
</style>
