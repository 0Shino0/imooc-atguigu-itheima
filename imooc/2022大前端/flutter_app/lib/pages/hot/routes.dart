import 'package:auto_route/auto_route.dart';
import 'package:my_app/pages/hot/hot_page.dart';

const hotTab = AutoRoute(
  path: 'hot',
  page: EmptyRouterPage,
  name: 'HotTab',
  children: [
    AutoRoute(
      path: '',
      page: HotPage,
      meta: {
        'name': '热门',
      },
    ),
  ],
);
