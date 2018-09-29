// 需求:添加进度条
$(function(){
  // ajax全局变量
  // 第一个ajax开始发送请求时，进度条打开
  $(document).ajaxStart(function(){
    Nprogress.start();
  })

  //最后一个ajax请求完成时，进度条完成进度
  $(document).ajaxStop(function(){
    Nprogress.done();
  })
   

  // 1、给分类管理注册点击事件
  $(".categroy").click(function(){
    $(".child").stop().slideToggle();
  })
  // 给菜单栏注册点击事件，让左侧边栏隐藏
  // 注册点击事件
  $(".bar-menu").click(function(){
    $(".lt-aside").toggleClass("hideMenu");
    $(".lt-topbar").toggleClass("hideMenu");
    $(".lt-main").toggleClass("hideMenu");
  })
   
  // 给退出按钮注册点击事件，让模态框进行展示
  $(".bar-logout").click(function(){
    $("#modul").modal('show');
  })

  //给退出按钮注册点击事件，利用ajax向后台发送请求，销毁后台登陆过的用户，然后跳转到登录页
  $("#logOut").click(function(){
    //ajax向后台发送请求
    $.ajax({
      url:"/employee/employeeLogout",
      type:"GET",
      dataType:"json",
      success:function(info){
        //如果退出成功，跳转到登录页
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
  
})

