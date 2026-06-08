"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileRenameController_1 = require("../controllers/fileRenameController");
const router = (0, express_1.Router)();
router.post('/rename-files', fileRenameController_1.triggerFileRename);
exports.default = router;
