import 'package:get_storage/get_storage.dart';
import 'package:my_app/entity/user/user_info.dart';

enum StoreKeys {
  token,
  refreshToken,
  userInfo,
  isMute,
  isVibrate,
}

class Storage {
  static Storage _storage = Storage._internal();
  final GetStorage _box = GetStorage();

  GetStorage get box => _box;

  Storage._internal();

  factory Storage() => _storage;

  // common set & get
  void write<T>(StoreKeys key, T value) => _box.write(key.toString(), value);

  T read<T>(StoreKeys key) => _box.read(key.toString());

  // setToken, getToken
  setToken(String token) => _box.write(StoreKeys.token.toString(), token);
  String? getToken() => _box.read<String>(StoreKeys.token.toString());

  // setRefreshToken, getRefreshToken
  setRefreshToken(String refreshToken) =>
      _box.write(StoreKeys.refreshToken.toString(), refreshToken);
  String? getRefreshToken() =>
      _box.read<String>(StoreKeys.refreshToken.toString());

  // setUserInfo, getUserInfo
  setUserInfo(UserInfo userInfo) =>
      _box.write(StoreKeys.userInfo.toString(), userInfo);

  UserInfo? getUserInfo() => _box.read<UserInfo>(StoreKeys.userInfo.toString());
}
