const nunjucks = require('nunjucks');
const fs = require('fs');

const template = fs.readFileSync('_src/index.njk', 'utf-8');
const rendered = nunjucks.renderString(template,
{
  title: "welcooome",
  intro: "This is a lightweight static homepage using Nunjucks templating."
});


fs.writeFileSync('index.html', rendered);
console.log('homepage built!');