//설정값을 가지고 있는 모듈
module.exports = {
  server_port: 3000,
  route_info: [{
      file: './user',
      path: 'api/user/login',
      method: 'login',
      type: 'post'
    },
    {
      file: './user',
      path: 'api/user/logout',
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
      path: '/api/user/loadContents',
      method: 'loadContents',
      type: 'get'
    }
  ],
  jsonrpc_api_path: '/api'
};
