import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:my_app/entity/common/http_response.dart';
import 'package:my_app/routes/routes.gr.dart';
import 'package:my_app/services/user_service.dart';
import 'package:my_app/setup_get_it.dart';
import 'package:my_app/widgets/base/button/counter_button.dart';
import 'package:my_app/widgets/base/fonts/my_icons_icons.dart';
import 'package:my_app/widgets/base/toast/common_toast.dart';
import 'package:my_app/widgets/const/reg_parttern.dart';

class LoginForm extends StatefulWidget {
  LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  bool _active = false;
  TextEditingController controller = TextEditingController();
  TextEditingController codeController = TextEditingController();
  FocusNode currentFocusNode = FocusNode();
  FocusNode focusNode = FocusNode();
  UserService userService = getIt<UserService>();

  _changeFocus(FocusNode focusNodeNext) {
    // 判断一下，current是否被聚焦，取消聚焦 -> 聚焦新的输入框
    FocusNode currentFocus = FocusScope.of(context);
    if (!currentFocus.hasPrimaryFocus) {
      currentFocus.unfocus();
    }
    focusNodeNext.requestFocus();
  }

  // @override
  // void initState() {
  //   // getPostList
  //   ContentService contentService = getIt<ContentService>();
  //   contentService.getPostList();
  //   super.initState();
  // }

  @override
  Widget build(BuildContext context) {
    // ScreenUtil.bottomBarHeight  //底部安全区距离，适用于全面屏下面有按键的
    // ScreenUtil.statusBarHeight  //状态栏高度 刘海屏会更高
    // print('ScreenUtil.bottomBarHeight is 👉 ${ScreenUtil().bottomBarHeight}');
    // print('ScreenUtil.statusBarHeight is 👉 ${ScreenUtil().statusBarHeight}');
    return Container(
      height: 300,
      margin: const EdgeInsets.symmetric(
        vertical: 20.0,
        horizontal: 15.0,
      ), // padding(20px, 15px)
      padding: const EdgeInsets.only(
        top: 30.0,
        right: 30.0,
        bottom: 20.0,
        left: 30.0,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 5.0,
          ),
        ],
        // BorderRadius.circular(10),
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
      // 1. padding
      // padding: const EdgeInsets.only(top: 110),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        // crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          TextField(
              focusNode: currentFocusNode,
              controller: controller,
              // keyboardAppearance: Brightness.light,
              decoration: InputDecoration(
                counterText: "",
                prefixIcon: Icon(
                  MyIcons.person,
                  color: Colors.black54,
                  size: 26,
                ),
              ),
              maxLength: 11,
              keyboardType: TextInputType.phone,
              onChanged: (val) {
                RegExp exp = RegExp(r'^1[3-9]\d{9}$');
                if (exp.hasMatch(val)) {
                  setState(() {
                    _active = true;
                  });
                } else {
                  setState(() {
                    _active = false;
                  });
                }
                // print('val is 👉 $val');
              }),
          // Container, SizedBox, Padding, Divider
          Padding(
            padding: const EdgeInsets.all(15.0),
          ),
          // stack
          Stack(
            children: [
              TextField(
                controller: codeController,
                focusNode: focusNode,
                decoration: InputDecoration(
                  counterText: "",
                  prefixIcon: Icon(
                    Icons.lock,
                    color: Colors.black54,
                  ),
                ),
                maxLength: 6,
                keyboardType: TextInputType.number,
              ),
              // Positioned
              // 1.页面按钮状态 -> 有状态组件如何设置页面状态
              // 2.倒计时逻辑 -> stream
              Positioned(
                right: 10.0,
                child: CounterButton(
                  active: _active,
                  onPressed: () async {
                    _changeFocus(focusNode);
                    userService.sendCode(controller.text);
                  },
                ),
              )
            ],
          ),
          // method1: Padding -> child
          // methods2: Padding
          Padding(
            padding: const EdgeInsets.only(top: 10.0),
            child: SizedBox(
              width: 1.sw, // ScreenUtil().setWidth()
              height: 88.h,
              child: ElevatedButton(
                child: Text(
                  '登录',
                  style: TextStyle(fontSize: 32.sp),
                ),
                onPressed: () async {
                  // 1.AutoRouter
                  // AutoRouter.of(context).navigate(HomeViewRoute());
                  // AutoRouter.of(context).navigateNamed('/home-view');

                  // 2.context.router
                  // context.router.navigate(HomeViewRoute());

                  // 3.context.pushRoute
                  // context.pushRoute(HomeViewRoute());

                  String mobile = controller.text;
                  String code = codeController.text;
                  if (RegExp(RegParttern.mobileParttern).hasMatch(mobile) &&
                      RegExp(RegParttern.codeParttern).hasMatch(code)) {
                    HttpResponse httpResponse =
                        await userService.login(mobile, code);
                    if (httpResponse.code == 200) {
                      // token进行设置 -> authGuard authentication
                      //  说明用户登录成功
                      final router = getIt<AppRouter>();
                      // router.pushNamed('/home-view/10?username=toimc');
                      router.push(HomeViewRoute());
                    }
                  } else {
                    CommonToast.showToast("手机号或验证码格式不正确");
                  }
                },
              ),
            ),
          )
        ],
      ),
    );
  }
}
