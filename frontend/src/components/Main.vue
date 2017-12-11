<template>
  <div id="app">
  
    <navi></navi>
    <custom-header></custom-header>
    <first-section></first-section>
    <!-- <custom-footer></custom-footer>  -->
    

  </div>
</template>


<script>
  import Vue from 'vue'
  import Login from './Login'
  import Register from './Register'
  import FirstSection from './FirstSection'
  import CustomFooter from './Footer'
  import CustomHeader from './Header'
  import Navi from './Navi'
  export default {
    name: 'app',
    components: {
      Login,
      Register,
      FirstSection,
      CustomFooter,
      CustomHeader,
      Navi
    },

  }
</script>
