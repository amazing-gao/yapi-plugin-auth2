const axios = require('axios')
const find = require('lodash.find')
const yapi = require('yapi.js');
const baseController = require('controllers/base.js');

class oauth2Controller extends baseController {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * oauth2回调
   * @param {*} ctx
   */
  async oauth2Callback(ctx) {
    // 获取code和state
    const oauthcode = ctx.request.query.code;
    const oauthstate = ctx.request.query.state;

    if (!oauthcode) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'code不能为空'));
    }

    if (!oauthstate) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'state不能为空'));
    }

    // 获取oauth2配置信息
    const opts = loadOpts();
    if (!opts) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'oauth2未配置，请配置后重新启动服务'));
    }

    const { authServer, tokenPath, clientId, clientSecret, redirectUri, authArgs } = opts.options;

    try {
      const tokenResult = await axios.request({
        method: 'get',
        baseURL: authServer,
        url: tokenPath,
        params: Object.assign({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: oauthcode,
          oauthstate: oauthstate,
          redirect_uri: encodeURIComponent(redirectUri)
        }, authArgs)
      });

      if (tokenResult.status === 200) {
        ctx.redirect('/api/user/login_by_token?token=' + tokenResult.data.access_token);
      } else {
        ctx.body = yapi.commons.resReturn(null, tokenResult.status, tokenResult.statusText);
      }
    } catch (err) {
      if (err.response) {
        ctx.body = yapi.commons.resReturn(null, 400, err.response.message);
      } else {
        ctx.body = yapi.commons.resReturn(null, 400, err.message);
      }
    }
  }
}

/**
 * 加载oauth2配置文件
 */
function loadOpts() {
  return find(yapi.WEBCONFIG.plugins, (plugin) => {
    return plugin.name === 'oauth';
  })
}

module.exports = oauth2Controller;