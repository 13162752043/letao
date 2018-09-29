// 需求：进行表单验证
$(function(){

  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max:6,
            message: '用户名长度必须在2-6之间'
          },
          //提示信息
          callback:{
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max:12,
            message: '用户名长度必须在6-12之间'
          },
           //提示信息
           callback:{
            message: '密码错误'
          }
        }
      },
    }
  })

  // 验证之后，阻止form表单的提交，利用ajax向后台发送请求
  $("#form").on("success.form.bv",function(e){
    //表单验证成功之后，阻止表单的的提交
    e.preventDefault();

    // 利用ajax向后台发送请求
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",
      data: $("#form").serialize(),
      success:function(info){
        console.log(info);
        //如果成功，返回到首页
        if(info.success){
          location.href="index.html";
        }
        // 如果失败，提示错误信息
        // 用户名不存在
        if(info.error==1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        //密码错误
        if(info.error==1001){
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })

  // 重置按钮只能重置文本，点击重置按钮，重置状态
  $('[type="reset"]').on("click",function(){
    $('#form').data("bootstrapValidator").resetForm();
  })
})



