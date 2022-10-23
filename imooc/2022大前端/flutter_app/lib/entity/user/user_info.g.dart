// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_info.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserInfo _$UserInfoFromJson(Map<String, dynamic> json) => UserInfo(
      json['favs'] as int,
      json['gender'] as String,
      (json['roles'] as List<dynamic>).map((e) => e as String).toList(),
      json['pic'] as String,
      json['mobile'] as String,
      json['status'] as String,
      json['regmark'] as String,
      json['location'] as String,
      json['isVip'] as String,
      json['count'] as int,
      json['openid'] as String?,
      json['unionid'] as String?,
      json['_id'] as String,
      json['username'] as String,
      json['name'] as String,
      json['created'] as String,
      json['isSign'] as bool,
    );

Map<String, dynamic> _$UserInfoToJson(UserInfo instance) => <String, dynamic>{
      'favs': instance.favs,
      'gender': instance.gender,
      'roles': instance.roles,
      'pic': instance.pic,
      'mobile': instance.mobile,
      'status': instance.status,
      'regmark': instance.regmark,
      'location': instance.location,
      'isVip': instance.isVip,
      'count': instance.count,
      'openid': instance.openid,
      'unionid': instance.unionid,
      '_id': instance.id,
      'username': instance.username,
      'name': instance.name,
      'created': instance.created,
      'isSign': instance.isSign,
    };
