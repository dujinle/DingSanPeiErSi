
var gateHost       = "www.enjoymygame.com";
var loginHost      = "www.enjoymygame.com";

var gatePort       = "3014";
var gateRouter     = "gate.gateHandler.queryEntry";
var entryRouter    = "connector.entryHandler.entry";

var loginPort      = "8210";
var loginRouter    = "login.loginHandler.wxlogin"; //用户登录

var gonghuiRouter = "user.gonghuiHandler.gonghuiProcess";
var storeRouter = "user.storeHandler.storeProcess";
var gameInfoRouter = "user.gameInfoHandler.gameInfoProcess";
var gongGaoRouter = "broadcast.gonggaoHandler.gongGaoProcess";
var userInfoRouter = "user.userHandler.userInfoProcess";

var gameRouter = "game.gameHandler.gameProcess";

var userRoomRouter = "user.roomHandler.getRoomInfo";

var storeBuyRouter = 'user.storeHandler.buy';

var feedbackRouter = 'user.userHandler.feedback';



Servers = {};

/***
 * 获取其他用户信息
 * @param playerId
 * @param cb
 */
Servers.getPlayerInfo = function(playerId,cb){
    pomelo.request(getPlayerInfo,{playerId:playerId},function(data){
        cb(data);
    });
};
/**
 *  用户from送礼给用户to
 * @param from
 * @param to
 * @param gift 礼物类型 1=gitf01 2=gitf02 3=gitf03 4=gitf04 5=gitf05
 * @param number 礼物数量
 * @param cb
 */
Servers.presents = function(from,to,gift,number,cb){
    pomelo.request(userPresents,{from:from,to:to,number:number},function(data){
        cb(data);
    });
};

Servers.storeProcess = function(process,param,cb){
    pomelo.request(storeRouter,{process:process,data:param},function(data){
        cb(data);
    });
};

Servers.gonghuiProcess = function(process,param,cb){
    pomelo.request(gonghuiRouter,{process:process,data:param},function(data){
        cb(data);
    });
};

Servers.gameInfoProcess = function(process,param,cb){
    pomelo.request(gameInfoRouter,{process:process,data:param},function(data){
        cb(data);
    });
};

Servers.gongGaoProcess = function(process,param,cb){
    pomelo.request(gongGaoRouter,{process:process,data:param},function(data){
        cb(data);
    });
};

Servers.userInfoProcess = function(process,param,cb){
	pomelo.request(userInfoRouter,{process:process,data:param},function(data){
        cb(data);
    });
};

Servers.getWxLogin = function(param, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(loginRouter, param, function (data) {
            cb(data);
        });
    });
};


/**
 * 连接主服务器
 * @param token
 * @param cb 成功code=200 返回玩家数据
 */
Servers.getEntry = function(token,cb) {
    pomelo.init({
        host:gateHost,
        port:gatePort,
        log:true
    }, function () {
        console.log("init gate server ok");
        pomelo.request(gateRouter,{},function(data){
            //pomelo.disconnect();
            console.log("gate info:" + JSON.stringify(data));
            var host = data.host;
            var port = data.port; //3050
            pomelo.init({
                host:host,
                port:port,
                log:true
            },function(){
                pomelo.request(entryRouter,{token:token},function(data){
                    cb(data);
                });
            });
        });
    });
};

/**
 * 请求路由服务器
 */
Servers.getGateEntry = function(cb){ pomelo.init({
        host:gateHost,
        port:gatePort,
        log:true
    }, function () {
        console.log("init getGateEntry ok");
        pomelo.request(gateRouter,function(data){
            console.log(JSON.stringify(data));
            cb(data);
        });
    });
};

/**
 * 问题反馈
 * @param playerId
 * @param title 标题
 * @param content 内容
 * @param cb code = 200
 */
Servers.feedback = function(playerId,title,content,cb){
    pomelo.request(feedbackRouter,{playerId:playerId,title:title,content:content},function(data){
        cb(data);
    });
};
