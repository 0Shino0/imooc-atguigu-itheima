// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

import 'package:auto_route/auto_route.dart' as _i3;
import 'package:flutter/material.dart' as _i10;

import '../pages/center/center_page.dart' as _i6;
import '../pages/center/settings_page.dart' as _i7;
import '../pages/home/detail_page.dart' as _i5;
import '../pages/home/home_page.dart' as _i4;
import '../pages/home_view.dart' as _i2;
import '../pages/hot/hot_page.dart' as _i9;
import '../pages/login_view.dart' as _i1;
import '../pages/msg/msg_page.dart' as _i8;
import 'auth_guard.dart' as _i11;

class AppRouter extends _i3.RootStackRouter {
  AppRouter(
      {_i10.GlobalKey<_i10.NavigatorState>? navigatorKey,
      required this.authGuard})
      : super(navigatorKey);

  final _i11.AuthGuard authGuard;

  @override
  final Map<String, _i3.PageFactory> pagesMap = {
    LoginViewRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.LoginView());
    },
    HomeViewRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.HomeView());
    },
    HomeTab.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.EmptyRouterPage());
    },
    CenterTab.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.EmptyRouterPage());
    },
    MsgTab.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.EmptyRouterPage());
    },
    HotTab.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.EmptyRouterPage());
    },
    HomePageRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i4.HomePage());
    },
    DetailPageRoute.name: (routeData) {
      final pathParams = routeData.pathParams;
      final args = routeData.argsAs<DetailPageRouteArgs>(
          orElse: () => DetailPageRouteArgs(id: pathParams.getInt('id')));
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData,
          child: _i5.DetailPage(key: args.key, id: args.id));
    },
    CenterPageRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i6.CenterPage());
    },
    SettingsPageRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i7.SettingsPage());
    },
    MsgPageRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i8.MsgPage());
    },
    HotPageRoute.name: (routeData) {
      return _i3.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i9.HotPage());
    }
  };

  @override
  List<_i3.RouteConfig> get routes => [
        _i3.RouteConfig(LoginViewRoute.name, path: '/login'),
        _i3.RouteConfig(HomeViewRoute.name, path: '/', children: [
          _i3.RouteConfig('#redirect',
              path: '',
              parent: HomeViewRoute.name,
              redirectTo: 'home',
              fullMatch: true),
          _i3.RouteConfig(HomeTab.name,
              path: 'home',
              parent: HomeViewRoute.name,
              children: [
                _i3.RouteConfig(HomePageRoute.name,
                    path: '',
                    parent: HomeTab.name,
                    meta: <String, dynamic>{'name': '首页'}),
                _i3.RouteConfig(DetailPageRoute.name,
                    path: 'detail/:id',
                    parent: HomeTab.name,
                    meta: <String, dynamic>{
                      'hideBottomNav': true,
                      'name': '文章详情'
                    })
              ]),
          _i3.RouteConfig(CenterTab.name,
              path: 'center',
              parent: HomeViewRoute.name,
              children: [
                _i3.RouteConfig(CenterPageRoute.name,
                    path: '',
                    parent: CenterTab.name,
                    meta: <String, dynamic>{'name': '个人中心'}),
                _i3.RouteConfig(SettingsPageRoute.name,
                    path: 'user',
                    parent: CenterTab.name,
                    meta: <String, dynamic>{'name': '用户详情'},
                    guards: [authGuard])
              ]),
          _i3.RouteConfig(MsgTab.name,
              path: 'msg',
              parent: HomeViewRoute.name,
              children: [
                _i3.RouteConfig(MsgPageRoute.name,
                    path: '',
                    parent: MsgTab.name,
                    meta: <String, dynamic>{'name': '消息'})
              ]),
          _i3.RouteConfig(HotTab.name,
              path: 'hot',
              parent: HomeViewRoute.name,
              children: [
                _i3.RouteConfig(HotPageRoute.name,
                    path: '',
                    parent: HotTab.name,
                    meta: <String, dynamic>{'name': '热门'})
              ])
        ])
      ];
}

/// generated route for [_i1.LoginView]
class LoginViewRoute extends _i3.PageRouteInfo<void> {
  const LoginViewRoute() : super(name, path: '/login');

  static const String name = 'LoginViewRoute';
}

/// generated route for [_i2.HomeView]
class HomeViewRoute extends _i3.PageRouteInfo<void> {
  const HomeViewRoute({List<_i3.PageRouteInfo>? children})
      : super(name, path: '/', initialChildren: children);

  static const String name = 'HomeViewRoute';
}

/// generated route for [_i3.EmptyRouterPage]
class HomeTab extends _i3.PageRouteInfo<void> {
  const HomeTab({List<_i3.PageRouteInfo>? children})
      : super(name, path: 'home', initialChildren: children);

  static const String name = 'HomeTab';
}

/// generated route for [_i3.EmptyRouterPage]
class CenterTab extends _i3.PageRouteInfo<void> {
  const CenterTab({List<_i3.PageRouteInfo>? children})
      : super(name, path: 'center', initialChildren: children);

  static const String name = 'CenterTab';
}

/// generated route for [_i3.EmptyRouterPage]
class MsgTab extends _i3.PageRouteInfo<void> {
  const MsgTab({List<_i3.PageRouteInfo>? children})
      : super(name, path: 'msg', initialChildren: children);

  static const String name = 'MsgTab';
}

/// generated route for [_i3.EmptyRouterPage]
class HotTab extends _i3.PageRouteInfo<void> {
  const HotTab({List<_i3.PageRouteInfo>? children})
      : super(name, path: 'hot', initialChildren: children);

  static const String name = 'HotTab';
}

/// generated route for [_i4.HomePage]
class HomePageRoute extends _i3.PageRouteInfo<void> {
  const HomePageRoute() : super(name, path: '');

  static const String name = 'HomePageRoute';
}

/// generated route for [_i5.DetailPage]
class DetailPageRoute extends _i3.PageRouteInfo<DetailPageRouteArgs> {
  DetailPageRoute({_i10.Key? key, required int id})
      : super(name,
            path: 'detail/:id',
            args: DetailPageRouteArgs(key: key, id: id),
            rawPathParams: {'id': id});

  static const String name = 'DetailPageRoute';
}

class DetailPageRouteArgs {
  const DetailPageRouteArgs({this.key, required this.id});

  final _i10.Key? key;

  final int id;
}

/// generated route for [_i6.CenterPage]
class CenterPageRoute extends _i3.PageRouteInfo<void> {
  const CenterPageRoute() : super(name, path: '');

  static const String name = 'CenterPageRoute';
}

/// generated route for [_i7.SettingsPage]
class SettingsPageRoute extends _i3.PageRouteInfo<void> {
  const SettingsPageRoute() : super(name, path: 'user');

  static const String name = 'SettingsPageRoute';
}

/// generated route for [_i8.MsgPage]
class MsgPageRoute extends _i3.PageRouteInfo<void> {
  const MsgPageRoute() : super(name, path: '');

  static const String name = 'MsgPageRoute';
}

/// generated route for [_i9.HotPage]
class HotPageRoute extends _i3.PageRouteInfo<void> {
  const HotPageRoute() : super(name, path: '');

  static const String name = 'HotPageRoute';
}
