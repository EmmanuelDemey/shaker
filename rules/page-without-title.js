module.exports = function($, url){
  if($('head').length > 0){
    if($('head title').length == 0 || $('head').text() == ''){
        return {
            url,
            level: 'error',
            message: `Your page ${url} should have a title`,
            description: `The alt attribute is mandatory for vocal synthetisers and for SEO`
        };
    }
  }
};
