import { Request, Response } from 'express';
import { renameFilesInDirectory } from '../services/fileRenameService';

const defaultDirectory = 'D:\\BaiduNetdiskDownload\\movie\\布鲁伊\\第一季';

export async function triggerFileRename(req: Request, res: Response) {
  const directoryPath =
    typeof req.body?.directoryPath === 'string' && req.body.directoryPath.trim()
      ? req.body.directoryPath.trim()
      : defaultDirectory;

  try {
    const renamedFiles = await renameFilesInDirectory(directoryPath);

    return res.status(200).json({
      message: 'Rename completed.',
      directoryPath,
      renamedCount: renamedFiles.length,
      renamedFiles,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rename failed.';
    return res.status(500).json({
      message,
    });
  }
}
