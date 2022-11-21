var RPCClient = require('@alicloud/pop-core').RPCClient;

function initVodClient(accessKeyId, accessKeySecret,) {
  var regionId = 'cn-shanghai';   // 点播服务接入地域
  var client = new RPCClient({//填入AccessKey信息
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
    apiVersion: '2017-03-21'
  });

  return client;
}


exports.getvod = async ctx => {
  // 请求示例
  var client = initVodClient(
    'LTAI5t6N7W3BoSYpmtasXzoo',
    'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3'
  );

  const vodback = await client.request("CreateUploadVideo", {
    Title: ctx.request.query.title,
    FileName: ctx.request.query.filename,
  }, {})
  ctx.body = vodback
}

const getvodplay = async (vodid) => {
  var client = initVodClient(
    'LTAI5t6N7W3BoSYpmtasXzoo',
    'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3'
  );

  try {
    var response = await client.request("GetPlayInfo", {
      VideoId: vodid
    }, {})
    return response
  } catch (error) {
    console.log(error);
  }
}

exports.getPlay = async ctx => {
  var play = await getvodplay(ctx.request.query.vodid)
  ctx.body = play
}

module.exports.gtevodplay = getvodplay