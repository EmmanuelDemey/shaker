const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/img-without-alt');

describe("img-without-alt rule ", () => {
  it('should not throw an error for <div></div>', () => {
    let message = rule(cheerio.load('<div></div>'), 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <img />', () => {
    let message = rule(cheerio.load('<img />'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, "error");
    assert.equal(message.message, "You have images without alt attributes at http://localhost.com");
  });

  it('should not throw an error for <img alt="" />', () => {
    let message = rule(cheerio.load('<img alt="" />'), 'http://localhost.com');
    assert(!message);
  });

  it('should not throw an error for <img alt="a" />', () => {
    let message = rule(cheerio.load('<img alt="a" />'), 'http://localhost.com');
    assert(!message);
  });
});
