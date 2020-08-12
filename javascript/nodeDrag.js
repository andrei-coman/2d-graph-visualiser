const MAXTICKS = 30;

var x, y;
$(document).on('mousemove',function(){ 
	x = event.clientX;
	y = event.clientY;
});

var tmpNode, initialFreedom;
var gdx, gdy;
var dragNode, ticks;

$(document).on('mousedown',function(){
	tmpNode = -1;
	for(var i = 0; i < nodeCount; i++){
		dx = nodes[i].r.x - (-CropPX(ElemId("container").style.left)) - x;
		dy = nodes[i].r.y - (-CropPX(ElemId("container").style.top)) - y;
		var d = Math.sqrt(dx * dx + dy * dy);
		
		if(d <= RADIUS){
			tmpNode = i;
			gdx = dx;
			gdy = dy;
		}
	}
	if(tmpNode == -1) return;
	
	ticks = 0;
	dragNode = setInterval(DragNode, 1000 * REFRESH_RATE);
	initialFreedom = nodes[tmpNode].free;
	nodes[tmpNode].free = 0;
});
$(document).on('mouseup',function(){
	if(tmpNode == -1) return;
	
	clearInterval(dragNode);
	if(ticks <= MAXTICKS)
		nodes[tmpNode].free = 1 - initialFreedom;
	else
		nodes[tmpNode].free = initialFreedom;
});

function DragNode(){
	ticks++;
	nodes[tmpNode].r.x = gdx + x - CropPX(ElemId("container").style.left);
	nodes[tmpNode].r.y = gdy + y - CropPX(ElemId("container").style.top);
}