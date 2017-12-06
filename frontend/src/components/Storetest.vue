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
    <input type="text" placeholder="소비품목 이름" v-model="content" class="form-control" name="content">
  </div>
  <div class="form-group">
    <input type="text" placeholder="가격" v-model="price" class="form-control" name="price">
  </div>
  <div class="form-group">
    <input type="text" placeholder="입력 예)20171205" v-model="c_time" class="form-control" name="c_time">
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
      c_time: '',
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
          alert('소비내역 저장 완료되었습니다');
          setTimeout("window.location.href = './store_test'",1000)
        })
    }
  },
  created(){
    console.log('Storetest')
    }
}
</script>
