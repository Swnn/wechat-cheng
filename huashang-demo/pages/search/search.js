
var WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:"none",
    display1:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  search: function (e) {
    app.ajax(api.sousuo, {
      rd_session: wx.getStorageSync('rd_session'),
      content: e.detail.value
    }, (data, err) => {
      console.log(data)
      this.setData({
        list: data.list,
        display: "block"
      })
      var list = data.list;
      if(list.length==0){
        this.setData({
          display1:"block"
        }) 
      }
      for (var i = 0; i < data.list.length; i++) {
        if (i == data.list[i]) {
          var content = data.list[i].content;
        } else {
          content = data.list[i].content;
        }
      }
      WxParse.wxParse('article', 'html', content, this, 5);
    })


  },
  cancel: function () {
    this.setData({
      display: "none"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})