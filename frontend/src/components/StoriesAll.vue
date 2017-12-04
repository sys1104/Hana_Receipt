<template id="stories">
  <ul class="list-group">
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

    }  
</script>