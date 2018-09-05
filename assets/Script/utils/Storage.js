/**
 * Created by kenkozheng on 2014/12/4.
 */
Storage = {};

Storage.setData = function(key,value){
	cc.sys.localStorage.setItem(key,value);
}

Storage.getData = function(key){
	var value = cc.sys.localStorage.getItem(key) || null;
    return value;
}