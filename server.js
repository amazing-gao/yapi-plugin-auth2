const axios = require('axios');
const get = require('lodash.get')
const controller = require('./controller');

module.exports = function (options) {
  const { authServer, infoPath, userKey, emailKey, authArgs } = options;

  this.bindHook('third_login', async (ctx) => {
    const token = ctx.request.body.token || ctx.request.query.token;

    try {
      const info = await axios.request({
        method: 'get',
        baseURL: authServer,
        url: infoPath,
        params: Object.assign({
          access_token: token
        }, authArgs)
      });

      if (info.status === 200) {
        return {
          username: get(info.data, userKey),
          email: get(info.data, emailKey)
        };
      } else {
        throw new Error(`${info.status} ${info.statusText}`)
      }
    } catch (error) {
      throw error
    }
  });

  this.bindHook('add_router', function (addRouter) {
    addRouter({
      controller: controller,
      method: 'get',
      path: 'oauth2/callback',
      action: 'oauth2Callback'
    });
  });
}