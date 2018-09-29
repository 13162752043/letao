
$(function(){
  var currentPage=1;
  var pageSize=5;

  var currentId;
  var isDelete;
  render();
//利用ajax向后台发送请求
function render(){
  $.ajax({
    url:"/user/queryUser",
    type:'get',
    dataType:"json",
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    success:function(info){
      //数据和模板进行绑定
      var htmlStr = template( "tmp", info );
        // 根据生成的 htmlStr 模板, 渲染 tbody
        $('tbody').html( htmlStr );

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();
          }
        }); 
    }
  })
}


// 点击按钮，展示模态框
  $("tbody").on("click",".btn",function(){
    //模态框进行显示
    $('#userModal').modal("show");
    //获取当前点击的按钮的id
    currentId=$(this).parent().data("id");
    isDelete=$(this).hasClass("btn-danger")? 0:1;
  
  })

  //给模态框的确定按钮注册点击事件，利用ajax向后台发送请求，根据返回的数据渲染页面
  $("#true").click(function(){
    $.ajax({
      url:'/user/updateUser',
      type:"post",
      dataType:"json",
      data:{
        id:currentId,
        isDelete:isDelete,
      },
      success:function(info){
        if(info.success){
          //关闭模态框
          $('#userModal').modal("hide");
          //重新渲染页面
          render();
        }
      }
    })
  })
 
})