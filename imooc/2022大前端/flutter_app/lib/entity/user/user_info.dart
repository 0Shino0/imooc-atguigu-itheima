import 'package:json_annotation/json_annotation.dart';

part 'user_info.g.dart';

@JsonSerializable()
class UserInfo extends Object {
  @JsonKey(name: 'favs')
  int favs;

  @JsonKey(name: 'gender')
  String gender;

  @JsonKey(name: 'roles')
  List<String> roles;

  @JsonKey(name: 'pic')
  String pic;

  @JsonKey(name: 'mobile')
  String mobile;

  @JsonKey(name: 'status')
  String status;

  @JsonKey(name: 'regmark')
  String regmark;

  @JsonKey(name: 'location')
  String location;

  @JsonKey(name: 'isVip')
  String isVip;

  @JsonKey(name: 'count')
  int count;

  @JsonKey(name: 'openid')
  String? openid;

  @JsonKey(name: 'unionid')
  String? unionid;

  @JsonKey(name: '_id')
  String id;

  @JsonKey(name: 'username')
  String username;

  @JsonKey(name: 'name')
  String name;

  @JsonKey(name: 'created')
  String created;

  @JsonKey(name: 'isSign')
  bool isSign;

  UserInfo(
    this.favs,
    this.gender,
    this.roles,
    this.pic,
    this.mobile,
    this.status,
    this.regmark,
    this.location,
    this.isVip,
    this.count,
    this.openid,
    this.unionid,
    this.id,
    this.username,
    this.name,
    this.created,
    this.isSign,
  );

  factory UserInfo.fromJson(Map<String, dynamic> srcJson) =>
      _$UserInfoFromJson(srcJson);

  Map<String, dynamic> toJson() => _$UserInfoToJson(this);
}
