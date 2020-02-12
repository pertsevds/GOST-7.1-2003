const { series, src, dest } = require('gulp');
const { exec } = require('child_process');


function copy() {
  return src('GOST71.xsl').pipe(dest(process.env.APPDATA + '/Microsoft/Bibliography/Style/'));
}

function killWord(cb) {
  exec('taskkill /IM "winword.exe" /F', (err, stdout, stderr) => {
    cb();
  });
}

function startWord(cb) {
  return exec('start winword test.docm');
}

function transformSourcesToBibliography(cb) {
  return exec('"libxml/xsltproc" -o samples/Bibliorgaphy.xml utils/bibliography.xsl samples/Sources.xml');
}

function showBibliographyResult(cb) {
  exec('"libxml/xsltproc" GOST71.xsl samples/Bibliorgaphy.xml', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
}


exports.default = series(killWord, copy, startWord)
exports.install = copy
exports.transformSourcesToBibliography = transformSourcesToBibliography
exports.showBibliographyResult = showBibliographyResult
