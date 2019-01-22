var log4js = require('log4js');
log4js.configure('./logs/logConfiguration.json');
/*var error = log4js.getLogger('Error');
var cis = log4js.getLogger('CisService');
var info = log4js.getLogger('Info');
var debug = log4js.getLogger('Debug');*/
var logObj = {
  error: log4js.getLogger('Error'),
  cis: log4js.getLogger('CisService'),
  info: log4js.getLogger('Info'),
  debug: log4js.getLogger('Debug')
};

module.exports = logObj;
