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
        <router-link v-if="$session.exists() == true" class="btn ghost" style="margin-right: 100px;" to="/save_history">소비 내역</router-link>
        <router-link v-else class="btn btn-lg" style="margin-right: 100px;" to="/login">소비 내역</router-link>
        <router-link v-if="$session.exists() == true" class="btn ghost" to="/goal_management">목표 관리</router-link>
        <router-link v-else class="btn btn-lg" to="/login">목표 관리</router-link>
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

</style>
