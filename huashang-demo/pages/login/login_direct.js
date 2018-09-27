var app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
Page({
  data: {},
  //获取用户信息
  get_user_info: function(ress) {
    console.log(ress)
    var invite_id = wx.getStorageSync("inviter_id");
    wx.login({
      success: (res) => {
        if (res.code) {
          setTimeout(() => {
            app.ajax(api.wxlogin, {
              "parentid": app.check_empty(invite_id) ? 0 : invite_id,
              "code": res.code,
              "rawData": ress.detail.rawData,
              "signature": ress.detail.signature,
              'iv': ress.detail.iv,
              'encryptedData': ress.detail.encryptedData
            }, (data, err) => {
              console.log(data);
              if (data.result === 'success') {
                wx.setStorageSync('rd_session', data.data.rd_session);
                wx.setStorageSync('userinfo', data);
                wx.setStorageSync('openid', data.openId);
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: data.message
                })
              }
            })
          }, 2000)

        } else {
          console.log("wxlogin fail")
        }
      }
    })
  },
  home: function(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
});