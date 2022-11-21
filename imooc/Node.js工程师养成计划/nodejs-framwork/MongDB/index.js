const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFun = async function (c) {
  await client.connect()
  const db = client.db('mytest')
  return db.collection(c)
}

const main = async () => {
  var cc = await clientFun('cc')
  // var d = await cc.find()
  // var d = await cc.insertOne({username:'monica',age:60})
  // var d = await cc.insertMany([
  //   { username: 'Monica', age: 12 },
  //   { username: '卡卡', age: 6 },
  //   { username: '安迪', age: 12 },
  //   { username: '朱丽叶', age: 20 }
  // ])

  // var d = await cc.find({age:{$gt:15}})

  // var d = await cc.updateOne({age:{$gt:15}},{$set:{username:'lisi'}})
  // var d = await cc.updateMany({age:{$lt:15}},{$set:{username:'lisi'}})

  // var d = await cc.deleteOne({age:{$gt:50}})
  var d = await cc.deleteMany({age:{$gt:10}})

  // console.log(await d.toArray());
  console.log(d);
}
main().finally(() => client.close())
