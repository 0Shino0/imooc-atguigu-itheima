// 1.定义所有的reducer方法
// 2.定义工厂函数，返回所有的state状态 -> appState
import 'package:redux/redux.dart';
import 'package:redux_example/store/actions.dart';
import 'package:redux_example/store/state.dart';

class ViewModel {
  final List<Item> lists;
  final Function addItem;
  final Function removeItem;
  final Function clearItems;
  // count计数器
  final int count;
  final Function onIncrement;
  final Function onDecrement;

  ViewModel({
    required this.lists,
    required this.addItem,
    required this.removeItem,
    required this.clearItems,
    required this.count,
    required this.onIncrement,
    required this.onDecrement,
  });

  factory ViewModel.create(Store<AppState> store) {
    _onIncrement() {
      store.dispatch(CountActions.increment);
    }

    _onDecrement() {
      store.dispatch(CountActions.decrement);
    }

    _onAddItem(String value) {
      store.dispatch(TodoAddAction(value));
    }

    _onRemoveItem(int id) {
      store.dispatch(TodoRemoveAction(id));
    }

    _onClearItems() {
      store.dispatch(TodoClearAction());
    }

    return ViewModel(
      lists: store.state.lists,
      addItem: _onAddItem,
      removeItem: _onRemoveItem,
      clearItems: _onClearItems,
      count: store.state.count,
      onIncrement: _onIncrement,
      onDecrement: _onDecrement,
    );
  }
}
