const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/link-with-aria-selected').rule;

describe('link-with-aria-selected ', () => {
  it('should not throw an error for <a></a>', () => {
    let message = rule(cheerio.load('<div></div>'), 'http://localhost.com');
    assert(!message);
  });

  it('should throw an error for <a aria-selected="true"></a>', () => {
    let message = rule(cheerio.load('<a aria-selected="true"></a>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, "error");
    assert.equal(message.message, "You have link element with aria-selected attribute at http://localhost.com");
  });

  it('should throw an error for <a aria-selected="false"></a>', () => {
    let message = rule(cheerio.load('<a aria-selected="false"></a>'), 'http://localhost.com');
    assert(message);
    assert.equal(message.level, "error");
    assert.equal(message.message, "You have link element with aria-selected attribute at http://localhost.com");
  });
});
