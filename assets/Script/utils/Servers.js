
var gateHost       = "www.enjoymygame.com";
var loginHost      = "www.enjoymygame.com";

var gatePort       = "3014";
var loginPort      = "8210";

var routerMap = {
	gateRouter		:	"gate.gateHandler.queryEntry",
	entryRouter		:	"connector.entryHandler.entry",
	createRoomRouter:	"connector.entryHandler.create",
	enterRoomRouter	:	"connector.entryHandler.enter",
	startGameRouter	:	"connector.entryHandler.start_game",
	leaveRoomRouter	:	"connector.entryHandler.leave_room",
	roomInfoRouter	:	"connector.entryHandler.get_room_info",
	repairEnterRoom	:	"connector.entryHandler.repair_enter_room",
	loginRouter		:	"login.loginHandler.login",
	gonghuiRouter	:	"user.gonghuiHandler.gonghuiProcess",
	//storeRouter		:	"user.storeHandler.storeProcess",
	gameInfoRouter	:	"user.gameInfoHandler.gameInfoProcess",
	gongGaoRouter	:	"broadcast.gonggaoHandler.gongGaoProcess",
	userInfoRouter	:	"user.userHandler.userInfoProcess",
	gameRouter		:	"game.gameHandler.game_process",
	//userRoomRouter	:	"user.roomHandler.getRoomInfo",
	//storeBuyRouter	: 	'user.storeHandler.buy',
	//feedbackRouter	:	'user.userHandler.feedback'
};

var Servers = Servers || {};

Servers.request = function(router,param,cb){
	var routerHandle = routerMap[router];
	if(routerHandle == null){
		console.log(router,routerHandle,'没有找到请求路由');
		util.show_error_info('没有找到请求路由');
		//cb({code:400,msg:'没有找到请求路由'});
	}else{
		pomelo.request(routerHandle,param,function(data){
			var msg = '未知错误!';
			if(data.code && data.code == 120){
				console.log(data.msg);
			}else if(data.code == null || data.code != 200){
				if(data.msg != null && data.msg.length > 0){
					msg = data.msg;
				}
				util.show_error_info(msg);
			}else{
				cb(data);
			}
		});
	}
}

Servers.getLogin = function(playerId,nickName,gender,img_url, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(routerMap.loginRouter, {player_id:playerId, nick_name: nickName,sex:gender,head_img:img_url}, function (data) {
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
        pomelo.request(routerMap.gateRouter,{},function(data){
            //pomelo.disconnect();
            console.log("gate info:" + JSON.stringify(data));
            var host = data.host;
            var port = data.port; //3050
            pomelo.init({
                host:host,
                port:port,
                log:true
            },function(){
                pomelo.request(routerMap.entryRouter,{token:token},function(data){
                    cb(data);
                });
            });
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
    pomelo.request(routerMap.feedbackRouter,{playerId:playerId,title:title,content:content},function(data){
        cb(data);
    });
};