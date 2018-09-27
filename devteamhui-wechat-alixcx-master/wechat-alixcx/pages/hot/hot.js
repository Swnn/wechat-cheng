var app = getApp(), 
api = require('../../api.js'),
 util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec: [
      {
        url: '../images/矩形 3.png',
        txt1:'热门活动'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.request({
    //   url: 'https://jingka.zzxkeji.cn/api/index',
    //   success: function (res) {
    //     var hot=res.data.data.hot
    //     for(var i=0;i<hot.length;i++){
    //       if(hot[i].id==id){
    //         thumb=hot[i].thumb
    //         title=hot[i].title
    //       }
    //     }
    //     that.setData({
    //       banner: res.data.data.banner,
    //       activity_type: res.data.data.activity_type,
    //       hot: res.data.data.hot,
    //       thumb:thumb,
    //       id:id,
    //       title:title
    //     });
    //   }
    // })
      var id = options.id;
      var that = this;
      var thumb;
      var title;
      app.ajax(api.index, {

      }, (data, err) => {
        var banner = data.data.banner
        for (var i = 0; i < banner.length; i++) {
          if (banner[i].id == id) {
            thumb = banner[i].url
            title = banner[i].position_name
          }
        }
        that.setData({
           banner: data.data.banner,
           activity_type: data.data.activity_type,
           hot: data.data.hot,
           thumb:thumb,
           id:id,
           title:title
         });
      })
  },





  
})