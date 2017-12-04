<template>
  <div id="app">
  
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
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="currentComponent='Login',currentHeader=''">로그인</a>
            </li>             
             <li class="nav-item mx-0 mx-lg-1 t">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="currentComponent='Register',currentHeader=''">회원가입</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 메인에서만 보여줄거야 -->
    <component v-bind:is="currentHeader"></component>
    <div class="container">
      <div style="margin-top : 200px">

      <!-- <router-link to="/" style="color:black">Home - Login</router-link>
      <router-link to="/register"> Register </router-link> -->
      
      <!-- <router-link에 의해 이동 되었을 때 해당하는 컴포넌트가 router-view에 보여진다 -->
      <p style="text-align:center;">
        <router-view></router-view></p>
      </div>
      <!-- <custom-footer></custom-footer> -->
      <!-- <first-section></first-section> -->
       <component v-bind:is="currentComponent"></component>
       <custom-footer></custom-footer>
    </div>
    

  </div>
</template>

<script>
  import Vue from 'vue'
  import Login from './components/Login'
  import Register from './components/Register'
  import Stories from './components/Stories'
  import FirstSection from './components/FirstSection'
  import CustomFooter from './components/Footer'
  import CustomHeader from './components/Header'
  export default {
    name: 'app',
    components: {
      Login,
      Stories,
      Register,
      FirstSection,
      CustomFooter,
      CustomHeader
    },
    data(){
      return{
        currentComponent : 'FirstSection',
        currentHeader : 'CustomHeader',
      }
    }
  }
</script>
g
