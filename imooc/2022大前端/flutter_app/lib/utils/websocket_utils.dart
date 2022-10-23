import 'dart:async';
import 'dart:convert';

import 'package:web_socket_channel/io.dart';

enum SocketStatus {
  connected,
  error,
  closed,
}

class WebSocketUtils {
  final String url;
  final Function? onOpen;
  final Function? onMessage;
  final Function? onError;
  final Iterable<String>? protocols;
  final Map<String, dynamic>? headers;
  Timer? _reconnectTimer;
  // ignore: close_sinks
  StreamController<SocketStatus> _controller = StreamController<SocketStatus>();
  SocketStatus _socketStatus = SocketStatus.closed;

  Stream<SocketStatus> get statusStream => _controller.stream;
  SocketStatus get socketStatus => _socketStatus;

  // 初始化
  WebSocketUtils(
    this.url, {
    this.onOpen,
    this.onMessage,
    this.onError,
    this.protocols,
    this.headers,
  }) {
    openSocket();
  }

  IOWebSocketChannel? _websocket;
  // Function? onOpen;
  // Function? onMessage;
  // Function? onError;

  // void initWebSocket(
  //     {Function? onOpen, Function? onMessage, Function? onError}) {
  //   this.onOpen = onOpen;
  //   this.onMessage = onMessage;
  //   this.onError = onError;
  //   // 连接 -> 接收消息
  //   openSocket();
  // }

  void openSocket() {
    _websocket = IOWebSocketChannel.connect(Uri.parse(this.url));
    _controller.sink.add(SocketStatus.connected);
    _socketStatus = SocketStatus.connected;
    if (_reconnectTimer != null) {
      _reconnectTimer?.cancel();
      _reconnectTimer = null;
    }
    if (onOpen != null) onOpen!();
    // 获取WebSocket的连接消息
    _websocket!.stream.listen((event) {
      print('event is 👉 $event');
      try {
        Map<String, dynamic> data = json.decode(event) as Map<String, dynamic>;
        if (data['event'] == 'heartbeat') {
          // 心跳检测
          sendMessage(json.encode({'event': 'heartbeat', 'message': 'pong'}));
        }
        if (onMessage != null) onMessage!(data);
      } catch (err) {
        print('err is 👉 $err');
      }
      // finally {
      //   if (onMessage != null) onMessage!(event);
      // }
    }, onError: (err) {
      print('err is 👉 $err');
      _controller.sink.add(SocketStatus.error);
      _socketStatus = SocketStatus.error;
      if (onError != null) onError!(err);
      reconnect();
    }, onDone: () {
      _controller.sink.add(SocketStatus.closed);
      _socketStatus = SocketStatus.closed;
      print('close websocket');
    });
  }

  // 发送消息
  void sendMessage(String message) {
    if (_websocket != null) {
      _websocket!.sink.add(message);
    }
  }

  // 关闭连接
  void closeSocket() {
    if (_websocket != null) {
      _websocket!.sink.close();
    }
  }

  // 断线重连
  void reconnect() {
    _reconnectTimer = Timer.periodic(Duration(seconds: 5), (timer) {
      openSocket();
      print('重新连接中');
    });
  }

  // 手动销毁controller与socket，帮助回收内存
  dispose() {
    _controller.sink.close();
    closeSocket();
  }
}
