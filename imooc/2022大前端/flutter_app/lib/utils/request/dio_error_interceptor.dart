import 'package:dio_http/dio_http.dart';
import 'package:flutter_bugly/flutter_bugly.dart';
import 'package:my_app/utils/request/http_exception.dart';
import 'package:my_app/utils/request/parse_exception.dart';

// 异常的类型
// 网络异常
// 客户端异常
// 服务端异常
class ErrorInterceptor extends Interceptor {
  ErrorInterceptor();

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    // print('onError: $err');
    // 401 -> refreshToken
    HttpException httpException = parseException(err);
    // 4xx 5xx -> parseException -> 日志 -> 本地数据库&缓存
    // todo 发送错误日志的请求
    // Sentry.captureException(
    //   err,
    //   stackTrace: err.stackTrace,
    // );
    FlutterBugly.uploadException(
        message: err.message, detail: err.stackTrace.toString());
    handler.resolve(Response(
        requestOptions: err.requestOptions,
        statusCode: httpException.code,
        data: {
          'code': httpException.code,
          'message': httpException.message,
        }));
    // super.onError(err, handler);
  }
}
