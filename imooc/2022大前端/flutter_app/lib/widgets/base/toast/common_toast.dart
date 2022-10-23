import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class CommonToast {
  static showToast(String msg, {
    Toast? toastLength =  Toast.LENGTH_SHORT,
    ToastGravity? gravity = ToastGravity.CENTER,
    int timeInSecForIosWeb = 1,
    Color? backgroundColor = const Color.fromRGBO(0, 0, 0, 0.75),
    Color? textColor = Colors.white,
    double? fontSize = 14.0,
  }) {
    Fluttertoast.showToast(
      msg: msg,
      toastLength: toastLength,
      gravity: gravity,
      timeInSecForIosWeb: timeInSecForIosWeb,
      backgroundColor: backgroundColor,
      textColor: textColor,
      fontSize: fontSize,
    );
  }
}