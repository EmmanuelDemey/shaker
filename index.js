const winston = require('winston');

module.exports = {
  auditHtml: auditHtml
}

function auditHtml(url){
  const request = require('request');
  let htmlRules = require('./html-rules');

  request({uri: url}, function(error, response, body) {
    htmlRules = htmlRules.map(function(rule){
      return rule(body, url);
    });

    htmlRules.forEach(function(m){
      if(m) {
        winston[m.level](m.message);
      }
    });
  });
}
