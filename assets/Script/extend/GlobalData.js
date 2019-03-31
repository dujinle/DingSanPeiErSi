var GlobalData = {
	//音乐信息
	AudioIdx:{
		ClickButton:0,
		MainAudioBg:1,
		GameAudioBg:2
	},
	AudioParams:{
		//背景音乐
		MUSIC_KEY:1,
		//按键音乐
		SOUND_KEY:1,
		//玩家互动音乐
		CHAT_KEY:1
	},
	CardPosInfo:{
		FaPaiPos:{
			1:[
				[-50,0],[2,0],[54,0],[106,0]
			],
			2:[
				[-79,15],[-27,15],[25,15],[77,15]
			],
			3:[
				[-50,0],[2,0],[54,0],[106,0]
			],
			4:[
				[-79,15],[-27,15],[25,15],[77,15]
			],
			ZH:[
				[-79,0],[-27,0],[25,0],[77,0]
			]
		},
		PeiPaiPos:{
			1:{
				Head:[[80,25],[80,-25]],
				Tail:[[-50,0],[2,0]]
			},
			2:{
				Head:[[-55,41],[-55,-12]],
				Tail:[[25,15],[77,15]]
			},
			3:{
				Head:[[80,25],[80,-25]],
				Tail:[[-50,0],[2,0]]
			},
			4:{
				Head:[[55,41],[55,-12]],
				Tail:[[-80,15],[-26,15]]
			},
			ZH1:{
				Head:[[54,26],[54,-26]],
				Tail:[[-80,0],[-27,0]]
			},
			ZH2:{
				Head:[[-54,26],[-54,-26]],
				Tail:[[80,0],[27,0]]
			},
			ZH3:{
				Head:[[54,26],[54,-26]],
				Tail:[[-80,0],[-27,0]]
			},
			ZH4:{
				Head:[[54,26],[54,-26]],
				Tail:[[-80,0],[-27,0]]
			}
		}
	},
	//登录信息
	WXLoginParams:{
		access_token:null,
		openid:null,
		unionid:null,
		refresh_token:null
	},
	//场景标志
	SCENE_TAG:{
		"LOAD":0,
		"MAIN":1,
		"GONGHUI":2,
		"GAMEINFO":3,
		"WAITROOM":4,
		"ROOM":5
	},
	RunTimeParams:{
		VersionNum:'0.0.1',
		RootNode:null,//根节点索引
		CurrentScene:null,//当前场景
		XieYiSelect:true,//加载页面的协议按钮默认勾选
		IsLogin:false,
		GongGaoTag:false,
		RoomData:null,
		AllPlayers:new Array(),//接收游戏开始的玩家信息
	},
	MyUserInfo:null,
	//房间中玩家存储数据
	RoomInfos:{
		ZhuangServerLocaltion:0,
		TotalPlayers:new Array(),//游戏进行中玩家的信息
		MySelfPlayerLocation:-1,
	},
	//存储加载的场景和图片资源
	assets:{},

	//游戏设置全局变量
	GameModel:{
		1:'抢庄',
		2:'随机庄',
		3:'转庄'
	},
	GameMaxType:{
		1:'鬼大',
		2:'玄大',
		3:'皇上大'
	},
	CardPaiXing:[[0,0],[2,1],[2,1],[3,1],[4,1],[4,1],[4,2],[4,2],[5,1],[5,2],
		[6,1],[6,2],[6,2],[6,3],[6,3],[7,1],[7,2],[7,2],[7,3],[8,1],[8,2],
		[8,3],[8,3],[9,1],[9,2],[10,1],[10,1],[10,2],[10,2],[11,1],[11,1],[12,1],[12,1]
	]
}