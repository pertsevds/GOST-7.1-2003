const { series, src, dest } = require('gulp');
const { exec } = require('child_process');


function install() {
  return src('GOST71.xsl').pipe(dest(process.env.APPDATA + '/Microsoft/Bibliography/Style/'));
}

function copySourcesToSamples() {
  return src(process.env.APPDATA + '/Microsoft/Bibliography/Sources.xml').pipe(dest('samples/'));
}

function insatllSources() {
  return src('samples/Sources.xml').pipe(dest(process.env.APPDATA + '/Microsoft/Bibliography/'));
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
  return exec('"libxml/xsltproc" -o samples/Bibliorgaphy.xml utils/bibliography.xsl samples/Sources.xml');
}

function transformSourcesToCitation() {
  return exec('"libxml/xsltproc" -o samples/Citation.xml utils/citation.xsl samples/Sources.xml');
}

function showBibliographyResult(cb) {
  exec('"libxml/xsltproc" GOST71.xsl samples/Bibliorgaphy.xml', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function showCitationResult(cb) {
  exec('"libxml/xsltproc" GOST71.xsl samples/Bibliorgaphy.xml', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

exports.default = series(killWord, install, startWord)
exports.copySourcesToSamples = copySourcesToSamples
exports.install = install
exports.installSources = installSources
exports.transformSources = series(transformSourcesToBibliography, transformSourcesToCitation)
exports.showBibliographyResult = showBibliographyResult
exports.showCitationResult = showCitationResult
