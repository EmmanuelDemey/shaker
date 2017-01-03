const categories = require('../../categories');

exports.rule = function($, url){
  if($('html').length > 0){
    return !$('html').attr('lang') || $('html').attr('lang') == ''
  }
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];