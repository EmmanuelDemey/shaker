const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/page-without-title');

describe("page-without-title rule ", () => {
  it('should not throw an error for <body></body>', () => {
    let message = rule(cheerio.load('<body></body>'), 'http://localhost.com');
    assert(!message);
  });

  it('should not throw an error for <html><head><title>Title</title></head></html>', () => {
    let message = rule(cheerio.load('<html><head><title>Title</title></head></html>'), 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <html><head></head></html>', () => {
    let message = rule(cheerio.load('<html><head></head></html>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, "error");
    assert.equal(message.message, "Your page http://localhost.com should have a title");
  });

  it('should throw an error for <html><head><title></title></head></html>', () => {
    let message = rule(cheerio.load('<html><head><title></title></head></html>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, "error");
    assert.equal(message.message, "Your page http://localhost.com should have a title");
  });
});
