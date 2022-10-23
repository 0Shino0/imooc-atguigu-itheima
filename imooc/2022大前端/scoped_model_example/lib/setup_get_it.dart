import 'package:get_it/get_it.dart';
import 'package:scoped_model_example/scoped_model/count_model.dart';

final getIt = GetIt.instance;

void setupGetIt() {
  getIt.registerSingleton<CountModel>(CountModel());
  // todo
  // getIt.registerLazySingleton<CountModel>(() => CountModel());
}
