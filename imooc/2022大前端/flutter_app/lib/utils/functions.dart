import 'dart:convert';
import 'dart:io';

import 'package:path/path.dart';

// 递归创建目录
makeDir(String path) async {
  if (await Directory(dirname(path)).exists()) {
    return true;
  } else {
    try {
      await Directory(dirname(path)).create(recursive: true);
    } catch (e) {
      return false;
    }
    return true;
  }
}

decodeList<T>(data) {
  return data is List
      ? data.cast<T>()
      : json.decode(data).map<T>((e) => e as T).toList();
}

decodeMap(data) {
  return data is Map
      ? data as Map<String, dynamic>
      : json.decode(data) as Map<String, dynamic>;
  // jsonData['uid'] is Map
  //         ? jsonData['uid'] as Map<String, dynamic>
  //         : json.decode(jsonData['uid']) as Map<String, dynamic>
}

encodeListOrMap<T>(data) {
  return data is T ? json.encode(data) : data;
}
