import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bugly/flutter_bugly.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get_storage/get_storage.dart';
import 'package:my_app/routes/routes.gr.dart';
import 'package:my_app/setup_get_it.dart';
import 'package:my_app/utils/notifications_utils.dart';

// import 'package:flutter/material.dart';

// relative -> Container, SizedBox
// absolute -> Positioned, Stack -> Offstage（v-if）
// flex -> Row, Column -> mainAxis, crossAxis
// float -> Wrap

// void main() async {
// await SentryFlutter.init(
//   (options) {
//     options.dsn =
//         'https://6b8bf9dbb2754df29205d45955fee2b9@o1050376.ingest.sentry.io/6031622';
//   },
//   appRunner: () {
//     setupGetIt();
//     // getIt.registerSingleton<WebSocketUtils>(WebSocketUtils(Config.wsUrl));
//     // WebSocketUtils webSocketUtils = getIt<WebSocketUtils>();
//     NotificationsUtils notificationsUtils = getIt<NotificationsUtils>();
//     // Storage().write(StoreKeys.isMute, true);
//     // Storage().write(StoreKeys.isVibrate, true);
//     // 请求消息权限
//     Timer(Duration(seconds: 0), () async {
//       await notificationsUtils.requestIOSPermissions();
//       await notificationsUtils.initNotifications();
//     });

//     runApp(MyApp());
//   },
// );
// }

void main() async {
  // Bugly
  FlutterBugly.postCatchedException(
    () async {
      await GetStorage.init();
      setupGetIt();
      // getIt.registerSingleton<WebSocketUtils>(WebSocketUtils(Config.wsUrl));
      // WebSocketUtils webSocketUtils = getIt<WebSocketUtils>();
      NotificationsUtils notificationsUtils = getIt<NotificationsUtils>();
      // Storage().write(StoreKeys.isMute, true);
      // Storage().write(StoreKeys.isVibrate, true);
      // 请求消息权限
      Timer(Duration(seconds: 0), () async {
        await notificationsUtils.requestIOSPermissions();
        await notificationsUtils.initNotifications();
      });

      runApp(MyApp());
    },
    // debugUpload: true,
  );
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    FlutterBugly.init(androidAppId: "b3ca88f6d5", iOSAppId: "7b10e672ce");
  }

  @override
  Widget build(BuildContext context) {
    //设置尺寸（填写设计中设备的屏幕尺寸）如果设计基于360dp * 690dp的屏幕
    final _rootRouter = getIt<AppRouter>();
    // return ScreenUtilInit(
    //     designSize: Size(360, 690),
    //     builder: () => MaterialApp.router(
    //           routeInformationParser: _rootRouter.defaultRouteParser(),
    //           routerDelegate: _rootRouter.delegate(),
    //         ));
    return MaterialApp.router(
      routeInformationParser: _rootRouter.defaultRouteParser(),
      routerDelegate: _rootRouter.delegate(),
      builder: (_, child) {
        ScreenUtil.init(
          BoxConstraints(
              maxWidth: MediaQuery.of(_).size.width,
              maxHeight: MediaQuery.of(_).size.height),
          designSize: Size(750, 1334),
          orientation: Orientation.portrait,
        );
        // 示例，防止返回null
        return child != null ? child : Container();
      },
    );

    // CuperinoApp
    // return MaterialApp(
    //   theme: ThemeData(
    //     brightness: Brightness.light,
    //     primaryColorBrightness: Brightness.light,
    //   ),
    //   home: Scaffold(
    //     appBar: AppBar(),
    //     // 2. SafeArea
    //     body: Container(),
    //   ),
    // );
    // return MaterialApp(
    //   home: Scaffold(
    //     appBar: AppBar(),
    //     body: Container(
    //       child: Text(
    //         'toimc社区',
    //         textDirection: TextDirection.ltr,
    //       ),
    //     ),
    //   ),
    // );
  }
}
