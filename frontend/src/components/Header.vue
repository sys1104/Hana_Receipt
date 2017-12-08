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
        <router-link v-if="$session.exists() == true" class="btn btn-success btn-lg round" style="margin-right: 100px;" to="/store_test">소비 내역</router-link>
        <router-link v-else class="btn btn-success btn-lg" style="margin-right: 100px;" to="/login">소비 내역</router-link>        
        <router-link v-if="$session.exists() == true" class="btn btn-danger btn-lg round" to="/goal_management">목표 관리</router-link>
        <router-link v-else class="btn btn-danger btn-lg" to="/login">목표 관리</router-link>
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
.btn-lg.round {
	border-radius: 24px;
}
</style>