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
		}).on("alert", function(){
			alert("您确认了一个对话框");
		}).on("close", function(){
			alert("您关闭了一个对话框");
		});
	});
	$('#b').click(function(){
		var window = new w.Window();
		window.confirm({
			width : 450,
			height : 80,
			hasTitle : true,
			hasCloseBtn : false,
			hasAlertBtn : false,
			dragHandler : '.window_header',
		}).on("confirm", function(){
			alert("您点击了确认键");
		}).on("cancel", function(){
			alert("您点击了取消键");
		});
	});

	$('#c').click(function(){
		var window = new w.Window();
		window.common({
			width : 450,
			height : 80,
			content : "我是一个common对话框",
			hasCloseBtn: true
		});
	});


});
