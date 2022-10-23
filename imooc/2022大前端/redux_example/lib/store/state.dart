// 定义全局的state
// int count;
// List<Item> lists;
// Item {int id, String value}
class Item {
  final int? id;
  final String value;

  Item({this.id, required this.value});
}

class AppState {
  final int count;
  final List<Item> lists;

  AppState({this.count = 0, this.lists = const <Item>[]});

  AppState.initState()
      : count = 0,
        lists = const <Item>[];
}
