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
                  <tr class="table-body" v-for="(result,index) in results">


                </table>
                <hr>
                <h3 class="text-right">총액 : 210000원</h3>
            </div>

        </div>
    </div>
</template>
