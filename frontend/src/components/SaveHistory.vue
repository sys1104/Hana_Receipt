<template>
<div id="insertConsume" class="table-users" style="width:1000px; display:inline-block; margin-top:170px">
  <navi></navi>
  <div class="header">소비 관리</div>
  <br>
  <consume-history></consume-history>
  <br>
  <div class="table-users" style="width:100%">
  <div class="header">소비내역 저장</div>
  <br>
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
  <div class="form-group" style="col-md-8">
    <input type="text" placeholder="  소비품목 이름" v-model="content" class="form-control" name="content">
  </div>
  <div class="form-group">
    <input type="text" placeholder="  가격" v-model="price" class="form-control" name="price">
  </div>
  <div class="form-group">
    <input type="date" placeholder="  소비일자 예)20171205" v-model="c_time" class="form-control" name="c_time">
  </div>
  <!-- <div class="form-group">
    <input type="email" placeholder="낭비체크" v-model="wasted" class="form-control" name="wasted">
  </div> -->
  <button @click.prevent="requestHistory" class="btn"
  style="width:150px; background-color:#327a81; color:white; font-weight:bold">저 장</button>
  <br><br>
  </div>
  <br>
</div>
</template>

<script>
import axios from 'axios'
import ConsumeHistory from './ConsumeHistory.vue'
import Navi from './Navi.vue'
export default {
  data: function() {
    return {
      u_num:'',
      results:'',
      cate_num: '',
      content: '',
      price: '',
      c_time: '',
      wasted: '0'
    }
  },
  components: {
    ConsumeHistory,
    Navi
  },
  methods: {
    requestHistory() {
      console.log('********** front-end requestHistory 호출 **********');
      var u_num = this.$session.get('session');
      var cate_num = this.cate_num;
      var content = this.content;
      var price = this.price;
      var c_time = this.c_time;
      var wasted = this.wasted;
        axios({
          method: 'post',
          url: 'api/consume_history/requestHistory',
          data: {
            u_num:u_num,
            cate_num: cate_num,
            content: content,
            price: price,
            c_time: c_time,
            wasted: wasted
          }
        }).then(function(response) {
          console.log('********** 소비내역 저장완료 **********');
          setTimeout("window.location.href = './save_history'",0)
        })
    },
        getToday(){
            console.log('getToday!')
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
            dd='0'+dd
            }
            if(mm<10) {
                mm='0'+mm
            }
            console.log(yyyy + '-'+ mm + '-' + dd);
            this.c_time = yyyy + '-'+ mm + '-' + dd;
        }
  },
  created(){
    console.log('save_history')
    this.getToday();
    }


}//exportDefault


</script>
<style scoped>
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
    font-weight: bold;
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
    font-weight: bold;
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

    /* button style */


    /* pagination */


}
</style>
