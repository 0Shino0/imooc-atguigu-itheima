// Stream -> 创建计数器
// 每隔1s -> 添加stream
// 定时器 -> 1s -> 计数结束标志 -> count = 60

import 'dart:async';

class NumberCount {
  final int sum;
  final int duration;
  int _count = 1;
  Timer? _timer;

  NumberCount({this.sum = 60, this.duration = 1});

  StreamController<int> _stream = StreamController<int>();
  Stream<int> get stream => _stream.stream;
  bool get avaliable => _count == 1;

  void start() {
    // 计时器的锁，防止重复多次点击
    if (!avaliable) return;
    _timer?.cancel();
    _timer = Timer.periodic(Duration(seconds: duration), (timer) {
      _stream.sink.add(_count);
      _count++;
      if (_count == sum) {
        timer.cancel();
        _count = 1;
      }
    });
  }

  void stop() {
    _timer?.cancel();
  }

  void dispose() {
    _timer?.cancel();
    _stream.close();
  }
}
