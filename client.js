import React, { Component } from 'react'

module.exports = function (options) {
  const handleLogin = () => {
    const { authServer, authPath, redirectUri, clientId, authArgs, state = "STATE" } = options;

    location.href = `${authServer}${authPath}?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}${obj2url(authArgs)}`;
  }

  const buttonName = () => {
    const { buttonName = "OAuth2登录" } = options;

    return buttonName
  }

  const QssoComponent = () => (
    <button onClick={handleLogin} className="btn-home btn-home-normal" >{buttonName()}</button>
  )

  this.bindHook('third_login', QssoComponent);
};

function obj2url(obj) {
  if (typeof obj !== 'object') {
    return '';
  }

  return '&' + Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  }).join('&')
}