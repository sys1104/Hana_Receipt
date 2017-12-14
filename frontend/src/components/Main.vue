<template>
<div id="app">

  <navi></navi>
  <custom-header></custom-header>
  <first-section></first-section>
  <second-section></second-section>
  <third-section></third-section>
  <fourth-section></fourth-section>
  <card-benefit></card-benefit>

  <!-- <custom-footer></custom-footer>  -->


</div>
</template>


<script>
import Vue from 'vue'
import Login from './Login'
import Register from './Register'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourthSection from './FourthSection'
import CustomFooter from './Footer'
import CustomHeader from './Header'
import Navi from './Navi'
import CardBenefit from './CardBenefit'
export default {
  name: 'app',
  components: {
    Login,
    Register,
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
    CustomFooter,
    CustomHeader,
    Navi,
    CardBenefit
  },

}
</script>
<style>
first-section {
  background-color: lightgray;
}
</style>
