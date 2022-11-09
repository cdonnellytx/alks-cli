"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAlksSessionsConsole = void 0;
var tslib_1 = require("tslib");
var underscore_1 = require("underscore");
var checkForUpdate_1 = require("../checkForUpdate");
var errorAndExit_1 = require("../errorAndExit");
var getIamKey_1 = require("../getIamKey");
var getUserAgentString_1 = require("../getUserAgentString");
var log_1 = require("../log");
var tryToExtractRole_1 = require("../tryToExtractRole");
var alks_node_1 = tslib_1.__importDefault(require("alks-node"));
var open_1 = tslib_1.__importDefault(require("open"));
var alksAccount_1 = require("../state/alksAccount");
var alksRole_1 = require("../state/alksRole");
var cli_color_1 = tslib_1.__importDefault(require("cli-color"));
function handleAlksSessionsConsole(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var alksAccount, alksRole, forceNewSession, useDefaultAcct, filterFaves, key_1, err_1, url, opts, err_2, err_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alksAccount = options.account;
                    alksRole = options.role;
                    forceNewSession = options.newSession;
                    useDefaultAcct = options.default;
                    filterFaves = options.favorites || false;
                    if (!(0, underscore_1.isUndefined)(alksAccount) && (0, underscore_1.isUndefined)(alksRole)) {
                        (0, log_1.log)('trying to extract role from account');
                        alksRole = (0, tryToExtractRole_1.tryToExtractRole)(alksAccount);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 17, , 18]);
                    if (!useDefaultAcct) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, alksAccount_1.getAlksAccount)()];
                case 2:
                    alksAccount = _a.sent();
                    return [4 /*yield*/, (0, alksRole_1.getAlksRole)()];
                case 3:
                    alksRole = _a.sent();
                    if (!alksAccount || !alksRole) {
                        (0, errorAndExit_1.errorAndExit)('Unable to load default account!');
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, getIamKey_1.getIamKey)(alksAccount, alksRole, forceNewSession, filterFaves, (0, underscore_1.isUndefined)(options.iam) ? false : true)];
                case 5:
                    key_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    (0, errorAndExit_1.errorAndExit)(err_1);
                    return [3 /*break*/, 7];
                case 7:
                    (0, log_1.log)('calling aws to generate 15min console URL');
                    return [4 /*yield*/, new Promise(function (resolve) {
                            alks_node_1.default.generateConsoleUrl(key_1, { debug: options.verbose, ua: (0, getUserAgentString_1.getUserAgentString)() }, function (err, consoleUrl) {
                                if (err) {
                                    (0, errorAndExit_1.errorAndExit)(err.message, err);
                                }
                                else {
                                    resolve(consoleUrl);
                                }
                            });
                        })];
                case 8:
                    url = _a.sent();
                    if (!options.url) return [3 /*break*/, 9];
                    console.log(url);
                    return [3 /*break*/, 16];
                case 9:
                    opts = !(0, underscore_1.isEmpty)(options.openWith) ? { app: options.openWith } : {};
                    console.error("Opening ".concat(cli_color_1.default.underline(url), " in the browser..."));
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, Promise.race([
                            (0, open_1.default)(url, tslib_1.__assign(tslib_1.__assign({}, opts), { newInstance: true })),
                            new Promise(function (_, rej) {
                                setTimeout(function () { return rej(); }, 5000);
                            }), // timeout after 5 seconds
                        ])];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    err_2 = _a.sent();
                    console.error("Failed to open ".concat(url));
                    console.error('Please open the url in the browser of your choice');
                    return [3 /*break*/, 13];
                case 13: return [4 /*yield*/, (0, checkForUpdate_1.checkForUpdate)()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                case 15:
                    _a.sent(); // needed for if browser is still open
                    _a.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    err_3 = _a.sent();
                    (0, errorAndExit_1.errorAndExit)(err_3.message, err_3);
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.handleAlksSessionsConsole = handleAlksSessionsConsole;
//# sourceMappingURL=alks-sessions-console.js.map