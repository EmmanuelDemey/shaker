const cheerio = require('cheerio');

module.exports = function(html, url){
  const $ = cheerio.load(html);

  if($('head title').length == 0){
      return {
          level: 'error',
          message: `Your page ${url} should have a title`
      };
  }
};
