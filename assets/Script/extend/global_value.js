/**
 * Created by guowanfu on 2016/5/3.
 */

/* gameScene.js*/

//扑克牌背面
var g_dealCardBack = null;
var g_DEBUG = true;

//房间中玩家存储数据
var g_room_data = null;
var g_zhuang_serverPosition = 0;
var g_players_noPower = new Array();
var g_players = new Array();
var g_myselfPlayerPos = -1;
var g_playerData = new Array();
var g_roomData = new Array();
var g_roomMasterName = "";
var g_game_type = "ZJH";
var g_fapaiNum = 3;
var g_totalCount = 0;
var g_user = null;
var g_assets = {};
//房间状态信息是否进行中
//var g_roomState = 0;
/*popUpSettingLayer.js*/
//筹码加注级别
var g_betArray=[100,300,500,800,1000];
//游戏设置全局变量
var g_music_key;
var g_sound_key;
var g_chat_key;
var g_Puke = ["0","0","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
MUSIC_KEY="music_key";
SOUND_KEY="sound_key";
CHAT_KEY="chat_key";
BOOL={
    NO:"0",
    YES:"1"
};
