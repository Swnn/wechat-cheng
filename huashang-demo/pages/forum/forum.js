
const app = getApp(),
  api = require('../../api.js'),
  util = require('../../utils/util.js');
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: "none",
    display1:"none",
    indicatorDots: false, //小圆点
    autoplay: true, //自动轮播
    interval: 3000, //间隔时间
    duration: 1000, //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajax(api.luntan, {
        rd_session: wx.getStorageSync('rd_session'),
      }, (data, err) => {
       
        this.setData({
          zhantu:data.zhantu,
          liuyan:data.liuyan
        })
      }) 
  },
  Add_dis:function(){
  wx.navigateTo({
    url: '../Add_dt/add_dt',
  })
  },
  Add_dt:function(e){
    app.ajax(api.shangchuan, {
      rd_session: wx.getStorageSync('rd_session'),
      content: e.detail.value,
      image:"../images/论坛/L_10.png"
    }, (data, err) => {

    })
    app.ajax(api.luntan, {
      rd_session: wx.getStorageSync('rd_session'),
    }, (data, err) => {
      this.setData({
        zhantu: data.zhantu,
        liuyan: data.liuyan
      })
    })
    
  },
 zan:function(e){
   id = e.currentTarget.dataset.id
   app.ajax(api.zan,{
     rd_session: wx.getStorageSync('rd_session'),
     id:id
   },(data,err)=>{
   })
   app.ajax(api.luntan, {
     rd_session: wx.getStorageSync('rd_session'),
   }, (data, err) => {
     this.setData({
       zhantu: data.zhantu,
       liuyan: data.liuyan
     })
   })
 },

  pinglun:function(e){
    id = e.currentTarget.dataset.id
    this.setData({
      display: "block"
    })
},
content:function(e){
  console.log(e)
  app.ajax(api.pinglun,{
    rd_session: wx.getStorageSync('rd_session'),
    id: id,
    content:e.detail.value     
  },(data,err)=>{
    // wx.setStorageSync("content", data.)
    console.log(data)
 })
  app.ajax(api.luntan, {
    rd_session: wx.getStorageSync('rd_session'),
  }, (data, err) => {
    this.setData({
      zhantu: data.zhantu,
      liuyan: data.liuyan
    })
  })
},
submit:function(){
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