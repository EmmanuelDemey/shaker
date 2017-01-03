const categories = require('../../categories');

exports.rule = function($, url){
  return $('img:not([alt])').length > 0;
};

exports.categories =  [categories.ACCESSIBILITY, categories.HTML];
