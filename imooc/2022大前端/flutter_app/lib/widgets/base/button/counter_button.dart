import 'package:flutter/material.dart';
import 'package:my_app/utils/number_count.dart';
import 'package:my_app/widgets/const/text_const.dart';

class CounterButton extends StatefulWidget {
  final bool active;
  final VoidCallback? onPressed;

  const CounterButton({
    Key? key,
    this.active = true,
    this.onPressed,
  }) : super(key: key);

  @override
  State<CounterButton> createState() => _CounterButtonState();
}

class _CounterButtonState extends State<CounterButton> {
  String _msg = '获取验证码';
  NumberCount _numberCount = NumberCount();

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
        stream: _numberCount.stream,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            _msg = '已发送${snapshot.data}s';
            if (_numberCount.avaliable) {
              _msg = '重新发送';
            }
          }
          return ElevatedButton(
            style: ButtonStyle(
              elevation: MaterialStateProperty.all(0),
              backgroundColor: MaterialStateProperty.all(Colors.black12),
              shape: MaterialStateProperty.all(RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(35),
              )),
            ),
            child: Text(
              _msg,
              style: (widget.active && _numberCount.avaliable)
                  ? availableStyle
                  : unAvailableStyle,
            ),
            onPressed: () {
              if (!(widget.active && _numberCount.avaliable)) {
                return;
              }
              _numberCount.start();
              widget.onPressed!();
            },
          );
        });
  }
}
