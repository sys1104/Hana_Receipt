<template>
  <div>
      <h2>Stories</h2>
      <ul class="nav nav-tabs">
          <li><router-link :to="{ name:'stories.all'}">전체 이야기 보기 </router-link></li>
          <li><router-link :to="{ name:'stories.famous'}">인기 이야기 보기 </router-link></li>
          
          
      </ul>
      <router-view></router-view>
  </div>
</template>
