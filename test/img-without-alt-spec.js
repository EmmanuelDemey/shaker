const assert = require('assert');
const rule = require('../rules/img-without-alt');

describe("img-without-alt rule ", function() {
  it('should not throw an error for <div></div>', function() {
    let message = rule('<div></div>', 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <img />', function() {
    let message = rule('<img />', 'http://localhost.com');
    assert(message);
    assert.ok(message.level, "error");
    assert.ok(message.message, "You have images without alt attributes at http://localhost.com");
  });

  it('should throw an error for <img alt="" />', function() {
    let message = rule('<img alt="" />', 'http://localhost.com');
    assert(message);
    assert.ok(message.level, "error");
    assert.ok(message.message, "You have images without alt attributes at http://localhost.com");
  });

  it('should not throw an error for <img alt="a" />', function() {
    let message = rule('<img alt="a" />', 'http://localhost.com');
    assert(!message);
  });
});
