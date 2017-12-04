<template>
  <div id="stories" class="row">
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
         <td>카테고리</td>
         <td>내용</td>
         <td>가격</td>
         <td>일시</td>
        </tr>
        <tr class="table-body" v-for="(result,index) in results">
         <td>{{result.cate_num}}dd {{index}}</td>
         <td>{{result.content}}</td>
         <td>{{result.price}}</td>
         <td>{{result.time}}</td>
         <td><button class="btn btn-primary">수정</button></td>
        </tr>
      </table>
      <!-- <button @click="hanshin">눌러봐 리스트</button> -->
  </div>
</template>

<script>
    import axios from 'axios'
    // import Famous from './Famous.vue'
    export default {
      data: function () {
        return {
          results:'',
          cate_num:'',
          content:'',
          price:'',
          time:''
        }
      },
      components:{
        // Stories
      },
      methods :{
        // hanshin() {
        //   var self  = this;
        //     console.log('조회해보기 들어옴 Vue~');
        //          var cate_num1 = this.results.cate_num;
        //          var content1 = this.results.content;
        //          var price1 = this.results.price;
        //          var time1 = this.results.time;
        //          var wasted1 = this.results.wasted;
        //
        //       axios({
        //       method: 'get',
        //       url: 'api/consume_history/consumeList',
        //       data:{
        //         cate_num: cate_num1,
        //         content: content1,
        //         price: price1,
        //         time : time1
        //       }
        //     }).then(function (response) {
        //
        //       self.results = response.data;
        //       console.log('vue리절트 시작~'+response.data + '리절트~');
        //       console.log('뽑아왔지롱');
        //       alert('뽑아왔으 리스트!');
        //     })
        // }
    },
      // props:['stories'],
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
            console.log('vue리절트 시작~'+response.data + '리절트~');
            console.log('뽑아왔지롱');
            alert('뽑아왔으 리스트!');
          })
      }
    }
</script>
