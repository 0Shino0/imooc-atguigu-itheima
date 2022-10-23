import 'package:auto_route/auto_route.dart';
import 'package:my_app/pages/center/routes.dart';
import 'package:my_app/pages/home/routes.dart';
import 'package:my_app/pages/home_view.dart';
import 'package:my_app/pages/hot/routes.dart';
import 'package:my_app/pages/login_view.dart';
import 'package:my_app/pages/msg/routes.dart';

@MaterialAutoRouter(routes: <AutoRoute>[
  AutoRoute(page: LoginView, path: '/login'),
  AutoRoute(page: HomeView, path: "/", children: [
    homeTab,
    centerTab,
    msgTab,
    hotTab,
  ]),
])
class $AppRouter {}
