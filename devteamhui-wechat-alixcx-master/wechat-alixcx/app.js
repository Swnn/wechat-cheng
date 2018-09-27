//app.js
var config = require('./config.js');
var  encrypt = require('./utils/encrypt.js');
var secret = config.secret;
var api = require('./api.js');
// const updateManager = wx.getUpdateManager()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本已经准备好，是否重启应用？',
    //     success: function (res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })
  },
  //网络请求核心函数
  ajax: function () {
    var that = this;
    //加密执行
    if (secret) {
      var e = {},
        t = 1e4;
      switch (arguments.length) {
        //一个参数
        case 1:
          var n = arguments[0];
          typeof n == "object" && wx.request({
            url: n.url,
            method: n.method,
            header: {
              "content-type": "application/json"
            },
            success: n.success,
            fail: n.error,
            complete: n.complete
          });
          break;
        //3个参数
        case 3:
          //接口地址
          var n = arguments[0];
          //数据
          var d = arguments[1];
          //回调函数
          var r = arguments[2];
          //错误回调
          var callback_error = arguments[3];
          d.mchid = 'd072f71878ca8a3288b05bb50c0ecc65';

          //数据为空的时候使用GET方式访问url, 数据不为空的时候使用POST方式访问url
          typeof n == "string" && typeof r == "function" && encrypt.isNull(d) ? wx.request({
            url: n,
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            success: r,
            fail: n.error,
            complete: n.complete
          }) : typeof d == "object" && typeof r == "function" && (
            wx.showLoading({
              title: "加载中"
            }),
            //config.secret_debug ? console.log(d) : '',
            wx.request({
              url: n,
              method: "POST",
              data: encrypt.isNull(encrypt.Encrypt(d)) ? "" : encrypt.Encrypt(JSON.stringify(d)),
              header: {
                "content-type": "application/json"
              },
              success: function (e) {
                // config.secret_debug ? console.log(e) : '';
                wx.hideLoading();
                var ajax_r = encrypt.Decrypt(e.data);
                if (config.secret_debug) {
                  console.log(n + '返回数据为：')
                  console.log(ajax_r)
                }

                if (ajax_r.result == 'success') {
                  r(encrypt.Decrypt(e.data))
                } else {
                  wx.hideLoading();
                  switch (ajax_r.message) {
                    case 'login':
                      wx.navigateTo({
                        url: '/pages/login/login',
                      })
                      break;
                    default:
                      wx.showModal({
                        title: '提醒',
                        content: ajax_r.message,
                      })
                      typeof callback_error === 'function' && callback_error(encrypt.Decrypt(e.data));
                  }
                }
              },
              fail: function (e) {
                console.error("错误信息:", e)
              },
              complete: d.complete
            }));
      }
    } else {
      //不加密
      var url = arguments[0];
      var datapost = arguments[1];
      var callback = arguments[2];
      var callback_error = arguments[3];
      //datapost.mchid = 'd072f71878ca8a3288b05bb50c0ecc65';
      var method = "POST";
      var header = {
        'content-type': 'application/json'
      };
      wx.showLoading({
        title: "加载中"
      }),
        //获取数据
        wx.request({
          url: url,
          method: method,
          data: datapost,
          header: header,
          success: function (res) {
            wx.hideLoading();
            if (res.data.result == 'success') {
              wx.hideLoading();
              callback(res.data);
            } else {
              switch (res.data.message) {
                case 'login':
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                  break;
                default:
                  wx.showModal({
                    title: '提醒',
                    content: res.data.message,
                  })
                  typeof callback_error === 'function' && callback_error(res.data);
              }

            }
          }
        });
    }
  },
  globalData: {
    userInfo: null
  }
})