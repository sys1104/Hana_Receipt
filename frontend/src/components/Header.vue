<template>
     <!-- Header -->
    <header class="masthead bg-primary text-white text-center" >
      <div class="container">
        <img class="img-fluid mb-5 d-block mx-auto" src="img/invoice.png" alt="" style="height:200px">
        <h2 class="text-uppercase mb-0">하나 영수증</h2>
        <!-- <hr class="star-light"> -->
<!--        <h2 class="font-weight-light mb-0">Web Developer - Graphic Artist - User Experience Designer</h2>-->
        <!-- <button class="btn btn-success btn-lg" style="margin-right: 100px;">목표 관리</button> -->
        <div style="margin-top: 50px"> 
        <router-link v-if="$session.exists() == true" class="btn btn-success btn-lg" style="margin-right: 100px;" to="/store_test">소비 내역</router-link>
        <router-link v-else class="btn btn-success btn-lg" style="margin-right: 100px;" to="/login">소비 내역</router-link>        
        <router-link v-if="$session.exists() == true" class="btn btn-danger btn-lg" to="/goal_management">목표 관리</router-link>
        <router-link v-else class="btn btn-danger btn-lg" to="/login">목표 관리</router-link>
        </div>
        <!-- <button class="btn btn-danger btn-lg">목표 관리</button> -->
      </div>
      <!-- <div class="wrap">
  	  	<a href="#" class="button">Hover Me!</a>
  	  	<a href="#" class="button2">Awesome Button</a>
	     </div> -->
    </header>
</template>

<script>
export default {

    methods:{

    }

}    
</script>

<style scoped>
.btn-lg.round {
	border-radius: 24px;
}

body {
	background-size: cover;
	background-repeat: no-repeat;
   font-family: Arial, sans-serif;
	font-weight: bold;
	font-size: 14px;
}

.wrap {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -86px;
	margin-left: -89px;
	text-align: center;
}

a {
	-webkit-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);
	-moz-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);
	-ms-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);
	-o-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);
	transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);
	display: block;
	margin: 20px auto;
	max-width: 180px;
	text-decoration: none;
	border-radius: 4px;
	padding: 20px 30px;
}

a.button {
	color: rgba(30, 22, 54, 0.6);
	box-shadow: rgba(30, 22, 54, 0.4) 0 0px 0px 2px inset;
}

a.button:hover {
	color: rgba(255, 255, 255, 0.85);
	box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
}

a.button2 {
	color: rgba(30, 22, 54, 0.6);
	box-shadow: rgba(30, 22, 54, 0.4) 0 0px 0px 2px inset;
}

a.button2:hover {
	color: rgba(255, 255, 255, 0.85);
	box-shadow: rgba(30, 22, 54, 0.7) 0 80px 0px 2px inset;
}

</style>
