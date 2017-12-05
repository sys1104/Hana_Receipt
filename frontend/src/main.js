// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
//두영추가
import VueResource from 'vue-resource'
import VuePaginator from 'vuejs-paginator'

//라우터 객체에 등록할 컴포넌트 불러오기
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Stories from './components/Stories.vue'
import Header from './components/Header.vue'
import CustomFooter from './components/Footer.vue'
import StoriesPage from './components/StoriesPage.vue'
import StoriesAll from './components/StoriesAll.vue'
import StoriesFamous from './components/StoriesFamous.vue'
import FirstSection from './components/FirstSection.vue'
import Main from './components/Main.vue'
import Storetest from './components/Storetest.vue'
import ModifyUser from './components/ModifyUser.vue'
Vue.use(VueRouter)

//사용할 라우터 객체등록
const routes = [
    { name: 'home', path: '/', component: Main },
    { name: 'regist', path: '/register', component: Register },
    { name: 'stories', path: '/stories', component: Stories },
    { name: 'login', path: '/login', component: Login },
    { name: 'first_section', path: 'first_section', component: FirstSection },
    { name: 'store_test', path: '/store_test', component: Storetest },
    { name: 'modify_user', path: '/modify_user', component: ModifyUser },

    {
        path: './stories',
        component: StoriesPage,
        children: [{
                path: '',
                name: 'stories.all',
                component: StoriesAll
            },
            {
                path: 'famous',
                name: 'stories.famous',
                component: StoriesFamous
            }
        ]
    }
]

//라우터 객체 생성
const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router, //어플리케이션 전체에서 라우터 인식 시키기
    template: '<App/>',
    components: { App }
})
