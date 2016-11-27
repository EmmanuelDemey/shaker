const winston = require('winston'),
      cheerio = require('cheerio'),
      path = require('path'), 
      request = require('request');

require('colors');

module.exports = {
  auditHtml
}

const colors = {
  'error': 'red'
};

function auditHtml(uri){
  const pathToRule = path.join(path.resolve(__dirname), 'rules');
  
  request({uri}, (error, response, body) => {
    let htmlRules = require("fs").readdirSync(pathToRule).map(function(file) {
      return require(path.join(pathToRule, file));
    });
    
    htmlRules = htmlRules.map(module => module.rule(cheerio.load(body), uri));

    htmlRules.forEach(m => {
      if(m) {
        winston[m.level](m.message[colors[m.level]]);
        console.log(m.description.yellow);
      }
    });
  });
}
