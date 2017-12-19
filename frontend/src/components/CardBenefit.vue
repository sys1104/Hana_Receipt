<template>
<div id="cardbenefitlist" class="table-users container" style="width:100%">
  <hr>
  <h2>내게 맞는 카드</h2>
  <br><br>
  <!-- 카드 추천(최대 3개) 리스트 vue-->
  <div class="row">
    <div class="col-md-4" v-for="(result, index) in results2" v-if="flag == false">
      <a :href="cardUrl[index]"><img :src="imgPath[index]" /></a>
      <h6 style="height:50px;">{{result.card_name}}</h6>
      <div>
        <p style="margin-left:10px; margin-right:10px" class="btn btn-danger" v-if="result.card_check==0">체크</p>
        <p style="margin-left:10px; margin-right:10px" class="btn btn-danger" v-if="result.card_check==1">신용</p>
        <p class="btn btn-primary" v-if="result.domestic==0">국내</p>
        <p class="btn btn-primary" v-if="result.domestic==1">국내/해외</p>
      </div>
      <hr>
      <div class="">
        <h5 class="text-center" style="height:150px;"><p style="font-size : 40px; color:orange;">혜택</p>{{result.card_benefit}}</h5>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      imgPath: [],
      cardUrl: [],
      results: '',
      results2: [],
      card_num: '',
      card_name: '',
      card_check: '',
      domestic: '',
      card_img: '',
      card_benefit: '',
      flag: false,
      result3: ''
    }
  },
  components: {},
  methods: {

  },
  created() {
    console.log('CardBenefit Created()')
    var self = this;

    //Card DB에서 맞는 카드 조회 후 response받음
    axios({
      method: 'post',
      url: 'api/card/card_benefit_list',
      data: {
        u_num: this.$session.get('session')
      }
    }).then(function(response) {
      self.results = response.data;
      if (response.data.length > 3) {
        console.log('********** CardBenefit ==> 카드 갯수 4개이상 **********');
        for (var i = 0; i < 3; i++) {
          self.imgPath.push("img/card_img/" + response.data[i].card_img);
          self.cardUrl.push(response.data[i].card_url);
          self.results2.push(response.data[i]);
        }
      } else if (response.data.length <= 3 && response.data.length > 0) {
        console.log('********** CardBenefit ==> 카드 갯수 3개이하 **********');
        for (var j = 0; j < response.data.length; j++) {
          self.imgPath.push("img/card_img/" + response.data[j].card_img);
          self.cardUrl.push(response.data[j].card_url);
          self.results2.push(response.data[j]);
        }
      } else {
        console.log('********** CardBenefit JSON Data없음 **********');
        self.flag = true;
      }
    })
  }
}
</script>
