define(['widget','jquery','jqueryUI'], function(widget, $, $UI){
	function Window(){
		this.config = {
			//宽
			width : 400,
			//高
			height : 200,
			//弹窗内容
			content : "",
			hasTitle : false,
			//标题
			title : "系统消息",
			//是否有按钮
			hasAlertBtn : false,
			//弹窗中的按钮文字内容
			alertBtnText : "确定",

			confirmBtnText : "确定",
			cancelBtnText : "取消",
			//是否使用模态
			hasMask : true,
			//定制皮肤名称
			skinClassName : null,
			//是否需要右上角关闭按钮
			hasCloseBtn : false,
			//是否支持拖拽
			isDraggable : true,

			isResizable : true,
			//拖拽绑定事件
			dragHandler : null,
			//点击弹窗中的按钮后执行的函数
			handler4AlertBtn : null,
			//点击右上角关闭按钮后执行的函数
			handler4CloseBtn : null,
			handler4ConfirmBtn : null,
			handler4CancelBtn : null
		};
		this.handlers = {

		}
	}

	Window.prototype = $.extend({}, new widget.Widget(), {
		addDom : function(){
			var footer = "";
			switch(this.config.type){
				case "alert": 
					footer = "<input type='button' value='" + this.config.alertBtnText + "' class='window_alertBtn'/>";
					break;
				case "confirm":
					footer = "<input type='button' value='" + this.config.confirmBtnText + "' class='window_confirmBtn'/>" + 
							 "<input type='button' value='" + this.config.cancelBtnText + "' class='window_cancelBtn'/>";
					break;
				default :
					footer = "";
					break;
			}

			this.boundingBox = $("<div class='window_alert'>" + 
					"<div class='window_body'>" + this.config.content + "</div>" +
				"</div>");

			if(this.config.type != "common"){
				this.boundingBox.prepend('<div class="window_header">' + this.config.title + '</div>');
				this.boundingBox.append("<div class='window_footer'> " + footer + " </div>");
			}

			this.boundingBox.appendTo('body');

			if(this.config.hasMask){
				this._mask = $("<div class='window_mask'></div>");
				this._mask.appendTo('body');
			}

			if (this.config.hasAlertBtn) {
				var btn = $("<input type='button' class='window_alertBtn' value='" + this.config.alertBtnText + "'/>");
				btn.appendTo('.window_footer');
			};

			//弹窗右上角按钮
			if(this.config.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>X<span>");
				closeBtn.appendTo(this.boundingBox);
			}

		},

		bindActions:function(){
			//为控件绑定事件
			var _this = this;
			this.boundingBox.delegate(".window_alertBtn", "click", function(){
				_this.fire("alert");
				_this.destroy();
			}).delegate(".window_closeBtn", "click", function(){
				_this.fire("close");
				_this.destroy();
			}).delegate(".window_confirmBtn", "click", function(){
				_this.fire("confirm");
				_this.destroy();
			}).delegate(".window_cancelBtn", "click", function(){
				_this.fire("cancel");
				_this.destroy();
			});
			if(this.config.handler4AlertBtn){
				this.on('alert', this.config.handler4AlertBtn);
			}
			if(this.config.handler4CloseBtn){
				this.on('close', this.config.handler4CloseBtn);
			}
			if(this.config.handler4ConfirmBtn){
				this.on('confirm', this.config.handler4ConfirmBtn);
			}
			if(this.config.handler4CancelBtn){
				this.on('cancel', this.config.handler4CancelBtn);
			}
		},

		init : function(){
			this.boundingBox.css({	
				width : this.config.width + "px",
				height : this.config.height + "px",
				left : (this.config.x || (window.innerWidth - this.config.width) / 2) + "px",
				top : (this.config.y || (window.innerHeight - this.config.height) / 2) + "px"
			});

			//设定弹窗皮肤
			if(this.config.skinClassName){
				this.boundingBox.addClass(this.config.skinClassName);
			}

			if (this.config.isDraggable && this.config.dragHandler) {
				this.boundingBox.draggable({
					handle : this.config.dragHandler,
					cursor: "move", 
					containment: "parent"
				});
			}

			if(this.config.isResizable){
				//需要引入jqueryui的css，否则无法工作
				this.boundingBox.addClass('.ui-resizable-helper');
				$('.ui-resizable-helper').css({
					"border" : "1px dotted gray"
				});
				this.boundingBox.resizable({
			    	animate: true
			    });
			}
		},

		beforeDestroy : function(){
			this._mask && this._mask.remove();
		},

		alert : function(cfg){
			$.extend(this.config, cfg, {type:"alert"});
			this.create();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.config, cfg, {type:"confirm"});
			this.create();
			return this;
		},
		common : function(cfg){
			$.extend(this.config, cfg, {type:"common"});
			this.create();
			return this;			
		},
		prompt:function(){}
	});

	return {
		Window : Window
	}
});