const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/page-without-lang').rule;

describe("page-without-lang rule ", () => {
  it('should not throw an error for <body></body>', () => {
    let message = rule(cheerio.load('<body></body>'), 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <html></html>', () => {
    let message = rule(cheerio.load('<html></html>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, 'error');
    assert.equal(message.message, 'The page http://localhost.com should have a lang attribute defined on the html element');
  });

  it('should throw an error for <html lang=""></html>', () => {
    let message = rule(cheerio.load('<html lang=""></html>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, 'error');
    assert.equal(message.message, 'The page http://localhost.com should have a lang attribute defined on the html element');
  });

  it('should not throw an error for <html lang="en"></html>', () => {
    let message = rule(cheerio.load('<html lang="en"></html>'), 'http://localhost.com');
    assert(!message);
  });
});
