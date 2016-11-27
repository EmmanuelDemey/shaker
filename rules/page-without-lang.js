const categories = require('../categories');

exports.rule = function($, url){
  if($('html').length > 0){
    if(!$('html').attr('lang') || $('html').attr('lang') == ''  ){
        return {
            url,
            level: 'error',
            message: `The page ${url} should have a lang attribute defined on the html element`,
            description: `The alt attribute is mandatory for vocal synthetisers`
        };
    }
  }
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];