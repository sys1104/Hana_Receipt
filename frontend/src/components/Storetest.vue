<template>
<div id="insertConsume" style="width:800px; display:inline-block;">
  <stories></stories>
  <h2>소비내역 저장</h2>
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
    <input type="text" placeholder="이름" v-model="content" class="form-control" name="content">
  </div>
  <div class="form-group">
    <input type="text" placeholder="가격" v-model="price" class="form-control" name="price">
  </div>
  <div class="form-group">
    <input type="text" placeholder="시간" v-model="time" class="form-control" name="time">
  </div>
  <div class="form-group">
    <input type="email" placeholder="낭비체크" v-model="wasted" class="form-control" name="wasted">
  </div>
  <button @click.prevent="requestHistory" class="btn btn-success">저장</button>
</div>
</template>

<script>
import axios from 'axios'
import Stories from './Stories.vue'
export default {
  data: function() {
    return {
      u_num:'2',
      results:'',
      cate_num: '',
      content: '',
      price: '',
      time: '',
      wasted: ''
    }
  },
  components: {
    Stories
  },
  methods: {
    requestHistory() {
      console.log('********** front-end requestHistory 호출 **********');
      var u_num = 2;
      var cate_num = this.cate_num;
      var content = this.content;
      var price = this.price;
      var time = this.time;
      var wasted = this.wasted;
        axios({
          method: 'post',
          url: 'api/consume_history/requestHistory',
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
    }
  },
  created(){
    console.log('Storetest')

    // var self  = this;
    // // addUser() {
    //   console.log('조회해보기 들어옴 Vue~');
    //        var cate_num1 = this.results.cate_num;
    //        var content1 = this.results.content;
    //        var price1 = this.results.price;
    //        var time1 = this.results.time;
    //        var wasted1 = this.results.wasted;
    //
    //     axios({
    //     method: 'get',
    //     url: 'api/consume_history/consumeList',
    //     data:{
    //       cate_num: cate_num1,
    //       content: content1,
    //       price: price1,
    //       time : time1
    //     }
    //   }).then(function (response) {
    //
    //     self.results = response.data;
    //     console.log('vue리절트 시작~'+response.data + '리절트~');
    //     console.log('뽑아왔지롱');
    //     alert('뽑아왔으 리스트!');
    //   })
    }
}
</script>
