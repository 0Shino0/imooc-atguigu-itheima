#! /usr/bin/env node 
const {program} = require('commander')
// console.log('mycli');
// if(process.argv[2]== '--help'){
//   console.log('获取到了命令参数');
// }
program.option('-f --framwork <framwork>','设置框架')
program.parse(process.argv)