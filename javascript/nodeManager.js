const RADIUS = 20;
const NODE_BORDER_WIDTH = 4;
const EDGE_WIDTH = 2;
const REFRESH_RATE = 0.003;

class vector{
	constructor(_x, _y){
		this.x = _x;
		this.y = _y;
	}
}
class node{
	constructor(_r){
		this.neighbors = [];
		this.r = _r;
		this.v = new vector(0.0, 0.0);
		this.a = new vector(0.0, 0.0);
		this.free = 1;
	}
}
class edge{
	constructor(_u, _v){
		this.u = _u;
		this.v = _v;
	}
}
var nodes = [];
var edges = [];
var nodeCount, initialized = 0;
var interval;

function InitializeGraph(){
	nodeCount = 0;
	nodes.length = 0;
	edges.length = 0;
	
	if(ElemId("nNodes").value <= 0 || ElemId("nNodes").value > 100)
		throw "The number of nodes must be between 1 and 100 inclusive.";

	nodeCount = ElemId("nNodes").value;
	var edgesString = ElemId("edges").value;
	
	var next = 0, last = -1;
	while(next < edgesString.length){
		if('0' <= edgesString[next] && edgesString[next] <= '9'){
			var acc = edgesString[next++] - '0';
			while(next < edgesString.length && 
				  '0' <= edgesString[next] && edgesString[next] <= '9')
				acc = acc * 10 + (edgesString[next++] - '0');
			if(acc > nodeCount)
				throw "Invalid edges.";
			
			if(last == -1)
				last = acc;
			else{
				edges.push(new edge(last, acc));
				last = -1;
			}
		}
		next++;
	}
	if(last != -1)
		throw "Invalid edges.";
	
	for(var i = 0; i < nodeCount; i++)
		nodes[i] = new node(new vector(50 + 100 * (i % 10), 50 + 100 * Math.floor(i / 10)));

	for(var e in edges){
		var u = edges[e].u;
		var v = edges[e].v;
		nodes[u].neighbors[nodes[u].neighbors.length] = v;
		nodes[v].neighbors[nodes[v].neighbors.length] = u;
	}

	if(interval === undefined)
		interval = setInterval(UpdateNodes, 1000 * REFRESH_RATE);
}

function DrawNode(index){
	ctx.beginPath();
	ctx.lineWidth = NODE_BORDER_WIDTH;
	ctx.arc(nodes[index].r.x, nodes[index].r.y, RADIUS, 0, 2 * Math.PI);
	ctx.stroke();
	
	if(nodes[index].free == 0)
		ctx.fillStyle = "#cccccc";
	else
		ctx.fillStyle = "#ffffff";
	ctx.fill();
	
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "15px Arial";
	ctx.fillText(index, nodes[index].r.x, nodes[index].r.y);
}
	
function DrawEdge(u, v){
	ctx.beginPath();
	ctx.lineWidth = EDGE_WIDTH;
	ctx.moveTo(nodes[u].r.x, nodes[u].r.y);
	ctx.lineTo(nodes[v].r.x, nodes[v].r.y);
	ctx.stroke();
}