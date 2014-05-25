require.config({
	paths:{
		jquery : 'jquery-1.11.1.min',
		jqueryUI : 'jquery-ui'
	}
});

require(['jquery','window'],function($, w){
	$('#a').click(function(){
		var window = new w.Window()
		window.alert( {
			width : 500,
			height : 200,
			y: 100,
			content : "hello world!",
			alertBtnText : "没问题",
			hasCloseBtn : true,
			dragHandler : '.window_header',
			skinClassName : "window_skin_orange",
			handler4CloseBtn : function(){
				alert("closeBtn");
			},
			handler4AlertBtn : function(){
				alert("alertBtn");
			}
		});
	});
});
