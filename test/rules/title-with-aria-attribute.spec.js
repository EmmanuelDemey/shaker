const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/title-with-aria-attribute');

describe("title-with-aria-attribute rule ", () => {

  for(let i = 0; i <= 6; i++){
    it(`should not throw an error for <h${i}></h${i}>`, () => {
      let message = rule(cheerio.load(`<h${i}></h${i}>`), 'http://localhost.com');
      assert(!message);
    });

    it(`should throw an error for <h${i} aria-level="1"></h${i}>`, () => {
      let message = rule(cheerio.load(`<h${i} aria-level="${i}"></h${i}>`), 'http://localhost.com');
      assert(message);
      assert.equal(message.level, "error");
      assert.equal(message.message, `Your titles h* should not have aria attribute aria-level and role="header"`);
    });

    it(`should throw an error for <h${i} role="header"></h${i}>`, () => {
      let message = rule(cheerio.load(`<h${i} role="header"></h${i}>`) , 'http://localhost.com');
      assert(message);
      assert.equal(message.level, "error");
      assert.equal(message.message, `Your titles h* should not have aria attribute aria-level and role="header"`);
    });

    it(`should throw an error for <h${i} aria-level="1" role="header"></h${i}>`, () => {
      let message = rule(cheerio.load(`<h${i} aria-level="${i}" role="header"></h${i}>`) , 'http://localhost.com');
      assert(message);
      assert.equal(message.level, "error");
      assert.equal(message.message, `Your titles h* should not have aria attribute aria-level and role="header"`);
    });
  }
});
