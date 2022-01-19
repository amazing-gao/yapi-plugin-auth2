# yapi-plugin-auth2

[license-img]: http://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT
[node-image]: https://img.shields.io/badge/node.js-v6.0.0-blue.svg
[node-url]: http://nodejs.org/download/
[npm-img]: https://img.shields.io/npm/v/yapi-plugin-auth2.svg
[npm-url]: https://npmjs.org/package/yapi-plugin-auth2
[downloads-image]: https://img.shields.io/npm/dm/yapi-plugin-auth2.svg
[downloads-url]: https://npmjs.org/package/yapi-plugin-auth2


[![License][license-img]][license-url]
[![Node Version][node-image]][node-url]
[![NPM Version][npm-img]][npm-url]
[![Downloads][downloads-image]][downloads-url]


第三方插件，基于Oauth2协议登录，在生成的配置文件中，添加如下配置即可：

```
  "plugins": [
    {
      "name": "auth2",
      "options": {
        "type": "oauth2",
        "clientId": "your client id",
        "clientSecret": "your client secret",
        "authMethod": "GET",
        "authServer": "http://your.yapiserver",
        "authPath": "登录页面地址",
        "tokenPath": "code换取token接口地址",
        "infoPath": "用户信息接口地址",
        "redirectUri": "http://your.yapiserver/api/plugin/oauth2/callback",
        "userKey": "usernamekey",
        "emailKey": "emailkey",
        "buttonName": "统一登录",
        "authArgs": {
          "login_type": "oa"
        }
      }
    }
  ]
```
使用注意:

- Oauth2服务器用户信息需要提供: `email`和`username`两个字段，如果字段名不一致，可以通过`emailKey`和`userKey`设置。

这里面的配置项含义如下：

- `clientId` 客户端id
- `clientSecret` 客户端秘钥
- `authMethod` 调用oauth2服务器地址时的方法，默认**GET**
- `authServer` oauth2服务器地址
- `authPath` 授权登录页面地址
- `tokenPath` 通过code换取token的接口地址
- `infoPath` 通过token获取用户信息的接口地址
- `redirectUri` 重定向地址，授权登录页面成功之后携带code跳转的目标地址
- `state` OAuth state，默认**STATE**
- `emailKey` 用户信息电子邮件字段key，当值为数组时按优先级尝试获取邮箱
- `userKey` 用户信息用户名字段key，当值为数组时按优先级尝试获取用户名
- `buttonName` 登录按钮名称，默认**OAuth2登录**
- `authArgs` 附加参数，单层json对象，用于格式化到**authPath**, **tokenPath**
