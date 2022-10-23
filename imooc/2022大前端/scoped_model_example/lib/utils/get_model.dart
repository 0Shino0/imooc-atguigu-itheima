import 'package:scoped_model/scoped_model.dart';

T getModel<T extends Model>(context) {
  return ScopedModel.of<T>(context, rebuildOnChange: true);
}
