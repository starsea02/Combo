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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFilesInDirectory = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function getNumericPrefix(fileName) {
    const match = fileName.match(/^(\d+)/);
    if (!match) {
        return null;
    }
    return match[1];
}
function buildNewFileName(originalName) {
    const baseName = path_1.default.parse(originalName).name;
    const prefix = getNumericPrefix(baseName);
    if (!prefix) {
        return null;
    }
    return prefix;
}
function renameFilesInDirectory(directoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield fs_1.promises.readdir(directoryPath, { withFileTypes: true });
        const files = entries
            .filter((entry) => entry.isFile())
            .sort((a, b) => a.name.localeCompare(b.name));
        const results = [];
        for (const file of files) {
            const newName = buildNewFileName(file.name);
            if (!newName || newName === file.name) {
                continue;
            }
            const from = path_1.default.join(directoryPath, file.name);
            const to = path_1.default.join(directoryPath, newName);
            try {
                yield fs_1.promises.access(to);
                throw new Error(`Target file already exists: ${newName}`);
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
                yield fs_1.promises.rename(from, to);
                results.push({ originalName: file.name, newName });
            }
        }
        return results;
    });
}
exports.renameFilesInDirectory = renameFilesInDirectory;
