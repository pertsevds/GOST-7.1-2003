const { series, src, dest } = require('gulp');
const { exec } = require('child_process');


function copy() {
  return src('GOST71.xsl').pipe(dest(process.env.APPDATA+'\\Microsoft\\Bibliography\\Style\\'));
}

function killWord(cb) {
  exec('taskkill /IM "winword.exe" /F', (err, stdout, stderr) => {
    cb();
  });
}

function startWord(cb) {
  return exec('start winword test.docm');
}

exports.default = series(killWord, copy, startWord)
exports.install = copy
