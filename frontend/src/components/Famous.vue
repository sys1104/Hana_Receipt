<template>
    <div id="famous">
    <h2>Trending stories
    <strong>({{ famous.length }})</strong>
    </h2>
    <ul class="list-group">
        <li v-for="story in famous" class = "list-group-item">
            {{story.writer}} said "{{story.plot}}". story upvotes {{ story.upvotes }}.
        </li>
    </ul>
    </div>
</template>

<script>
    import {store} from '../store.js'
    export default {
        computed : {
            famous: function() {
                return this.stories.filter(function (item) {
                    return item.upvotes > 25;
                })
            }
        },
        data(){
            return {
                stories : store.stories
            }
        }
        //props를 통해 받아오기 때문에 데이터 필요없음
        // props:['stories'],
    
        // data(){
        //     return{
        //         stories:  [{
        //             plot: 'My horse is amazing.',           
        //             writer: 'Mr. Weebl',           
        //             upvotes: 28,           
        //             voted: false         
        //             }, {
        //             plot: 'Narwhals invented Shish Kebab.',           
        //             writer: 'Mr. Weebl',           
        //             upvotes: 8,           
        //             voted: false         
        //             }, {
        //             plot: 'The dark side of the Force is stronger',           
        //             writer: 'Darth Vader',           
        //             upvotes: 52,           
        //             voted: false         
        //             }, {           
        //             plot: 'One does not simply walk into Mordor',           
        //             writer: 'Boromir',           
        //             upvotes: 74,           
        //             voted: false 
        //             }]       
        //     }     
        // }   
    } 
 
</script> 
            