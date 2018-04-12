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
	'nickName':'player0',
	'fangka':10,
	'diamond':10,
	'gender':1,
	'playerId':1
};
var g_paixing = {
	"paixing":{
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
var g_peipai_data1 = {
	"location":1,
	"first":true,
	"select":[1,2]
};
var g_peipai_data2 = {
	"location":2,
	"first":true,
	"select":[1,2]
};
var g_peipai_data3 = {
	"location":3,
	"first":true,
	"select":[1,2]
};
var g_peipai_data4 = {
	"location":4,
	"first":true,
	"select":[1,2]
};