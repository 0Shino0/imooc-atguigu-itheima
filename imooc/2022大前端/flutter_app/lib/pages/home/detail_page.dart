import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class DetailPage extends StatelessWidget {
  final int id;
  const DetailPage({Key? key, @PathParam() required this.id}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: GestureDetector(
          child: Text('页面id为：$id'),
          onTap: () async {
            const _url = 'https://www.imooc.com';

            if (await canLaunch(_url)) {
              await launch(_url);
            }
          },
        ),
      ),
    );
  }
}
