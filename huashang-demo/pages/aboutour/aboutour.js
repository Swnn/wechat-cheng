var WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
Page({



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajax(api.me, {
      rd_session: wx.getStorageSync('rd_session')
    }, (data, err) => {
      this.setData({
        women: data.women,
        yewu: data.yewu
      })
      /*该循环不正确，如果women数组中有多个循环，最后显示的内容只是最后一个，因为他要把所有的循环完 */
      for(var i=0;i<data.women.length;i++){
        var content = data.women[i].content;
      } 
      WxParse.wxParse('article', 'html', content, this, 5);
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false, //小圆点
    autoplay: false, //自动轮播
    // interval: 3000, //间隔时间
    // duration: 1000, //滑动时间

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