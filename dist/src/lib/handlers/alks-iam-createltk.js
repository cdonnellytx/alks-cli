"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAlksIamCreateLtk = void 0;
var tslib_1 = require("tslib");
var cli_color_1 = tslib_1.__importDefault(require("cli-color"));
var underscore_1 = require("underscore");
var badAccountMessage_1 = require("../badAccountMessage");
var checkForUpdate_1 = require("../checkForUpdate");
var errorAndExit_1 = require("../errorAndExit");
var getAlks_1 = require("../getAlks");
var getAuth_1 = require("../getAuth");
var getAwsAccountFromString_1 = require("../getAwsAccountFromString");
var log_1 = require("../log");
var promptForAlksAccountAndRole_1 = require("../promptForAlksAccountAndRole");
var tryToExtractRole_1 = require("../tryToExtractRole");
var unpackTags_1 = require("../unpackTags");
function handleAlksIamCreateLtk(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var nameDesc, NAME_REGEX, iamUsername, alksAccount, alksRole, filterFaves, output, tags, auth, alks, awsAccount, ltk, ltkData, ltkData, err_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nameDesc = 'alphanumeric including @+=._-';
                    NAME_REGEX = /^[a-zA-Z0-9!@+=._-]+$/g;
                    iamUsername = options.iamusername;
                    alksAccount = options.account;
                    alksRole = options.role;
                    filterFaves = options.favorites || false;
                    output = options.output || 'text';
                    tags = options.tags ? (0, unpackTags_1.unpackTags)(options.tags) : undefined;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    (0, log_1.log)('validating iam user name: ' + iamUsername);
                    if ((0, underscore_1.isEmpty)(iamUsername)) {
                        (0, errorAndExit_1.errorAndExit)('Please provide a username (-n)');
                    }
                    else if (!NAME_REGEX.test(iamUsername)) {
                        (0, errorAndExit_1.errorAndExit)('The username provided contains illegal characters. It must be ' +
                            nameDesc);
                    }
                    if (!(0, underscore_1.isUndefined)(alksAccount) && (0, underscore_1.isUndefined)(alksRole)) {
                        (0, log_1.log)('trying to extract role from account');
                        alksRole = (0, tryToExtractRole_1.tryToExtractRole)(alksAccount);
                    }
                    if (!(!alksAccount || !alksRole)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, promptForAlksAccountAndRole_1.promptForAlksAccountAndRole)({
                            iamOnly: true,
                            filterFavorites: filterFaves,
                        })];
                case 2:
                    (_a = _b.sent(), alksAccount = _a.alksAccount, alksRole = _a.alksRole);
                    _b.label = 3;
                case 3: return [4 /*yield*/, (0, getAuth_1.getAuth)()];
                case 4:
                    auth = _b.sent();
                    return [4 /*yield*/, (0, getAlks_1.getAlks)(tslib_1.__assign({}, auth))];
                case 5:
                    alks = _b.sent();
                    return [4 /*yield*/, (0, getAwsAccountFromString_1.getAwsAccountFromString)(alksAccount)];
                case 6:
                    awsAccount = _b.sent();
                    if (!awsAccount) {
                        throw new Error(badAccountMessage_1.badAccountMessage);
                    }
                    (0, log_1.log)('calling api to create ltk: ' + iamUsername);
                    return [4 /*yield*/, alks.createAccessKeys({
                            account: awsAccount.id,
                            role: alksRole,
                            iamUserName: iamUsername,
                            tags: tags,
                        })];
                case 7:
                    ltk = _b.sent();
                    if (output === 'json') {
                        ltkData = {
                            accessKey: ltk.accessKey,
                            secretKey: ltk.secretKey,
                            iamUserName: iamUsername,
                            iamUserArn: ltk.iamUserArn,
                        };
                        console.log(JSON.stringify(ltkData, null, 4));
                    }
                    else {
                        ltkData = {
                            accessKey: ltk.accessKey,
                            secretKey: ltk.secretKey,
                            iamUserName: iamUsername,
                            iamUserArn: ltk.iamUserArn,
                            alksAccount: awsAccount.id,
                            alksRole: alksRole,
                        };
                        console.log(cli_color_1.default.white([
                            'LTK created for IAM User: ',
                            iamUsername,
                            ' was created with the ARN: ',
                        ].join('')) + cli_color_1.default.white.underline(ltkData.iamUserArn));
                        console.log(cli_color_1.default.white(['LTK Access Key: '].join('')) +
                            cli_color_1.default.white.underline(ltkData.accessKey));
                        console.log(cli_color_1.default.white(['LTK Secret Key: '].join('')) +
                            cli_color_1.default.white.underline(ltkData.secretKey));
                    }
                    return [4 /*yield*/, (0, checkForUpdate_1.checkForUpdate)()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    (0, errorAndExit_1.errorAndExit)(err_1.message, err_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.handleAlksIamCreateLtk = handleAlksIamCreateLtk;
//# sourceMappingURL=alks-iam-createltk.js.map