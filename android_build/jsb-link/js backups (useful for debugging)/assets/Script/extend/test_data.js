for (var g_roomData = [ "你大爷", 100, 2, "123556", "你大爷", 0, 1 ], g_playerData = new Array(), i = 0; i < 4; i++) {
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
nickname: "杜1111",
fangka: 10,
gender: 1,
player_id: "1111",
headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ0J3Obq3uG2qg6QKp19xJXG8fpmDnC383WzI0fXLtfsGA6JibtpreNd98vzG1vr0oibibhiab6b1wzCw/132"
};

g_buy_fangka_data = {
danjia: 2
};

g_endpai_data = {
winners: [],
losers: [ 2, 3, 4 ],
location1: "s1:1,p1:2,s2:1,p2:3,s3:1,p3:4,s4:1,p4:5",
location1: "s1:1,p1:2,s2:1,p2:3,s3:1,p3:4,s4:1,p4:5",
location2: {
s1: 1,
p1: 2,
s2: 1,
p2: 3,
s3: 1,
p3: 4,
s4: 1,
p4: 5
},
location3: {
s1: 1,
p1: 2,
s2: 1,
p2: 3,
s3: 1,
p3: 4,
s4: 1,
p4: 5
},
location4: {
s1: 1,
p1: 2,
s2: 1,
p2: 3,
s3: 1,
p3: 4,
s4: 1,
p4: 5
}
};

g_end_data = {
winners: [],
losers: [ 2, 3, 4 ]
};

var g_zhanji_light_data = {
jushu: 100,
fenshu: 200,
win: 100,
lose: 100,
equal: 100
}, g_zhanji_data = [];

for (i = 0; i < 50; i++) {
var item = {
order_id: "sdsdsdsdsdssdsd" + i,
fangka_num: 2,
renshu: 3,
creat_time: "2018/04/16/12:00",
game_status: "200"
};
g_zhanji_data.push(item);
}

var g_record_light_data = {
all_num: 100,
use_num: 200,
left_num: 100,
invalid_num: 100
}, g_record_data = [];

for (i = 0; i < 50; i++) {
(item = {
order_id: "sdsdsdsdsdssdsd" + i,
fangka_num: 2,
money: 3,
creat_time: "2018/04/16/12:00"
}).status = i % 2 == 0 ? 0 : 1;
g_record_data.push(item);
}

var g_gonghui_data = {
gonghui_id: "12232345",
is_huizhang: 0,
gonghui_name: "一起玩吧",
gonghui_zhang: "王大锤",
fangka_num: 1e4,
renshu: 1e3,
danjia: 1.9,
xuanyan: "你大爷的坑死老自乐",
gonggao: "你大爷的坑死老自乐",
xuka_status: 0
};