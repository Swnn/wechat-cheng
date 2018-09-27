var app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
Page({
  data: {
    phone: '',
    shenstr: '',
    yzm: '',
    currentTime: 90,
    tt: true
  },
  //获取用户信息
  get_user_info: function(ress) {
    if (app.check_empty(this.data.phone)) {
      wx.showModal({
        title: '提醒',
        content: '请输入手机号码',
      })
      return false
    }
    if (app.check_empty(this.data.yzm)) {
      wx.showModal({
        title: '提醒',
        content: '请输入手机验证码',
      })
      return false
    }

    app.ajax(api.check_verify, {
      phone: this.data.phone,
      code: this.data.yzm
    }, (data, err) => {
      console.log(data)
      if (data.data.data.match == true) {
        console.log('code match')
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
              wx.setStorageSync('rd_session', data.rd_session);
              wx.setStorageSync('userinfo', data);
              wx.setStorageSync('openid', data.openId);
              wx.switchTab({
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
        wx.showModal({
          title: '提醒',
          content: '手机验证码不正确',
        })
        return false;
      }
    })


  },
  //获取验证码
  getCode: function(options) {

    var that = this;

    var currentTime = that.data.currentTime;

    that.setData({

      time: currentTime + '秒'

    })

    var interval = setInterval(function() {

      that.setData({

        time: (currentTime - 1) +
          '秒'

      })

      currentTime--;

      if (currentTime <=
        0) {

        clearInterval(interval)

        that.setData({

          time: '重新获取',

          currentTime: 60,

          disabled: false,
          tt: true

        })

      } else {
        that.setData({
          tt: false
        })
      }

    }, 1000)

  },

  //手机号输入
  getphone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //验证码输入
  getyzmstr(e) {
    this.setData({
      yzm: e.detail.value
    })
  },
  //获取手机验证码
  getyzm() {
    var that = this

    if (this.data.tt == true) {
      if (!that.data.phone == '') {
        app.ajax(api.send_sms, {
          phone: this.data.phone
        }, (data, err) => {

        })
        this.getCode()
      } else {
        wx.showToast({
          title: '手机号不能是空',
        })
      }
    }
  }
});