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
			width : 450,
			height : 80,
			alertBtnText : "没问题",
			hasTitle : true,
			title : "呵呵",
			hasCloseBtn : false,
			hasAlertBtn : false,
			dragHandler : '.window_header',
		});
	});


});
