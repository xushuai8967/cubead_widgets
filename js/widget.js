define(['jquery'], function($){
	function Widget(){
		this.boundingBox = null;
	}
	Widget.prototype = {
		//绑定事件
		on : function(type, handler){
			if(typeof this.handlers[type] == "undefined"){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		//事件触发
		fire : function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0; i < handlers.length; i++){
					handlers[i](data);
				}
			}
		},

		addDom : function(){},
		bindActions : function(){},
		init : function(){},
		create : function(container){
			this.addDom();
			this.handlers = {};
			this.bindActions();
			this.init();
			$(container || document.body).append(this.boundingBox);
		},
		beforeDestroy : function(){},
		destroy : function(){
			this.beforeDestroy();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	};

	return {
		Widget : Widget
	}
});