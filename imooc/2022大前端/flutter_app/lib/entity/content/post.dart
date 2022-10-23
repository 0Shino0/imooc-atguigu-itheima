import 'package:json_annotation/json_annotation.dart';
import 'package:my_app/utils/functions.dart';

part 'post.g.dart';

@JsonSerializable()
class Post extends Object {
  @JsonKey(name: 'isEnd')
  String isEnd;

  @JsonKey(name: 'reads')
  int reads;

  @JsonKey(name: 'answer')
  int answer;

  @JsonKey(name: 'status')
  String status;

  @JsonKey(name: 'isTop')
  String isTop;

  @JsonKey(name: 'sort')
  String sort;

  @JsonKey(name: 'tags')
  List<String> tags;

  @JsonKey(name: '_id')
  String id;

  @JsonKey(name: 'title')
  String title;

  @JsonKey(name: 'content')
  String content;

  @JsonKey(name: 'catalog')
  String catalog;

  @JsonKey(name: 'fav')
  String fav;

  @JsonKey(name: 'uid')
  Uid uid;

  @JsonKey(name: 'created')
  String created;

  Post(
    this.isEnd,
    this.reads,
    this.answer,
    this.status,
    this.isTop,
    this.sort,
    this.tags,
    this.id,
    this.title,
    this.content,
    this.catalog,
    this.fav,
    this.uid,
    this.created,
  );

  factory Post.fromJson(Map<String, dynamic> srcJson) =>
      _$PostFromJson(srcJson);

  Map<String, dynamic> toJson() => _$PostToJson(this);
}

@JsonSerializable()
class Uid extends Object {
  @JsonKey(name: 'pic')
  String pic;

  @JsonKey(name: 'isVip')
  String isVip;

  @JsonKey(name: '_id')
  String id;

  @JsonKey(name: 'name')
  String name;

  Uid(
    this.pic,
    this.isVip,
    this.id,
    this.name,
  );

  factory Uid.fromJson(Map<String, dynamic> srcJson) => _$UidFromJson(srcJson);

  Map<String, dynamic> toJson() => _$UidToJson(this);
}
