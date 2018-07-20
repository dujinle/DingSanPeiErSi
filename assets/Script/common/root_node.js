cc.Class({
    extends: cc.Component,

    properties: {
        data:null,
    },

    // use this for initialization
    onLoad: function () {
		cc.game.addPersistRootNode(this.node);
		pomelo.on('disconnect', function(){
			console.log('掉线了');
		});
		pomelo.on('heartbeat timeout',function(){
			console.log('心跳超时');
		});
    },
    //自定义的两个函数。将值保存在this变量里  
    setdata : function(json){  
        this.data = json;    
    },  
    getdata : function(){
        return this.data;    
    },
});
