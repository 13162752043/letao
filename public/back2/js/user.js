// 需求：动态渲染数据
$(function(){
  //利用ajax向后台发送请求
  $.ajax({
    url:'/user/queryUser',
    data:{
      page:1,
      pageSize:5,
    },
    dataType:"json",
    success:function(info){
      console.log(info);
    }
  })
})