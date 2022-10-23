// 定义一个基类 -> HttpException
class HttpException implements Exception {
  final String? _message;
  final int? _code;

  // 接收的可选参数 有位置的限制
  // 传一个参数 -> message
  // 传两个参数 -> message code
  // 传参不需要设置属性名
  HttpException([this._message, this._code]);

  String get message => _message ?? this.runtimeType.toString();
  int get code => _code ?? -1;
}

class BadRequestException extends HttpException {
  // message与code需要在设置的时候，传递属性名
  // message与code不是必传参数 -> null
  BadRequestException({String? message, int? code}) : super(message, code);
}

class BadServiceException extends HttpException {
  BadServiceException({String? message, int? code}) : super(message, code);
}

class UnknownException extends HttpException {
  UnknownException({String? message}) : super(message);
}

class CancelException extends HttpException {
  CancelException({String? message}) : super(message);
}

class NetWorkException extends HttpException {
  NetWorkException({String? message, int? code}) : super(message, code);
}

class UnauthorizedException extends HttpException {
  UnauthorizedException({String? message}) : super(message, 401);
}

class BadResponseException extends HttpException {
  BadResponseException({String? message, int? code}) : super(message, code);
}
