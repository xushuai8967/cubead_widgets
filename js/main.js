require.config({
	paths:{
		jquery : 'jquery-1.11.1.min',
		jqueryUI : 'jquery-ui'
	}
});

require(['jquery','window'],function($, w){
	$('#a').click(function(){
		var window = new w.Window();
		window.alert({
			width : 500,
			height : 200,
			y: 100,
			content : "hello world!",
			alertBtnText : "没问题",
			hasCloseBtn : true,
			dragHandler : '.window_header',
			skinClassName : "window_skin_orange",
		}).on("alert",function(){
			alert('alert once');
		}).on("alert",function(){
			alert('alert twice');
		}).on("close",function(){
			alert('close once');
		});
	});


});
