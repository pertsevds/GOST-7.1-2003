const { parallel, series, src, dest } = require('gulp');
const { exec } = require('child_process');

const xsltproc = '"bin/libxml/xsltproc"';
const appdata = `${process.env.APPDATA}`;

function copySources() {
  return src(`${appdata}/Microsoft/Bibliography/Sources.xml`).pipe(dest('sources/'));
}

function install() {
  return src('GOST71.xsl').pipe(dest(`${appdata}/Microsoft/Bibliography/Style/`));
}

function installSources() {
  return src('sources/Sources.xml').pipe(dest(`${appdata}/Microsoft/Bibliography/`));
}

function killWord(cb) {
  exec('taskkill /IM "winword.exe" /F', (err, stdout, stderr) => {
    cb();
  });
}

function showBibliographyResult(cb) {
  exec(`${xsltproc} GOST71.xsl sources/Bibliorgaphy.xml`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function showCitationResult(cb) {
  exec(`${xsltproc} GOST71.xsl sources/Bibliorgaphy.xml`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function startWord() {
  return exec('start winword test.docm');
}

function transformSourcesToBibliography() {
  return exec(`${xsltproc} -o sources/Bibliorgaphy.xml utility-xslts/bibliography.xsl sources/Sources.xml`);
}

function transformSourcesToCitation() {
  return exec(`${xsltproc} -o sources/Citation.xml utility-xslts/citation.xsl sources/Sources.xml`);
}

function wellformSources() {
  return exec(`${xsltproc} -o sources/Sources.xml utility-xslts/wellform.xsl sources/Sources.xml`);
}

exports.copySources = copySources
exports.default = series(killWord, install, startWord)
exports.install = install
exports.installSources = installSources
exports.showBibliographyResult = showBibliographyResult
exports.showCitationResult = showCitationResult
exports.transformSources = series(wellformSources, parallel(transformSourcesToBibliography, transformSourcesToCitation))
