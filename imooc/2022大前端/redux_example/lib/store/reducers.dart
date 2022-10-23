// 传递进来一个state + action
// 返回去一个新的state
import 'package:redux/redux.dart';
import 'package:redux_example/store/state.dart';

import 'actions.dart';

int counterReducer(int state, action) {
  if (action == CountActions.increment) {
    // action -> enum
    return state + 1;
  }
  if (action == CountActions.decrement) {
    return state - 1;
  }
  return state;
}

final todoReducer = combineReducers<List<Item>>([
  // TypedReducer<state的类型, 判断Action的类型>(真正的store state的处理逻辑)
  TypedReducer<List<Item>, TodoAddAction>((state, action) =>
      [...state, Item(id: action.id, value: action.text ?? '')]),
  TypedReducer<List<Item>, TodoRemoveAction>((state, action) =>
      state..removeWhere((Item item) => item.id == action.id)),
  TypedReducer<List<Item>, TodoClearAction>((state, action) => const <Item>[]),
]);

// List<Item> todoReducer(List<Item> state, action) {
//   if (action is TodoAddAction) {
//     // 添加item -> lists
//     // 新item -> 从传入action来
//     // 新lists -> 新item -> 添加到旧的lists后面， add & 扩展运算符 ...
// return [
//   ...state,
//   Item(id: action.id, value: action.text ?? ''),
// ];
//   }
//   if (action is TodoRemoveAction) {
//     return state..removeWhere((Item item) => item.id == action.id);
//   }
//   if (action is TodoClearAction) {
//     return const <Item>[];
//   }
//   return state;
// }

AppState appStateReducer(AppState state, dynamic action) {
  return AppState(
    count: counterReducer(state.count, action),
    lists: todoReducer(state.lists, action),
    // ...
  );
}
// 1.创建state -> actions -> reducers
// 2.初始化store -> StoreProvider
// 3.添加input -> add button
// 4.分发actions -> store.dispatch -> new state
