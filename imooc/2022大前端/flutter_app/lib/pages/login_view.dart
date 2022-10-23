import 'package:flutter/material.dart';
import 'package:my_app/widgets/login/login_form.dart';

class LoginView extends StatefulWidget {
  const LoginView({
    Key? key,
  }) : super(key: key);

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SafeArea(
        // 1.Column -> logo + form
        // 2.如何引用图片 -> 图片圆角
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(
                  top: 50.0,
                  bottom: 30.0,
                ),
                height: 120,
                decoration: BoxDecoration(shape: BoxShape.circle, boxShadow: [
                  BoxShadow(
                    color: Colors.black12,
                    spreadRadius: 3,
                    blurRadius: 10,
                  ),
                ]),
                child: Center(
                  child: CircleAvatar(
                    backgroundImage: AssetImage('static/images/logo.png'),
                    radius: 60,
                    backgroundColor: Colors.white,
                  ),
                ),
              ),
              LoginForm(),
            ],
          ),
        ),
      ),
    );
  }
}
