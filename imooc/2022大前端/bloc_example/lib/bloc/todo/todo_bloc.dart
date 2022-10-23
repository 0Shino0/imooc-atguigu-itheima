import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'todo_event.dart';
part 'todo_state.dart';

class TodoBloc extends Bloc<TodoEvent, TodoState> {
  TodoBloc() : super(TodoInitial(const [])) {
    // on<TodoEvent>((event, emit) {
    //   // TODO: implement event handler
    // });
    // add
    on<TodoAddEvent>((event, emit) {
      // [...state, Item()]
      emit(TodoInitial([
        ...state.lists,
        Item(id: event.id, value: event.value),
      ]));
    });
    // remove
    on<TodoRemoveEvent>((event, emit) {
      emit(
        TodoInitial(
          state.lists..removeWhere((Item element) => element.id == event.id),
        ),
      );
    });
    // clear
    on<TodoClearEvent>((event, emit) {
      emit(TodoInitial(const <Item>[]));
    });
  }
}
