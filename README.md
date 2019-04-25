# yapi-plugin-auth2

第三方插件，基于Oauth2协议登录，在生成的配置文件中，添加如下配置即可：

```
  "plugins": [
    {
      "name": "auth2",
      "options": {
        "type": "oauth2",
        "clientId": "your client id",
        "clientSecret": "your client secret",
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
- `authServer` oauth2服务器地址
- `authPath` 授权登录页面地址
- `tokenPath` 通过code换取token的接口地址
- `infoPath` 通过token获取用户信息的接口地址
- `redirectUri` 重定向地址，授权登录页面成功之后携带code跳转的目标地址
- `state` OAuth state，默认**STATE**
- `emailKey` 用户信息电子邮件字段key
- `userKey` 用户信息用户名字段key
- `buttonName` 登录按钮名称，默认**OAuth2登录**
- `authArgs` 附加参数，单层json对象，用于格式化到**authPath**, **tokenPath**
