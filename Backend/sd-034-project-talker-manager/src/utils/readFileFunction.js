const path = require('path');
const fs = require('fs').promises;

async function readFile() {
  try {
    const talkerFile = path.resolve(__dirname, 'talker.');
    const data = await fs.readFile(talkerFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  } 
}

module.exports = readFile;