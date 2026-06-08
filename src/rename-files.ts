import { renameFilesInDirectory } from './services/fileRenameService';

const defaultDirectory = 'D:\\BaiduNetdiskDownload\\movie\\班班和莉莉的小王国\\第1季';

async function main() {
  const directoryPath = process.argv[2] ?? defaultDirectory;

  try {
    const renamedFiles = await renameFilesInDirectory(directoryPath);

    console.log(`Renamed ${renamedFiles.length} file(s).`);

    for (const item of renamedFiles) {
      console.log(`${item.originalName} -> ${item.newName}`);
    }
  } catch (error) {
    console.error('Rename failed.');
    console.error(error);
    process.exitCode = 1;
  }
}

void main();
