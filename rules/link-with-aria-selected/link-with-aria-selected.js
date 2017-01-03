const categories = require('../../categories');

exports.rule = function($, url){
  return $('a[aria-selected]').length > 0;
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];
