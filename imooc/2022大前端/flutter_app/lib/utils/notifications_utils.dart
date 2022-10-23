// ignore_for_file: close_sinks

import 'dart:async';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:my_app/config.dart';
import 'package:my_app/entity/msg/received_notification.dart';
import 'package:my_app/storage.dart';
import 'package:vibration/vibration.dart';

class NotificationsUtils {
  // 初始化plugins
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
  final StreamController<ReceivedNotification>
      didReceiveLocalNotificationStream =
      StreamController<ReceivedNotification>();
  final StreamController selectNotificationStream = StreamController();

  // 初始化消息
  initNotifications() async {
    // 设置android icon
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    // 请求权限
    final IOSInitializationSettings initializationSettingsIOS =
        IOSInitializationSettings(
      requestSoundPermission: false,
      requestBadgePermission: false,
      requestAlertPermission: false,
      // 接收消息回调
      onDidReceiveLocalNotification: onDidReceiveLocalNotification,
    );
    final MacOSInitializationSettings initializationSettingsMacOS =
        MacOSInitializationSettings(
            requestAlertPermission: false,
            requestBadgePermission: false,
            requestSoundPermission: false);
    final InitializationSettings initializationSettings =
        InitializationSettings(
            android: initializationSettingsAndroid,
            iOS: initializationSettingsIOS,
            macOS: initializationSettingsMacOS);
    // 消息初始化
    await flutterLocalNotificationsPlugin.initialize(initializationSettings,
        // 点击消息的回调
        onSelectNotification: onSelectNotification);
  }

  onDidReceiveLocalNotification(
      int id, String? title, String? body, String? payload) {
    print('onDidReceiveLocalNotification payload is 👉 $payload');
    didReceiveLocalNotificationStream.sink.add(
      ReceivedNotification(
        id: id,
        title: title,
        body: body,
        payload: payload,
      ),
    );
  }

  onSelectNotification(String? payload) {
    if (payload != null) {
      print('onSelectNotification payload is 👉 $payload');
      selectNotificationStream.sink.add(payload);
    }
  }

  // 单独出来的iOS请求权限
  requestIOSPermissions() async {
    bool? result = await flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            IOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(
          alert: true,
          badge: true,
          sound: true,
        );
    return result;
  }

  // 单独出来的MacOS请求权限
  requestMacOSPermissions() async {
    bool? result = await flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            MacOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(
          alert: true,
          badge: true,
          sound: true,
        );
    return result;
  }

  // 显示 消息
  show(ReceivedNotification receivedNotification) async {
    // isMute false-有声音， true-静音
    bool isMute = Storage().read(StoreKeys.isMute) ?? false;
    bool isVibrate = Storage().read(StoreKeys.isVibrate) ?? false;
    AndroidNotificationDetails androidPlatformChannelSpecifics =
        AndroidNotificationDetails(
      Config.channelId,
      Config.channelName,
      channelDescription: Config.channelDesc,
      importance: Importance.max,
      priority: Priority.high,
      ticker: 'ticker',
      playSound: !isMute,
    );
    IOSNotificationDetails iosNotificationDetails =
        IOSNotificationDetails(presentSound: !isMute);
    NotificationDetails platformChannelSpecifics = NotificationDetails(
        android: androidPlatformChannelSpecifics, iOS: iosNotificationDetails);
    await flutterLocalNotificationsPlugin.show(
      receivedNotification.id,
      receivedNotification.title,
      receivedNotification.body,
      platformChannelSpecifics,
      payload: receivedNotification.payload,
    );
    if (isVibrate && (await Vibration.hasVibrator() ?? false)) {
      // 震动
      Vibration.vibrate();
    }
  }

  // 针对 dart 中的stream进行性能上的优化，回收内存
  dispose() {
    didReceiveLocalNotificationStream.sink.close();
    selectNotificationStream.sink.close();
  }
}
