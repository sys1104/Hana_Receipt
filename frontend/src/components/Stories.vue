<template>
  <div id="stories" style="width:100%">
    <h2>소비내역 목록</h2>
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
         <!-- <td>소비번호</td> -->
         <td>카테고리</td>
         <td>내용</td>
         <td>가격</td>
         <td>일시</td>
        </tr>
        <!-- v-if="index < page_num" -->
        <tr class="table-body" v-for="(result,index) in results" v-if="index>= (page-1)*numberInpage && index<numberInpage*page">
         <!-- 리스트 화면 -->
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
         <!-- <td v-if="flag==false">{{result.consume_num}}</td> -->
         <td v-if="flag==false">{{result.content}}</td>
         <td v-if="flag==false">{{result.price}}</td>
         <td v-if="flag==false" >{{result.time}}</td>
         <td><button v-if="flag==false" class="btn btn-primary" @click="editClick(result)">수정</button></td>
         <!-- 수정버튼 클릭시 -->
         <td>
           <select v-if="flag==true && (result.consume_num == result3)" v-model="result.cate_num" class="form-control" name="cate_num">
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
            <select v-if="flag==true && (result.consume_num != result3)" v-model="result.cate_num" class="form-control" disabled>
              <option value="1">생활/쇼핑</option>
              <option value="2">교통</option>
              <option value="3">식비</option>
              <option value="4">패션/미용</option>
              <option value="5">주거/통신</option>
              <option value="6">미분류</option>
             </select>
         </td>
         <!-- <td><input class="form-control" name="cate_num" v-if="flag==true && (result.consume_num == result3)" v-model='info1=result.cate_num'/></td> -->
         <td>
           <input class="form-control" name="content" v-if="flag==true && (result.consume_num == result3)" v-model='info2=result.content'/>
           <input class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.content' disabled/>
         </td>
         <!-- <td><input class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.content' disabled/></td> -->
         <td>
           <input class="form-control" name="price" v-if="flag==true && (result.consume_num == result3)" v-model='info3=result.price'/>
           <input class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.price' disabled/>
         </td>
         <td>
           <input class="form-control" name="time" v-if="flag==true && (result.consume_num == result3)" v-model='info4=result.time'/>
           <input class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.time' disabled/>
         </td>
         <td><button v-if="flag==true && (result.consume_num == result3)" class="btn btn-success" @click="editConsume(result)">완료</button></td>
         <td><button v-if="flag==true && (result.consume_num == result3)" class="btn btn-danger" @click="delConsume(result)">삭제</button></td>
        </tr>
        <!-- <div class="pagination">
        <ul id="pagination" class="pagination" >
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="#" v-for="i in 4">{{ i }}</a></li>
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        </div> -->
        <div>
        <ul v-for="i in list_total" class="list-group">
          <li class="list-group-item">
            <button class="btn btn-danger" @click="pageto(i)">{{i}}</button>
          </li>
        </ul>
        <!-- <button class="btn btn-danger" @click="pageto(i)">{{i}}</button> -->
        <!-- <button class="btn btn-danger" @click="pageto(2)">2</button>
        <button class="btn btn-danger" @click="pageto(3)">3</button> -->
        </div>
      </table>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data: function () {
        // editing: true
        return {
          results:'',
          consume_num:'',
          cate_num:'',
          content:'',
          price:'',
          time:'',
          info0:'',
          info1:'',
          info2:'',
          info3:'',
          info4:'',
          flag:false,
          result3 : '',
          list_total : '',
          page_num : '',
          numberInpage:10,
          page:''
        }
      },
      components:{
        VPaginator: VuePaginator
      },
      methods :{
        pageto(number){
          this.page = number;
        },
        //date포맷 변경 function
        dateFormatChange(date) {
            var options = {
                weekday: "short", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            return date.toLocaleTimeString("ko-KR", options);
        },
        //수정 후 완료클릭시 실행되는 function
        editConsume(result) {
          console.log('********** front-end editConsume 호출 **********');
          var consume_num = result.consume_num;
          var u_num = result.u_num;
          var cate_num = result.cate_num;
          var content = result.content;
          var price = result.price;
          var time = result.time;
          var wasted = result.wasted;
            axios({
              method: 'post',
              url: 'api/consume_history/updateHistory',
              data: {
                consume_num:consume_num,
                u_num:u_num,
                cate_num: cate_num,
                content: content,
                price: price,
                time: time,
                wasted: wasted
              }
            }).then(function(response) {
              console.log('********** 소비내역 수정완료 **********');
              alert('소비내역 수정이 완료되었습니다');
              setTimeout("window.location.href = './store_test'",1000)
            })
        },
        //수정 클릭시 실행되는 function
        editClick(result) {
          console.log('********** front-end editClick 호출 **********');
          // this.flag = true;
          console.log('result2.consume_num : ' + result.consume_num);
          // if(result.consume_num){
            this.flag=true;
          // }
          this.result3 = result.consume_num;
        },
        //삭제 클릭시 실행되는 function
        delConsume(result) {
          var con_num = result.consume_num;
          var unum = result.u_num;
          axios({
            method: 'post',
            url: 'api/consume_history/deleteHistory',
            data: {
              consume_num:con_num,
              u_num:unum
            }
          }).then(function(response) {
            console.log('********** 소비내역 삭제완료 **********');
            alert('소비내역 삭제가 완료되었습니다');
            setTimeout("window.location.href = './store_test'",1000)
          })
        }
    },
    created(){
        console.log('stories Created()')
        var self  = this;

        axios({
        method: 'get',
        url: 'api/consume_history/consumeList',
        data:{
        }
      }).then(function (response) {
            self.results = response.data;
            self.list_total = response.data.length;
            console.log(self.list_total);
            var list_total = self.list_total;
            if(self.list_total >= 5) {
              self.page_num = 5;
            } else {
              self.page_num = self.list_total;
            }
            console.log('뽑아왔지롱');
          })
      }
    }
</script>
