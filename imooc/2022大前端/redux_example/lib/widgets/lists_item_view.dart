import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux_example/store/state.dart';
import 'package:redux_example/widgets/view_model.dart';

class ListsItemView extends StatelessWidget {
  final ViewModel viewModel;
  const ListsItemView(
    this.viewModel, {
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: viewModel.lists
          .map((Item item) => ListTile(
                title: Text('${item.id}-${item.value}'),
                trailing: IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    viewModel.removeItem(item.id);
                  },
                ),
              ))
          .toList(),
    );
    // return StoreConnector<AppState, List<Item>>(
    //   builder: (context, lists) => Expanded(
    //     child: ListView(
    //       children: lists
    //           .map((Item item) => ListTile(
    //                 title: Text('${item.id}-${item.value}'),
    //               ))
    //           .toList(),
    //     ),
    //   ),
    //   converter: (store) => store.state.lists,
    // );
  }
}
