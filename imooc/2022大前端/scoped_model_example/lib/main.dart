import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:scoped_model_example/child.dart';
import 'package:scoped_model_example/scoped_model/count_model.dart';
import 'package:scoped_model_example/second.dart';
import 'package:scoped_model_example/setup_get_it.dart';
import 'package:scoped_model_example/views/base_view.dart';
// 1.创建ScopedModel -> state: _count -> increment
// 2.ScopedModelDescendant -> builder -> model
// ScopedModel.of -> 取state，操作model

// 1.抽离Model的逻辑
// 2.共享所有的Model状态
// 3.封装一个BaseView的组件 -> 减少书写 ScopedModelDescendant

void main() {
  setupGetIt();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return BaseView<CountModel>(newMethod);
  }

  Widget newMethod(context, child, model) => Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'You have pushed the button this many times:',
              ),
              Text(
                '${model.count}',
                style: Theme.of(context).textTheme.headline4,
              ),
              // 方法一：配置ignore: prefer_const_constructors去除警告的
              const ChildPage(),
              ElevatedButton(
                  onPressed: () {
                    // 跳转到Second页面
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => Second(),
                    ));
                  },
                  child: const Text('跳转Second'))
            ],
          ),
        ),
        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
              heroTag: 'btn1',
              onPressed: model.increment,
              tooltip: 'Increment',
              child: const Icon(Icons.add),
            ),
            FloatingActionButton(
              heroTag: 'btn2',
              onPressed: model.decrement,
              tooltip: 'Decrement',
              child: const Icon(Icons.remove),
            ),
          ],
        ),
      );
}
