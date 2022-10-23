import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:my_app/entity/content/post.dart';
import 'package:my_app/services/content_service.dart';
import 'package:my_app/setup_get_it.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  ContentService contentService = getIt<ContentService>();
  List<String> items = ["1", "2", "3", "4", "5", "6", "7", "8"];
  RefreshController _refreshController =
      RefreshController(initialRefresh: false);
  List<Post> _lists = <Post>[];

  // @override
  // void initState() {
  //   super.initState();
  //   // 方法一：Timer
  //   Timer(Duration.zero, () async {
  //     _lists = await contentService.getPostList();
  //     setState(() {});
  //   });
  // }

  Widget? body;

  void _onRefresh() async {
    // 往头部加数据
    // newData数据库请求回来的数据
    // _lists = <Post>[]
    //   ..addAll(newData)
    //   ..addAll(_lists??[]);
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // if failed,use refreshFailed()
    _refreshController.refreshCompleted();
  }

  void _onLoading() async {
    // monitor network fetch
    await Future.delayed(Duration(milliseconds: 1000));
    // 判断,返回的数组长度与length的关系来去决定执行loadNoDat还是loadComplete
    // length < limit loadNoData
    // length == limit loadComplete
    // if failed,use loadFailed(),if no data return,use LoadNodata()
    items.add((items.length + 1).toString());
    if (mounted) setState(() {});
    _refreshController.loadNoData();
  }

  Future<List<Post>> _getData() async {
    _lists = await contentService.getPostList();
    return _lists;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
      future: _getData(),
      // FutureBuilder -> future -> 执行一次
      // StreamBuilder -> stream -> 执行多次 -> streamControler.sink.add
      builder: (context, snapshot) {
        if (snapshot.hasData)
          return SmartRefresher(
            enablePullDown: true,
            enablePullUp: true,
            header: WaterDropHeader(
              complete: Container(),
              completeDuration: Duration.zero,
            ),
            footer: CustomFooter(
              builder: (context, mode) {
                if (mode == LoadStatus.idle) {
                  body = Text("上拉加载");
                } else if (mode == LoadStatus.loading) {
                  body = CupertinoActivityIndicator();
                } else if (mode == LoadStatus.failed) {
                  body = Text("加载失败！点击重试！");
                } else if (mode == LoadStatus.canLoading) {
                  body = Text("松手,加载更多!");
                } else {
                  body = Text("没有更多数据了!");
                }
                return Container(
                  height: 55.0,
                  child: Center(child: body),
                );
              },
            ),
            controller: _refreshController,
            onRefresh: _onRefresh,
            onLoading: _onLoading,
            child: ListView.builder(
              itemBuilder: (context, index) =>
                  Card(child: Center(child: Text(_lists[index].title))),
              itemExtent: 100.0,
              itemCount: _lists.length,
            ),
          );
        return CupertinoActivityIndicator();
      },
    );
  }
}
