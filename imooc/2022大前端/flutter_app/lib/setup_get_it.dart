import 'package:get_it/get_it.dart';
import 'package:my_app/routes/auth_guard.dart';
import 'package:my_app/routes/routes.gr.dart';
import 'package:my_app/services/content_service.dart';
import 'package:my_app/services/user_service.dart';
import 'package:my_app/storage.dart';
import 'package:my_app/utils/notifications_utils.dart';

final getIt = GetIt.instance;

void setupGetIt() {
  getIt.registerLazySingleton<UserService>(() => UserService());
  getIt.registerLazySingleton<ContentService>(() => ContentService());
  getIt.registerSingleton<AppRouter>(AppRouter(authGuard: AuthGuard()));
  getIt.registerSingleton<NotificationsUtils>(NotificationsUtils());
  getIt.registerSingleton<Storage>(Storage());
}
