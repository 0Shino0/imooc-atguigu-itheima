import 'package:bloc/bloc.dart';
// import 'package:meta/meta.dart';

// part 'counter_event.dart';
// part 'counter_state.dart';

enum CounterActions { increment, decrement }

class CounterBloc extends Bloc<CounterActions, int> {
  CounterBloc() : super(0) {
    // event -> 代表着UI层触发的事件
    // emit -> 是一个可以修改state的函数
    // state -> 集成state的getter方法
    on<CounterActions>((event, emit) {
      // TODO: implement event handler
      if (event == CounterActions.increment) {
        emit(state + 1);
      }
      if (event == CounterActions.decrement) {
        emit(state - 1);
      }
      emit(state);
    });
  }
}
