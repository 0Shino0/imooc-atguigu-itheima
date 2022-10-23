import 'package:my_app/entity/common/http_response.dart';
import 'package:my_app/entity/user/send_code_response.dart';
import 'package:my_app/entity/user/user_info.dart';
import 'package:my_app/storage.dart';
import 'package:my_app/utils/request/dio_http.dart';
import 'package:my_app/widgets/base/toast/common_toast.dart';

class UserService {
  Future sendCode(String mobile) async {
    var params = {
      'mobile': mobile,
    };
    // Map -> Class  Class -> Map
    // res['data']['code'] -> Response.data.code
    // ts -> json
    var res = await DioHttp().get('/public/sendcode', params);
    if (res.statusCode == 200) {
      Map<String, dynamic>? data = res.data;
      // 请求成功
      HttpResponse httpResponse = HttpResponse.fromJson(data!);
      SendCodeResponse sendCodeResponse =
          SendCodeResponse.fromJson(httpResponse.data);
      if (httpResponse.code != 200) {
        // 发送短信验证码失败 -> 给用户一个友好的提示
        CommonToast.showToast(sendCodeResponse.errmsg ?? '发送短信失败');
      } else {
        // 发送成功
        CommonToast.showToast('发送成功，请查收');
      }
      return sendCodeResponse;
    }
  }

  Future login(String mobile, String code) async {
    var params = {'mobile': mobile, 'code': code};
    var res = await DioHttp().post('/login/loginByPhone', params);
    if (res.statusCode == 200) {
      // 请求成功
      Map<String, dynamic>? data = res.data;
      HttpResponse httpResponse = HttpResponse.fromJson(data!);
      if (httpResponse.code == 200) {
        UserInfo? userInfo = UserInfo.fromJson(httpResponse.data);
        Storage().setToken(httpResponse.token!);
        Storage().setRefreshToken(httpResponse.refreshToken!);
        Storage().setUserInfo(userInfo);
        // 返回给前端一个数据 -> 路由导航
        httpResponse.data = userInfo;
        // _userInfo = httpResponse.data as UserInfo
      } else {
        // 请求异常
        CommonToast.showToast(httpResponse.message ?? '登录失败，请重试');
      }
      return httpResponse;
    }
  }
}
