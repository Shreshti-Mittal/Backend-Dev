const fs=require('fs');
const path = require("path");

const mainFolder='myfolder';
fs.mkdirSync(mainFolder, { recursive: true });

const subfolder=path.join(mainFolder,'subfolder');
fs.mkdirSync(subfolder, { recursive: true });

const subfolder2=path.join(mainFolder,'subfolder2');
fs.mkdirSync(subfolder2, { recursive: true });

const filepath=path.join(subfolder,'hello.txt');
fs.writeFileSync(filepath,'Hello, World.');

console.log('Subfolder and file created');