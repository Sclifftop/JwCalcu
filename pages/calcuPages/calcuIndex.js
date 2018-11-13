// pages/calcuPages/calcuIndex.js
var CALFUN = require("../../utils/calculatorFun.js");
var COMFUN = require("../../utils/commonFun.js");
var app = getApp();
Page({

  pressView: function (e) {
    // var viewId = e.target.id;
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    var operators = ['+', '-', '×', '÷'];
    var decimalAdded = false;
    var screenStr = this.data.screen ? this.data.screen : "";
    if (screenStr == "计算式有误") {
      screenStr = "";
    }
    var resultText = "" + screenStr;
    if (viewText == "C") {
      resultText = "";
      this.setData({
        screen: " "
      })
      decimalAdded = false;

    } else if (viewText == "=") {
      var equation = resultText;
      var reg = /^[\d]+$/;
      var reg2 = /(^\.)|(\.$)|([\+\-\*\/]\.)|(\.[\+\-\*\/])|((\d+\.+){2,}\d*)/;
      // var reg2 = /(^[\+\*\/])|([\+\-\*\/]$)|([\+\-\*\/][\+\*\/]+)|([\*\/](\-)+)|([\+\-](\-){2,})/;
      // var trueFirst = reg2.test(equation);

      if (reg2.test(equation) || !COMFUN.judgeBrackNum(equation)) {
        COMFUN.showToast("格式错误", "", "../../images/fail.png", 2100, false);
        return;
      }
      var isNum = reg.test(equation);
      var lastChar = equation[equation.length - 1];
      //equation = equation.replace(/×/g, '*').replace(/÷/g, '/');
      if (operators.indexOf(lastChar) > -1 || lastChar == '.')
        equation = equation.replace(/.$/, '');
      if (equation && !isNum) {
        COMFUN.showLog(equation);
        var theResult = "" + CALFUN.calCommonExp(equation);  //数字转为字符串,否则为0或1，下面判断出错
        if (theResult == "NaN" || !theResult) {
          resultText = "计算式有误";
        } else {
          resultText = theResult;
        }
      }
      decimalAdded = false;
    } else if (viewText == ".") {
      if (!decimalAdded) {
        resultText += viewText;
        decimalAdded = true;
      }
    } else if (operators.indexOf(viewText) > -1) {
      var lastChar = resultText[resultText.length - 1];

      if (resultText != '' && operators.indexOf(lastChar) == -1)
        resultText += viewText;
      else if (resultText == '' && viewText == '-')
        resultText += viewText;
      if (operators.indexOf(lastChar) > -1 && resultText.length > 1) {
        resultText = resultText.replace(/.$/, viewText);
      }
      decimalAdded = false;
    } else if (viewText == "←") {
      COMFUN.showLog(resultText)
      resultText = resultText.substr(0, resultText.length - 1);

    } else {
      resultText += viewText;
    }
    if (resultText.length > app.globalData.SCREENMAXLENGTH) {
      COMFUN.showToast("字符过长", "", "../../images/fail.png", 2100, false);
      resultText = screenStr;
    }

    this.setData({
      screen: resultText
    })
  },
  showLog: function () {
    wx.navigateTo({
      url: '../calLog/calLog'
    })
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