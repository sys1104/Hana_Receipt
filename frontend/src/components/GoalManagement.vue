<template>

   <div id="app">
       <navi></navi>
       <div class="container">
        <wasted></wasted>
            <div class="col-md-offset-3">
                <br>
                <form class="form-inline">
                    <div class="form-group">
                        <select class="form-control">
                          <option>생활/쇼핑</option>
                          <option>교통</option>
                          <option>식비</option>
                          <option>패션/미용</option>
                          <option>주거/통신</option>
                          <option>미분류</option>
                        </select>
                        <input class="form-control" type="text" name="" placeholder="내용을 입력하세요">
                    </div>
                    <div>
                        
                    </div>
                    
                </form>
            </div>
            <br><br>
            <div class="col-md-8">
                <button class="btn btn-primary form-control">추가하기</button>
            </div>
                <br><br>
            <div class="form-group col-md-8">
                <button class="btn btn-warning form-control">절약 목표로 설정하기</button>
            </div>

       </div>
   </div>
</template>


<script>
  import Vue from 'vue'
  import Login from './Login'
  import Wasted from './Wasted'
  import Navi from './Navi'
  export default {
    name: 'app',
    components: {
      Wasted,
      Navi
    },

  }
</script>

    <style>
        .box-container{
            border-style: solid;
            border-width: 2px;
            padding: 10px;
        }
        .table-header{
            font-size: 20px;
            font-weight: bold;
        }
        .table-color{
            background-color: lightgrey;
        }
    </style>
