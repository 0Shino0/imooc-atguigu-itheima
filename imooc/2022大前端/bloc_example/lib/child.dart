import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'bloc/counter/counter_bloc.dart';

class ChildPage extends StatelessWidget {
  const ChildPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // BlocProvider add -> event
    // 取state值的方式 -> scopedmodel.of
    final int count = BlocProvider.of<CounterBloc>(context).state;
    print(count);
    return BlocBuilder<CounterBloc, int>(
      builder: (context, state) => Scaffold(
        appBar: AppBar(
          title: Text('child页面'),
        ),
        body: Center(
          child: Text('这是child组件$state'),
        ),
      ),
    );
  }
}
