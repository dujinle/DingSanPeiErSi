/**
 * Created by guowanfu on 2016/5/3.
 */

/* gameScene.js*/

//扑克牌背面
g_is_login = false;
g_next_scene = null;
g_next_data = null;
g_login_auto = false;
g_gonggao_tag = false;
g_DEBUG = true;
g_root_node = null;
//房间中玩家存储数据
g_room_data = null;
g_players_data = new Array();
g_zhuang_serverPosition = 0;
g_players = new Array();
g_myselfPlayerPos = -1;
g_playerData = new Array();
g_roomMasterName = "";
g_game_type = "ZJH";
g_fapaiNum = 3;
g_totalCount = 0;
g_user = {};
g_assets = {};

//游戏设置全局变量
g_version = "0.0.1";
g_current_scene = null;
SCENE_TAG = {
	"LOAD":0,
	"MAIN":1,
	"GONGHUI":2,
	"GAMEINFO":3,
	"WAITROOM":4,
	"ROOM":5
};
g_music_key = 0;
g_sound_key = 0;
g_chat_key = 0;
g_paixing = [[0,0],[2,1],[2,1],[3,1],[4,1],[4,1],[4,2],[4,2],[5,1],[5,2],
	[6,1],[6,2],[6,2],[6,3],[6,3],[7,1],[7,2],[7,2],[7,3],[8,1],[8,2],
	[8,3],[8,3],[9,1],[9,2],[10,1],[10,1],[10,2],[10,2],[11,1],[11,1],[12,1],[12,1]];
MUSIC_KEY="music_key";
SOUND_KEY="sound_key";
CHAT_KEY="chat_key";
BOOL={
    NO:"0",
    YES:"1"
};
