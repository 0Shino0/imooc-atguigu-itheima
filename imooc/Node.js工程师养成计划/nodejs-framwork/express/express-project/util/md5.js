const crypto = require('crypto')
// console.log(crypto);
// var d = crypto.createHash('md5').update('by'+'123').digest('hex')
// console.log(d);

module.exports = str => {
  return crypto.createHash('md5')
    .update('by' + str)
    .digest('hex')
}
