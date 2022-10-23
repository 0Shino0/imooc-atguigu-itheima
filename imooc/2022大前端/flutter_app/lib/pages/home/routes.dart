import 'package:auto_route/auto_route.dart';
import 'package:my_app/pages/home/detail_page.dart';
import 'package:my_app/pages/home/home_page.dart';

const homeTab = AutoRoute(
  path: 'home',
  page: EmptyRouterPage,
  name: 'HomeTab',
  initial: true,
  children: [
    AutoRoute(
      path: '',
      page: HomePage,
      meta: {
        'name': '首页',
      },
    ),
    AutoRoute(
      path: 'detail/:id',
      page: DetailPage,
      meta: {
        'hideBottomNav': true,
        'name': '文章详情',
      },
    )
  ],
);
