// 需求:初始化插件
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
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
          }
        },
      }
    
    });

    /*
    * 2. 通过 submit 按钮进行提交表单, 可以让表单校验插件进行校验
    *    (1) 校验通过, 默认将表单继续提交, 会跳转页面, 需要在校验通过 后,
    *        阻止默认的提交, 通过 ajax 进行登录请求
    *    (2) 校验失败, 表单校验插件本身就会阻止默认的提交
    *
    *    思路: 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进 行提交
    * */
  $("#form").on("success.form.bv",function(e){
    //表单验证成功，阻止默认的跳转行为
    e.preventDefault();
    // 通过ajax行为向后台验证
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      // 表单序列化获取表单的值
      data: $("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        //如果成功，跳转到首页
        if(info.success){
          location.href="index.html";
        }
        if(info.error===1000){
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error===1001)
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
      }
    })

    //重置校验状态
    // 给重置按钮注册点击事件
    $('[type="reset"]').click(function(){
  
      $('#form').data("bootstrapValidator").resetForm();
    })
 })
})