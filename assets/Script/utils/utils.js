/**
 * Created by WTF Wei on 2016/4/21.
 * Function :
 */
var util = util || {};

/**
 * 等级 充值金额判断等级
 * @param recharge
 */
util.toLevel = function (recharge) {
    var level =  parseInt(recharge/10);
    return level;
}

/**
 * 增量 充值金额判断增量
 * @param recharge
 */
util.toDelta = function (recharge) {
    var delta = parseInt(recharge/10)*100 + 1000;
    return delta;
}

/**
 * 容量 充值金额判断容量
 * @param recharge
 */
util.toVolume = function (recharge) {
    var volume = 10*(parseInt(recharge/10)*100 + 1000);
    return volume;
}

util.createUUID = function () {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
}
util.getGameRoute = function(){
	return "game.gameHandler.game_process";
}

util.getCreateRoute = function(){
	return "connector.entryHandler.create";
}

util.getEnterWaitRoomRoute = function(){
	return "connector.entryHandler.enter_wait_room";
}

util.getRoomInfoRoute = function(){
	return "connector.entryHandler.get_room";
}

util.getEnterRoute = function(){
	return "connector.entryHandler.enter";
}

util.getRoomInfoRoute = function(){
	return "connector.entryHandler.get_room_info";
}

util.getRepairEnterRoomRoute = function(){
	return "connector.entryHandler.repair_enter_room";
}


util.getStartGameRoute = function(){
	return "connector.entryHandler.start_game";
}

util.getDelayWaitTimeRoute = function(){
	return "connector.entryHandler.delay_wait_time";
}

util.getDissolveRoomRoute = function(){
	return "connector.entryHandler.dissolve_room";
}

util.getLeaveRoomRoute = function(){
	return "connector.entryHandler.leave_room";
}

util.show_net_error = function(msg,cb){
	var size = cc.director.getVisibleSize();
	var error_tip = cc.instantiate(g_assets["pop_net_error"]);
	var error_tip_com = error_tip.getComponent("pop_net_error");
    error_tip_com.show_error_info(msg,cb);
    var root_node = cc.director.getScene().getChildByName('RootNode');
	root_node.addChild(error_tip);
	error_tip.setPosition(root_node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
}

util.show_error_info = function(msg){
	var size = cc.director.getVisibleSize();
	var error_tip = cc.instantiate(g_assets["PopErrorScene"]);
	var error_tip_com = error_tip.getComponent("pop_error_info");
    error_tip_com.show_error_info(msg);
    var root_node = cc.director.getScene().getChildByName('RootNode');
	root_node.addChild(error_tip);
	error_tip.setPosition(root_node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
}

util.show_isok_info = function(callback,msg){
	var size = cc.director.getVisibleSize();
	var error_tip = cc.instantiate(g_assets["PopIsOkScene"]);
	var error_tip_com = error_tip.getComponent("pop_isok_info");
	error_tip_com.init(callback);
	var root_node = cc.director.getScene().getChildByName('RootNode');
	root_node.addChild(error_tip);
	error_tip.setPosition(root_node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	error_tip_com.show_error_info(msg);
}

/*
util.get = function(url,param,pthis){
	var xhr = cc.loader.getXMLHttpRequest();
    if(param == null){
    	xhr.open("GET", url,false);
    }else{
    	xhr.open("GET", url + "?" + param,false);
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var result = JSON.parse(xhr.responseText);
            pthis.callback(result);
        }
    };
    xhr.send(null);
}
*/

util.http_get = function(url,param,cb){
	var xhr = cc.loader.getXMLHttpRequest();
    if(param == null){
    	xhr.open("GET", url,false);
    }else{
    	xhr.open("GET", url + "?" + param,false);
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var result = JSON.parse(xhr.responseText);
            cb(null,result);
        }else{
			cb(xhr.status,null);
		}
    };
    xhr.send(null);
}

util.post = function(url,str,cb){
    var sendstr = JSON.stringify(str);
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", ServerLink);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {            
            var result = JSON.parse(xhr.responseText);
            if(result["act"]=="erro") {
                cb(result["msg"]);
                return;
            }
            cb(result);
        }
    };
    xhr.send(sendstr);
}

util.dateftt = function (val,fmt) {
	var dateObj = new Date(val);
    var o = {
        "M+": dateObj.getMonth() + 1, //月份 
        "d+": dateObj.getDate(), //日 
        "h+": dateObj.getHours(), //小时 
        "m+": dateObj.getMinutes(), //分 
        "s+": dateObj.getSeconds(), //秒 
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度 
        "S": dateObj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}