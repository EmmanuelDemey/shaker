const cheerio = require('cheerio');

module.exports = function(html, url){
  const $ = cheerio.load(html);

  if($('img:not([alt][alt!=""])').length > 0){
      return {
          level: 'error',
          message: `You have images without alt attributes at ${url}`
      };
  }
};
