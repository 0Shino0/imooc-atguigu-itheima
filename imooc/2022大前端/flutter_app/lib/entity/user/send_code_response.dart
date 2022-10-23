import 'package:json_annotation/json_annotation.dart';

part 'send_code_response.g.dart';

@JsonSerializable()
class SendCodeResponse extends Object {
  @JsonKey(name: 'result')
  int result;

  @JsonKey(name: 'errmsg')
  String? errmsg;

  @JsonKey(name: 'ext')
  String? ext;

  @JsonKey(name: 'detail')
  List<Detail>? detail;

  SendCodeResponse(
    this.result,
    this.errmsg,
    this.ext,
    this.detail,
  );

  factory SendCodeResponse.fromJson(Map<String, dynamic> srcJson) =>
      _$SendCodeResponseFromJson(srcJson);

  Map<String, dynamic> toJson() => _$SendCodeResponseToJson(this);
}

@JsonSerializable()
class Detail extends Object {
  @JsonKey(name: 'result')
  int? result;

  @JsonKey(name: 'errmsg')
  String? errmsg;

  @JsonKey(name: 'mobile')
  String? mobile;

  @JsonKey(name: 'nationcode')
  String? nationcode;

  @JsonKey(name: 'isocode')
  String? isocode;

  @JsonKey(name: 'sid')
  String? sid;

  @JsonKey(name: 'fee')
  int? fee;

  Detail(
    this.result,
    this.errmsg,
    this.mobile,
    this.nationcode,
    this.isocode,
    this.sid,
    this.fee,
  );

  factory Detail.fromJson(Map<String, dynamic> srcJson) =>
      _$DetailFromJson(srcJson);

  Map<String, dynamic> toJson() => _$DetailToJson(this);
}
