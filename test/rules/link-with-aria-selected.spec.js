const assert = require('assert');
const cheerio = require('cheerio');
const rule = require('../../rules/link-with-aria-selected/link-with-aria-selected').rule;

describe('link-with-aria-selected ', () => {
  it('should not throw an error for <a></a>', () => {
    assert(!rule(cheerio.load('<div></div>'), 'http://localhost.com'));
  });

  it('should throw an error for <a aria-selected="true"></a>', () => {
    assert(rule(cheerio.load('<a aria-selected="true"></a>'), 'http://localhost.com'));
  });

  it('should throw an error for <a aria-selected="false"></a>', () => {
    assert(rule(cheerio.load('<a aria-selected="false"></a>'), 'http://localhost.com'));
  });
});
