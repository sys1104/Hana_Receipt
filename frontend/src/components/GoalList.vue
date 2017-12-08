<template>
  <div id="goallist" style="width:100%">
    <h2>설정한 목표 목록</h2>
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
         <td>시작</td>
         <td>끝</td>
         <td>카테고리</td>
         <td>금액</td>
         <td></td>
         <td></td>
        </tr>
        <tr class="table-body" v-for="(result, index) in results">
         <!-- 리스트 화면 -->
         <td v-if="flag==false">{{result.g_time}}</td>
         <td v-if="flag==false">{{result.g_endtime}}</td>
         <td>
           <select v-if="flag==false" v-model="result.cate_num" disabled class="form-control">
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
         </td>
         <td v-if="flag==false">{{result.g_price}}</td>
         <td><button v-if="flag==false" class="btn btn-primary" @click="editClick(result)">금액수정</button></td>

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
           <input class="form-control" name="g_price" v-if="flag==true && (result3 == result.g_num)" v-model='info3=result.g_price'/>
           <input class="form-control" v-if="flag==true && (result3 != result.g_num)" v-model='result.g_price' disabled/>
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
              alert('목표내역 수정이 완료되었습니다');
              setTimeout("window.location.href = './goal_management'",1000)
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
            alert('목표내역 삭제가 완료되었습니다');
            setTimeout("window.location.href = './goal_management'",1000)
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
