"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordFromKeystore = void 0;
var tslib_1 = require("tslib");
var getKeytar_1 = require("./getKeytar");
var log_1 = require("./log");
var credentials_1 = require("./state/credentials");
var SERVICE = 'alkscli';
var ALKS_PASSWORD = 'alkspassword';
function getPasswordFromKeystore() {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var keytar, password, e_1, credentials;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 5]);
                    return [4 /*yield*/, (0, getKeytar_1.getKeytar)()];
                case 1:
                    keytar = _c.sent();
                    return [4 /*yield*/, keytar.getPassword(SERVICE, ALKS_PASSWORD)];
                case 2:
                    password = (_a = (_c.sent())) !== null && _a !== void 0 ? _a : undefined;
                    (0, log_1.log)("found password \"".concat(password, "\" in keystore"), {
                        unsafe: true,
                        alt: "found password of ".concat(password
                            ? "".concat(password.length, " characters starting with \"").concat(password.substring(0, 1), "\"")
                            : "undefined", " in keystore"),
                    });
                    return [2 /*return*/, password];
                case 3:
                    e_1 = _c.sent();
                    (0, log_1.log)(e_1.message);
                    (0, log_1.log)('Failed to use keychain. Checking for plaintext file');
                    return [4 /*yield*/, (0, credentials_1.getCredentials)()];
                case 4:
                    credentials = _c.sent();
                    return [2 /*return*/, (_b = credentials.password) !== null && _b !== void 0 ? _b : undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPasswordFromKeystore = getPasswordFromKeystore;
//# sourceMappingURL=getPasswordFromKeystore.js.map