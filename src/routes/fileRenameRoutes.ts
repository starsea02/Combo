import { Router } from 'express';
import { triggerFileRename } from '../controllers/fileRenameController';

const router = Router();

router.post('/rename-files', triggerFileRename);

export default router;
