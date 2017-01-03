const program = require('commander');
const shaker = require('./index.js');

module.exports = function(){
  program
    .command('html [urls...]')
    .description('audit an external html page')
    .option("-r, --report", "Generate the AsciiDoctor report")
    .option("-l, --lang [lang]", "Lang")
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(urls, options){
      shaker.auditHtml(urls, options);
    });
    program.parse(process.argv);
}
