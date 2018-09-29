
//利用ajax向后台发送请求，根据后台返回的数据动态渲染页面
$(function(){
  var currentPage=1;
  var pageSize=5;
  
  //一进入页面，就渲染当前页
  render();

  function render(){
    //利用ajax向后台发送请求
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"GET",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function(info){
        console.log(info)
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


  //给添加按钮注册点击事件
  $(".addBtn").click(function(){
    //让模态框进行显示
    $("#firstModal").modal("show");
  })

  // 进行表单验证
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  //在form验证成功之前阻止form表单的提交
  $("#form").on("success.form.bv",function(e){
    //阻止form表单的提交
    e.preventDefault();

    //利用ajax向后台发送请求
    $.ajax({
      url:"/category/addTopCategory",
      type:"POST",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          // 关闭模态框
          $("#firstModal").modal("hide");
          //重新渲染页面
          currentPage=1;
          render();
          //重置表单，传true是重置状态和文本，默认为false，只重置文本
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})