//jsonUtils.js handles reading and parsing JSON test data files into JavaScript objects.

//converting json files to js objects
const fs = require('fs');
const path = require('path');

function loadJson(relativePath) {           //relativePath: path of json(json contains test data so present in testData folder) 
  const file = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(file, 'utf-8');
  return JSON.parse(content);
}

module.exports = { loadJson };
