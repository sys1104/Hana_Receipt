<template>
  <div id="stories" class="container" style="width:700px">
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
         <td>카테고리</td>
         <td>내용</td>
         <td>가격</td>
         <td>일시</td>
        </tr>
        <tr class="table-body" v-for="(result,index) in results">
         <td v-if="flag==false">{{result.cate_num}}</td>
         <td v-if="flag==false">{{result.content}}</td>
         <td v-if="flag==false">{{result.price}}</td>
         <td v-if="flag==false">{{result.time}}</td>
         <!-- <input v-if="flag==true" value="{{result.cate_num}}"/> -->
         <td><input v-if="flag==true" v-model='info1'/></td>
         <td><input v-if="flag==true" v-model='info2'/></td>
         <!-- <td><input v-if="flag==true" placeholder="인풋생김3"/></td>
         <td><input v-if="flag==true" placeholder="인풋생김4"/></td> -->

         <td><button class="btn btn-primary" @click="editCon">수정</button></td>
        </tr>
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
          cate_num:'',
          content:'',
          price:'',
          time:'',
          info1:this.info1,
          info2:this.info2,
          info3:this.info3,
          info4:this.info4,
          flag:false,
        }
      },
      components:{

      },
      methods :{
        editConsume() {
          console.log('********** front-end editConsume 호출 **********');
          var u_num = 2;
          var cate_num = this.cate_num;
          var content = this.content;
          var price = this.price;
          var time = this.time;
          var wasted = this.wasted;
            axios({
              method: 'post',
              url: 'api/consume_history/updateHistory',
              data: {
                u_num:u_num,
                cate_num: cate_num,
                content: content,
                price: price,
                time: time,
                wasted: wasted
              }
            }).then(function(response) {
              console.log('********** 소비내역 저장완료 **********');
              alert('소비내역 저장 완료되었습니다');
              setTimeout("window.location.href = './store_test'",1000)
            })
        },
        editCon() {
          console.log('********** front-end editCon 호출 **********');
          this.flag = true;
          // var u_num = 2;
          var info1 = this.results.cate_num;
          var info2 = this.results.content;
          var info3 = this.results.price;
          var info4 = this.results.time;
          // // var wasted = this.wasted;
          var self  = this;

            console.log('조회해보기 들어옴 Vue~');
                 var cate_num1 = this.results.cate_num;
                 var content1 = this.results.content;
                 var price1 = this.results.price;
                 var time1 = this.results.time;
                 var wasted1 = this.results.wasted;

              axios({
              method: 'get',
              url: 'api/consume_history/consumeList',
              data:{
                cate_num: cate_num1,
                content: content1,
                price: price1,
                time : time1
              }
            }).then(function (response) {

              self.results = response.data;
              console.dir('vue리절트 시작~'+response.data + '리절트~');
              console.log('뽑아왔지롱');
              // alert('뽑아왔으 리스트!');
            })
        }
    },
    created(){
        console.log('stories')
        var self  = this;

          console.log('조회해보기 들어옴 Vue~');
               var cate_num1 = this.results.cate_num;
               var content1 = this.results.content;
               var price1 = this.results.price;
               var time1 = this.results.time;
               var wasted1 = this.results.wasted;

            axios({
            method: 'get',
            url: 'api/consume_history/consumeList',
            data:{
              cate_num: cate_num1,
              content: content1,
              price: price1,
              time : time1
            }
          }).then(function (response) {

            self.results = response.data;
            console.dir('vue리절트 시작~'+response.data + '리절트~');
            console.log('뽑아왔지롱');
            // alert('뽑아왔으 리스트!');
          })
      }
    }
</script>
