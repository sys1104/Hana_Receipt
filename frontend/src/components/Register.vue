<template>
    <div id ="register" style="width:300px; display:inline-block;">
        <h2>Register</h2>
        <div class="form-group">
          <input type="text" placeholder="First Name" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Last Name" class="form-control">
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email address" class="form-control">
        </div>
        <div class="form-group">
          <input type="password" placeholder="Password" class="form-control">
        </div>
        <div class="form-group">
          <input type="password" placeholder="Confirm Password" class="form-control">
        </div>
        <button class="btn btn-success">Register</button>
        <!-- <famous :stories="stories"></famous> -->
        <famous></famous>
    </div>
</template>

<script>
    import Famous from './Famous.vue'
    export default {
      components:{
        Famous
      },
      // props:['stories'], 
      created(){
        console.log('register')
      }
    }
</script>
