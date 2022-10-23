import 'package:json_annotation/json_annotation.dart';

part 'list_query.g.dart';

@JsonSerializable()
class ListQuery {
  final String? title;

  final String catalog;

  final String sort;

  final String status;

  final String? isTop;

  final String? isEnd;

  final int page;

  final int limit;

  ListQuery({
    this.title,
    this.catalog = '',
    this.sort = 'created',
    this.status = '0',
    this.isTop,
    this.isEnd,
    this.page = 0,
    this.limit = 20,
  });

  factory ListQuery.fromJson(Map<String, dynamic> json) =>
      _$ListQueryFromJson(json);
  Map<String, dynamic> toJson() => _$ListQueryToJson(this);
}