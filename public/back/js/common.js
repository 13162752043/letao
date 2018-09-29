// 需求：添加进度条
//给ajax添加全局事件
$(function(){
  // .ajaxStart是第一个ajax开启时触发
  $(document).ajaxStart(function(){
  // 开启进度条
    NProgress.start();
  })

  //.ajaxStop是最后一个ajax请求结束时调用
  $(document).ajaxStop(function(){
    //进度条完成
    NProgress.done();
  })
})

// 1、给分类管理二级菜单切换
// 2、让左边菜单栏隐藏
//注册点击事件，让二级菜单进行展示
$(function(){
  $(".nav .category").click(function(){
    $(".nav .child").stop().slideToggle();
  })
   //给icon-left注册点击事件
   $(".lt-toolbar .icon-left").click(function(){
     $(".lt-aside").toggleClass("hiddenmenu");
     $(".lt-main").toggleClass("hiddenmenu");
     $(".lt-toolbar").toggleClass("hiddenmenu");
   })

   //给退出按钮注册点击事件
   $(".lt-toolbar .icon-right").click(function(){
     console.log(1);
    $("#loginoutModal").modal('show');
   })

   //给退出按钮注册点击事件
   $("#loginout").click(function(){
    //利用ajax向后台发送请求，在服务器端销毁该用户的登录
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        if ( info.success ) {
          // 退出成功, 跳转到登陆页
          location.href = "login.html";
        }
      }
    })
   })
})

