function ElemId(id){
	return document.getElementById(id);
}
function CropPX(str){
	return str.substring(0, str.length - 2);
}

var ctx = ElemId("canvas").getContext("2d");
var sWidth, sHeight;
var cWidth, cHeight;

function resize(){
	sHeight = window.screen.height;
	sWidth = window.screen.width;
	cWidth = sWidth * 50.0 / 100.0;
	cHeight = sWidth * 50.0 / 100.0;
	ctx.canvas.width = cWidth;
	ctx.canvas.height = cHeight;
	
	ElemId("container").style.left = sWidth * 0.5 / 100.0 + "px";
	ElemId("container").style.top = sWidth * 0.5 / 100.0 + "px";
	ElemId("graphInput").style.left = sWidth * 51.0 / 100.0 + "px";
	ElemId("instr").style.left = sWidth * 51.0 / 100.0 + "px";
	ElemId("instr").style.top = ElemId("graphInput").offsetHeight + sWidth * 2.0 / 100.0 + "px";
}
$(window).on("load resize", resize);

$(document).ready(function(){
	$('#nNodes').keypress(function(e) {
		var k = e.which;
		if (!('0'.charCodeAt(0) <= k && k <= '9'.charCodeAt(0)))
			e.preventDefault();
	});
	$('#edges').keypress(function(e) {
		var k = e.which;
		if (!('0'.charCodeAt(0) <= k && k <= '9'.charCodeAt(0) || k == ' '.charCodeAt(0) || k == 13 || k == 10))
			e.preventDefault();
	});
});

