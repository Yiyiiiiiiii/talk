/**
 * @param {Object} options
 * @desc 封装一个ajax函数，使所有的网络请求都用该函数
 * 参数：   
         1.method ：请求方式
         2.url ： 请求地址
         3.data ：请求参数（数据）
         4.isAsync ： 是否异步
         5.success ： 成功拿到数据之后做的功能  成功的回调函数
         6.error ： 失败的回调函数

         当前函数有局限性： data必须为字符串  method 请求方式只能为get/post
 */

function ajax(options) {
  //设置参数
  var method = options.method || "get";
  var url = options.url || "";
  var data = options.data || "";
  var isAsync = options.isAsync == undefined ? true : options.isAsync;
  var success = options.success || function () {};
  var error = options.error || function () {};

  var xhr = null;
  //兼容
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return alert("当前浏览器不支持XMLHttpRequest");
  }

  //监听
  //正确
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // 接收到数据之后的处理
        // 将拿到的数据字符串转成对象
        success(JSON.parse(xhr.responseText));
      }
    }
  };
  //错误
  xhr.onerror = function (e) {
    error("error");
  };

  //建立连接处理
  //统一将用户传递过来的请求方式转换为大写
  method = method.toUpperCase();
  //1.判断当前method是否为get
  //1.1判断url是否有问号，有的话问号在哪里---》问号的位置是否在最后，是的话直接拼接，否则用&拼接，如果没有，用？拼接
  //1.2建立连接处理
  if (method == "GET") {
    if (url.indexOf("?") > -1) {
      if (url.indexOf("?") == url.length - 1) {
        url += data;
      } else {
        url += "&" + data;
      }
    } else {
      url += "?" + data;
    }
    console.log(method, url, isAsync);
    xhr.open(method, url, isAsync);
    xhr.send();
  }
  //2.否则--》post请求
  else {
    xhr.open(method, url, isAsync);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
}
