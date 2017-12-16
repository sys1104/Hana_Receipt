<template>

      <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" style="opacity:0.9" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger head" id="logo_head" href="/">하나 영수증</a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">

             <li class="nav-item mx-0 mx-lg-1 t">
              <!-- <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="currentComponent='Login',currentHeader=''">로그인</a> -->
              <!-- <a v-if="$session.exists() == true" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" @click="logout">마이페이지</a> -->
              <a id="logo_head"><router-link name="login" v-if="$session.exists() == false" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/login">로그인</router-link></a>
              <a id="logo_head"><router-link name="my-page" v-if="$session.exists() == true" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/modify_user">마이페이지</router-link></a>
            </li>
             <li class="nav-item mx-0 mx-lg-1 t">
              <a id="logo_head" v-if="$session.exists() == true" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style="margin-top:13px" @click="logout">로그아웃</a>
              <a id="logo_head"><router-link name="add-user" v-if="$session.exists() == false" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/register">회원가입</router-link></a>

            </li>
          </ul>
        </div>
      </div>
    </nav>

</template>

<script>
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)
export default {
  name: 'panel',
//   data () {
//             return {
//                 session : ''
//             }
//   },
  beforeCreate: function () {
    // this.$session.start()
    // this.$session.set('jwt','value')
    if (!this.$session.exists()) {
      console.log('Navi : 세션 없음');
    }else{
      console.log('Navi : 세션 있음');
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      setTimeout("window.location.href = './'",0)
    }
  }
}
</script>
<style scoped>
    #a_head:before{
      content:attr(data-text);
      position:absolute;
      color:#327a81;
      width:0%;
      overflow: hidden;
      transition: 1s;
    }
    #a_head:hover:before{
      width: 100%;
    }

    #logo_head {
      display: inline-block;
    }

    #logo_head:hover {
      z-index: 2;
      -webkit-transition: all 200ms ease-in;
      -webkit-transform: scale(1.2);
      -ms-transition: all 200ms ease-in;
      -ms-transform: scale(1.2);
      -moz-transition: all 200ms ease-in;
      -moz-transform: scale(1.2);
      transition: all 200ms ease-in;
      transform: scale(1.2);
      color:#18BC9C;
    }
</style>
