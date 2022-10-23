// Dio -> http客户端
// 如何在Dart中使用单例 -> 1.Get_it 2.factory
import 'dart:io';

import 'package:dio_http/dio_http.dart';
import 'package:my_app/config.dart';

import 'dio_error_interceptor.dart';

class DioFile {
  final String path;
  final String filename;

  DioFile({required this.path, required this.filename});
}

class DioHttp {
  Dio _client = Dio();
  Dio get client => _client;
  CancelToken _cancelToken = CancelToken();

  // 1.static -> 作用：让多个相同类型的类共享同一个成员变量
  // 2.构造函数：匿名，命名式 -> ._(名称) -> factory
  static DioHttp _instance = DioHttp._internal();
  factory DioHttp() => _instance;

  DioHttp._internal() {
    // 对dio进行实例化
    _client.options = _client.options.copyWith(
      baseUrl: Config.baseUrl,
      connectTimeout: 1000 * 120,
      receiveTimeout: 1000 * 5,
    );
    // 初始化_client上的拦截器 -> 添加多个
    _client.interceptors
      ..addAll([
        // todo
        ErrorInterceptor(),
        if(Config.env == Env.Dev)LogInterceptor(responseBody: true),
      ]);
  }

  // DioHttp().公有的方法 or 属性
  // init -> baseUrl headers
  void init(
      {String? baseUrl,
      int? connectTimeout,
      int? receiveTimeout,
      List<Interceptor>? interceptors}) {
    _client.options = _client.options.copyWith(
      baseUrl: baseUrl,
      connectTimeout: connectTimeout,
      receiveTimeout: receiveTimeout,
    );
    _client.interceptors..addAll(interceptors!);
  }

  // 取消请求
  void cancelRequests({CancelToken? cancelToken}) {
    cancelToken ?? _cancelToken.cancel('Request Canceled');
    cancelToken?.cancel('Request Canceled');
  }

  // RESTful -> get post delete put
  // axios -> axios.get(path, params, {headers})
  Future<Response<Map<String, dynamic>>> get(
    String path, [
    Map<String, dynamic>? params,
    Options? options,
    CancelToken? cancelToken,
  ]) async {
    return await _client.get(
      path,
      queryParameters: params,
      options: options,
      cancelToken: cancelToken ?? _cancelToken,
    );
  }

  Future<Response<Map<String, dynamic>>> post(
    String path, [
    Map<String, dynamic>? data,
    Options? options,
    CancelToken? cancelToken,
  ]) async {
    return await _client.post(
      path,
      data: data,
      options: options,
      cancelToken: cancelToken ?? _cancelToken,
    );
  }

  Future<Response<Map<String, dynamic>>> delete(
    String path, [
    Map<String, dynamic>? data,
    Options? options,
    CancelToken? cancelToken,
  ]) async {
    return await _client.delete(
      path,
      data: data,
      options: options,
      cancelToken: cancelToken ?? _cancelToken,
    );
  }

  Future<Response<Map<String, dynamic>>> put(
    String path, [
    Map<String, dynamic>? data,
    Options? options,
    CancelToken? cancelToken,
  ]) async {
    return await _client.put(
      path,
      data: data,
      options: options,
      cancelToken: cancelToken ?? _cancelToken,
    );
  }

  // formData -> 上传文件
  Future<FormData> _prepareFormData(String path, String filename) async {
    return FormData.fromMap({
      'file': await MultipartFile.fromFile(
        path,
        filename: filename,
      ),
    });
  }

  void _showProgress(received, total) {
    if (total != -1) {
      print((received / total * 100).toStringAsFixed(0) + '%');
    }
  }

  Future<Response<Map<String, dynamic>>> postFormData(
    String path,
    DioFile dioFile,
    void Function(int, int)? onSendProgress,
    CancelToken? cancelToken,
  ) async {
    return await _client.post(
      path,
      data: await _prepareFormData(dioFile.path, dioFile.filename),
      onSendProgress: onSendProgress ?? _showProgress,
      cancelToken: cancelToken ?? _cancelToken,
    );
  }

  // 下载文件
  // e.g. 示例代码：https://github.com/flutterchina/dio/blob/master/example/download_with_trunks.dart
  // await downloadWithChunks(url, savePath, onReceiveProgress: (received, total) {
  //     if (total != -1) {
  //       print('${(received / total * 100).floor()}%');
  //     }
  //   });
  /// Downloading by spiting as file in chunks
  Future downloadWithChunks(
    url,
    savePath, {
    ProgressCallback? onReceiveProgress,
    CancelToken? cancelToken,
  }) async {
    const firstChunkSize = 102;
    const maxChunk = 3;

    var total = 0;
    var dio = Dio();
    var progress = <int>[];

    void Function(int, int) createCallback(no) {
      return (int received, int _) {
        progress[no] = received;
        if (onReceiveProgress != null && total != 0) {
          onReceiveProgress(progress.reduce((a, b) => a + b), total);
        }
      };
    }

    Future<Response> downloadChunk(url, start, end, no) async {
      progress.add(0);
      --end;
      return dio.download(
        url,
        savePath + 'temp$no',
        onReceiveProgress: createCallback(no),
        options: Options(
          headers: {'range': 'bytes=$start-$end'},
        ),
        cancelToken: cancelToken ?? _cancelToken,
      );
    }

    Future mergeTempFiles(chunk) async {
      var f = File(savePath + 'temp0');
      var ioSink = f.openWrite(mode: FileMode.writeOnlyAppend);
      for (var i = 1; i < chunk; ++i) {
        var _f = File(savePath + 'temp$i');
        await ioSink.addStream(_f.openRead());
        await _f.delete();
      }
      await ioSink.close();
      await f.rename(savePath);
    }

    var response = await downloadChunk(url, 0, firstChunkSize, 0);
    if (response.statusCode == 206) {
      total = int.parse(response.headers
          .value(HttpHeaders.contentRangeHeader)!
          .split('/')
          .last);
      var reserved = total -
          int.parse(response.headers.value(Headers.contentLengthHeader)!);
      var chunk = (reserved / firstChunkSize).ceil() + 1;
      if (chunk > 1) {
        var chunkSize = firstChunkSize;
        if (chunk > maxChunk + 1) {
          chunk = maxChunk + 1;
          chunkSize = (reserved / maxChunk).ceil();
        }
        var futures = <Future>[];
        for (var i = 0; i < maxChunk; ++i) {
          var start = firstChunkSize + i * chunkSize;
          futures.add(downloadChunk(url, start, start + chunkSize, i + 1));
        }
        await Future.wait(futures);
      }
      await mergeTempFiles(chunk);
    }
  }
}
