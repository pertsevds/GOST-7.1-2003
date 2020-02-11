const { series, src, dest } = require('gulp');
const { exec } = require('child_process');
const rename = require('gulp-rename');
//const xslt = require('gulp-xslt');


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

function transform() {
  return src('samples/Sources.xml').pipe(rename('Bibliography.xml')).pipe(dest('samples/'));
}

exports.default = series(killWord, copy, startWord)
exports.install = copy
exports.transform = transform
