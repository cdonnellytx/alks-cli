"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialsFromProcess = void 0;
var tslib_1 = require("tslib");
var child_process_1 = require("child_process");
var log_1 = require("./log");
var credentials_1 = require("./state/credentials");
var cachedResult;
function getCredentialsFromProcess() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result, credentials, output;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {};
                    if (cachedResult) {
                        return [2 /*return*/, cachedResult];
                    }
                    return [4 /*yield*/, credentials_1.getCredentials()];
                case 1:
                    credentials = _a.sent();
                    if (credentials.credential_process) {
                        output = child_process_1.spawnSync(credentials.credential_process);
                        if (output.error) {
                            log_1.log('error encountered when executing credential process: ' + output.error);
                            throw output.error;
                        }
                        if (String(output.stderr).trim().length > 0) {
                            log_1.log('credential_process stderr: ' + output.stderr);
                        }
                        result = JSON.parse(String(output.stdout));
                    }
                    else {
                        log_1.log('no credential_process found');
                    }
                    cachedResult = result;
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getCredentialsFromProcess = getCredentialsFromProcess;
//# sourceMappingURL=getCredentialsFromProcess.js.map