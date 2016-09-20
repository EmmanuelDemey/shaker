const program = require('commander');
const shaker = require('./index.js');

module.exports = function(){
  program
    .command('html [url]')
    .description('audit an external html page')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(url, options){
      shaker.auditHtml(url);
    });
    program.parse(process.argv);
}
