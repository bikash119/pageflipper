var anim = (function(){

	var canvasContext;
	var rectStart = {x:0, y:0};
	var rectWidth = 10;
	var rectHeight = 30;
	var startDrag = false

	translateCanvas = function(e){
		startDrag = true
	}

	drag = function(e){
		if(startDrag){
			rectStart.x = e.pageX;
			rectStart.y = e.pageY;
			rectWidth = rectWidth + 5;
			canvasContext.clearRect(0,0,canvasContainer.width,canvasContainer.height);
		}
	}

	stopDrag = function(e){
		startDrag = false;
		rectWidth = 0;
	}

	init = function(){
		var canvasContainer = document.getElementById("canvasContainer");
		canvasContext = canvasContainer.getContext('2d');
		canvasContext.lineWidth = 1;
		canvasContext.fillStyle= 'red';
		canvasContainer.addEventListener("mousedown",translateCanvas,false);
		canvasContainer.addEventListener("mousemove",drag,false);
		canvasContainer.addEventListener("mouseup",stopDrag,false);
		setInterval(render,100/60);
	}

	render = function(){
		console.log(rectStart);
		canvasContext.save();
		var foldWidth = Math.abs((canvasContainer.width - rectStart.x)/2);
		canvasContext.translate(rectStart.x,rectStart.y);
		canvasContext.beginPath();
		canvasContext.moveTo(0,0);
		canvasContext.lineTo(foldWidth,0);
		canvasContext.lineTo(foldWidth,rectHeight);
		canvasContext.lineTo(0,rectHeight);
		canvasContext.lineTo(0,0);
		canvasContext.fill();
		canvasContext.restore();
	}
	init();
})();