import { promises as fs } from 'fs';
import path from 'path';

export interface RenameResult {
  originalName: string;
  newName: string;
}

function getNumericPrefix(fileName: string): string | null {
  const match = fileName.match(/^(\d+)/);

  if (!match) {
    return null;
  }

  return match[1];
}

function buildNewFileName(originalName: string): string | null {
  const baseName = path.parse(originalName).name;
  const prefix = getNumericPrefix(baseName);

  if (!prefix) {
    return null;
  }

  return prefix;
}

export async function renameFilesInDirectory(directoryPath: string): Promise<RenameResult[]> {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .sort((a, b) => a.name.localeCompare(b.name));
  const results: RenameResult[] = [];

  for (const file of files) {
    const newName = buildNewFileName(file.name);

    if (!newName || newName === file.name) {
      continue;
    }

    const from = path.join(directoryPath, file.name);
    const to = path.join(directoryPath, newName);

    try {
      await fs.access(to);
      throw new Error(`Target file already exists: ${newName}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }

      await fs.rename(from, to);
      results.push({ originalName: file.name, newName });
    }
  }

  return results;
}
