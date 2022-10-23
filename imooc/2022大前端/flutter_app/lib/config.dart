enum Env { Dev, Prod }

class Config {
  static const String baseUrl = 'http://192.168.31.132:3000';
  static const String wsUrl = 'ws://192.168.31.132:3001';
  static const Env env = Env.Dev;
  static const String publicDBName = 'public.db';
  static const String privateDBName = 'private.db';
  static const String channelId = 'com.toimc.community.im';
  static const String channelName = 'toimc技术社区';
  static const String channelDesc = 'toimc技术社区消息';
}
