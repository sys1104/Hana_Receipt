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
  <h2>----------------------------------------------</h2>
  <h2>카드추천</h2>
    <table>
      <tr>
        <th>이미지</th>
        <th>카드이름</th>
        <th>체크/신용</th>
        <th>국내/해외</th>
        <th colspan="20">혜택</th>
      </tr>
      <tr class="table-body" v-for="(result, index) in results2" v-if="flag == false">
        <td><a :href="cardUrl[index]"><img :src="imgPath[index]" /></a></td>
        <td>{{result.card_name}}</td>
        <td>
          <select v-model="result.card_check" disabled class="form-control" style="color:black;">
            <option value="0">체크</option>
            <option value="1">신용</option>
          </select>
        </td>
        <td>
          <select v-model="result.domestic" disabled class="form-control" style="color:black;">
            <option value="0">국내</option>
            <option value="1">국내/해외</option>
          </select>
        </td>
        <td>{{result.card_benefit}}</td>
      </tr>
    </table>
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
          result3 : '',
          flag : false,
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
              flag = true;
            }
          })
      }
    }
</script>
