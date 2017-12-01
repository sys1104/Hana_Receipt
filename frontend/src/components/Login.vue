<template>
  <div id="login" style="width:300px; display:inline-block;">
      <h2>Sing in</h2>
      <div class="form-group form-horizontal">
          <input type="email" placeholder="Email address" class="form-control">
      </div>
      <div class="form-group">
          <input type="password" placeholder="Password" class="form-control">
     </div>
     <button class="btn btn-block">Sign in</button>
  </div>
</template>

<script>
    export default {
        created(){
            console.log('login');
        }
    }
</script>