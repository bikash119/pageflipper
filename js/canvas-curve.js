var curve = (function(){
	var ctx;
	var ctrPoint1 = {x:0 , y:0};
	var ctrPoint2 = {x:0 , y:0};
	var endPoint = {x:0 , y:0};
	var startPointX , startPointY;
	prepareCurve = function(){

		startPointX = 100;
		startPointY = 100;
		ctx.lineWidth = 6;
		ctx.strokeStyle = "#333";
		
		ctrPoint1.x = startPointX + 100;
		ctrPoint1.y = startPointY;
		ctrPoint2.x = startPointX + 100;
		ctrPoint2.y = startPointY + 100;
		endPoint.x = startPointX;
		endPoint.y = startPointY + 100;
	}
	
	render = function(){
		ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
		ctx.beginPath();
		ctx.moveTo(startPointX,startPointY);
		ctx.lineTo(ctrPoint1.x,ctrPoint1.y);
		ctx.stroke();
		ctx.lineTo(ctrPoint2.x,ctrPoint2.y);
		ctx.stroke();
		ctx.lineTo(startPointX,ctrPoint2.y);
		ctx.stroke();
		ctrPoint1.x -= 30;
		ctrPoint2.x -= 30;
	}

	init = function(){
		ctx = document.getElementById('curveCanvas').getContext('2d');
		ctx.canvas.width = 400;
		ctx.canvas.height = 400;
		canvasContainer = ctx.canvas.getBoundingClientRect();
		prepareCurve();
		setInterval(render,1000/0.5);
		}
	init();
})();