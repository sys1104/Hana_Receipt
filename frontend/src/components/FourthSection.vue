<template id="fourth-section">
<div v-show="$session.exists() == true" id='hi'>
  <div class="container">
    <br>
    <h2>나의 소비 키워드</h2>
    <h6>내가 자주 소비한 내역을 확인해보세요</h6>
    <div>
      <!-- 자주 소비한 내역 (워드클라우드) import -->
      <word-cloud></word-cloud>
    </div>
  </div>
</div>
</template>

<style scoped>
  #hi{
    background-color : white;
  }
</style>

<script>
import axios from 'axios'
import WordCloud from './WordCloud.vue'

export default {
    data() {
      return {
        u_num : '',
        results : '',
      }
    },
    components : {
        WordCloud
    }
}
</script>

<style scoped>
    #hi{
        background-color:#FAFAFA;
    }
</style>
