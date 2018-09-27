Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec: [
      {
        url: '../images/矩形 3.png',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var that = this;
    var thumb;
    var title;
    wx.request({
      url: 'https://jingka.zzxkeji.cn/api/index',
      success: function (res) {
        var hot=res.data.data.hot
        for(var i=0;i<hot.length;i++){
          if(hot[i].id==id){
            thumb=hot[i].thumb
            title=hot[i].title
          }
        }
        that.setData({
          banner: res.data.data.banner,
          activity_type: res.data.data.activity_type,
          hot: res.data.data.hot,
          thumb:thumb,
          id:id,
          title:title
        });
      }
    })
  },
})