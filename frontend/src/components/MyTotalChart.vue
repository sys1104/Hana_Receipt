<template>
<div class="row">
  <div class="col-md-7" id='myTotalChart'>

  </div>
  <div class="col-md-5" style="margin-bottom:10%">
      <h4 v-if="result=='보통'"style="color:green"> < {{result}} > </h4>
      <h4 v-else-if="result=='위험'" style="color:orange"> < {{result}} > </h4>
      <h4 v-else-if="result=='매우위험'" style="color:red"> < {{result}} > </h4>
      <h4 v-else-if="result=='알뜰'" style="color:green"> < {{result}} > </h4>
      <h4 v-else-if="result=='매우알뜰'" style="color:green"> < {{result}} > </h4>
      <h4 v-else-if="result=='스튜핏!!!'" style="color:purple"> < {{result}} > </h4>

      <h5>{{u_name}}님은 현재 목표금액 <p>{{goal_price}}원</p> 중 <p>{{now_price}}원</p>을 사용하고 있습니다.</h5>
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
                console.log('myTotalChart start_date 날짜는 ' + start_date);
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
                      }else if((Math.floor((all_used[0].sum_price) / (all_goal[0].g_price) * 100)) > 100){
                        self.result = "스튜핏!!!";
                      }

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
                }
              }
}
</script>
<style scoped>
p{
  font-size: 50px;
  font-style: italic;
  color:orange;
}
h4{
  font-size: 65px;
}

</style>
