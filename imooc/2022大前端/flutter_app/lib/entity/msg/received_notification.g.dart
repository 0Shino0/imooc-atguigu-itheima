// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'received_notification.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ReceivedNotification _$ReceivedNotificationFromJson(
        Map<String, dynamic> json) =>
    ReceivedNotification(
      id: json['id'] as int,
      title: json['title'] as String?,
      body: json['body'] as String?,
      payload: json['payload'] as String?,
    );

Map<String, dynamic> _$ReceivedNotificationToJson(
        ReceivedNotification instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'body': instance.body,
      'payload': instance.payload,
    };
