const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/img-without-alt/img-without-alt').rule;

describe("img-without-alt rule ", () => {
  it('should not throw an error for <div></div>', () => {
    assert(!rule(cheerio.load('<div></div>'), 'http://localhost.com'));
  });

  it('should throw an error for <img />', () => {
    assert(rule(cheerio.load('<img />'), 'http://localhost.com'));
  });

  it('should not throw an error for <img alt="" />', () => {
    assert(!rule(cheerio.load('<img alt="" />'), 'http://localhost.com'));
  });

  it('should not throw an error for <img alt="a" />', () => {
    assert(!rule(cheerio.load('<img alt="a" />'), 'http://localhost.com'));
  });
});
