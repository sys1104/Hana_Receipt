<!-- CREATE TABLE card
(
    `card_num`      INT            NOT NULL    AUTO_INCREMENT,
    `card_name`     VARCHAR(45)    NULL,
    `card_check`    INT            NULL,
    `domestic`      INT            NULL,
    `card_img`      VARCHAR(100)    NULL,
    `card_benefit`  VARCHAR(255)    NULL,
    `card_life`     INT    NULL,
    PRIMARY KEY (card_num)
); -->
<template>
<div id="cardbenefitlist" class="table-users" style="width:100%">
  <ul v-for="result in results">
    <li>{{result}}</li>
  </ul>
</div>
</template>

<script>
    import axios from 'axios'
    export default {
      data: function () {
        return {
          results:'',
          card_num:'',
          card_name:'',
          card_check:'',
          domestic:'',
          card_img:'',
          card_benefit:'',
          flag:false,
          result3 : ''
        }
      },
      components:{
      },
      methods :{
        // // 수정 후 완료클릭시 실행되는 function
        // editGoal(result) {
        //   console.log('********** front-end editGoal 호출 **********');
        //   var g_num = result.g_num;
        //   var u_num = result.u_num;
        //   var cate_num = result.cate_num;
        //   var g_price = result.g_price;
        //   var g_time = result.g_time;
        //   var g_endtime = result.g_endtime;
        //     axios({
        //       method: 'post',
        //       url: 'api/goal/edit_goal',
        //       data: {
        //         g_num:g_num,
        //         u_num:u_num,
        //         cate_num: cate_num,
        //         g_price: g_price,
        //         g_time: g_time,
        //         g_endtime: g_endtime
        //       }
        //     }).then(function(response) {
        //       console.log('********** 목표내역 수정완료 **********');
        //     //   alert('목표내역 수정이 완료되었습니다');
        //       setTimeout("window.location.href = './goal_management'",0)
        //     })
        // },
        // //수정 클릭시 실행되는 function
        // editClick(result) {
        //   console.log('********** front-end editClick 호출 **********');
        //   this.flag=true;
        //   this.result3 = result.g_num;
        // },
        // //삭제 클릭시 실행되는 function
        // deleteGoal(result) {
        //   var g_num = result.g_num;
        //   var unum = result.u_num;
        //   axios({
        //     method: 'post',
        //     url: 'api/goal/delete_goal',
        //     data: {
        //       g_num:g_num,
        //       u_num:unum
        //     }
        //   }).then(function(response) {
        //     console.log('********** 목표내역 삭제완료 **********');
        //     // alert('목표내역 삭제가 완료되었습니다');
        //     setTimeout("window.location.href = './goal_management'",0)
        //   })
        // }
    },
    created(){
        console.log('CardBenefit Created()')
        var self  = this;

        axios({
        method: 'post',
        url: 'api/card/card_benefit_list',
        data:{
          u_num:this.$session.get('session')
        }
      }).then(function (response) {
            self.results = response.data;
            // self.list_total = Number(response.data.length);
          })
      }
    }
</script>
