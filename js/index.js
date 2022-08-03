// 发送数据

// 获取数据 ====》 键盘==keycode 如果按下的键是enter===13，则发送数据
// 判断message.value是否有值
var oContent = document.querySelector(".content"); //获取class为content的标签/此标签的第一个
var Message = document.getElementsByClassName("message")[0];
var oBtn = document.getElementsByClassName("send")[0];
Message.onkeydown = function (e) {
  if (e.keyCode === 13) {
    var value = Message.value;
    console.log(value);
    if (value) {
      readerMessage("user", value);
      this.value = "";
      sendMessage(value);
    }
  }
};
// 发送按钮
oBtn.onclick = function () {
  if (Message.value) {
    readerMessage("user", Message.value);
    sendMessage(Message.value);
    Message.value = "";
  }
};

// 发出网络请求方法 === ajax.js
function sendMessage(text) {
  console.log(text);
  ajax({
    method: "get",
    url: "http://developer.duyiedu.com/edu/turing/chat",
    data: "text=" + text,
    success: function (data) {
      console.log(data);
      readerMessage("root", data.text);
    },
    error: function (e) {
      console.log(e);
    },
  });
}

// 渲染信息 who：是谁说的话 text：说了什么
// 判断who是不是user  获取content区域 ===》img路径
// 创建聊天结构
/*  <div class="user fr ">
       <img src="./img/dog1.jpg" class="avator fr" >
       <div class="text fr">今天星期几今天星期几今天星期几今天星期几今天星期几今天星期几</div>
     </div> 
*/
function readerMessage(who, text) {
  var oDiv = document.createElement("div");
  var oImg = new Image();
  var oText = document.createElement("div");
  oImg.className = "avator";
  oText.className = "text";
  oText.innerText = text;
  if (who == "user") {
    oImg.src = "./img/dog1.jpg";
    oDiv.className = "user";
  } else {
    oImg.src = "./img/3.png";
    oDiv.className = "root";
  }
  oDiv.appendChild(oImg);
  oDiv.appendChild(oText);
  oContent.appendChild(oDiv);
  // 滚动条跳转
  oContent.scrollTo(0, oContent.scrollHeight - oContent.clientHeight);
}
