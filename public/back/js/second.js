

//利用ajax向后台发送请求
$(function(){
  var currentPage=1;
  var pageSize=5;

  render();

  function render(){

    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"GET",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        //数据和模板进行绑定
        var str=template("tmp",info);
        $("tbody").html(str);



        //初始化分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            //重新渲染当前页
            render();
          }
        }); 
      }
    })
  }

  // 给添加按钮注册点击事件，模态框显示
  $("#addSecond").click(function(){
    $("#addModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("downTmp", info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  })

//通过事件委托，给a注册点击事件
$(".dropdown-menu").on("click","a",function(){
  // 获取文本，赋值给dropTxt
  var txt=$(this).text();

  $(".dropTxt").text(txt);
  
    // 获取当前 a 中存储的 id
    var id = $(this).data("id");
    // 设置给 name="categoryId" 的input
    $('[name="categoryId"]').val( id );

    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
})

//文件上传初始化
$('#upload').fileupload({
  dataType: "json",
  // 文件上传完成时调用的回调函数
  done: function( e, data ) {
    // data.result 就是后台返回的数据
    console.log( data.result )
    //获取图片地址
    var picUrl=data.result.picAddr;
    console.log(picUrl);

    //把图片地址复制给imgbox
    $("#imgBox img").attr("src",picUrl);

    // 将图片地址设置给 name="brandLogo" 的 input 用于提交
    $('[name="brandLogo"]').val( picUrl );
     // 重置校验状态
     $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
  }
});


  //  进行表单校验初始化
  $("#form").bootstrapValidator({
 
  // 需要对隐藏域进行校验, 不能排除隐藏域, 将 excluded 置为 [], 表示对所有 input 进行校验
  excluded: [],


  // 指定校验时显示的图标, 固定写法
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',      // 校验成功
    invalid: 'glyphicon glyphicon-remove',   // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },

  // 配置校验字段
  fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: "请选择一级分类"
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类"
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: "请选择图片"
        }
      }
    }
  }
  });


  //利用ajax向后台发送请求，重新渲染页面
  // 给添加按钮注册点击事件
  $("#form").on("success.form.bv",function(){
    $.ajax({
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      type:"POST",
      success:function(info){
        //请求成功后，关闭模态框
        if(info.success){
          $("#addModal").modal("hide");

          //重新渲染页面
          currentPage=1;
          render();
          // 重置表单
          $('#form').data("bootstrapValidator").resetForm(true);

          // 手动重置下拉框和图片
          $(".dropTxt").text("请输入一级分类");
          $("#imgBox img").attr("src","images/none.png")
        }
  
      }
    })
  })

})