const path = require('path');

function getFileInfo(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return { error: 'Invalid or missing filepath parameter' };
  }

  return {
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    directory: path.dirname(filePath)
  };
}

module.exports = getFileInfo;
