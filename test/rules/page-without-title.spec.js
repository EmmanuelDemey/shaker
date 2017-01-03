const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/page-without-title/page-without-title').rule;

describe("page-without-title rule ", () => {
  it('should not throw an error for <body></body>', () => {
    assert(!rule(cheerio.load('<body></body>'), 'http://localhost.com'));
  });

  it('should not throw an error for <html><head><title>Title</title></head></html>', () => {
    assert(!rule(cheerio.load('<html><head><title>Title</title></head></html>'), 'http://localhost.com'));
  });

  it('should throw an error for <html><head></head></html>', () => {
    assert(rule(cheerio.load('<html><head></head></html>'), 'http://localhost.com'));
  });

  it('should throw an error for <html><head><title></title></head></html>', () => {
    assert(rule(cheerio.load('<html><head><title></title></head></html>'), 'http://localhost.com'));
  });
});
