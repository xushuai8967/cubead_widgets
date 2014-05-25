define(['widget','jquery','jqueryUI'], function(widget, $, $UI){
	function Window(){
		this.config = {
			//宽
			width : 400,
			//高
			height : 200,
			//弹窗内容
			content : "",
			//标题
			title : "系统消息",
			//是否有按钮
			hasAlertBtn : true,
			//弹窗中的按钮文字内容
			alertBtnText : "确定",
			//是否使用模态
			hasMask : true,
			//定制皮肤名称
			skinClassName : null,
			//是否需要右上角关闭按钮
			hasCloseBtn : false,
			//是否支持拖拽
			isDraggable : true,
			//拖拽绑定事件
			dragHandler : null,
			//点击弹窗中的按钮后执行的函数
			handler4AlertBtn : null,
			//点击右上角关闭按钮后执行的函数
			handler4CloseBtn : null
		};
		this.handlers = {

		}
	}

	Window.prototype = $.extend({}, new widget.Widget(), {
		alert:function(config){
			var cfg = $.extend(this.config, config);
			var box = $(
				"<div class='window_alert'>" + 
					"<div class='window_header'>" + cfg.title + "</div>" +
					"<div class='window_body'>" + cfg.content + "</div>" +
					"<div class='window_footer'> </div>" +
				"</div>"
				);

			var _this = this;
			//注意mask要先于box添加到body上，否则会遮盖住弹窗
			var mask = null;
			if(cfg.hasMask){
				mask = $("<div class='window_mask'></div>");
				mask.appendTo('body');
			}
			//将弹窗添加到body
			box.appendTo('body');

			//为弹窗设定位置和大小
			box.css({	
				width : cfg.width + "px",
				height : cfg.height + "px",
				left : (cfg.x || (window.innerWidth - cfg.width) / 2) + "px",
				top : (cfg.y || (window.innerHeight - cfg.height) / 2) + "px"
			});

			if (cfg.hasAlertBtn) {
				var btn = $("<input type='button' class='window_alertBtn' value='" + cfg.alertBtnText + "'/>");
				btn.appendTo('.window_footer');
				btn.click(function(){
					box.remove();
					mask && mask.remove();
					//调用绑定的alert方法
					_this.fire('alert');
				});
			};

			//弹窗右上角按钮
			if(cfg.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>X<span>");
				closeBtn.appendTo(box);
				closeBtn.click(function(){
					//调用绑定的close方法
					_this.fire('close');
					box.remove();
					mask && mask.remove();
				});
			}
			//设定弹窗皮肤
			if(cfg.skinClassName){
				box.addClass(cfg.skinClassName);
			}
			//设定拖拽事件
			if (cfg.isDraggable) {
				if(cfg.dragHandler){
					box.draggable({
						handle : cfg.dragHandler
					});
				} else {
				}
			};

			//为控件绑定事件
			if(cfg.handler4AlertBtn){
				this.on('alert', cfg.handler4AlertBtn);
			}

			if(cfg.handler4CloseBtn){
				this.on('close', cfg.handler4CloseBtn);
			}

			return this;
		},
		confirm:function(){},
		prompt:function(){}
	});

	return {
		Window : Window
	}
});