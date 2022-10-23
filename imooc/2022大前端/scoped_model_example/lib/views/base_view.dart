import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:scoped_model_example/setup_get_it.dart';

class BaseView<T extends Model> extends StatelessWidget {
  final Widget Function(BuildContext context, Widget? child, T model) builder;

  const BaseView(this.builder, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ScopedModel<T>(
      model: getIt<T>(),
      child: ScopedModelDescendant<T>(
        builder: builder,
      ),
    );
  }
}
