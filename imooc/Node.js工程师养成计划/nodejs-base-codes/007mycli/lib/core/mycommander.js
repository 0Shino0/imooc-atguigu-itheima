const myaction = require('./action')

const mycommander = function (program) {
  program
    .command('create <project> [other...]')
    .alias('crt')
    .description('创建项目')
    .action(myaction)
}

module.exports = mycommander