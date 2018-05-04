var g_roomData = ["你大爷",100,2,"123556","你大爷",0,1];
var g_playerData = new Array();

for(var i = 0;i < 4;i++){
	var player = new Array();
	player.push(i + 1);
	player.push(i + 1);
	player.push(0);
	player.push("player" + i);
	player.push(0);
	player.push(1);
	g_playerData.push(player);
}

var g_user = {
	'nickname':'杜1111',
	'fangka':10,
	'gender':1,
	'player_id':1111
};

g_buy_fangka_data = {
	"danjia":2
};
//g_room_data = {"rid":6,"room_num":"673548","fangzhu_id":1,"fangzhu_name":"杜1111","first_fapai":0,"game_type":"PJ","max_type":1,"fangka_num":1,"fangka_type":1,"wait_time":1,"creat_time":1525324949259,"timeout_mark":null,"player_num":2,"real_num":2,"zhuang_location":null,"zhuang_score":100,"round":0,"qiang_num":0,"qiang_flag":"[]","location1":"1*6","location2":"2*6","location3":"null","location4":"null","is_gaming":1,"is_game_1":-1,"is_game_2":-1,"is_game_3":-1,"is_game_4":-1,"peipai_num":0,"pai1":null,"pai2":null,"pai3":null,"pai4":null,"score_1":null,"score_2":null,"score_3":null,"score_4":null};
//g_players_data = [{"id":1,"player_id":"1111","phone_num":null,"nick_name":"杜1111","fangka_num":4,"head_img_url":null,"gender":1,"createTime":1525323152967,"round_num":0,"all_score":0,"win_num":0,"lose_num":0,"fangka_history":0,"invalid_fangka":0,"gonghui_id":null,"lastLoginTime":1525324946423,"continueLoginDays":1,"location":1},{"id":2,"player_id":"ooOAK0xltsyGh6hq5YvA0rR6RJn0","phone_num":null,"nick_name":"杜府","fangka_num":4,"head_img_url":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ0J3Obq3uG2qg6QKp19xJXG8fpmDnC383WzI0fXLtfsGA6JibtpreNd98vzG1vr0oibibhiab6b1wzCw/132","gender":1,"createTime":1525323155772,"round_num":0,"all_score":0,"win_num":0,"lose_num":0,"fangka_history":0,"invalid_fangka":0,"gonghui_id":null,"lastLoginTime":1525324953083,"continueLoginDays":1,"location":2}];
g_endpai_data = {
	"winners":[],
	"losers":[2,3,4],
	"location1":"s1:1,p1:2,s2:1,p2:3,s3:1,p3:4,s4:1,p4:5",
	"location1":"s1:1,p1:2,s2:1,p2:3,s3:1,p3:4,s4:1,p4:5",
	"location2":{
		"s1":1,
		"p1":2,
		"s2":1,
		"p2":3,
		"s3":1,
		"p3":4,
		"s4":1,
		"p4":5
	},
	"location3":{
		"s1":1,
		"p1":2,
		"s2":1,
		"p2":3,
		"s3":1,
		"p3":4,
		"s4":1,
		"p4":5
	},
	"location4":{
		"s1":1,
		"p1":2,
		"s2":1,
		"p2":3,
		"s3":1,
		"p3":4,
		"s4":1,
		"p4":5
	}
};

g_end_data = {
	"winners":[],
	"losers":[2,3,4]
};
var g_zhanji_light_data = {
	"jushu":100,
	"fenshu":200,
	"win":100,
	"lose":100,
	"equal":100
};
var g_zhanji_data = [];
for(var i = 0;i < 50;i++){
	var item = {
		"order_id":"sdsdsdsdsdssdsd" + i,
		"fangka_num":2,
		"renshu":3,
		"creat_time":"2018/04/16/12:00",
		"game_status":"200"
	};
	g_zhanji_data.push(item);
}

var g_record_light_data = {
	"all_num":100,
	"use_num":200,
	"left_num":100,
	"invalid_num":100
};
var g_record_data = [];
for(var i = 0;i < 50;i++){
	var item = {
		"order_id":"sdsdsdsdsdssdsd" + i,
		"fangka_num":2,
		"money":3,
		"creat_time":"2018/04/16/12:00"
	};
	if(i %2 == 0){
		item["status"] = 0;
	}else{
		item["status"] = 1;
	}
	g_record_data.push(item);
}

var g_gonghui_data = {
	"gonghui_id":"12232345",
	"is_huizhang":0,
	"gonghui_name":"一起玩吧",
	"gonghui_zhang":"王大锤",
	"fangka_num":10000,
	"renshu":1000,
	"danjia":1.90,
	"xuanyan":"你大爷的坑死老自乐",
	"gonggao":"你大爷的坑死老自乐",
	"xuka_status":0
};