import 'package:flutter/material.dart';
import 'package:scoped_model_example/scoped_model/count_model.dart';
import 'package:scoped_model_example/utils/get_model.dart';

class ChildPage extends StatelessWidget {
  const ChildPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 方法二：通过rebuildOnChange来设置获取最新的model中的数据
    // ScopedModel.of<CountModel>(context, rebuildOnChange: true) -> GetModel<T>(context)
    int count = getModel<CountModel>(context).count;
    // int count =
    //     ScopedModel.of<CountModel>(context, rebuildOnChange: true).count;
    return Container(
      child: Text(
        count.toString(),
      ),
    );
  }
}
