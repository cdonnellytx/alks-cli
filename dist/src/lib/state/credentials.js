"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCredentials = exports.getCredentials = exports.CREDENTIALS_FILE_PATH = void 0;
var tslib_1 = require("tslib");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var os_1 = require("os");
var ini_1 = require("ini");
exports.CREDENTIALS_FILE_PATH = path_1.join(os_1.homedir(), '.alks', 'credentials');
function getCredentials() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var credentialsFile, credentials;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, promises_1.readFile(exports.CREDENTIALS_FILE_PATH, 'utf-8').catch(function () { return ''; })];
                case 1:
                    credentialsFile = _b.sent();
                    credentials = ini_1.parse(credentialsFile);
                    (_a = credentials.default) !== null && _a !== void 0 ? _a : (credentials.default = {});
                    return [2 /*return*/, credentials];
            }
        });
    });
}
exports.getCredentials = getCredentials;
function setCredentials(credentials) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var credentialsFile;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credentialsFile = ini_1.stringify(credentials);
                    return [4 /*yield*/, promises_1.writeFile(exports.CREDENTIALS_FILE_PATH, credentialsFile, {
                            encoding: 'utf-8',
                            mode: 384,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.setCredentials = setCredentials;
//# sourceMappingURL=credentials.js.map