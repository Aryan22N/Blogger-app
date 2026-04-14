const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // Replace single-quoted URLs
      content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${process.env.REACT_APP_API_URL}$1`');
      
      // Replace double-quoted URLs
      content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${process.env.REACT_APP_API_URL}$1`');
      
      // Replace backtick URLs
      content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${process.env.REACT_APP_API_URL}$1`');
      
      if(content !== originalContent) {
          fs.writeFileSync(fullPath, content);
          console.log('Updated:', fullPath);
      }
    }
  });
}

processDir('d:\\\\temperory save\\\\honors\\\\blogger-frontend\\\\src');
console.log('Finished updating endpoints.');
