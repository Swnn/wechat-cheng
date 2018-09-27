var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    indicatorDots: true,  //小圆点
    autoplay: true,  //自动轮播
    interval: 3000,  //间隔时间
    duration: 1000,  //滑动时间

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
   var that=this;
  console.log(options)
  wx.request({
    url: 'https://jingka.zzxkeji.cn/Api/activity_detail',
    data: {
      rd_session:'277f254b63458675e33ceb50bc67961c',
      id:id
    },
    header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      that.setData({
        images:res.data.data.images,
        title:res.data.data.data.title,
        address:res.data.data.shop_info.address,
        shop_info_title:res.data.data.shop_info.title,
        description:res.data.data.data.description,
        content:res.data.data.data.content,
        energy:res.data.data.data.energy,
      })
      var content=res.data.data.data.content
      WxParse.wxParse('article', 'html', content, that, 5);
    },
  })  
  },

})