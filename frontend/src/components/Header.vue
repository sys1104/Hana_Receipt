<template>
     <!-- Header -->
    <header class="masthead bg-primary text-white text-center">
      <div class="container">
        <img class="img-fluid mb-5 d-block mx-auto" src="img/profile.png" alt="">
        <h1 class="text-uppercase mb-0">하나 영수증</h1>
        <hr class="star-light">
<!--        <h2 class="font-weight-light mb-0">Web Developer - Graphic Artist - User Experience Designer</h2>-->
        <!-- <button class="btn btn-success btn-lg" style="margin-right: 100px;">목표 관리</button> -->
        <router-link class="btn btn-success btn-lg" style="margin-right: 100px;" to="/store_test">소비 내역</router-link>

        <button class="btn btn-danger btn-lg">목표 관리</button>
      </div>
    </header>
</template>
