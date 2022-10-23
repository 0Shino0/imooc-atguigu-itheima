import 'package:auto_route/auto_route.dart';
import 'package:my_app/pages/center/center_page.dart';
import 'package:my_app/pages/center/settings_page.dart';
import 'package:my_app/routes/auth_guard.dart';

const centerTab = AutoRoute(
  path: 'center',
  page: EmptyRouterPage,
  name: 'CenterTab',
  children: [
    AutoRoute(
      path: '',
      page: CenterPage,
      meta: {
        'name': '个人中心',
      },
    ),
    AutoRoute(path: 'user', page: SettingsPage, guards: [
      AuthGuard
    ], meta: {
      'name': '用户详情',
    })
  ],
);
