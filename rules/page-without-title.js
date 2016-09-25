const cheerio = require('cheerio');

module.exports = function(html, url){
  const $ = cheerio.load(html);

  if($('head').length > 0){
    if($('head title').length == 0 || $('head').text() == ''){
        return {
            level: 'error',
            message: `Your page ${url} should have a title`
        };
    }
  }
};
