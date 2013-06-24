var flipbook = (function() {
	var canvasContext = document.getElementById("flip-canvas").getContext("2d");
	var bookContainer = document.getElementById("flippingcolorbook");
	var sections = document.getElementsByTagName("section");
	var CANVAS_PADDING = 120;
	canvasContext.canvas.width = bookContainer.clientWidth + CANVAS_PADDING;
	canvasContext.canvas.height = bookContainer.clientHeight + CANVAS_PADDING;
	var mousePosition = {x:0,y:0};
	var pages = [];
	var BOOK_WIDTH = bookContainer.clientWidth;
	var BOOK_HEIGHT = bookContainer.clientHeight;
	var canvasOrigin = {x:0,y:0};
	var canvasContainer;
	var foldWidth = 0;
	var pageNumber = 0;

	clickPosition = function(mousePosition){
		var canvasContainer = canvasContext.canvas.getBoundingClientRect();
		var borderWidth = canvasContext.canvas.style.borderWidth;
		var xPosition = Math.round ( mousePosition.x - canvasContainer.left);
		var yPosition = Math.round ( mousePosition.y - canvasContainer.top);
		return {x: xPosition,y:yPosition};
	}

	mouseDownHandler = function(e){
		e.preventDefault();
		console.log( " Page Turn action invoked");
		mousePosition.x = e.pageX;
		mousePosition.y = e.pageY;
		console.log( "Click Position " + e.pageX + " : " + e.pageY);
		console.log( "Relative Click position " + clickPosition(mousePosition).x + " : " + clickPosition(mousePosition).y);
		var pageToBeTurned = 0
		for (var i = 0,len=pages.length; i < len; i++) {
			if (pages[i].location === 'right'){
				pageToBeTurned = i;
				break;
			}
		}
		pages[pageToBeTurned].dragging = true;
		render();
	}

	mouseMoveHandler = function(e){
		console.log( " Page Turn dragging action invoked");
	}

	mouseUpHandler = function(e){
		console.log( " Page Turn action invoked");
	}

	registerMouseEvents = function(){
		document.addEventListener('mousedown',mouseDownHandler,false);
		document.addEventListener('mousemove',mouseMoveHandler,false);
		document.addEventListener('mouseup',mouseUpHandler,false);
	}

	render = function(){
		for (var i = 0, len = pages.length; i < len; i++) {
			if(pages[i].dragging === true){
				var pageToTurn = pages[i];
				var pageHeight = parseInt(pageToTurn.page.style.height);
				var pageWidth = parseInt(pageToTurn.page.style.width);
				var pageOffsetTop = parseInt(pageToTurn.page.offsetTop);
				var canvasOffsetLeft = Math.abs(canvasContext.canvas.offsetLeft);
				var canvasOffsetTop = Math.abs(canvasContext.canvas.offsetTop);
				canvasContext.fillStyle = 'white';
				canvasContext.lineWidth = 2;
				var relativeClickPosition = clickPosition(mousePosition);
				var pageCordinates = {xStart: 0, yStart:0,xEnd:0,yEnd:0};
				pageCordinates.xStart = canvasOffsetLeft + BOOK_WIDTH / 2;
				pageCordinates.xEnd = canvasOffsetLeft + BOOK_WIDTH / 2 + pageWidth;
				pageCordinates.yStart = canvasOffsetTop + pageOffsetTop;
				pageCordinates.yEnd = canvasOffsetTop + pageOffsetTop + pageHeight;
				foldWidth = Math.round((pageCordinates.xEnd - relativeClickPosition.x) / 2);
				pageToTurn.page.style.width = parseInt(pageToTurn.page.style.width) - foldWidth + "px";
				canvasContext.moveTo(relativeClickPosition.x,pageCordinates.yStart);
				canvasContext.lineTo(relativeClickPosition.x + foldWidth,pageCordinates.yStart);
				canvasContext.lineTo(relativeClickPosition.x + foldWidth,pageCordinates.yEnd);
				canvasContext.lineTo(relativeClickPosition.x , pageCordinates.yEnd);
				canvasContext.lineTo(relativeClickPosition.x,pageCordinates.yStart);
				canvasContext.fill();
			}
		}
	}

	//setInterval(render,1/60);

	init = function(){
		registerMouseEvents();
		canvasContainer = canvasContext.canvas.getBoundingClientRect();
		for (var i = 0,len = sections.length; i < len; i ++) {
			sections[i].style.zIndex = len - i;
			sections[i].style.height = BOOK_HEIGHT - 10 + 'px';
			sections[i].style.width = (BOOK_WIDTH / 2) - 15 + 'px';
			pages.push({
				page: sections[i],
				dragging: false,
				location: 'right'
			});
		}
	}	
	init();
})();
