import 'package:auto_route/auto_route.dart';
import 'package:my_app/pages/msg/msg_page.dart';

const msgTab = AutoRoute(
  path: 'msg',
  page: EmptyRouterPage,
  name: 'MsgTab',
  children: [
    AutoRoute(
      path: '',
      page: MsgPage,
      meta: {
        'name': '消息',
      },
    ),
    // msg详情
    // ...
  ],
);
