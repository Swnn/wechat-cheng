var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec: [
      {
        url: '../images/矩形 3.png',
        txt: "能量卡",
        txt1:'如何获得'
      }
    ],
    nodes:[{
      name:'p',

      children: [{
        type: "text",
        text: '为政之要，莫先于用人。”政治路线确定之后，干部就是决定因素。实现中华民族伟大复兴的中国梦，关键在党，关键在人，关键在培养和造就高素质的干部队伍。7月4日，习近平在全国组织工作会议上指出：“贯彻新时代党的组织路线，建设忠诚干净担当的高素质干部队伍是关键，重点是要做好干部培育、选拔、管理、使用工作。”请随“学习中国”小编一起学习。'
      }],
    }],
    },
        tap: function () {
            console.log(tap)

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that=this;
    var id=options.id;
    console.log(id)
    var image;
wx:wx.request({
  url: 'https://jingka.zzxkeji.cn/Api/about_card',
      data: '',
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
        content:res.data.data.data.content,
        way:res.data.data.data.way
        });
        var content = res.data.data.data.content;
        WxParse.wxParse('article', 'html', content, that, 5);
        var way=res.data.data.data.way;
        console.log(way)

      },
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