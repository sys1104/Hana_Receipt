<template>
<div>
  <br>
    <div class="table-users">
      <div class="header">지난 주 낭비된 금액!!!</div>
      <table cellspacing="0">
      <!-- <table class="table table-striped table-hover table-responsive"> -->
        <tr>
          <th>카테고리</th>
          <th>금액</th>
        </tr>

        <tr class="table-body" v-for="(result,index) in results">
          <td>
            <select type="button" v-model="result.cate_num" disabled class="form-control">
              <option value="1">생활/쇼핑</option>
              <option value="2">교통</option>
              <option value="3">식비</option>
              <option value="4">패션/미용</option>
              <option value="5">주거/통신</option>
              <option value="6">미분류</option>
             </select>
          </td>

          <td style="text-align:center">{{info = result.sum_price}}</td>
        </tr>
      <tr><td></td><br><p style="font-weight:bold; color:#327a81" class="text-right">총액 : {{sum}}원</p><br></tr>
      </table>
      <hr>
  </div>
  
</div>

</template>


<script>
  import axios from 'axios'



  export default {
      data: function() {
        return {
          results: '',
          info:{},
          sum:''
        }
      },
      methods: {
        calculateDate() {
          console.log('********** front-end  호출 **********');
          var today = new date();
          console.log(today);
        }
      },
      created() {
        var self = this;
        var now = new Date();
        var today = now.getDay();
        var startDate = '';
        var endDate = '';
        if (today != 1) {
          startDate = now.setDate(now.getDate() - (today + 6));
          startDate = new Date(startDate);
        }
        endDate = now.setDate(now.getDate() + 6);
        endDate = new Date(endDate);
        var startDate_date = startDate.getDate();
        if(startDate_date < 10){
          startDate_date = '0'+startDate_date;
        }
        var startDate_month = startDate.getMonth() + 1;
        if(startDate_month < 10){
          startDate_month = '0'+startDate_month;
        }
        var startDate_year = startDate.getFullYear();
        var start_date = startDate_year + '' + startDate_month + '' + startDate_date;
        var endDate_date = endDate.getDate();
        if(endDate_date < 10){
          endDate_date = '0'+endDate_date;
        }
        var endDate_month = endDate.getMonth() + 1;
        if(endDate_month < 10){
          endDate_month = '0' + endDate_month ;
        }
        var endDate_year = endDate.getFullYear();
        var end_date = endDate_year + '' + endDate_month + '' + endDate_date;
        console.log(start_date);
        console.log(end_date);
        axios({
          method: 'post',
          url: 'api/consume_history/wastedList',
          data: {
            u_num: this.$session.get('session'),
            start_date: start_date,
            end_date: end_date
          }
        }).then(function(response) {
          self.results = response.data;
          // for( var i in self.results){
          //   self.sum += i.sum_price;
          // }
          var sum2 = 0;
          for(var i=0; i<self.results.length;i++){
            sum2 += parseInt(self.results[i].sum_price);
          }
          self.sum = sum2;
          console.log('self.sum값 : ' + self.sum);

        })
      }
  }
</script>

<style scoped>
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
}
</style>
