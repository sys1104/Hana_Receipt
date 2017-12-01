<template id="stories">
    <ul class="list-group">
        <li class="list-group-item" v-for="story in store.stories">
            {{story.writer}} said "{{story.plot}}"
            Story upvotes{{story.upvotes}}
        </li>
    </ul>    
</template>

<script>
    import {store} from '../store.js' //컴포넌트 임포트 할 때는 중괄호 no, js 파일 임포트에는 중괄호 yes
    export default {
        //props: ['stories']
        data(){
            return {
                store
            }
        }
    }
</script>