const { series, src, dest } = require('gulp');
const { exec } = require('child_process');


function install() {
  return src('GOST71.xsl').pipe(dest(process.env.APPDATA + '/Microsoft/Bibliography/Style/'));
}

function copySources() {
  return src(process.env.APPDATA + '/Microsoft/Bibliography/Sources.xml').pipe(dest('sources/'));
}

function installSources() {
  return src('sources/Sources.xml').pipe(dest(process.env.APPDATA + '/Microsoft/Bibliography/'));
}

function killWord(cb) {
  exec('taskkill /IM "winword.exe" /F', (err, stdout, stderr) => {
    cb();
  });
}

function startWord() {
  return exec('start winword test.docm');
}

function transformSourcesToBibliography() {
  return exec('"libxml/xsltproc" -o sources/Bibliorgaphy.xml utility-xslts/bibliography.xsl sources/Sources.xml');
}

function transformSourcesToCitation() {
  return exec('"libxml/xsltproc" -o sources/Citation.xml utility-xslts/citation.xsl sources/Sources.xml');
}

function showBibliographyResult(cb) {
  exec('"libxml/xsltproc" GOST71.xsl sources/Bibliorgaphy.xml', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function showCitationResult(cb) {
  exec('"libxml/xsltproc" GOST71.xsl sources/Bibliorgaphy.xml', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

exports.default = series(killWord, install, startWord)
exports.copySources = copySources
exports.install = install
exports.installSources = installSources
exports.transformSources = series(transformSourcesToBibliography, transformSourcesToCitation)
exports.showBibliographyResult = showBibliographyResult
exports.showCitationResult = showCitationResult
