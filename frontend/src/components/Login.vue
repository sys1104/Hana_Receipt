<template>
<div class="container">
  
    <div class="col-md-10" id="login" style="width:300px; display:inline-block;">     
        <h2>로그인</h2>     
        <div class="form-group form-horizontal">       
            <input type="email" placeholder="Email address" class="form-control">     
        </div>     
        <div class="form-group">       
            <input type="password" placeholder="Password" class="form-control">     
        </div>     
        <button class="btn btn-primary">로그인</button>   
    </div>
</div> 
</template> 
 
<script>   
export default {     
    created() {       
        console.log('login')     
    }   
} 
</script>
