const categories = require('../../categories');

exports.rule = function($, url){
  if($('head').length > 0){
    return $('head title').length == 0 || $('head').text() == ''
  }
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];
