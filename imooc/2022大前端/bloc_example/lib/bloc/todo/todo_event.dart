part of 'todo_bloc.dart';

@immutable
abstract class TodoEvent {}

// add -> Item
class TodoAddEvent extends TodoEvent {
  final String value;
  static int _id = 0;

  int get id => _id;

  TodoAddEvent(this.value) {
    _id++;
  }
  // final Item item;

  // TodoAddEvent(this.item);
}

// remove -> id
class TodoRemoveEvent extends TodoEvent {
  final int id;

  TodoRemoveEvent(this.id);
}

// clear -> 不传参数
class TodoClearEvent extends TodoEvent {}
