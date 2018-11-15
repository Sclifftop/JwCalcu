// pages/calcuPages/calcuIndex.js
const COMFUN = require("../../utils/commonFun.js");
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    logs: []
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('calLog') || []).map(log => {
        return {
          "val": log
        }
      })
    })
  },
  clearLog: function() {
    var calLog = wx.getStorageSync('calLog') || [];
    if (calLog && calLog.length == 1 && calLog[0] == "暂无记录") {

    } else {
      wx.clearStorageSync('calLog');
      calLog = [];
      calLog.unshift("暂无记录");
      wx.setStorageSync('calLog', calLog);
      this.onLoad();
    }
  },
  onShareAppMessage: function(res) {
    var shareInfo = {
      // title: "迦苇计算器",
      // desc: app.globalData.SAYING2,
      title: app.globalData.SAYING2,
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