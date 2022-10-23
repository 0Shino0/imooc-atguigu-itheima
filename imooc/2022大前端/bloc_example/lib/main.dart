import 'package:bloc_example/bloc/todo/todo_bloc.dart';
import 'package:bloc_example/child.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'bloc/counter/counter_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<CounterBloc>(
          create: (context) => CounterBloc(),
        ),
        BlocProvider<TodoBloc>(
          create: (context) => TodoBloc(),
        ),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const MyHomePage(title: 'Flutter Demo Home Page'),
      ),
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
  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, int>(
      builder: (context, state) => Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Container(
          height: MediaQuery.of(context).size.height,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'You have pushed the button this many times:',
              ),
              Text(
                '$state',
                style: Theme.of(context).textTheme.headline4,
              ),
              TextField(
                controller: controller,
                decoration: const InputDecoration(
                  hintText: '请输入待办清单项',
                ),
                onSubmitted: (e) {
                  BlocProvider.of<TodoBloc>(context).add(TodoAddEvent(e));
                  controller.text = '';
                },
              ),
              BlocBuilder<TodoBloc, TodoState>(
                builder: (context, state) {
                  return Expanded(
                    child: ListView(
                      children: state.lists
                          .map(
                            (e) => ListTile(
                              title: Text(e.value),
                            ),
                          )
                          .toList(),
                    ),
                  );
                },
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const ChildPage(),
                    ),
                  );
                },
                child: const Text('跳转Child页面'),
              )
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // 触发计数增加的事件
            BlocProvider.of<CounterBloc>(context).add(CounterActions.increment);
          },
          tooltip: 'Increment',
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
