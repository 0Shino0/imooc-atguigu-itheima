import 'package:auto_route/auto_route.dart';
import 'package:my_app/routes/routes.gr.dart';
import 'package:my_app/storage.dart';

class AuthGuard extends AutoRouteGuard {
  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) {
    bool _authentication = Storage().getToken() != null;
    if (_authentication) {
      resolver.next();
    } else {
      if (router.current.name != LoginViewRoute.name) {
        router.push(LoginViewRoute());
      }
      resolver.next(false);
    }
  }
}
