var showDebug = false;


function showLog(str) {
  if (showDebug) {
    console.log(str)
  }
}


function showToast(str, icon, image, time, canTouch) {
  if (icon == "") {
    icon = "success";
  }
  if (!image) {
    image = "";
  }
  wx.showToast({
    title: str,
    icon: icon,
    image: image,
    duration: time,
    mask: !canTouch,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {}
  })
}

//判断是否为整数
function IsInteger(num) {
  return num % 1 == 0;
}

//保留四位小数
function toFourDig(num) {
  var newNum = num.toFixed(4);
  return newNum;
}

//判断小数部分是否大于四位
function lTFour(num) {
  if (num && !IsInteger(num)) {
    var newStr = (num + "").split(".")[1];
    return newStr.length <= 4;
  }
  return true;
}

//判断左右括号是否相等
function judgeBrackNum(exp) {
  var leftBrackNum = 0;
  var rightBrackNum = 0;
  for (var e in exp) {
    if (exp.charAt(e) == "(") {
      leftBrackNum++;
    } else if (exp.charAt(e) == ")") {
      rightBrackNum++;
    }
  }
  if (leftBrackNum == rightBrackNum) {
    return true;
  }
  return false;
}





module.exports = {
  showLog: showLog,
  showToast: showToast,
  toFourDig: toFourDig,
  IsInteger: IsInteger,
  lTFour: lTFour,
  judgeBrackNum: judgeBrackNum
  // MsgToast: MsgToast
}