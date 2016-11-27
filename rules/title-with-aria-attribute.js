const categories = require('../categories');

let fullSelector = [];
for(let i = 0; i <= 6; i++){
    fullSelector.push(`h${i}[aria-level], h${i}[role=header]`);
}
fullSelector = fullSelector.join(',');

exports.rule = function($, url){
  if($(fullSelector).length > 0){
      return {
          url,
          level: 'error',
          message: `Your titles h* should not have aria attribute aria-level and role="header"`,
          description: `Unnecessary attributes, already defined by the browser.\r\nMore informations :\r\n- https://www.paciellogroup.com/blog/2016/10/a-not-so-short-note-on-aria-to-the-rescue/`
      };
  }
};

exports.categories = [categories.ACCESSIBILITY, categories.HTML];