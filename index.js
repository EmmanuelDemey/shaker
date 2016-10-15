const winston = require('winston'),
      cheerio = require('cheerio');

require('colors');

module.exports = {
  auditHtml
}

const colors = {
  'error': 'red'
};

function auditHtml(uri){
  const request = require('request');
  let htmlRules = require('./html-rules');

  request({uri}, (error, response, body) => {
    htmlRules = htmlRules.map(rule => rule(cheerio.load(body), uri));

    htmlRules.forEach(m => {
      if(m) {
        winston[m.level](m.message[colors[m.level]]);
        console.log(m.description.yellow);
      }
    });
  });
}
