// 1.删除无用的文件，删除注释
enum CountActions {
  increment,
  decrement,
}

class TodoAddAction {
  // Item -> int id, String text
  static int _id = 0;
  final String? text;

  TodoAddAction(this.text) {
    _id++;
  }

  int get id => _id;
}

class TodoRemoveAction {
  final int id;

  TodoRemoveAction(this.id);
}

class TodoClearAction {}
