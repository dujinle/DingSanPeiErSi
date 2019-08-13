
cc.Class({
    extends: cc.Component,

    properties: {
		itemHeight:0,
		myItem:cc.Node,
		scrollView: {
			default: null,
			type: cc.ScrollView
		},
		spawnCount: 0, // 实际创建的项数量
		totalCount: 0, // 在列表中显示的项数量
		spacing: 0, // 项之间的间隔大小
    },
    onLoad () {
		this.spacing = 10;
		//this.scrollView.node.on('bounce-top',this.freshData,this);
	},
	// 列表初始化
    initialize: function () {
		this.content = this.scrollView.content;
		this.items = []; // 存储实际创建的项数组
        this.updateTimer = 0;  
        this.updateInterval = 0.2;
        // 使用这个变量来判断滚动操作是向上还是向下
        this.lastContentPosY = 0; 
        this.itemHeight = 180;
        // 设定缓冲矩形的大小为实际创建项的高度累加，当某项超出缓冲矩形时，则更新该项的显示内容
        this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
		// 获取整个列表的高度
        this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
			var item = cc.instantiate(this.myItem);
            this.content.addChild(item);
            // 设置该item的坐标（注意父节点content的Anchor坐标是(0.5, 1)，所以item的y坐标总是负值）
    		item.setPosition(cc.v2(0, -item.height * (0.5 + i) - this.spacing * (i + 1)));
			item.getComponent("MyItem").initData(i,this.data);
            this.items.push(item);
    	}
    },

    // 返回item在ScrollView空间的坐标值
    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },
	 // 每帧调用一次。根据滚动位置动态更新item的坐标和显示(所以spawnCount可以比totalCount少很多)
    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
		if(this.items == null || this.items.length <= 0){
			return;
		}
        this.updateTimer = 0;
        let items = this.items;
        // 如果当前content的y坐标小于上次记录值，则代表往下滚动，否则往上。
        let isDown = this.scrollView.content.y < this.lastContentPosY;
        // 实际创建项占了多高（即它们的高度累加）
        let offset = (this.itemHeight + this.spacing) * items.length;
        let newY = 0;

        // 遍历数组，更新item的位置和显示
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // 提前计算出该item的新的y坐标
                newY = items[i].y + offset;
                // 如果往下滚动时item已经超出缓冲矩形，且newY未超出content上边界，
                // 则更新item的坐标（即上移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y < -this.bufferZone && newY < 0) {
                    items[i].y = newY;
					let item = items[i].getComponent('MyItem');
                    let itemId = item.itemID - items.length; // update item id
                    item.initData(itemId,this.data[itemId]);
					cc.log("prev id:" + itemId);
                }
            } else {
                // 提前计算出该item的新的y坐标
                newY = items[i].y - offset;
                // 如果往上滚动时item已经超出缓冲矩形，且newY未超出content下边界，
                // 则更新item的坐标（即下移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y > this.bufferZone && newY > -this.content.height) {
                    items[i].y = newY;
                    let item = items[i].getComponent('MyItem');
                    let itemId = item.itemID + items.length;
					item.initData(itemId,this.data[itemId]);
					cc.log("next id:" + itemId);
                }
            }
        }

        // 更新lastContentPosY和总项数显示
        this.lastContentPosY = this.scrollView.content.y;
    },
	//获取服务器上的残局数据
	setInitData(data,doubleFlag){
		this.clear_scroll_data();
		this.data = data;
		this.totalCount = Math.ceil(data.length/doubleFlag);
		this.spawnCount = this.totalCount >= 8 ? 8:this.totalCount;
		console.log(this.totalCount,this.spawnCount);
		this.initialize();
	},
	
	freshData(event){
		//console.log(event);
		var self = this;
		if(GlobalData.MyUserInfo.gonghui_id != null){
			var p = {
				process:'getGonghuiGongHuiId',
				gonghui_id:GlobalData.MyUserInfo.gonghui_id
			}
			Servers.request('gonghuiRouter',p,function(res){
				var gonghuiInfo = res.msg;
				console.log(res);
				if(gonghuiInfo != null){
					var param = {
						"process":'getRoomByPlayerId',
						"player_id":gonghuiInfo.player_id
					};
					Servers.request('roomInfoRouter', param, function(data) {
						var room_datas = data.msg;
						self.clear_scroll_data();
						self.setInitData(room_datas,2);
					});
				}
			});
		}
	},
	
	clear_scroll_data(){
		if(this.items == null){
			return ;
		}
		this.scrollView.scrollToOffset(cc.v2(0,0), 0.1);
		for (let i = 0; i < this.items.length; i++) { // spawn items, we only need to do this once
			let item = this.items[i];
			item.removeFromParent();
			item.destroy();
    	}
	},
});