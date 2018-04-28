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
	return "game.gameHandler.gameProcess";
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

util.getDelayWaitTimeRoute = function(){
	return "connector.entryHandler.delay_wait_time";
}

util.getDissolveRoomRoute = function(){
	return "connector.entryHandler.dissolve_room";
}

util.show_error_info = function(pp,size,msg){
	var size = cc.director.getVisibleSize();
	var error_tip = cc.instantiate(g_assets["prop_error_scene"]);
	var error_tip_com = error_tip.getComponent("prop_error_info");
    error_tip_com.show_error_info(msg);
    var root_node = cc.director.getScene().getChildByName('RootNode');
	root_node.addChild(error_tip);
	error_tip.setPosition(root_node.convertToNodeSpace(size.width/2,size.height/2));
}

util.show_isok_info = function(pp,callback,msg){
	if(pp.debug_label != null){
		pp.debug_label.string = "go into show_isok_info ......";
	}
	var size = cc.director.getVisibleSize();
	var error_tip = cc.instantiate(g_assets["pop_isok_scene"]);
	var error_tip_com = error_tip.getComponent("prop_isok_info");
	error_tip_com.init(callback);
	pp.node.addChild(error_tip);
	error_tip.setPosition(pp.node.convertToNodeSpace(size.width/2,size.height/2));
	error_tip_com.show_error_info(msg);
}

util.get = function(url,param,pthis){
	var xhr = cc.loader.getXMLHttpRequest();
    if(param == null){
    	xhr.open("GET", url,false);
    }else{
    	xhr.open("GET", url + "?" + param,false);
    }
    pthis.debug_label.string = url + "?" + param;
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        pthis.debug_label.string = "onreadystatechange:" + xhr.readyState + " status:" + xhr.status;
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            pthis.debug_label.string = pthis.debug_label.string + "resp:" + xhr.responseText;
            var result = JSON.parse(xhr.responseText);
            pthis.callback(result);
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