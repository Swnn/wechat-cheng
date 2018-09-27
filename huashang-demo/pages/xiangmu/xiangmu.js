var WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var id=options.id
      app.ajax(api.xiangmu,{
        rd_session: wx.getStorageSync('rd_session'),
        id: id
      }, (data, err) => {
        this.setData({
            anli:data.anli
        })
        /*该循环不正确，如果women数组中有多个循环，最后显示的内容只是最后一个，因为他要把所有的循环完，但是如果数组中只有一项，就可以使用 */
        for (var i = 0; i < data.mingxi.length; i++) {
        
          var content = data.mingxi[i].content;
        } 
        
        WxParse.wxParse('article', 'html', content, this, 5);
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