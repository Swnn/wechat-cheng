//index.js
//获取应用实例
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
    currentTab: 0,
    indicatorDots: false, //小圆点
    autoplay: true, //自动轮播
    interval: 3000, //间隔时间
    duration: 1000, //滑动时间
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

  },


  search: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    if (wx.getStorageSync('rd_session') == "" || wx.getStorageSync('rd_session') == undefined) {
      wx.navigateTo({
        url: '../login/login_direct',
      })
      return false;
    } else {
      app.ajax(api.index, {
        rd_session: wx.getStorageSync('rd_session')
      }, (data, err) => {
        var xiangmu=data.xiangmu;
        this.setData({
          lunbo:data.lunbo,
          xiangmu:data.xiangmu,
          guangao: data.guangao,
        })
      })
    }
  },

  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
forum:function(){
  wx.navigateTo({
    url: '../forum/forum',
  })
},
aboutour:function(){
  wx.navigateTo({
    url: '../aboutour/aboutour',
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})