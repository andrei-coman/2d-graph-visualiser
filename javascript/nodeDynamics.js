const RES_COEFFICIENT = 2.0;
const EDGE_LENGTH = 50;
const ELASTIC_CONSTANT = 4.0;
const ATTRACT_CONSTANT = 20.0;
const ELECTRIC_CONSTANT = 20000000.0;
const MASS = 1.0;
const MAX_FORCE = 100000.0;

function UpdateNodes(){
	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.fillStyle = "#eeeeee";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < nodeCount; i++){
		var F = new vector(0.0, 0.0);
		
		//electric forces (between nodes)
		for(var j = 0; j < nodeCount; j++)
			if(j != i){
				var r = new vector(nodes[i].r.x - nodes[j].r.x, nodes[i].r.y - nodes[j].r.y);
				var r_module = Math.sqrt(r.x * r.x + r.y * r.y);
				F.x += ELECTRIC_CONSTANT * r.x / (r_module * r_module * r_module);
				F.y += ELECTRIC_CONSTANT * r.y / (r_module * r_module * r_module);
			}
		
		//elastic forces (edges)
		for(j in nodes[i].neighbors){
			var k = nodes[i].neighbors[j];
			var r = new vector(nodes[i].r.x - nodes[k].r.x, nodes[i].r.y - nodes[k].r.y);
			var r_module = Math.sqrt(r.x * r.x + r.y * r.y);
			F.x += -ELASTIC_CONSTANT * (r_module - EDGE_LENGTH) * r.x / r_module;
			F.y += -ELASTIC_CONSTANT * (r_module - EDGE_LENGTH) * r.y / r_module;
		}
		
		//elastic force (between the nodes and the center of the canvas)
		var r = new vector(nodes[i].r.x - cWidth / 2.0, nodes[i].r.y - cHeight / 2.0);
		var r_module = Math.sqrt(r.x * r.x + r.y * r.y);
		F.x += -ATTRACT_CONSTANT * r.x;
		F.y += -ATTRACT_CONSTANT * r.y;
		
		//resistance force (to stop oscillating movement)
		F.x -= RES_COEFFICIENT * nodes[i].v.x;
		F.y -= RES_COEFFICIENT * nodes[i].v.y;
		
		//process movement
		if(Math.abs(F.x) < MAX_FORCE){
			nodes[i].a.x = F.x / MASS;
			nodes[i].v.x = (nodes[i].v.x + nodes[i].a.x * REFRESH_RATE) * nodes[i].free;
			nodes[i].r.x += nodes[i].v.x * REFRESH_RATE * nodes[i].free;
		}
		if(Math.abs(F.y) < MAX_FORCE){
			nodes[i].a.y = F.y / MASS;
			nodes[i].v.y = (nodes[i].v.y + nodes[i].a.y * REFRESH_RATE) * nodes[i].free;
			nodes[i].r.y += nodes[i].v.y * REFRESH_RATE * nodes[i].free;
		}
		
		//limit movement to the visible canvas
		if(nodes[i].r.x < RADIUS) nodes[i].r.x = RADIUS;
		if(nodes[i].r.x > cWidth - RADIUS) nodes[i].r.x = cWidth - RADIUS;
		if(nodes[i].r.y < RADIUS) nodes[i].r.y = RADIUS;
		if(nodes[i].r.y > cHeight - RADIUS) nodes[i].r.y = cHeight - RADIUS;
	}
	
	for(e in edges)
		DrawEdge(edges[e].u, edges[e].v);
	for(var i = 0; i < nodeCount; i++)
		DrawNode(i);
}