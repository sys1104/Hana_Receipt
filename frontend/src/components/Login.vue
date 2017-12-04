<template>


<div class="container">
    <navi></navi>

    <div class="col-md-10" id="login" style="width:300px; display:inline-block; margin-top:200px">     
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
import Navi from './Navi'

export default {
    components : {
        Navi
    },     
    created() {       
        console.log('login')     
    }   
} 
</script>
