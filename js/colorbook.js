var colorbook = (function(){

	var context;
	var context1;
	var trackPathX = [];
	var trackPathY = [];
	var startX;
	var startY;
	var startPaint = false;
	var rect;

	createUserEvents = function(){
		var press = function(e){
			startX = e.pageX - rect.left;
			startY = e.pageY - rect.top;
			startPaint = true;
		}

		var trackPath = function(e){
			if(startPaint){
				trackPathX.push(e.pageX - rect.left);
				trackPathY.push(e.pageY - rect.top);
				redraw(e);
			}
		}

		var redraw = function(e){
  			context.beginPath();
  			context.moveTo(startX,startY);	
  			for (var i = 0; i < trackPathX.length; i++) {
  				context.lineTo(trackPathX[i],trackPathY[i]);
  				context.stroke();
  			};
		}

		var stopPaint = function(e){
			startPaint = false;
			trackPathX = [];
			trackPathY = [];

		}
		context.canvas.addEventListener("mousedown",press,false);
		context.canvas.addEventListener("mousemove",trackPath,false);
		context.canvas.addEventListener("mouseup",stopPaint,false)
	}

	registerColorBindings = function(){
		var availableColors = document.querySelectorAll(".colorchoose > .btn-group > button.btn");
		if(availableColors !== undefined && availableColors.length > 0){
			for (var i = 0 ; i < availableColors.length; i++) {
				availableColors[i].addEventListener('click',function(){
					context.strokeStyle = this.value;
				});
			};
		}
	}

	registerToolProps = function(){
		var availableTools = document.querySelectorAll(".toolprop > .btn-group > button.btn");
		if(availableTools !== undefined && availableTools.length > 0){
			for (var i = 0; i < availableTools.length; i++) {
				availableTools[i].addEventListener('click',function(){
					context.lineWidth = this.value;
				});
			};
		}
	}

	registerTools = function(){
		var tools = document.querySelectorAll(".toolchoose > .btn-group > button.btn");
		if(tools !== undefined && tools.length > 0){
			for (var i = 0; i < tools.length; i++) {
				tools[i].addEventListener('click',function(){
					if(this.value === "eraser"){
						context.strokeStyle = "white";	
					}else if(this.value === "marker"){
						context.globalAlpha = 1;
					}else if(this.value === "crayon"){
						context.globalAlpha = 0.3;
					}
					
				});
			};
		}
	}

	configureContext = function(){
		context.strokeStyle = "#df4b26";
  		context.lineJoin = "round";
  		context.lineWidth = 1;
	}
	init = function(){
		var  canvasArea = document.getElementById('colorbookcanvas');
		var paintArea = document.getElementById('paintArea');
		canvasArea.height = paintArea.clientHeight;
		canvasArea.width = paintArea.clientWidth;
		rect = canvasArea.getBoundingClientRect();
		context = canvasArea.getContext('2d');
		createUserEvents();
		configureContext();
		registerColorBindings();
		registerTools();
		registerToolProps();
	}
	return init();
})();