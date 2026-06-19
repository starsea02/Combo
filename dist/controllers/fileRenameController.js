"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerFileRename = void 0;
const fileRenameService_1 = require("../services/fileRenameService");
const defaultDirectory = 'D:\\BaiduNetdiskDownload\\movie\\布鲁伊\\第一季';
function triggerFileRename(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const directoryPath = typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.directoryPath) === 'string' && req.body.directoryPath.trim()
            ? req.body.directoryPath.trim()
            : defaultDirectory;
        try {
            const renamedFiles = yield (0, fileRenameService_1.renameFilesInDirectory)(directoryPath);
            return res.status(200).json({
                message: 'Rename completed.',
                directoryPath,
                renamedCount: renamedFiles.length,
                renamedFiles,
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Rename failed.';
            return res.status(500).json({
                message,
            });
        }
    });
}
exports.triggerFileRename = triggerFileRename;
