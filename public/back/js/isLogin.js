// 需求：判断是否登陆过
//利用ajax向后台发送请求
$(function(){
  $.ajax({
    url:"/employee/checkRootLogin",
    dataType:"json",
    type:"get",
    success:function(info){
      if(info.error==400){
        //返回到登录页
        location.href="login.html";
      }
    }
  })
})