(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/utils/payJS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2fd20Nw61NOvpGkpRg4KuHC', 'payJS', __filename);
// Script/utils/payJS.js

"use strict";

var payJS = payJS || {};
payJS.javascriptMethod = function (param) {
    cc.log(param); // "hello world, javascript"
    cc.log("------------------------------------------");
    pomelo.request("payInfo.payInfoHandler.payMsg", {
        param: param
    }, function (data) {
        console.log(data.msg);
    });
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=payJS.js.map
        