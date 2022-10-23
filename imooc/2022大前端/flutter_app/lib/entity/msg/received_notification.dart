import 'package:json_annotation/json_annotation.dart';

part 'received_notification.g.dart';

@JsonSerializable()
class ReceivedNotification {
  final int id;
  final String? title;
  final String? body;
  final String? payload;

  ReceivedNotification({required this.id, this.title, this.body, this.payload});

  factory ReceivedNotification.fromJson(Map<String, dynamic> json) =>
      _$ReceivedNotificationFromJson(json);
  Map<String, dynamic> toJson() => _$ReceivedNotificationToJson(this);
}
