import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:redux_example/store/actions.dart';
import 'package:redux_example/store/reducers.dart';
import 'package:redux_example/store/state.dart';
import 'package:redux_example/widgets/add.dart';
import 'package:redux_example/widgets/count_view.dart';
import 'package:redux_example/widgets/lists_item_view.dart';
import 'package:redux_example/widgets/view_model.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // 2.创建Store -> state
  final store = Store(appStateReducer, initialState: AppState());
  MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 3.使用StoreProvider
    return StoreProvider<AppState>(
      store: store,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const MyHome(),
      ),
    );
  }
}

class MyHome extends StatefulWidget {
  const MyHome({Key? key}) : super(key: key);

  @override
  State<MyHome> createState() => _MyHomeState();
}

class _MyHomeState extends State<MyHome> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, ViewModel>(
      builder: (context, viewModel) => Scaffold(
        appBar: AppBar(),
        body: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Column(
            children: [
              const Text('计数器的状态：'),
              // 4.添加按钮 -> dispatch -> action -> reducer -> 更新state
              // builder -> 最终返回的widgets
              // StoreConnector -> <初始的state类型， 最终输出到builder的类型>
              // converter -> 取用最近的Provider -> store -> 转化成我们需要的类型数据
              // builder -> 返回一个Widget -> 使用state -> viewModel
              CountView(viewModel),
              Add(viewModel),
              Expanded(
                child: ListsItemView(viewModel),
              ),
              ElevatedButton(
                onPressed: () {
                  viewModel.clearItems();
                },
                child: const Text('删除所有的Item项'),
              )
            ],
          ),
        ),
        // 1. 需要添加一个按钮 -> onPress -> new Action
        // 2. 需要添加action -> decrement
        // 3. 需要配置reducer -> dispatch -> new state
        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
              child: const Icon(Icons.add),
              onPressed: () {
                // 触发dispatch方法 -> action -> Actions.increment
                viewModel.onIncrement();
              },
            ),
            const Padding(
              padding: EdgeInsets.only(top: 10.0),
            ),
            FloatingActionButton(
              child: const Icon(Icons.remove),
              onPressed: () {
                // 触发dispatch方法 -> action -> Actions.increment
                viewModel.onDecrement();
              },
            ),
          ],
        ),
        // floatingActionButton:
        //     StoreConnector<AppState, Function(CountActions action)>(
        //   builder: (context, callback) => Column(
        //     mainAxisAlignment: MainAxisAlignment.end,
        //     children: [
        //       FloatingActionButton(
        //         child: const Icon(Icons.add),
        //         onPressed: () {
        //           // 触发dispatch方法 -> action -> Actions.increment
        //           callback(CountActions.increment);
        //         },
        //       ),
        //       const Padding(
        //         padding: EdgeInsets.only(top: 10.0),
        //       ),
        //       FloatingActionButton(
        //         child: const Icon(Icons.remove),
        //         onPressed: () {
        //           // 触发dispatch方法 -> action -> Actions.increment
        //           callback(CountActions.decrement);
        //         },
        //       ),
        //     ],
        //   ),
        //   converter: (store) {
        //     // 返回store.dispatch -> Funciton -> builder的第二个参数
        //     return (action) => store.dispatch(action);
        //   },
        // ),
      ),
      converter: (store) => ViewModel.create(store),
    );
  }
}
