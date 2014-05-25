define(function(){
	function Widget(){}
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
		}
	};

	return {
		Widget : Widget
	}
});