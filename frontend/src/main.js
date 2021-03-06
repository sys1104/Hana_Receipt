// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
//세션
import VueResource from 'vue-resource'
//axios
import axios from 'axios'
import Vue2Filters from 'vue2-filters'
import VueCurrencyFilter from 'vue-currency-filter'
//라우터 객체에 등록할 컴포넌트 불러오기
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Header from './components/Header.vue'
import CustomFooter from './components/Footer.vue'
import FirstSection from './components/FirstSection.vue'
import Main from './components/Main.vue'
import ModifyUser from './components/ModifyUser.vue'
import GoalManagement from './components/GoalManagement.vue'
import SaveHistory from './components/SaveHistory.vue'
Vue.use(VueRouter)
    // Vue.use(VueResource)
    // Vue.use(VuePaginator)
Vue.use(VueSession)
Vue.use(axios)
Vue.use(Vue2Filters)
    // Vue.use(VueCurrencyFilter)
    // Vue.use(VueCurrencyFilter, {
    //     symbol: 'string (default : empty string)',
    //     thousandsSeparator: 'string (default : ,)',
    //     fractionCount: 'number (default : 0)',
    //     fractionSeparator: 'string (default: ",")',
    //     symbolPosition: 'string (default: front)',
    //     symbolSpacing: 'boolean (default: true)'

// })

//사용할 라우터 객체등록
const routes = [{
            name: 'home',
            path: '/',
            component: Main
        },
        {
            name: 'regist',
            path: '/register',
            component: Register
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'first_section',
            path: 'first_section',
            component: FirstSection
        },
        {
            name: 'save_history',
            path: '/save_history',
            component: SaveHistory
        },
        {
            name: 'modify_user',
            path: '/modify_user',
            component: ModifyUser
        },
        {
            name: 'goal_management',
            path: '/goal_management',
            component: GoalManagement
        },

        // {
        //     path: './stories',
        //     component: StoriesPage,
        //     children: [{
        //             path: '',
        //             name: 'stories.all',
        //             component: StoriesAll
        //         },
        //         {
        //             path: 'famous',
        //             name: 'stories.famous',
        //             component: StoriesFamous
        //         }
        //     ]
        // }
    ]
    //라우터 객체 생성
const router = new VueRouter({

    mode: 'history',
    base: '/',
    routes
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router, //어플리케이션 전체에서 라우터 인식 시키기
    template: '<App/>',
    components: {
        App
    }
});