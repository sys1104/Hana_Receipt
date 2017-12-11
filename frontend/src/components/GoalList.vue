<template>
<div id="goallist" class="table-users" style="width:100%">
    <div class="header">설정한 목표 목록</div>
      <table class="table-responsive" style="margin-left:15%">
        <tr>
         <th>시작</th>
         <th>끝</th>
         <th>카테고리</th>
         <th>금액</th>
         <th colspan="20"></th>
        </tr>
        <tr class="table-body" v-for="(result, index) in results">
         <!-- 리스트 화면 -->
         <td v-if="flag==false">{{result.g_time}}</td>
         <td v-if="flag==false">{{result.g_endtime}}</td>
         <td v-if="flag==false">
           <select v-model="result.cate_num" disabled class="form-control" style="color:black;">
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
         </td>
         <td v-if="flag==false">{{result.g_price}}</td>
         <td v-if="flag==false"><button class="btn btn-primary" @click="editClick(result)" style="margin-left:100%">금액수정</button></td>

         <!-- ****************수정버튼 클릭시**************** -->
         <td>
           <input class="form-control" name="g_time" v-model='info1=result.g_time'v-if="flag==true && (result3 == result.g_num)" disabled/>
           <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_time' disabled/>
         </td>
         <td>
           <input class="form-control" name="g_endtime" v-model='info2=result.g_endtime' v-if="flag==true && (result3 == result.g_num)" disabled/>
           <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_endtime' disabled/>
         </td>
         <td>
           <select v-if="flag==true && (result3 == result.g_num)" v-model="result.cate_num" class="form-control" name="cate_num" disabled>
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
            <select v-if="flag==true && (result3 != result.g_num)" v-model="result.cate_num" class="form-control" disabled>
              <option value="1">생활/쇼핑</option>
              <option value="2">교통</option>
              <option value="3">식비</option>
              <option value="4">패션/미용</option>
              <option value="5">주거/통신</option>
              <option value="6">미분류</option>
             </select>
         </td>

         <td>
           <input class="form-control" style="text-align:center" name="g_price" v-if="flag==true && (result3 == result.g_num)" v-model='info3=result.g_price'/>
           <input class="form-control" style="text-align:center" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_price' disabled/>
         </td>
         <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-success" @click="editGoal(result)">완료</button></td>
         <td><button v-if="flag==true && (result.g_num == result3)" class="btn btn-danger" @click="deleteGoal(result)">삭제</button></td>
        </tr>
      </table>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data: function () {
        return {
          results:'',
          g_num:'',
          cate_num:'',
          g_time:'',
          g_price:'',
          g_endtime:'',
          info1:'',
          info2:'',
          info3:'',
          info4:'',
          flag:false,
          result3 : '',
          list_total : {},
          page_num : '',
          page:1,
          pageIndex:1,
          nextBtn:{},
          page_total:{}
        }
      },
      components:{
      },
      methods :{
        // // 수정 후 완료클릭시 실행되는 function
        editGoal(result) {
          console.log('********** front-end editGoal 호출 **********');
          var g_num = result.g_num;
          var u_num = result.u_num;
          var cate_num = result.cate_num;
          var g_price = result.g_price;
          var g_time = result.g_time;
          var g_endtime = result.g_endtime;
            axios({
              method: 'post',
              url: 'api/goal/edit_goal',
              data: {
                g_num:g_num,
                u_num:u_num,
                cate_num: cate_num,
                g_price: g_price,
                g_time: g_time,
                g_endtime: g_endtime
              }
            }).then(function(response) {
              console.log('********** 목표내역 수정완료 **********');
            //   alert('목표내역 수정이 완료되었습니다');
              setTimeout("window.location.href = './goal_management'",0)
            })
        },
        //수정 클릭시 실행되는 function
        editClick(result) {
          console.log('********** front-end editClick 호출 **********');
          this.flag=true;
          this.result3 = result.g_num;
        },
        //삭제 클릭시 실행되는 function
        deleteGoal(result) {
          var g_num = result.g_num;
          var unum = result.u_num;
          axios({
            method: 'post',
            url: 'api/goal/delete_goal',
            data: {
              g_num:g_num,
              u_num:unum
            }
          }).then(function(response) {
            console.log('********** 목표내역 삭제완료 **********');
            // alert('목표내역 삭제가 완료되었습니다');
            setTimeout("window.location.href = './goal_management'",0)
          })
        }
    },
    created(){
        console.log('GoalList Created()')
        var self  = this;

        axios({
        method: 'post',
        url: 'api/goal/request_goal',
        data:{
          u_num:this.$session.get('session')
        }
      }).then(function (response) {
            self.results = response.data;
            self.list_total = Number(response.data.length);
            for(var i=0;i<self.results.length;i++){
              console.log(self.results[i].g_num);
            }
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