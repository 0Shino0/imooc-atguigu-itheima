part of 'todo_bloc.dart';

class Item {
  final int? id;
  final String value;

  Item({this.id, required this.value});
}

@immutable
abstract class TodoState {
  final List<Item> lists;

  TodoState(this.lists);
}

// class -> event -> state
class TodoInitial extends TodoState {
  TodoInitial(List<Item> lists) : super(lists);
}
