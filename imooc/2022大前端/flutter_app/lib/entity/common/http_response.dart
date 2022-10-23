import 'package:json_annotation/json_annotation.dart';

part 'http_response.g.dart';

@JsonSerializable()
class HttpResponse {
  @JsonKey(name: 'code')
  final int code;

  @JsonKey(name: 'message')
  final String? message;

  @JsonKey(name: 'data')
  dynamic data;

  @JsonKey(name: 'token')
  final String? token;

  @JsonKey(name: 'refreshToken')
  final String? refreshToken;

  @JsonKey(name: 'total')
  final int? total;

  HttpResponse(this.code, this.message, this.data, this.token, this.refreshToken, this.total);

  factory HttpResponse.fromJson(Map<String, dynamic> json) =>
      _$HttpResponseFromJson(json);

  Map<String, dynamic> toJson() => _$HttpResponseToJson(this);
}
