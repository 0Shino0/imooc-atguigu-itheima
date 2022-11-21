var inquirer = require('inquirer')
inquirer.prompt([
  {
    type:'input',
    name:'username',
    message:'你的名字',
  }
]).then((answer)=>{
  console.log(answer);
})
