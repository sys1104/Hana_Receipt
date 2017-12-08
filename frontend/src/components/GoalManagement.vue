<template>

  
  <div id="insertGoal" class="table-users" style="margin-top:150px">
      <navi></navi>
  <div class="header">목표 관리</div>
  <br>
  <div class="container">
    <wasted></wasted>
    <div class="col-md-10; table-users">
    <div class="header">목표 저장하기</div>
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
      g_price: '',
      form_num : 1,
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

        body {
            background-color: #91ced4;
        }

        body * {
            box-sizing: border-box;
        }

        .header {
            background-color: #327a81;
            color: white;
            font-size: 1.5em;
            padding: 1rem;
            text-align: center;
            text-transform: uppercase;
        }

        .table-users {
            border: 1px solid #327a81;
            border-radius: 10px;
            box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
            max-width: calc(100% - 2em);
            margin: 1em auto;
            overflow: hidden;
            width: 800px;
        }

        table {
            width: 100%;
        }

        table td,
        table th {
            color: #2b686e;
            padding: 10px;
        }

        table td {
            text-align: center;
            vertical-align: middle;
        }

        table td:last-child {
            font-size: 0.95em;
            line-height: 1.4;
            text-align: left;
        }

        table th {
            background-color: #daeff1;
            font-weight: 300;
        }

        table tr:nth-child(2n) {
            background-color: white;
        }

        table tr:nth-child(2n+1) {
            background-color: #edf7f8;
        }

        @media screen and (max-width: 700px) {
            table,
            tr,
            td {
                display: block;
            }
            td:first-child {
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                width: 100px;
            }
            td:not(:first-child) {
                clear: both;
                margin-left: 100px;
                padding: 4px 20px 4px 90px;
                position: relative;
                text-align: left;
            }
            td:not(:first-child):before {
                color: #91ced4;
                content: '';
                display: block;
                left: 0;
                position: absolute;
            }
            td:nth-child(2):before {
                content: 'Name:';
            }
            td:nth-child(3):before {
                content: 'Email:';
            }
            td:nth-child(4):before {
                content: 'Phone:';
            }
            td:nth-child(5):before {
                content: 'Comments:';
            }
            tr {
                padding: 10px 0;
                position: relative;
            }
            tr:first-child {
                display: none;
            }
        }

        @media screen and (max-width: 500px) {
            .header {
                background-color: transparent;
                color: white;
                font-size: 2em;
                font-weight: 700;
                padding: 0;
                text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
            }
            td:first-child {
                background-color: #c8e7ea;
                border-bottom: 1px solid #91ced4;
                border-radius: 10px 10px 0 0;
                position: relative;
                top: 0;
                -webkit-transform: translateY(0);
                transform: translateY(0);
                width: 100%;
            }
            td:not(:first-child) {
                margin: 0;
                padding: 5px 1em;
                width: 100%;
            }
            td:not(:first-child):before {
                font-size: .8em;
                padding-top: 0.3em;
                position: relative;
            }
            td:last-child {
                padding-bottom: 1rem !important;
            }
            tr {
                background-color: white !important;
                border: 1px solid #6cbec6;
                border-radius: 10px;
                box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
                margin: 0.5rem 0;
                padding: 0;
            }
            .table-users {
                border: none;
                box-shadow: none;
                overflow: visible;
            }
        }
        </style>