cc.Class({
    extends: cc.Component,

    properties: {
		my_gonghui_button:cc.Node,
		add_gonghui_button:cc.Node,
		join_gonghui_button:cc.Node,
		game_sprite:cc.Node,
		my_gonghui_node:cc.Node,
		my_gonghui_zhang_node:cc.Node,
		add_gonghui_node:cc.Node,
		join_gonghui_node:cc.Node,
		empty_node:cc.Node,
    },
	unable_one_button(tag){
		this.my_gonghui_button.getComponent("cc.Button").interactable = true;
		this.add_gonghui_button.getComponent("cc.Button").interactable = true;
		this.join_gonghui_button.getComponent("cc.Button").interactable = true;
		if(tag == "gonghui"){
			this.my_gonghui_button.getComponent("cc.Button").interactable = false;
		}else if(tag == "add_gonghui"){
			this.add_gonghui_button.getComponent("cc.Button").interactable = false;
		}else if(tag == "join_gonghui"){
			this.join_gonghui_button.getComponent("cc.Button").interactable = false;
		}
	},
	my_gonghui_button_cb(){
		cc.log("my_gonghui_button_cb" + JSON.stringify(GlobalData.MyUserInfo));
		var self = this;
		self.unable_one_button("gonghui");
		if(GlobalData.MyUserInfo["gonghui_id"] == null){
			var empty_node_com = self.empty_node.getComponent("gonghui_empty");
			empty_node_com.set_text("no_g");
			self.show_one_node("empty");
		}else{
			Servers.gonghuiProcess("getGonghuiGongHuiId",{"gonghui_id":GlobalData.MyUserInfo.gonghui_id},function(data){
				if(data.code == 200 && data.msg != null){
					var gonghui_data = data.msg;
					if(gonghui_data["player_id"] != GlobalData.MyUserInfo["id"]){
						var my_gonghui_com = self.my_gonghui_node.getComponent("gonghui_yuan");
						my_gonghui_com.init(gonghui_data);
						self.show_one_node("gonghui");
					}else{
						var my_gonghui_com = self.my_gonghui_zhang_node.getComponent("gonghui_zhang");
						my_gonghui_com.init(gonghui_data);
						self.show_one_node("gonghui_zhang");
					}
				}else{
					var empty_node_com = self.empty_node.getComponent("gonghui_empty");
					empty_node_com.set_text("no_g");
					self.show_one_node("empty");
				}
			});
		}
	},
	add_gonghui_button_cb(){
		cc.log("add_gonghui_button_cb");
		var self = this;
		this.unable_one_button("add_gonghui");
		if(GlobalData.MyUserInfo["gonghui_id"] != null){
			var empty_node_com = this.empty_node.getComponent("gonghui_empty");
			empty_node_com.set_text("has_g");
			this.show_one_node("empty");
		}else{
			Servers.gonghuiProcess("getGonghuiAns",{"player_id":GlobalData.MyUserInfo["id"]},function(data){
				if(data.code == 200){
					var gonghui_ans = data.msg;
					if(gonghui_ans.status == 0){
						var empty_node_com = self.empty_node.getComponent("gonghui_empty");
						empty_node_com.set_text("adding_g");
						self.show_one_node("empty");
					}
				}else{
					var add_gonghui_com = self.add_gonghui_node.getComponent("gonghui_shenqing");
					add_gonghui_com.init(self);
					self.show_one_node("add_gonghui");
				}
			});
		}
	},
	join_gonghui_button_cb(){
		cc.log("join_gonghui_button_cb");
		this.unable_one_button("join_gonghui");
		var self = this;
		if(GlobalData.MyUserInfo["gonghui_id"] != null){
			var empty_node_com = this.empty_node.getComponent("gonghui_empty");
			empty_node_com.set_text("join_g");
			this.show_one_node("empty");
		}else{
			Servers.gonghuiProcess("getGonghuiAns",{"player_id":GlobalData.MyUserInfo["id"]},function(data){
				if(data.code == 200){
					var gonghui_ans = data.msg;
					if(gonghui_ans.status == 0){
						var empty_node_com = self.empty_node.getComponent("gonghui_empty");
						empty_node_com.set_text("adding_g");
						self.show_one_node("empty");
					}
				}else{
					var join_gonghui_com = self.join_gonghui_node.getComponent("gonghui_jiaru");
					join_gonghui_com.init(self);
					self.show_one_node("join_gonghui");
				}
			});
		}
	},
    onLoad () {
		var self = this;
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.GONGHUI;
		 Servers.gonghuiProcess("getGonghuiPlayerId",{"player_id":GlobalData.MyUserInfo["id"]},function(data){
			if(data.code == 200 && data.msg != null){
				GlobalData.MyUserInfo["gonghui_id"] = data.msg["gonghui_id"];
			}
			self.my_gonghui_button_cb();
		 });
	},
	close_scene(){
		cc.director.loadScene("MainScene");
	},
	show_one_node(tag){
		this.my_gonghui_node.active = false;
		this.my_gonghui_zhang_node.active = false;
		this.add_gonghui_node.active = false;
		this.join_gonghui_node.active = false;
		this.empty_node.active = false;
		if(tag == "empty"){
			this.empty_node.active = true;
		}else if(tag == "gonghui"){
			this.my_gonghui_node.active = true;
		}else if(tag == "gonghui_zhang"){
			this.my_gonghui_zhang_node.active = true;
		}else if(tag == "add_gonghui"){
			this.add_gonghui_node.active = true;
		}else if(tag == "join_gonghui"){
			this.join_gonghui_node.active = true;
		}
	},
});
