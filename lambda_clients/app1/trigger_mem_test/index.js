const test = require('./helper/test');

exports.handler = async () => {
  console.log('!!! TEST !!!');
  console.log('!!! TEST !!!');
  console.log(test.msg);
};
