var tempFilePaths;
var fileArrayfileArray = []
const app = getApp(),
  api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadimgs:[],
    img_url: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },


  //上传图片
  chooseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths;
        console.info(tempFilePaths);
        wx.setStorage({
          key: 'tempFilePaths',
          data: tempFilePaths,
        })
        that.setData({
          uploadimgs: that.data.uploadimgs.concat(tempFilePaths)
        })
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length
        var i = 0;
        that.uploadFile(tempFilePaths, successUp, failUp, i, length);


        let img_url = that.data.img_url;
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          img_url.push(res.tempFilePaths[i])
        }
        that.setData({
          img_url: img_url
        })
      }
    })
  },
  uploadFile: function (filePaths, successUp, failUp, i, length) { //递归调用
    console.log(i + "file路径为" + filePaths);
    var that = this;
    wx.uploadFile({
      url: 'https://huashang.zzxkeji.cn/Api/uploads',
      filePath: filePaths[i],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        // 'session_token': wx.getStorageSync('session_token'),
        // sco_id: sco_id,
        // path_image: filePaths[i],
        rd_session: wx.getStorageSync('rd_session'),
      },
      success: function (res) {
        console.log(res.data)
        var addimg = JSON.parse(res.data)
        console.log(addimg)
        successUp++;
        fileArrayfileArray.push(addimg.url)
        //console.log(fileArrayfileArray)
      },
      fail: function (res) {
        failUp++;
      },
      complete: function () {
        i++;
        if (i == length) {
          //console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
        } else { //递归调用uploadDIY函数
          that.uploadFile(filePaths, successUp, failUp, i, length);
        }
      }
    })
  },
  Add_dt: function (e) {
    var that = this;
    console.log(e)
    app.ajax(api.shangchuan, {
      rd_session: wx.getStorageSync('rd_session'),
      content: e.detail.value,
      image: filePaths
    }, (data, err) => {

    })
    app.ajax(api.luntan, {
      rd_session: wx.getStorageSync('rd_session'),
    }, (data, err) => {
      that.setData({
        zhantu: data.zhantu,
        liuyan: data.liuyan
      })
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