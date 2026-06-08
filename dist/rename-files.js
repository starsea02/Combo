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
const fileRenameService_1 = require("./services/fileRenameService");
const defaultDirectory = 'D:\\BaiduNetdiskDownload\\movie\\班班和莉莉的小王国\\第1季';
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const directoryPath = (_a = process.argv[2]) !== null && _a !== void 0 ? _a : defaultDirectory;
        try {
            const renamedFiles = yield (0, fileRenameService_1.renameFilesInDirectory)(directoryPath);
            console.log(`Renamed ${renamedFiles.length} file(s).`);
            for (const item of renamedFiles) {
                console.log(`${item.originalName} -> ${item.newName}`);
            }
        }
        catch (error) {
            console.error('Rename failed.');
            console.error(error);
            process.exitCode = 1;
        }
    });
}
void main();
