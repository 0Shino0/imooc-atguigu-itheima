import 'package:dio_http/dio_http.dart';
import 'package:my_app/database/content_provider.dart';
import 'package:my_app/entity/common/http_response.dart';
import 'package:my_app/entity/content/list_query.dart';
import 'package:my_app/entity/content/post.dart';
import 'package:my_app/utils/request/dio_http.dart';

class ContentService {
  // 获取文章列表
  Future<List<Post>> getPostList([ListQuery? query]) async {
    Map<String, dynamic> params = query?.toJson() ?? {};
    Response res = await DioHttp().get('/public/list', params);
    if (res.statusCode == 200) {
      HttpResponse httpResponse = HttpResponse.fromJson(res.data);
      if (httpResponse.code == 200) {
        List<Post> lists =
            httpResponse.data.map<Post>((e) => Post.fromJson(e)).toList();
        // print('lists is 👉 $lists');
        await ContentProvider.db.addPostBatch(lists);
        return lists;
        // var res2 = await ContentProvider.db.getPost('5fde262d7f2fcb6844ada5a9');
        // print('res is 👉 $res1');
        // print('res is 👉 $res2');
      }
    }
    return <Post>[];
  }
}
