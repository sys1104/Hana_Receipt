<template>
<div class="container">
  <h2>목표 관리</h2>
  <br><br>
  <hr>
  <div class="col-md-12">

    <div class="col-md-offset-3 col-md-6 box-container">
      <h3>지난 주 낭비된 금액</h3>
      <table class="table table-striped table-hover table-responsive">
        <tr class="table-header">
          <td>카테고리</td>
          <td>금액</td>
        </tr>
        <tr class="table-body" v-for="result in results">
          <td>
            result
          </td>
        </tr>
      </table>
      <hr>
      <h3 class="text-right">총액 : 210000원</h3>
    </div>

  </div>
</div>
</template>


<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      results: ''
    }
  },
  created() {
    var self = this;
    axios({
      method: 'post',
      url: 'api/consume_history/wastedList',
      data: {
        u_num: this.$session.get('session')
      }
    }).then(function(response) {
      self.results = response.data.wasted_used;
    })
  }
}
</script>
