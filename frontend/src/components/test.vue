<template id="stories">
    <ul class="list-group">
        <li class="list-group-item" v-for="story in results">
            {{story.u_id}} said "{{story.u_pw}}"
            <!-- Story upvotes{{story.upvotes}} -->
        </li>
    </ul>
</template>

<script>
    // import axios from 'axios'
    // import Famous from './Famous.vue'
    export default {
      data: function () {
        return {
          results:'',
          u_id:'',
          u_pw:'',
          u_name:'',
          u_phone:'',
          u_email:'',
          u_job:'',
          u_salary:''
        }
      },
      components:{
        // Famous
      },
      methods :{

    },
      // props:['stories'],
      created(){
        console.log('stories')

        var self  = this;
        // addUser() {
          console.log('조회해보기 들어옴 Vue~');
               var id = this.results.u_id;
               var pwd = this.results.u_pw;
               var name = this.results.u_name;
               var phone = this.results.u_phone;
               var email = this.results.u_email;
               var job = this.results.u_job;
               var salary = this.results.u_salary;
               if (name == '' || pwd == '') {
                   this.errinfo = '填寫信息不完整';
                   this.classFade = ''
               } else {
                    axios({
            method: 'get',
            url: 'api/user/loadContents',
            data:{
              u_id: id,
              u_pwd: pwd,
              u_name: name,
              u_phone : phone,
              u_email : email,
              u_job : job,
              u_salary: salary
            }
          }).then(function (response) {

            self.results = response.data;
            console.log(response.data + '리절트~');
            console.log('뽑아왔지롱');
            alert('뽑아왔으 리스트!');
          })
        }
      // }
      }
    }
</script>