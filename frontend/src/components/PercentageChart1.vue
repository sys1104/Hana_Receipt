
<template>
<div>
  <div id='percentageChart1'></div>
  <div class="col-md-12 col-md-offset-2">
    <!-- 나의 소비내역(percentageChart1)의 결과 글로 나타내기 -->
    <h5>{{u_name}}님은 <p><{{category}}></p>에 많은 비용을 지출하고 있습니다</h5>
  </div>
</div>
</template>

<script>
// 나의 소비내역 차트(기간 : 현재 날짜로 부터 한달전) --> percentageChart1
import axios from 'axios'
export default {
  data() {
    return {
      u_name: '',
      category: '',
      percentageConfig: {
        // 나의 소비내역 차트(파이차트)
        graphset: [{
          type: "pie",
          backgroundColor: "none",
          plot: {
            borderColor: "white",
            borderWidth: 1,
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
            text: '나의 소비내역',
            align: "center"
          },
          plotarea: {
            margin: "0 0 0 0"
          },
          "series": [{
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
      console.log('********** 세션없음 (percentageChart1.vue) **********');
    } else {
      console.log('********** 세션있음 (percentageChart1.vue) **********');
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
        //DB 조회 후 현재날짜로 부터 지난 한달간 소비내역 데이터 response받기. (사용자)
        axios({
          method: 'post',
          url: 'api/analysis/compare_user_user',
          data: {
            u_num: unum,
            start_date: start_date,
            end_date: end_date
          }
        }).then((response) => {
          console.log('********** compare_user_user 응답 받음 **********');
          var compare_user = {};
          compare_user = response.data.compare_user;
          self.u_name = compare_user[0].u_name;

          //카테고리 넘버에 맞는 카테고리명 지정 후 차트에 값(비율) 적용하기.
          var temp = -1;
          for (var i = 0; i < compare_user.length; i++) {
            if (compare_user[i].sum_price > temp) {
              self.category = compare_user[i].cate_num;
              temp = compare_user[i].sum_price;
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

            //카테고리별 소비내역 비율 지정 후 차트에 적용.(사용자)
            if (compare_user[i].cate_num == 1) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 2) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 3) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 4) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 5) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            } else if (compare_user[i].cate_num == 6) {
              self.percentageConfig.graphset[0].series[compare_user[i].cate_num - 1].values.push(compare_user[i].sum_price);
            }
          }
          //zingchart render
          zingchart.render({
            id: 'percentageChart1',
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
