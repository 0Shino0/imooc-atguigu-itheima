import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:my_app/routes/routes.gr.dart';

class HomeView extends StatelessWidget {
  const HomeView({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: AutoTabsScaffold(
        appBarBuilder: (context, tabsRouter) {
          return AppBar(
            title: Text(context.topRouteMatch.meta['name'] ?? ''),
            leading: AutoBackButton(),
          );
        },
        routes: [
          HomeTab(),
          MsgTab(),
          HotTab(),
          CenterTab(),
        ],
        bottomNavigationBuilder: (context, tabsRouter) {
          final hideBottomNav =
              context.topRouteMatch.meta['hideBottomNav'] == true;
          // 兼容显示与否bottom -> meta属性
          return hideBottomNav
              ? SizedBox.shrink()
              : BottomNavigationBar(
                  currentIndex: tabsRouter.activeIndex,
                  onTap: tabsRouter.setActiveIndex,
                  type: BottomNavigationBarType.fixed,
                  selectedItemColor: Colors.red,
                  unselectedItemColor: Colors.black54,
                  selectedFontSize: 22.sp,
                  unselectedFontSize: 22.sp,
                  items: [
                    BottomNavigationBarItem(
                      label: '首页',
                      icon: Icon(Icons.home),
                    ),
                    BottomNavigationBarItem(
                      label: '消息',
                      icon: Icon(Icons.message),
                    ),
                    BottomNavigationBarItem(
                      label: '热门',
                      icon: Icon(Icons.hot_tub),
                    ),
                    BottomNavigationBarItem(
                      label: '我的',
                      icon: Icon(Icons.person),
                    ),
                  ],
                );
        },
      ),
    );
  }
}
