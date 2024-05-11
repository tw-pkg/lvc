const path = require('node:path');

function resolvePath() {
  if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  return `file://${path.resolve(__dirname, './public/', 'index.html')}`;
}

module.exports = {
  resolvePath
}