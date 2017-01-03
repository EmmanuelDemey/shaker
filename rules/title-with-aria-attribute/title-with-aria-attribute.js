const categories = require('../../categories');

let fullSelector = [];
for(let i = 0; i <= 6; i++){
    fullSelector.push(`h${i}[aria-level], h${i}[role=header]`);
}
fullSelector = fullSelector.join(',');

exports.rule = function($, url){
  return $(fullSelector).length > 0
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];