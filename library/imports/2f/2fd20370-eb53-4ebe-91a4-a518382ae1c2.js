"use strict";
cc._RF.push(module, '2fd20Nw61NOvpGkpRg4KuHC', 'payJS');
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