<template>
<div class="row">
  <div class="col-md-7" id='myTotalChart'>

  </div>
  <div class="col-md-5" style="margin-bottom:40%">
    <br><br><br>
      <h4 style="color:orange">  {{result}}  </h4>
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

              type: "gauge",
              globals: {
                fontSize: 25
              },
              plotarea:{
                marginTop:60
              },
              plot:{
                size:'100%',
                valueBox: {
                  placement: 'center',
                  text:'%v', //default
                  fontSize:30,
                  rules:[
                    {
                      rule: '%v > 0 && %v <= 20',
                      text: '%v<br><br>매우 알뜰'
                    },
                    {
                      rule: '%v > 20 && %v <= 40',
                      text: '%v<br><br>알뜰'
                    },
                    {
                      rule: '%v > 40 && %v <= 60',
                      text: '%v<br><br>보통'
                    },
                    {
                      rule: '%v > 60 && %v <= 80',
                      text: '%v<br><br>위험'
                    },
                    {
                      rule: '%v > 80 && %v < 100',
                      text: '%v<br><br>매우 위험'
                    }
                  ]
                }
              },
              tooltip:{
                borderRadius:5
              },
              scaleR:{
                aperture:180,
                minValue:0,
                maxValue:100,
                step:20,
                center:{
                  visible:false
                },
                tick:{
                  visible:false
                },
                item:{
                  offsetR:0,
                  rules:[
                    {
                      // rule:'%i == 4',
                      // offsetX:0
                    }
                  ]
                },
                // labels:['20','40','60','80','100'],
                ring:{
                  size:50,
                  rules:[
                    {
                      rule:'%v > -20 && %v <= 0',
                      backgroundColor:'black'
                    } ,
                    {
                      rule:'%v > 0 && %v <= 20',
                      backgroundColor:'#29B6F6'
                    },
                    {
                      rule:'%v > 20 && %v <= 40',
                      backgroundColor:'#FFA726'
                    },
                    {
                      rule:'%v > 40 && %v <= 60',
                      backgroundColor:'#EF5350'
                    },
                    {
                      rule:'%v > 60 && %v <= 80',
                      backgroundColor:'red'
                    },
                    // {
                    //   rule:'%v > 80 && %v <= 100',
                    //   backgroundColor:'red'
                    // }
                  ]
                }
              },
              series : [
                {
                  values : [], // starting value
                  backgroundColor:'black',
                  indicator:[],
                  animation:{
                    effect:1,
                    method:1,
                    sequence:6,
                    speed: 800
                },
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
                      self.mytotalconfig.graphset[0].series[0].values.push(Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100));
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

                      if(JSON.stringify(response.data)=='{}'){
                        self.now_price = 0;
                      }else {
                        self.now_price = all_used[0].sum_price;
                      }

                      self.u_name = all_goal[0].u_name;

                      zingchart.render({
                        id: 'myTotalChart',
                        data: self.mytotalconfig,
                        height: '400px',
                        width: '500px'
                      });
                    });
                }
              }
}
</script>
