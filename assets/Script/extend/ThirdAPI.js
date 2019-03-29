let ThirdAPI = {
    StorageGName: 'GlobalKey', //全局数据存储

	//加载本地分数等数据并填充到全局变量
    loadLocalData: function () {
        //存储在云端的数据结构
        try {
            let storage = cc.sys.localStorage.getItem(ThirdAPI.StorageGName);
            console.log('storage data : ' + storage);
			if(storage != null && storage != ""){
				let localData = JSON.parse(storage);
                //兼容新添加的数据
				for(var key in localData){
					GlobalData[key] = localData[key];
				}
				console.log('loadLocalData',GlobalData);
            }
        } catch (error) {
			console.log(error);
		}
    },
   
	//更新游戏云端数据
    updateLocalData: function () {
        //云端数据再存储一份在本地
        try {
			var dataDic = {
				"AudioParams":GlobalData.AudioParams,
				'WXLoginParams':GlobalData.WXLoginParams
			};
			console.log('updataGameInfo',dataDic);
            let data = JSON.stringify(dataDic);
            cc.sys.localStorage.setItem(ThirdAPI.StorageGName, data);
        } catch (error) {
            console.error(error);
        }
    }
};
module.exports = ThirdAPI;