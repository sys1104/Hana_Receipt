<template>
  <ul class="list-group" style="margin-top:300px">
      <li class="list-group-item" v-for="story in store.stories">
          {{story.writer}} said "{{story.plot}}"
      </li>
  </ul>
</template>

<script>
    //일반 자바스크립트 객체를 import할때는 {}추가
    //기타 컴포넌트를 import할때는 {}없이
    import { store }  from '../store.js'
    export default {
        data(){
            return {
                store
            }
        }
    //얘도 필요없다
    // props:['stories']
    // data(){
    //     return{
    //         stories:[
    //             {
    //                 plot:'My horse is amazing.',
    //                 writer : 'Mr. Weebl',
    //                 upvotes:28,
    //                 voted:false
    //             },{
    //                 plot:'Steven Jobs.',
    //                 writer : 'Mr. yss',
    //                 upvotes:28,
    //                 voted:false
    //             },{
    //                 plot:'안녕',
    //                 writer : '잘가',
    //                 upvotes:28,
    //                 voted:false                    
    //             },{
    //                 plot:'호우',
    //                 writer : '프로젝트는 없다',
    //                 upvotes:28,
    //                 voted:false 
    //             }
    //         ]
    //     }
    // }
    }  
</script>