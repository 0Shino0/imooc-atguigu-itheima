import 'package:my_app/database/base_provider.dart';
import 'package:my_app/entity/content/post.dart';
import 'package:sqflite/sqlite_api.dart';

// ContentProvider().db -> public属性或者方法
//
class ContentProvider extends BaseProvider {
  static final ContentProvider db = ContentProvider();

  Future<Database> get database async => super.database;

  // 增
  // list -> 写入到posts -> for性能非常低下，batch insert
  addPostBatch(List<Post> lists) async {
    try {
      final db = await database;
      Batch batch = db.batch();
      lists.forEach((element) {
        batch.insert(
          'posts',
          element.toJson(),
          conflictAlgorithm: ConflictAlgorithm.ignore,
        );
      });
      var res = await batch.commit();
      return res;
    } catch (err) {
      print('err is 👉 $err');
    }
  }

  // 删
  deleteBatch(List<String> ids) async {
    try {
      final db = await database;
      Batch batch = db.batch();
      ids.forEach((element) {
        batch.delete('posts', where: '[_id] = ?', whereArgs: [element]);
      });
      var res = await batch.commit();
      return res;
    } catch (err) {
      print('err is 👉 $err');
    }
  }

  // 查
  getPost(String id) async {
    try {
      final db = await database;
      var res = await db.query('posts', where: '[_id] = ?', whereArgs: [id]);
      // List
      if (res.length == 0) return null;
      List<Post> lists = res.map((e) => Post.fromJson(e)).toList();
      return lists[0];
    } catch (err) {
      print('err is 👉 $err');
    }
  }

  getPostsById(List<String> ids) async {
    try {
      final db = await database;
      // SELECT * FROM posts WHERER [_id] IN ("id1","id2","id3")
      // ->rawQuery
      String sql = 'SELECT * FROM posts WHERER [_id] IN ("' +
          ids.join(',').replaceAll(',', '","') +
          '")';
      var res = await db.rawQuery(sql);
      if (res.length == 0) return null;
      List<Post> lists = res.map((e) => Post.fromJson(e)).toList();
      return lists;
    } catch (err) {
      print('err is 👉 $err');
    }
  }

  // 改
  // toJson -> Array & Object -> SQLite
  updatePost(List<Post> lists) async {
    try {
      final db = await database;
      Batch batch = db.batch();
      lists.forEach((element) {
        batch.update('posts', element.toJson(),
            where: '[_id] = ?', whereArgs: [element.id]);
      });
      var res = await batch.commit();
      return res;
    } catch (err) {
      print('err is 👉 $err');
    }
  }
}
