module.exports = function($, url){
  if($('img:not([alt])').length > 0){
      return {
          url,
          level: 'error',
          message: `You have images without alt attributes at ${url}`,
          description: `The alt attribute is mandatory for vocal synthetisers`
      };
  }
};
