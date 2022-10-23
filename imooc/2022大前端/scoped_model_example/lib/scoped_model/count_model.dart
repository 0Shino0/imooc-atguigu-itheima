import 'package:scoped_model/scoped_model.dart';

class CountModel extends Model {
  int _count = 10;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }

  void decrement() {
    _count--;
    notifyListeners();
  }
}
