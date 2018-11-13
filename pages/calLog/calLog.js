// pages/calcuPages/calcuIndex.js
var COMFUN = require("../../utils/commonFun.js");
var app = getApp();
Page({

  pressView: function (e) {
    // var viewId = e.target.id;
   
  },
  onLoad: function () { },
  onShareAppMessage: function (res) {
    var shareInfo = {
      title: "迦苇计算器",
      desc: app.globalData.SAYING2,
      path: "/pages/index/index",
      imageUrl: "../../images/jwCalcu.png",
      success: function (res) {
        COMFUN.showToast("转发成功", "", "../../images/success1.png", 2100, false);
      },
      fail: function (res) {
        COMFUN.showToast("转发失败", "", "../../images/fail1.png", 2100, false);
      }
    }
    return shareInfo;
  }

})