
const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const filePath = process.argv[3];
const content = process.argv[4];

switch (command) {
    case 'read':
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return console.error('Error:', err.message);
            console.log(data);
        });
        break;
    case 'write':
        fs.writeFile(filePath, content || '', (err) => {
            if (err) return console.error('Error:', err.message);
            console.log('File written successfully');
        });
        break;
    case 'append':
        fs.appendFile(filePath, content || '', (err) => {
            if (err) return console.error('Error:', err.message);
            console.log('Content appended successfully');
        });
        break;
    case 'copy':
        const dest = process.argv[4];
        fs.copyFile(filePath, dest, (err) => {
            if (err) return console.error('Error:', err.message);
            console.log('File copied successfully');
        });
        break;
    case 'delete':
        fs.unlink(filePath, (err) => {
            if (err) return console.error('Error:', err.message);
            console.log('File deleted successfully');
        });
        break;
    case 'list':
        fs.readdir(filePath, (err, files) => {
            if (err) return console.error('Error:', err.message);
            console.log(files.join('\n'));
        });
        break;
    default:
        console.log('Commands: read, write, append, copy, delete, list');
}
