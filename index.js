const winston = require('winston'),
  cheerio = require('cheerio'),
  path = require('path'),
  request = require('request'),
  program = require('commander'),
  fs = require('fs');

require('colors');

module.exports = {
  auditHtml
}

const colors = {
  'error': 'red'
};

const pathToRule = path.join(path.resolve(__dirname), 'rules');

function executeRules(uri, lang) {
  
  return new Promise(function (resolve, reject) {
    request({ uri }, (error, response, body) => {

      let htmlRules = fs.readdirSync(pathToRule).map(function (file) {
        let module = require(path.join(pathToRule, file, file));
        module.name = file;
        return module;
      });

      resolve(htmlRules
                .map(module => {
                  let result;
                  if(module.rule(cheerio.load(body), uri)){
                    result = require(path.join(pathToRule, module.name, 'messages.json'))[lang] ;
                    result.url = uri;
                    result.name = module.name;
                  }
                  return result;
                })
                .filter(result => result)
      );
    });
  });
}

function displayResults(results){
  results.forEach(m => {
    winston[m.level](m.message[colors[m.level]]);
    console.log(m.description.yellow);
  });
  return results
}

function auditHtml(uris, options) {
  options.lang = options.lang || 'en';
  
  Promise.all(uris.map(uri => executeRules(uri, options.lang)))
    .then(results => {
      return [].concat.apply([], results)
    })
    .then(displayResults)
    .then(results => generateAsciiDoctorReport(results, options.lang));
}

function groupDataByKey(data, property) {
  return data.reduce(function (acc, item) {
    if (item) {
      var key = item[property];
      acc[key] = acc[key] || [];
      acc[key].push(item);
    }

    return acc;
  }, {});
}
function generateAsciiDoctorReport(results, lang) {

  let content = `
= Audit Report

`
  const resultsGroupedByLevel = groupDataByKey(results, 'level');
  for (let level in resultsGroupedByLevel) {
    content += `== ${resultsGroupedByLevel[level][0].level.toUpperCase()}` + '\n';

    const resultsGroupedByLevelAndRuleName = groupDataByKey(resultsGroupedByLevel[level], 'name');
    for (let name in resultsGroupedByLevelAndRuleName) {
      content += '\n' + `=== ${resultsGroupedByLevelAndRuleName[name][0].title || resultsGroupedByLevelAndRuleName[name][0].name}` + '\n\n';
      content += `[IMPORTANT] ${resultsGroupedByLevelAndRuleName[name][0].message}` + '\n\n';
      content += `${resultsGroupedByLevelAndRuleName[name][0].description}` + '\n\n';

      resultsGroupedByLevelAndRuleName[name].forEach(rule => {
        content += `* ${rule.url}` + '\n';
      });
      try{
        let extra = fs.readFileSync(path.join(pathToRule, name, `extra_${lang}.asciidoc`));
        content += '\n' + extra + '\n';
      } catch(e){
        
      }
      

    }
    content += '\n\n';
  }

  fs.writeFile(path.join(path.resolve(__dirname), 'report.asciidoc'), content, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The report has been created!");
  });
}