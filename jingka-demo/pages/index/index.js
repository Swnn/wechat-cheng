var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    indicatorDots: true,  //小圆点
    autoplay: true,  //自动轮播
    interval: 3000,  //间隔时间
    duration: 1000,  //滑动时间


    array:[
      {
        link:"../aboutjk/aboutjk",
        url:'../images/卡.png',
        text:"关于静卡"   
      },
      {
        link: "#",
        url: '../images/购物袋.png',
        text: "购买静卡"
      },
      {
        link: "#",
        url: '../images/扫码.png',
        text: "核销码"
      },
      {
        link: "#",
        url: '../images/绑定.png',
        text: "绑卡"
      }
      ],

      rec:[
        {
        url: '../images/矩形 3.png',
        txt:'活动分类',
        txt1:'热门活动'
        }
      ],
  },

  onLoad: function () {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth, 
          winHeight: res.windowHeight
        });
      }

    });

    wx.request({
      url: 'https://jingka.zzxkeji.cn/api/index', 
      success: function (res) {
        that.setData({
          banner: res.data.data.banner,
          activity_type:res.data.data.activity_type,
          hot:res.data.data.hot,
        });
      }
    })

    // app.ajax(api.index,{catid:'ss'},(data,err)=>{
    //   that.setData({ 
    //     banner: res.data.data.banner,
    //     activity_type: res.data.data.activity_type,
    //     hot: res.data.data.hot,
    //     })
    // })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 点击分享
   */
  onShareAppMessage: function () {

  }
})  
