import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux_example/store/actions.dart';
import 'package:redux_example/store/state.dart';
import 'package:redux_example/widgets/view_model.dart';

class Add extends StatefulWidget {
  final ViewModel viewModel;
  const Add(
    this.viewModel, {
    Key? key,
  }) : super(key: key);

  @override
  State<Add> createState() => _AddState();
}

class _AddState extends State<Add> {
  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      decoration: const InputDecoration(hintText: '请输入待办事项'),
      onSubmitted: (String s) {
        print('用户输入了$s');
        print('用户输入了${controller.text}');
        // callback();
        widget.viewModel.addItem(controller.text);
        controller.text = '';
      },
    );
    // return StoreConnector<AppState, VoidCallback>(
    //   builder: (context, callback) => TextField(
    //     controller: controller,
    //     decoration: const InputDecoration(hintText: '请输入待办事项'),
    //     onSubmitted: (String s) {
    //       print('用户输入了$s');
    //       print('用户输入了${controller.text}');
    //       callback();
    //       controller.text = '';
    //     },
    //   ),
    //   converter: (store) {
    //     return () => store.dispatch(TodoAddAction(controller.text));
    //   },
    // );
  }
}
