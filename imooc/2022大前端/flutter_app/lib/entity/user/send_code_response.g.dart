// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'send_code_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SendCodeResponse _$SendCodeResponseFromJson(Map<String, dynamic> json) =>
    SendCodeResponse(
      json['result'] as int,
      json['errmsg'] as String?,
      json['ext'] as String?,
      (json['detail'] as List<dynamic>?)
          ?.map((e) => Detail.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SendCodeResponseToJson(SendCodeResponse instance) =>
    <String, dynamic>{
      'result': instance.result,
      'errmsg': instance.errmsg,
      'ext': instance.ext,
      'detail': instance.detail,
    };

Detail _$DetailFromJson(Map<String, dynamic> json) => Detail(
      json['result'] as int?,
      json['errmsg'] as String?,
      json['mobile'] as String?,
      json['nationcode'] as String?,
      json['isocode'] as String?,
      json['sid'] as String?,
      json['fee'] as int?,
    );

Map<String, dynamic> _$DetailToJson(Detail instance) => <String, dynamic>{
      'result': instance.result,
      'errmsg': instance.errmsg,
      'mobile': instance.mobile,
      'nationcode': instance.nationcode,
      'isocode': instance.isocode,
      'sid': instance.sid,
      'fee': instance.fee,
    };
