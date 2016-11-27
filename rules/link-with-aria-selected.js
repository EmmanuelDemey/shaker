const categories = require('../categories');

exports.rule = function($, url){
  if($('a[aria-selected]').length > 0){
      return {
          url,
          level: 'error',
          message: `You have link element with aria-selected attribute at ${url}`,
          description: `According to the specification, this attribute should not be used with link`
      };
  }
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];
