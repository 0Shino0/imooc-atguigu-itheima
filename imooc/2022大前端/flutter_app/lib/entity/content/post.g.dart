// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Post _$PostFromJson(Map<String, dynamic> jsonData) => Post(
      jsonData['isEnd'] as String,
      jsonData['reads'] as int,
      jsonData['answer'] as int,
      jsonData['status'] as String,
      jsonData['isTop'] as String,
      jsonData['sort'] as String,
      decodeList<String>(jsonData['tags']),
      jsonData['_id'] as String,
      jsonData['title'] as String,
      jsonData['content'] as String,
      jsonData['catalog'] as String,
      jsonData['fav'] as String,
      Uid.fromJson(decodeMap(jsonData['uid'])),
      jsonData['created'] as String,
    );

Map<String, dynamic> _$PostToJson(Post instance) => <String, dynamic>{
      'isEnd': instance.isEnd,
      'reads': instance.reads,
      'answer': instance.answer,
      'status': instance.status,
      'isTop': instance.isTop,
      'sort': instance.sort,
      'tags': encodeListOrMap<List>(instance.tags),
      '_id': instance.id,
      'title': instance.title,
      'content': instance.content,
      'catalog': instance.catalog,
      'fav': instance.fav,
      'uid': encodeListOrMap<Uid>(instance.uid),
      'created': instance.created,
    };

Uid _$UidFromJson(Map<String, dynamic> json) => Uid(
      json['pic'] as String,
      json['isVip'] as String,
      json['_id'] as String,
      json['name'] as String,
    );

Map<String, dynamic> _$UidToJson(Uid instance) => <String, dynamic>{
      'pic': instance.pic,
      'isVip': instance.isVip,
      '_id': instance.id,
      'name': instance.name,
    };
