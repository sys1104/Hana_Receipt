
<template>
<div>
<div id='percentageChart2'></div>
<div class="col-md-12 col-md-offset-2">
  <!-- 두번째 그래프 -->
 <h4>다른 사용자는 {{category}}에 가장 많은 비용을 지출하고 있습니다.</h4>
</div>
</div>
</template>

<script>
// 나와 이용자 평균 percentage
import axios from 'axios'
export default {
              data() {
                return {
                  category : '',
                  percentageConfig: {
                    // 두번째 파이
                    graphset:[{
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
                          tooltip:{
                            fontSize: '18',
                            fontFamily: "Open Sans",
                            padding: "5 10",
                            text: "%npv%"
                          },
                          animation:{
                            effect: 2,
                            method: 5,
                            speed: 500,
                            sequence: 1
                          }
                        },
                        // title: {
                        //   fontColor: "#fff",
                        //   text: 'Global Browser Usage',
                        //   align: "left",
                        //   offsetX: 10,
                        //   fontFamily: "Open Sans",
                        //   fontSize: 25
                        // },
                        subtitle: {
                          offsetX: 10,
                          offsetY: 0,
                          fontColor: "#8e99a9",
                          fontFamily: "Open Sans",
                          fontSize: "20",
                          text: '이용자 평균 소비내역',
                          align: "center"
                        },
                        plotarea: {
                          margin: "0 0 0 0"
                        },
                        series :
                         [{
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
              }},
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
                      startDate = now.setDate(now.getDate() - (today + 6));
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
                      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!' + start_date);
                      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!' + end_date);
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

                          var temp = -1;
                          for (var k = 0; k < compare_other.length; k++) {
                            if(compare_other[k].avg_price > temp){
                              self.category = compare_other[k].cate_num;
                              temp = compare_other[k].avg_price;
                              if(self.category == 1){
                                self.category = "생활/쇼핑";
                              }else if(self.category == 2){
                                self.category = "교통";
                              }else if(self.category == 3){
                                self.category = "식비";
                              }else if(self.category == 4){
                                self.category = "패션/미용";
                              }else if(self.category == 5){
                                self.category = "주거/통신";
                              }else if(self.category == 6){
                                self.category = "기타";
                              }
                              console.log(self.category);
                            }

                            if (compare_other[k].cate_num == 1) {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            } else if (compare_other[k].cate_num == 2) {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            } else if (compare_other[k].cate_num == 3) {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            } else if (compare_other[k].cate_num == 4) {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            } else if (compare_other[k].cate_num == 5) {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            } else {
                              self.percentageConfig.graphset[0].series[k].values.push(compare_other[k].avg_price);
                            }
                          }
                          zingchart.render({
                            id: 'percentageChart2',
                            data: self.percentageConfig,
                            height: '430px',
                            width: '430px'
                            // height: '90%',
                            // width: '99%'
                          });
                        });
                      }, 600);
                    }
  }
}
</script>
<style>
@import 'https://fonts.googleapis.com/css?family=Open+Sans';
</style>
