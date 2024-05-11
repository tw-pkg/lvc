const isDev = require('electron-is-dev');
const path = require('node:path');

function resolvePath() {
  if(isDev) {
    return 'http://localhost:3000';
  }
  
  return `file://${path.resolve(__dirname, './public/', 'index.html')}`;
}

module.exports = {
  resolvePath
}