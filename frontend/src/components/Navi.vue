<template>

      <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="/">하나 영수증</a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">

             <li class="nav-item mx-0 mx-lg-1 t">
              <!-- <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="currentComponent='Login',currentHeader=''">로그인</a> -->
              <router-link class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/login">로그인</router-link> 
            </li>             
             <li class="nav-item mx-0 mx-lg-1 t">
              <!-- <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="currentComponent='Register',currentHeader=''">회원가입</a> -->
              <router-link class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/register">회원가입</router-link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>

</template>