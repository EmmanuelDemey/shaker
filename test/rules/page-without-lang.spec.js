const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/page-without-lang/page-without-lang').rule;

describe("page-without-lang rule ", () => {
  it('should not throw an error for <body></body>', () => {
    assert(!rule(cheerio.load('<body></body>'), 'http://localhost.com'));
  });

  it('should throw an error for <html></html>', () => {
    assert(rule(cheerio.load('<html></html>'), 'http://localhost.com'));
  });

  it('should throw an error for <html lang=""></html>', () => {
    assert(rule(cheerio.load('<html lang=""></html>'), 'http://localhost.com'));
  });

  it('should not throw an error for <html lang="en"></html>', () => {
    assert(!rule(cheerio.load('<html lang="en"></html>'), 'http://localhost.com'));
  });
});
