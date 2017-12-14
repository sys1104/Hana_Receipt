<!-- CREATE TABLE card
(
    `card_num`      INT            NOT NULL    AUTO_INCREMENT,
    `card_name`     VARCHAR(45)    NULL,
    `card_check`    INT            NULL,
    `domestic`      INT            NULL,
    `card_img`      VARCHAR(100)    NULL,
    `card_benefit`  VARCHAR(255)    NULL,
    `card_life`     INT    NULL,
    PRIMARY KEY (card_num)
); -->
<template>
<div id="cardbenefitlist" class="table-users container" style="width:100%">
  <hr>
  <h2>카드추천</h2>
  <br><br>
      <!-- <tr>
        <th>이미지</th>
        <th>카드이름</th>
        <th>체크/신용</th>
        <th>국내/해외</th>
        <th colspan="20">혜택</th>
      </tr> -->
  <div class="row">  
      <div class="col-md-4" v-for="(result, index) in results2" v-if="flag == false">
        <a :href="cardUrl[index]"><img :src="imgPath[index]" /></a>
        <h6 style="height:50px;">{{result.card_name}}</h6>
          <div>
          <p style="margin-left:10px; margin-right:10px" class="btn btn-danger"v-if="result.card_check==0">체크</p>
          <p style="margin-left:10px; margin-right:10px" class="btn btn-danger"v-if="result.card_check==1">신용</p>
          <p class="btn btn-primary" v-if="result.domestic==0">국내</p>
          <p class="btn btn-primary" v-if="result.domestic==1">국내/해외</p>       
          </div>
          <hr>
        <div class="">
        <h5 class="text-center" style="height:150px;"><p style="font-size : 40px; color:orange;">혜택</p>{{result.card_benefit}}</h5>
        </div>
      </div>
      <!-- <div class="col-md-4">
        <p>ㅎㅇ</p>
      </div> -->
  </div>          
</div>
</template>

<script>
    import axios from 'axios'
    export default {
      data: function () {
        return {
          imgPath : [],
          cardUrl : [],
          results:'',
          results2:[],
          card_num:'',
          card_name:'',
          card_check:'',
          domestic:'',
          card_img:'',
          card_benefit:'',
          flag:false,
          result3 : ''
        }
      },
      components:{
      },
      methods :{

    },
    created(){
        console.log('CardBenefit Created()')
        var self  = this;

        axios({
        method: 'post',
        url: 'api/card/card_benefit_list',
        data:{
          u_num:this.$session.get('session')
        }
      }).then(function (response) {
            self.results = response.data;
            if(response.data.length > 3){
              console.log('CardBenefit Vue에서 데이터 길이가 3보다 커요@@@@@');
              for(var i=0; i<3; i++){
                self.imgPath.push("img/card_img/"+response.data[i].card_img);
                self.cardUrl.push(response.data[i].card_url);
                self.results2.push(response.data[i]);
                console.log('이미지패쓰 : ' + self.imgPath[i]);
                console.log('카드URL : ' + self.cardUrl[i]);
              }
            }else if(response.data.length <= 3 && response.data.length > 0){
              console.log('CardBenefit Vue에서 데이터 길이가 3보다 작아요@@@@@');
              for(var j=0; j<response.data.length; j++){
                self.imgPath.push("img/card_img/"+response.data[j].card_img);
                self.cardUrl.push(response.data[j].card_url);
                self.results2.push(response.data[j]);
                console.log('else이미지패쓰 : ' + self.imgPath[j]);
                console.log('else카드URL : ' + self.cardUrl[j]);
              }
            }else{
              console.log('CardBenefit Vue에서 제이슨데이타 받은게 없어요@@@@@');
              self.flag = true;
            }
          })
      }
    }
</script>
