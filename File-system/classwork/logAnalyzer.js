
const fs = require('fs');
const readline = require('readline');

const logFile = process.argv[2];
const reportFile = 'summary_report.txt';

let totalLines = 0;
let errors = 0;
let warnings = 0;
let info = 0;

const readStream = fs.createReadStream(logFile);
const rl = readline.createInterface({ input: readStream });

rl.on('line', (line) => {
    totalLines++;
    if (line.includes('ERROR')) errors++;
    else if (line.includes('WARNING')) warnings++;
    else if (line.includes('INFO')) info++;
});

rl.on('close', () => {
    const report = `Total Lines: ${totalLines}\nERROR: ${errors}\nWARNING: ${warnings}\nINFO: ${info}\n`;
    fs.writeFile(reportFile, report, (err) => {
        if (err) return console.error('Error writing report:', err.message);
        console.log('Summary report generated:', reportFile);
    });
});
