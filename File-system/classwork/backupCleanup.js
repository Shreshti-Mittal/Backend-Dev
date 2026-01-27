
const fs = require('fs').promises;
const path = require('path');

const sourceDir = './uploads';
const backupDir = './backup';
const logFile = 'backup.log';

async function log(message) {
    await fs.appendFile(logFile, `${new Date().toISOString()} - ${message}\n`);
}

async function backupAndCleanup() {
    try {
        await fs.mkdir(backupDir, { recursive: true });

        const files = await fs.readdir(sourceDir);
        for (const file of files) {
            const filePath = path.join(sourceDir, file);
            const stats = await fs.stat(filePath);

            // Backup
            const backupPath = path.join(backupDir, `${Date.now()}_${file}`);
            await fs.copyFile(filePath, backupPath);
            await log(`Backed up: ${file}`);

            // Cleanup files older than 7 days
            const age = Date.now() - stats.mtimeMs;
            if (age > 7 * 24 * 60 * 60 * 1000) {
                await fs.unlink(filePath);
                await log(`Deleted old file: ${file}`);
            }
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

backupAndCleanup();
