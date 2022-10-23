// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'http_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HttpResponse _$HttpResponseFromJson(Map<String, dynamic> json) => HttpResponse(
      json['code'] as int,
      json['message'] as String?,
      json['data'],
      json['token'] as String?,
      json['refreshToken'] as String?,
      json['total'] as int?,
    );

Map<String, dynamic> _$HttpResponseToJson(HttpResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'message': instance.message,
      'data': instance.data,
      'token': instance.token,
      'refreshToken': instance.refreshToken,
      'total': instance.total,
    };
