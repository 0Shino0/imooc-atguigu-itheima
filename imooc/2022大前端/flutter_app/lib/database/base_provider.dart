// ignore_for_file: unnecessary_null_comparison

import 'package:my_app/config.dart';
import 'package:my_app/entity/user/user_info.dart';
import 'package:my_app/storage.dart';
import 'package:my_app/utils/functions.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite/sqlite_api.dart';

class BaseProvider {
  // 1.初始化
  // 2.提供db实例 -> path -> openDatabase
  BaseProvider();

  static final BaseProvider db = BaseProvider();

  Database? _database;

  Future<Database> get database async => _database ?? await initDB();

  initDB() async {
    // 判断路径是否存在，不存在需要创建
    String path = '';
    UserInfo? userInfo = Storage().getUserInfo();
    String databasePath = await getDatabasesPath();
    // 根据不同的场景：public, user
    if (userInfo != null) {
      path = join(databasePath, userInfo.id, Config.privateDBName);
      await makeDir(path);
    } else {
      // 公共的场景
      path = join(databasePath, Config.publicDBName);
    }
    print('path is 👉 $path');
    Database database = await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        // sqlite四种类型 -> NULL, TEXT, INTEGER, BLOB, REAL
        // onCreate -> 创建数据表格
        await db.execute('''CREATE TABLE IF NOT EXISTS posts (
          _id TEXT PRIMARY KEY,
          uid TEXT,
          title TEXT,
          content TEXT,
          created TEXT,
          catalog TEXT,
          fav TEXT,
          isEnd TEXT DEFAULT '0',
          reads INTEGER DEFAULT 0,
          answer INTEGER DEFAULT 0,
          status TEXT DEFAULT '0',
          isTop TEXT DEFAULT '0',
          sort TEXT DEFAULT 100,
          tags TEXT)
          ''');
        // await db.execute ...
      },
    );
    _database = database;
    return database;
  }
}
