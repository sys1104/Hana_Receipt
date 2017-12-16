<template>
     <!-- Header -->
    <header class="masthead bg-primary text-center" id="header">
      <div class="container">
            <!-- <img src="img/receipt.jpg" style="height:400px">       -->

        <!-- <img class="img-fluid mb-5 d-block mx-auto" src="img/invoice.png" alt="" style="height:200px"> -->
        <h2 class="text-uppercase" id="header-font">하나 영수증과 함께 하는 <br> 스마트한 소비 생활</h2>
        <br><br><br>
        <!-- <hr class="star-light"> -->
<!--        <h2 class="font-weight-light mb-0">Web Developer - Graphic Artist - User Experience Designer</h2>-->
        <!-- <button class="btn btn-success btn-lg" style="margin-right: 100px;">목표 관리</button> -->
        <div style="margin-top: 30px">
        <router-link v-if="$session.exists() == true" class="btn btn1" style="margin-right:50px" to="/save_history">소비 내역 관리</router-link>
        <router-link v-else class="btn btn1" style="margin-right:50px" to="/login">소비 내역 관리</router-link>
        <router-link v-if="$session.exists() == true" class="btn btn2 " to="/goal_management">목표 관리</router-link>
        <router-link v-else class="btn btn2" to="/login">목표 관리</router-link>
        </div>

        <!-- <button class="btn btn-danger btn-lg">목표 관리</button> -->
      </div>
    </header>
    
</template>

<script>
export default {

    methods:{

    }

}
</script>

<style scoped>
.btn-lg{
  border-radius: 24px;
}
.ghost {
    background: #009688;
    color: #fff;
    border: 1px solid #009688;
    font-size: 22px;
    font-weight: normal;
    display: inline-block;
    min-width: 150px;
    border-radius: 24px;
}

.ghost:hover, .ghost:active {
  color:#009688;
  background:#fff;
  font-weight: bold;
}
#header{
  background-image: url("/img/calculator1920.jpg");
  background-size: cover;
  background-position-x: 0%;
  background-position-y: 20%;
  
  height: 600px;
  
}
#header-font{
  color:white;
  font-size: 50pt;
}
.btn1{
  width:200px; 
  background-color : #2C3E50;
  color:white; 
  font-size: 20px;
}
.btn2{
  width:200px; 
  background-color : orange;
  color:white; 
  font-size: 20px;
}
</style>
