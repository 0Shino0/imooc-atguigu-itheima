const download = require('download-git-repo')
download('direct:git@gitee.com:beiyaoyaoyao/egg-template.git','./xxx',{clone:true},(err)=>{
  console.log(err);
})