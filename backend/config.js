//설정값을 가지고 있는 모듈
module.exports = {
    server_port: 3000,
    plugins: [
        '~/plugins/vue2-filters'
    ],
    route_info: [{
            file: './user',
            path: '/api/user/login',
            method: 'login',
            type: 'post'
        },
        {
            file: './user',
            path: '/api/user/logout',
            method: 'logout',
            type: 'post'
        },
        {
            file: './user',
            path: '/api/user/signup',
            method: 'signup',
            type: 'post'
        },
        {
            file: './user',
            path: '/api/user/dup_check',
            method: 'dupCheck',
            type: 'post'
        },
        {
            file: './user',
            path: '/api/user/delete_account',
            method: 'deleteAccount',
            type: 'post'
        },
        // {
        //     file: './ajax_user',
        //     path: '/api/user/user_dup_check',
        //     method: 'user_dup_check',
        //     type: 'get'
        // },
        // {
        //     file: './user',
        //     path: '/api/user/loadContents',
        //     method: 'loadContents',
        //     type: 'get'
        // },
        {
            file: './user',
            path: '/api/user/showUser',
            method: 'showUser',
            type: 'post'
        },
        {
            file: './user',
            path: '/api/user/modifyUser',
            method: 'modifyUser',
            type: 'post'
        },
        {
            file: './consume_history',
            path: '/api/consume_history/updateHistory',
            method: 'updateHistory',
            type: 'post'
        },
        {
            file: './consume_history',
            path: '/api/consume_history/requestHistory',
            method: 'requestHistory',
            type: 'post'
        },
        {
            file: './consume_history',
            path: '/api/consume_history/consumeList',
            method: 'consumeList',
            type: 'post'
        },
        {
            file: './consume_history',
            path: '/api/consume_history/deleteHistory',
            method: 'deleteHistory',
            type: 'post'
        },
        {
            file: './consume_history',
            path: '/api/consume_history/wastedList',
            method: 'wastedList',
            type: 'post'
        },
        {
            file: './goal',
            path: '/api/goal/request_goal',
            method: 'request_goal',
            type: 'post'
        },
        {
            file: './goal',
            path: '/api/goal/save_goal',
            method: 'save_goal',
            type: 'post'
        },
        {
            file: './goal',
            path: '/api/goal/edit_goal',
            method: 'edit_goal',
            type: 'post'
        },
        {
            file: './goal',
            path: '/api/goal/delete_goal',
            method: 'delete_goal',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/cate_used_goal_money',
            method: 'cate_used_goal_money',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/all_used_goal_money',
            method: 'all_used_goal_money',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/compare_user_user',
            method: 'compare_user_user',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/compare_user_other',
            method: 'compare_user_other',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/compare_user_other_genderAge',
            method: 'compare_user_other_genderAge',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/compare_user_other_job',
            method: 'compare_user_other_job',
            type: 'post'
        },
        {
            file: './analysis',
            path: '/api/analysis/word_cloud_history',
            method: 'word_cloud_history',
            type: 'post'
        },
        {
            file: './card',
            path: '/api/card/card_benefit_list',
            method: 'card_benefit_list',
            type: 'post'
        }

    ],
    jsonrpc_api_path: '/api'
};
