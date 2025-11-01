import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const fixtureDir = path.join(process.cwd(), 'src', 'fixtures');

export const getFixtureFilePath = (fileName: string) => {
    return path.join(fixtureDir, fileName);
}

export const ensureFixtureFileExists = (filePath: string) => {
    if (!fs.existsSync(filePath)) {
        const filename = path.basename(filePath);
        throw new Error(`Ops! looks like the file ${filename} does not exists at fixture folder: ${fixtureDir}`);
    }
}

export const copyToDirAs = (dirPath: string, filePath: string, newFileName: string) => {
    fs.mkdirSync(dirPath, { recursive: true });
    const newFilePath = path.join(dirPath, newFileName);

    fs.copyFileSync(filePath, newFilePath);

    return newFilePath;
}

export const createTempDir = () => {
    const tempDir = path.join(os.tmpdir(), 'challenge-qa');
    fs.mkdirSync(tempDir, { recursive: true });
    return tempDir;
}