var colorbook = (function(){

	var context;
	var context1;
	var trackPathX = [];
	var trackPathY = [];
	var startX;
	var startY;
	var startPaint = false;
	var rect

	createUserEvents = function(){
		var press = function(e){
			startX = e.pageX - rect.left;
			startY = e.pageY - rect.top;
			startPaint = true;
		}

		var trackPath = function(e){
			if(startPaint){
				console.log( " Pushing co-ordinates " + e.pageX + " , "+ e.pageY);
				trackPathX.push(e.pageX - rect.left);
				trackPathY.push(e.pageY - rect.top);
			}
		}

		var redraw = function(e){
			context.strokeStyle = "#df4b26";
  			context.lineJoin = "round";
  			context.lineWidth = 5;
  			context.beginPath();
  			context.moveTo(startX,startY);	
  			for (var i = 0; i < trackPathX.length; i++) {
  				console.log( " Drawing line to " + trackPathX[i] + " , "+ trackPathY[i]);
  				context.lineTo(trackPathX[i],trackPathY[i]);
  				context.stroke();
  			};
		}

		var stopPaint = function(e){
			redraw(e);
			startPaint = false;
			trackPathX = [];
			trackPathY = [];

		}
		context.canvas.addEventListener("mousedown",press,false);
		context.canvas.addEventListener("mousemove",trackPath,false);
		context.canvas.addEventListener("mouseup",stopPaint,false)
	}

	registerColorBindings = function(){
		var colorButton = document.getElementById('')	
	}
	init = function(){
		var canvasContainer = document.getElementById('homecanvas');
		context = canvasContainer.getContext('2d');
		context.globalAlpha = 0.1;
		rect = canvasContainer.getBoundingClientRect();
		createUserEvents();
		registerColorBindings();
		registerToolBindings();
		registerToolPropBindings();
	}
	return init();
})();