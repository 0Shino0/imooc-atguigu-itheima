import 'dart:io';

import 'package:dio_http/dio_http.dart';

import 'http_exception.dart';

HttpException parseException(DioError error) {
  switch (error.type) {
    case DioErrorType.connectTimeout:
    case DioErrorType.receiveTimeout:
    case DioErrorType.sendTimeout:
      return NetWorkException(message: error.message);
    case DioErrorType.cancel:
      return CancelException(message: error.message);
    case DioErrorType.response:
      try {
        int? errCode = error.response?.statusCode;
        switch (errCode) {
          case 400:
            return BadRequestException(
                message: '发出的请求有错误，服务器没有进行新建或修改数据的操作。', code: errCode);
          case 401:
            return UnauthorizedException(message: '用户没有权限（令牌、用户名、密码错误）。');
          case 403:
            return BadRequestException(
                message: '用户得到授权，但是访问是被禁止的。', code: errCode);
          case 404:
            return BadRequestException(
                message: '发出的请求针对的是不存在的记录，服务器没有进行操作。', code: errCode);
          case 405:
            return BadRequestException(
                message: '请求方法不存在，请检查路由！', code: errCode);
          case 406:
            return BadRequestException(message: '请求的格式不可得。', code: errCode);
          case 410:
            return BadRequestException(
                message: '请求的资源被永久删除，且不会再得到的。', code: errCode);
          case 422:
            return BadRequestException(
                message: '当创建一个对象时，发生一个验证错误。', code: errCode);
          case 500:
            return BadServiceException(
                message: '服务器发生错误，请检查服务器。', code: errCode);
          case 502:
            return BadServiceException(message: '网关错误。', code: errCode);
          case 503:
            return BadServiceException(
                message: '服务不可用，服务器暂时过载或维护。', code: errCode);
          case 504:
            return BadServiceException(message: '网关超时。', code: errCode);
          default:
            return UnknownException(message: '不支持HTTP协议请求');
        }
      } on Exception catch (_) {
        return UnknownException(message: error.message);
      }
    case DioErrorType.other:
      if (error.error is SocketException) {
        return NetWorkException(message: error.message);
      } else {
        return UnknownException(message: error.message);
      }
    default:
      return UnknownException(message: error.message);
  }
}
