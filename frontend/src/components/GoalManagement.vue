<template>
<div id="insertGoal">
  <navi></navi>
  <div class="container">
    <wasted></wasted>
    <h2>목표 저장하기</h2>
    <div class="form-group">
      <select v-model="cate_num" class="form-control" name="cate_num">
        <option value="1">생활/쇼핑</option>
        <option value="2">교통</option>
        <option value="3">식비</option>
        <option value="4">패션/미용</option>
        <option value="5">주거/통신</option>
        <option value="6">미분류</option>
       </select>
    </div>
    <div class="form-group">
      <input type="text" placeholder="목표기간" v-model="g_time" class="form-control" name="g_time">
    </div>
    <div class="form-group">
      <input type="text" placeholder="목표금액" v-model="g_price" class="form-control" name="g_price">
    </div>
    <button @click.prevent="goalStore" class="btn btn-success">저장</button>
  </div>
</div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import Login from './Login.vue'
import Wasted from './Wasted.vue'
import InsertGoal from './InsertGoal.vue'
import Navi from './Navi.vue'
export default {
  data: function() {
    return {
      u_num:'',
      results:'',
      cate_num: '',
      g_time: '',
      g_price: ''
    }
  },
  components: {
    Wasted,
    Navi,
    InsertGoal
  },
  methods: {
    goalStore() {
      console.log('********** front-end goalStore 호출 **********');
      var u_num = this.u_num;
      var cate_num = this.cate_num;
      var g_time = this.g_time;
      var g_price = this.g_price;
        axios({
          method: 'post',
          url: 'api/goal/save_goal',
          data: {
            u_num:this.$session.get('session'),
            cate_num: cate_num,
            g_time: g_time,
            g_price: g_price
          }
        }).then(function(response) {
          console.log('********** 목표내역 저장완료 **********');
          alert('목표내역 저장 완료되었습니다');
          setTimeout("window.location.href = './goal_management'",1000)
        })
    }
  },
  created(){
    console.log('GoalManagement created()')
    }
}
</script>


    <style>
        .box-container{
            border-style: solid;
            border-width: 2px;
            padding: 10px;
        }
        .table-header{
            font-size: 20px;
            font-weight: bold;
        }
        .table-color{
            background-color: lightgrey;
        }
    </style>
