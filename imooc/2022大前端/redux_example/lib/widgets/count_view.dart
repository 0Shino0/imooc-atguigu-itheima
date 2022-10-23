import 'package:flutter/material.dart';
// import 'package:flutter_redux/flutter_redux.dart';
// import 'package:redux_example/store/state.dart';
import 'package:redux_example/widgets/view_model.dart';

class CountView extends StatelessWidget {
  final ViewModel viewModel;
  const CountView(
    this.viewModel, {
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      viewModel.count.toString(),
      style: const TextStyle(
        fontSize: 24.0,
      ),
    );

    // return StoreConnector<AppState, String>(
    //   builder: (context, countStr) {
    //     return Text(
    //       countStr,
    //       style: const TextStyle(
    //         fontSize: 24.0,
    //       ),
    //     );
    //   },
    //   converter: (store) => store.state.count.toString(),
    // );
  }
}
