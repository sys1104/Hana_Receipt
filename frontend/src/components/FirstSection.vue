<template id="test">
<div>
      <!-- 로그인이 안되었을 경우 Vue -->
      <div v-if="$session.exists() == false" class="container">
        <br><br>
        <div class="row">
        <div class="row">
          <img src="img/invoice2.png" style="height:180px; width:200px">
          <img src="img/arrow1.png" style="height:80px; margin-left:50px; margin-right:50px; margin-top:50px">
          <img src="img/calendar2.png" style="height:180px; width:200px">
          <img src="img/arrow1.png" style="height:80px; margin-left:50px; margin-right:50px; margin-top:50px">
          <img src="img/creditcard2.png" style="height:180px; width:200px">
        </div>
        <div class="row" style="margin-top:50px">
          <div>
          <h6>소비 관리</h6>
          <p class="custom-p"><span style="font-weight:bold">하나 영수증</span>을 작성한 후<br><span style="font-weight:bold">카테고리 별 소비내역</span>을 확인합니다.
          <br>소비내역에서 <span style="font-weight:bold">낭비</span>된다고 생각하는<br>항목을 체크할 수 있습니다.</p>
          </div>
        <div style="margin-left:90px">
          <h6>목표 관리</h6>
          <p class="custom-p">낭비된 카테고리를 확인한 후 카테고리별 <br> <span style="font-weight:bold">기간에 따른 목표 금액</span>을 설정합니다.
          <br>목표 설정에 따른 목표금액 및 사용금액을 <br> 그래프로 확인할 수 있습니다.</p>
        </div>
        <div style="margin-left:130px">
          <h6>카드 추천</h6>
          <p class="custom-p">사용자의 소비 카테고리를 분석하여<br><span style="font-weight:bold">각 혜택에 따라 적합한 카드</span>를<br>추천받을 수 있습니다.</p>
          </div>
        </div>
        </div>

      </div>

      <!-- 로그인 후 vue (목표설정 있을 경우) -->
      <div v-if="$session.exists() == true && !goal_price =='' " class="container" id="hi">
        <br>
        <h2 class="text-center text-uppercase text-secondary mb-0">목표금액 : {{goal_price | currency('',0)}}원</h2>
        <h5 class="text-center text-uppercase text-secondary mb-0">- 기간 : {{start_date}} ~ {{end_date}} -</h5>
        <br>
        <div class="row">
          <div class="col-md-7">
            <!-- MyTotalChart import -->
                <my-total-chart></my-total-chart>
          </div>
          <div class="col-md-5" style="margin-bottom:10%">
            <h5>{{u_name}}님은 현재 목표금액 <p>{{goal_price | currency('',0)}}원</p> 중 <p>{{now_price | currency('',0)}}원</p>을 사용하고 있습니다.</h5>
          </div>
        </div>
      </div>

        <!-- 로그인 후 vue (목표설정 없을 경우) -->
      <div v-if="$session.exists() == true && goal_price.length <= 0 " class="container" id="hi">
        <br>
        <h2 class="text-center">목표금액</h2>
        <br>
        <div class="row">
          <div class="col-md-7">
                <my-total-chart></my-total-chart>
          </div>
            <div class="col-md-5" style="margin-bottom:10%">
              <br>
            <h5>목표금액을<br>설정해주세요.</h5>
            <br>
            <router-link to="/goal_management"><button id="white" class="btn btn-danger">목표 설정 하러가기</button></router-link>
          </div>
        </div>
      </div>
</div>
</template>

<!-- Vue Style을 위한 CSS -->
<style scoped>
      .btn{
        width:250px;
        height: 50px;
      }
      #white{
        color:white;
        font-weight: bold;
        font-size: 20px;
      }
      p{
          font-size: 50px;
          font-style: italic;
          color:orange;
        }
        h4{
          font-size: 60px;
        }

      #hi{
        background-color : white;
      }
      h6{
        font-weight: bold;
      }
      .custom-p{
        color:black;
        font-size: 15px;
        font-style: normal
  }
</style>

<script>
import axios from 'axios'
import MyTotalChart from './MyTotalChart.vue'

export default {
    data() {
      return {
        goal_price : '',
        now_price : '',
        u_name : '',
        u_num : '',
        start_date : '',
        end_date : '',
      }
    },
    components : {
        MyTotalChart
    },
    methods : {
        //날짜 변환 메소드
        getDate(){
          axios({
          method: 'post',
          url: 'api/goal/request_goal',
          data: {
            u_num: this.$session.get('session')
          }
        }).then((response) => {
          console.log('********** request_goal 응답 받음');
          if(JSON.stringify(response.data)=='[]'){
            console.log('@@ getDate 메소드 response.data가 없음(FirstSection.vue) @@');
          }else {
            console.log('@@ getDate 메소드 response.data가 있음(FirstSection.vue) @@');
            this.start_date = response.data[0].g_time;
            this.end_date = response.data[0].g_endtime;
          }
        });
        }
    },
    created() {
      this.getDate();
      var self = this;
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
      console.log('---- FirstSection의 start_date 값 : ' + start_date);

      //목표금액과 기간을 나타내기 위한 response받기.
      axios({
        method: 'post',
        url: 'api/analysis/all_used_goal_money',
        data: {
          u_num: this.$session.get('session'),
          start_date: start_date
        }
      }).then((response) => {
        console.log('********** all_used_goal_money 응답 받음 => 목표금액합산 **********');
        var all_used = {};
        all_used = response.data.all_used;

        console.log('---- 사용자의 목표기간 동안 소비내역 : ' + all_used[0].sum_price);

        var all_goal = {};
        all_goal = response.data.all_goal;
        //목표금액 goal_price변수에 저장
        if(all_goal[0].g_price == null){
          self.goal_price = '';
        }else{
          self.goal_price = all_goal[0].g_price;
        }
        //목표대비 현재까지 사용금액 now_price변수에 저장
        self.now_price = all_used[0].sum_price;
        if(self.now_price==null){
          self.now_price = 0;
        }
        self.u_name = all_goal[0].u_name;
      });
    }
}
</script>
