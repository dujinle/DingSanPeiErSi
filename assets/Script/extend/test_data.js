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