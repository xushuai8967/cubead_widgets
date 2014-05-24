define(['jquery'], function($){
	function Window(){}

	Window.prototype = {
		alert:function(content){
			var parent = $("<div class='window_alertParent'></div>"),
				mask = $("<div class='window_alert'></div>");
			
			$('body').append(parent);
			parent.append(mask);
			mask.html(content);
		},
		confirm:function(){},
		prompt:function(){}
	}

	return {
		Window : Window
	}
});