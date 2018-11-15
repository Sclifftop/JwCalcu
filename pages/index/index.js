//index.js
//获取应用实例
const app = getApp()
var COMFUN = require("../../utils/commonFun.js");
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tSaying: app.globalData.SAYING1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startUse: function() {
    wx.navigateTo({
      url: '../calcuPages/calcuIndex'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function(res) {
    var shareInfo = {
      title: app.globalData.SAYING2,
      // desc: app.globalData.SAYING2,
      path: "/pages/index/index",
      imageUrl: "../../images/jwCalcu.png",
      success: function(res) {
        COMFUN.showToast("转发成功", "", "../../images/success1.png", 2100, false);
      },
      fail: function(res) {
        COMFUN.showToast("转发失败", "", "../../images/fail1.png", 2100, false);
      }
    }
    return shareInfo;
  }
})