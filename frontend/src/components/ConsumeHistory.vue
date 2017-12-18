<template>
  <div id="stories" class="table-users" style="width:100%">
    <div class="header">소비내역 목록</div>
      <table class="table">
        <tr class="table-users">
         <th>카테고리</th>
         <th>내용</th>
         <th>가격</th>
         <th>일시</th>
         <th>낭비체크</th>
         <th colspan="9"></th>
        </tr>
        <!-- 소비내역 리스트 vue -->
        <tr class="table-body" v-for="(result, index) in results" v-if="(index >= (page-1)*page_num) && (index < page_num*page)">

         <td v-if="flag==false">
           <select style="color:#327a81; font-weight:bold; width:140px; text-align:center"  v-model="result.cate_num" disabled class="form-control">
             <option value="1">생활/쇼핑</option>
             <option value="2">교통</option>
             <option value="3">식비</option>
             <option value="4">패션/미용</option>
             <option value="5">주거/통신</option>
             <option value="6">미분류</option>
            </select>
         </td>
         <td v-if="flag==false" style="width:135px">{{result.content}}</td>
         <td v-if="flag==false">{{result.price | currency('',0)}}</td>
         <td width="120" v-if="flag==false">{{result.c_time}}</td>
         <td v-if="flag==false"><i class="icono-check"  v-if="result.wasted == 1" id="wastedcheck" value="낭비"  disabled/></td>
         <td v-if="flag==false"><button style="width:90px; background-color:#327a81; color:white; font-weight:bold; margin-left=50px" @click="editClick(result)"
             class="btn">수 정</button></td>

        <!-- 수정버튼 클릭시 실행되는 vue (flag이용)-->
         <td v-if="flag==true && (result.consume_num == result3)">
           <select style="width:125px" v-model="result.cate_num" class="form-control" name="cate_num">
                <option value="1">생활/쇼핑</option>
                <option value="2">교통</option>
                <option value="3">식비</option>
                <option value="4">패션/미용</option>
                <option value="5">주거/통신</option>
                <option value="6">미분류</option>
            </select>
         </td>
         <td v-if="flag==true && (result.consume_num != result3)">
            <select style="width:125px"  v-model="result.cate_num" class="form-control" disabled>
                <option value="1">생활/쇼핑</option>
                <option value="2">교통</option>
                <option value="3">식비</option>
                <option value="4">패션/미용</option>
                <option value="5">주거/통신</option>
                <option value="6">미분류</option>
             </select>
         </td>
         <td>
           <input style="width:120px; text-align:center" class="form-control" name="content" v-if="flag==true && (result.consume_num == result3)" v-model='info1=result.content'/>
           <input style="width:120px; text-align:center" class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.content' disabled/>
         </td>
         <td>
           <input style="width:80px; text-align:center" class="form-control" name="price" v-if="flag==true && (result.consume_num == result3)" v-model='info2=result.price'/>
           <input style="width:80px; text-align:center" class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.price' disabled/>
         </td>
         <td>
           <input style="width:120px; text-align:center" class="form-control" name="c_time" v-if="flag==true && (result.consume_num == result3)" v-model='info3=result.c_time'/>
           <input style="width:120px; text-align:center" class="form-control" v-if="flag==true && (result3 != result.consume_num)" v-model='result.c_time' disabled/>
         </td>
         <td>
           <input type="checkbox" class="form-control check-box" name="wasted" v-if="flag==true && (result.consume_num == result3)" v-model="checked"/>
           <input type="checkbox" class="form-control check-box" v-if="flag==true && (result3 != result.consume_num)" disabled/>
         </td>
         <td><a v-if="flag==true && (result.consume_num == result3)" @click="editConsume(result)"><i class="icono-check"/></a></td>
         <td><a v-if="flag==true && (result.consume_num == result3)" @click="delConsume(result)"><i class="icono-trash"/></a></td>

        </tr>
        </table>

        <!-- 페이지네이션 -->
        <div class="counter" v-if="(page_num == 10)">
            <ul>
            <li><button class="btn active" @click="pageto(pageIndex-2, list_total, page_num)" v-if="pageIndex != 1">이전</button>
            <p style="font-weight:bold; display:inline">Page {{pageIndex}} of {{page_total}}</p>
            <button class="btn active" @click="pageto(pageIndex, list_total, page_num)" v-if="nextBtn != 0">다음</button></li>
            </ul>
        </div>

  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    export default {
      data: function () {
        return {
          results:'',
          consume_num:'',
          cate_num:'',
          content:'',
          price:'',
          c_time:'',
          wasted:'',
          info1:'',
          info2:'',
          info3:'',
          flag:false,
          result3 : '',
          list_total : {},
          page_num : '',
          page:1,
          pageIndex:1,
          nextBtn:{},
          page_total:{},
          checked:true,
          today:''
        }
      },
      components:{
        VPaginator: VuePaginator
      },
      methods :{
        //페이지네이션을 위한 메소드
        pageto(number, total_length, p_num){
          //마지막 페이지에서 next버튼을 hide하기 위한 코드
          if(number*p_num > total_length || (number+1)*p_num > total_length){
            this.nextBtn = 0;
          }else{
            this.nextBtn = 1;
          }
          this.pageIndex = number+1;

          //prev, next 버튼 클릭시 0일 때 page처리
          if(number == 0){
            this.page = 1;
          }else {
            this.page = this.pageIndex;
          }
        },
        //수정 후 완료클릭시 실행되는 function
        editConsume(result) {
          console.log('********** front-end editConsume 호출 **********');
          var consume_num = result.consume_num;
          var u_num = result.u_num;
          var cate_num = result.cate_num;
          var content = result.content;
          var price = result.price;
          var c_time = result.c_time;
          var wasted = result.wasted;
          if(this.checked == false){
            wasted = 0;
          }
          if((this.checked == true && this.wasted == 0)){
            wasted = 1;
          }

          console.log('wasted값 : '+wasted)
          if(c_time>this.today){
              alert('오늘 ('+this.today+')일 이하의 데이터만 입력 가능합니다.');
          }
          else{
            //소비내역 DB에 업데이트 쿼리를 보내서 수정한다.
            axios({
              method: 'post',
              url: 'api/consume_history/updateHistory',
              data: {
                consume_num:consume_num,
                u_num:u_num,
                cate_num: cate_num,
                content: content,
                price: price,
                c_time: c_time,
                wasted: wasted
              }
            }).then(function(response) {
              console.log('********** 소비내역 수정완료 **********');
              setTimeout("window.location.href = './save_history'",0)
            })
          }

        },
        //수정 클릭시 실행되는 function
        editClick(result) {
          //수정 클릭시 수정할 수 있는 화면으로 변경.
          console.log('********** front-end editClick 호출 **********');
          if(result.wasted == 0){
            this.checked = false;
          }
          this.flag=true;
          this.result3 = result.consume_num;
        },
        //수정 클릭시 실행되는 function
        editWasted(result) {
          //낭비내역을 체크하기 위한 코드.
          console.log('********** front-end editWasted 호출 **********');
          this.wasted=1;
          console.log(this.wasted);
          alert(this.wasted);
        },
        //삭제 클릭시 실행되는 function
        delConsume(result) {
          var consume_num = result.consume_num;
          var unum = result.u_num;
          //소비내역 DB에 딜리트 쿼리를 보내서 삭제한다.
          axios({
            method: 'post',
            url: 'api/consume_history/deleteHistory',
            data: {
              consume_num:consume_num,
              u_num:unum
            }
          }).then(function(response) {
            console.log('********** 소비내역 삭제완료 **********');
            alert('소비내역 삭제가 완료되었습니다');
            setTimeout("window.location.href = './save_history'",0)
          })
        },
        function(price) {
          return Number(price).toLocaleString('en');
          Number(price).toLocaleString('en').split(".")[0];
        },
        //날짜 변환 메소드
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
            console.log('History Today : ' +yyyy + '-'+ mm + '-' + dd);
            this.today = yyyy + '-'+ mm + '-' + dd;
        }
    },
    created(){
        this.getToday();
        console.log('stories Created()')
        var self  = this;
        //소비내역 DB 조회 후 리스트 response받기.
        axios({
        method: 'post',
        url: 'api/consume_history/consumeList',
        data:{
          u_num:this.$session.get('session')
        }
      }).then(function (response) {
            self.results = response.data;
            console.log('테스트 : ' + self.results.cate_num);
            self.list_total = Number(response.data.length);

            //pagination -> 전체 페이지수와 소비내역리스트 전체 길이
            if(self.list_total >= 10) {
              self.page_num = 10;
            } else {
              self.page_num = self.list_total;
            }
            self.page_total = parseInt(self.list_total / self.page_num)+ 1;
            console.log('********** 소비내역 리스트 **********');
          })
      }
    }
</script>

<!-- Vue Style을 위한 코드 -->
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
}
 /* button style */
    span{
        height:5px;
        width:10px;
        display:block;
        position:relative;
        }
    .icono-check{
        color:green;
    }
    .icono-trash{
        color:red;
    }

    /* checkbox
    label {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        }

        input[type=checkbox].css-checkbox {
            position: absolute;
            overflow: hidden;
            clip: rect(0 0 0 0);
            height:1px;
            width:1px;
            margin:-1px;
            padding:0;
            border:0;
        }

        input[type=checkbox].css-checkbox + label.css-label {
            padding-left:20px;
            height:15px;
            display:inline-block;
            line-height:15px;
            background-repeat:no-repeat;
            background-position: 0 0;
            font-size:15px;
            vertical-align:middle;
            cursor:pointer;
        }

        input[type=checkbox].css-checkbox:checked + label.css-label {
            background-position: 0 -15px;
        }

        .css-label{
            background-image:url(http://csscheckbox.com/checkboxes/dark-check-green.png);
        }

        .alert-style{
            background-image:url(http://csscheckbox.com/checkboxes/alert-style.png);
            } */
            /* pagination */

                .active {
                background: teal;
                color: white;
                }

.check-box{
    width:20px;
    height:20px;
    margin-left:40px;
    margin-top:5px;
}
.check-box2{
    width:20px;
    height:20px;
    margin-top:8px;
}
</style>
