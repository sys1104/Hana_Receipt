<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <!-- <login></login> -->
    <!-- <stories v-bind:stories="stories"></stories> -->
    <!-- <register :stories="stories"></register> -->
    <!-- <famous></famous> -->
    <!-- <stories></stories> -->
    <register></register>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Login from './components/Login'
import Register from './components/Register'
// import Famoust from './components/Famous'
import Stories from './components/Stories'

export default {
  name: 'app',
  components: {
    HelloWorld, 
    Login,
    Register,
    Stories,
  },
  // data(){
  //   return{
  //      stories:[
  //                   {
  //                       plot:'Hello........',
  //                       writer: 'mhso',
  //                       upvotes: 20,
  //                       voted:false
  //                   },
  //                   {
  //                       plot:'aaa',
  //                       writer: 'bbb',
  //                       upvotes: 50,
  //                       voted:false
  //                   },
  //                   {
  //                       plot:'ccc',
  //                       writer: 'eee',
  //                       upvotes: 20,
  //                       voted:false
  //                   }]
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
