// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'list_query.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ListQuery _$ListQueryFromJson(Map<String, dynamic> json) => ListQuery(
      title: json['title'] as String?,
      catalog: json['catalog'] as String? ?? '',
      sort: json['sort'] as String? ?? 'created',
      status: json['status'] as String? ?? '0',
      isTop: json['isTop'] as String?,
      isEnd: json['isEnd'] as String?,
      page: json['page'] as int? ?? 0,
      limit: json['limit'] as int? ?? 20,
    );

Map<String, dynamic> _$ListQueryToJson(ListQuery instance) => <String, dynamic>{
      'title': instance.title,
      'catalog': instance.catalog,
      'sort': instance.sort,
      'status': instance.status,
      'isTop': instance.isTop,
      'isEnd': instance.isEnd,
      'page': instance.page,
      'limit': instance.limit,
    };
