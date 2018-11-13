var COMFUN = require("commonFun.js");

function isOperator(value) {
  var operatorString = '+-*/()×÷';
  return operatorString.indexOf(value) > -1;
}

function getPrioraty(value) {
  if (value == '-' || value == '+') {
    return 1;
  } else if (value == '*' || value == '/' || value == '×' || value == '÷') {
    return 2;
  } else {
    return 0;
  }
}

function prioraty(v1, v2) {
  return getPrioraty(v1) <= getPrioraty(v2);
}

function outputRpn(exp) {
  var inputStack = [];
  var outputStack = [];
  var outputQueue = [];
  var expIndex = 0;
  var hasM = false;
  var firstM = false;
  var reg = /\s/g;    //空白字符
  var reg1 = /^[\d]+$/; //是否为数字
  var reg2 = /\-{1}/;   //替换第一个负号
  exp = exp.replace(reg, '');
  if (exp[0] == "-") {
    firstM = true;
    exp = exp.replace(reg2, '');
  }
  for (var e in exp) {
    if (reg1.test(exp[e])) {
      expIndex = e;
      break;
    }
  }
  if (exp[expIndex - 1] && exp[expIndex - 1] == "-") {
    hasM = true;
    exp = exp.replace(reg2, '');
  }
  COMFUN.showLog(exp)
  for (var i = 0, max = exp.length; i < max; i++) {
    if (!isOperator(exp[i]) && !isOperator(exp[i - 1]) && (i != 0)) {
      inputStack[inputStack.length - 1] = inputStack[inputStack.length - 1] + exp[i] + '';
    } else {
      inputStack.push(exp[i]);
    }
  }
  COMFUN.showLog(inputStack);
  if (hasM && inputStack[expIndex - 1]) {
    if (reg1.test(inputStack[expIndex - 1])) {
      inputStack[expIndex - 1] = -inputStack[expIndex - 1];
    }
  }
  if (firstM) {
    for (var i = 0; i < inputStack.length; i++) {
      i = judgeSym(inputStack, i);
      if (reg1.test(inputStack[i])) {
        inputStack[i] = -inputStack[i];
      }
      if (inputStack[i + 1] == ")")
        break;
    }
  }
  COMFUN.showLog(inputStack)
  while (inputStack.length > 0) {
    var cur = inputStack.shift();
    if (isOperator(cur)) {
      if (cur == '(') {
        outputStack.push(cur);
      } else if (cur == ')') {
        var po = outputStack.pop();
        while (po != '(' && outputStack.length > 0) {
          outputQueue.push(po);
          po = outputStack.pop();
        }
      } else {
        while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
          outputQueue.push(outputStack.pop());
        }
        outputStack.push(cur)
      }
    } else {
      outputQueue.push(Number(cur));
    }
  }
  if (outputStack.length > 0) {
    while (outputStack.length > 0) {
      outputQueue.push(outputStack.pop());
    }
  }
  COMFUN.showLog(outputQueue);
  return outputQueue;
}

//递归，判断此位是否为这两种，否则返回下一index
function judgeSym(inputStack, i) {
  if (inputStack[i] == "×" || (inputStack[i] == "÷")) {
    i += 2;
    return judgeSym(inputStack, i);
  } else {
    return i;
  }
}
function calRpnExp(rpnArr) {
  var stack = [];
  for (var i = 0, max = rpnArr.length; i < max; i++) {
    if (!isOperator(rpnArr[i])) {
      stack.push(rpnArr[i]);
    } else {
      if (stack && stack.length > 1) {
        var num1 = stack.pop();
        var num2 = stack.pop();
        if (rpnArr[i] == '-') {
          var num = num2 - num1;
        } else if (rpnArr[i] == '+') {
          var num = num2 + num1;
        } else if (rpnArr[i] == '*' || rpnArr[i] == '×') {
          var num = num2 * num1;
        } else if (rpnArr[i] == '/' || rpnArr[i] == '÷') {
          var num = num2 / num1;
        }
      }
      stack.push(num);
    }
  }
  var stackNum = stack[0];
  if (COMFUN.lTFour(stackNum)) {
    return stackNum;
  }
  return COMFUN.toFourDig(stackNum);

}

function calCommonExp(exp) {
  var rpnArr = outputRpn(exp);
  return calRpnExp(rpnArr)
}
module.exports = {
  calCommonExp: calCommonExp
}