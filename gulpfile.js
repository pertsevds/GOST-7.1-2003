const { series, src, dest } = require('gulp');
const { exec } = require('child_process');
//const xslt = require('gulp-xslt');


function copy() {
  return src('GOST71.xsl').pipe(dest(process.env.APPDATA + '\\Microsoft\\Bibliography\\Style\\'));
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
  return src('samples\\Sources.xml').pipe(dest('samples'));
 //return src('GOST71.xsl').pipe(dest(process.env.APPDATA + '\\Microsoft\\Bibliography\\Style\\'));
}

exports.default = series(killWord, copy, startWord)
exports.install = copy
exports.transform = transform
