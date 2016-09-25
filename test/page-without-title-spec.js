const assert = require('assert');
const rule = require('../rules/page-without-title');

describe("page-without-title rule ", function() {
  it('should not throw an error for <body></body>', function() {
    let message = rule('<body></body>', 'http://localhost.com');
    assert(!message);
  });

  it('should not throw an error for <html><head><title>Title</title></head></html>', function() {
    let message = rule('<html><head><title>Title</title></head></html>', 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <html><head></head></html>', function() {
    let message = rule('<html><head></head></html>', 'http://localhost.com');
    assert(message);
    assert.ok(message.level, "error");
    assert.ok(message.message, "Your page http://localhost.com should have a title");
  });

  it('should throw an error for <html><head><title></title></head></html>', function() {
    let message = rule('<html><head><title></title></head></html>', 'http://localhost.com');
    assert(message);
    assert.ok(message.level, "error");
    assert.ok(message.message, "Your page http://localhost.com should have a title");
  });
});
