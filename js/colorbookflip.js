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
	var PAGE_WIDTH = 0;
	var BOOK_HEIGHT = bookContainer.clientHeight;
	var canvasOrigin = {x:0,y:0};
	var canvasContainer;
	var foldWidth = 0;
	var foldStrength = 0;
	var pageNumber = 0;

	clickPosition = function(){
		var canvasContainer = canvasContext.canvas.getBoundingClientRect();
		var borderWidth = canvasContext.canvas.style.borderWidth;
		var xPosition = Math.min(BOOK_WIDTH,Math.round ( mousePosition.x - canvasContainer.left));
		var yPosition = Math.min(BOOK_HEIGHT,Math.round ( mousePosition.y - canvasContainer.top));
		return {x: xPosition,y:yPosition};
	}

	mouseDownHandler = function(e){
		e.preventDefault();
		mousePosition.x = e.pageX;
		mousePosition.y = e.pageY;
		var pageToBeTurned = 0
		for (var i = 0,len=pages.length; i < len; i++) {
			if (pages[i].location === 'right'){
				pageToBeTurned = i;
				break;
			}
		}
		pages[pageToBeTurned].dragging = true;
	}

	mouseMoveHandler = function(e){
		mousePosition.x = e.pageX;
		mousePosition.y = e.pageY;
	}

	mouseUpHandler = function(e){
		for (var i = 0,len=pages.length; i < len; i++) {
			if (pages[i].location === 'right'){
				pageToBeTurned = i;
				break;
			}
		}
		pages[pageToBeTurned].dragging = false;
	}

	registerMouseEvents = function(){
		document.addEventListener('mousedown',mouseDownHandler,false);
		document.addEventListener('mousemove',mouseMoveHandler,false);
		document.addEventListener('mouseup',mouseUpHandler,false);
	}

	getFoldStrength = function(pageOriginX,clickPositionX){
		var distance = Math.abs(clickPositionX - pageOriginX);
		foldStrength = (1/distance) * 1000;
		return Math.floor(foldStrength);
	}

	render = function(){
		canvasContext.clearRect(0,0,canvasContext.canvas.width, canvasContext.canvas.height);
		for (var i = 0, len = pages.length; i < len; i++) {
			if(pages[i].dragging === true){
				
				canvasContext.beginPath();
				var pageToTurn = pages[i];
				var pageHeight = parseInt(pageToTurn.page.style.height);
				var pageWidth = parseInt(pageToTurn.page.style.width);
				var pageOffsetTop = parseInt(pageToTurn.page.offsetTop) - 2;
				var canvasOffsetLeft = Math.abs(canvasContext.canvas.offsetLeft);
				var canvasOffsetTop = Math.abs(canvasContext.canvas.offsetTop);
				canvasContext.lineWidth = 2;
				var relativeClickPosition = clickPosition(mousePosition);
				var pageCordinates = {xStart: 0, yStart:0,xEnd:0,yEnd:0};
				pageCordinates.xStart = canvasOffsetLeft + BOOK_WIDTH / 2;
				pageCordinates.xEnd = canvasOffsetLeft + BOOK_WIDTH;
				pageCordinates.yStart = canvasOffsetTop + pageOffsetTop;
				pageCordinates.yEnd = canvasOffsetTop + pageOffsetTop + pageHeight;
				foldWidth = Math.round((BOOK_WIDTH - relativeClickPosition.x) / 2);
				foldStrength = getFoldStrength(pageCordinates.xStart,relativeClickPosition.x);
				pageToTurn.page.style.width = relativeClickPosition.x - pageCordinates.xStart + "px";
				canvasContext.moveTo(relativeClickPosition.x,pageCordinates.yStart - Math.min(foldStrength,30));
				canvasContext.lineTo(relativeClickPosition.x + foldWidth,pageCordinates.yStart);
				canvasContext.lineTo(relativeClickPosition.x + foldWidth,pageCordinates.yEnd);
				canvasContext.lineTo(relativeClickPosition.x , pageCordinates.yEnd + Math.min(foldStrength,30));
				canvasContext.lineTo(relativeClickPosition.x,pageCordinates.yStart - Math.min(foldStrength,30));
				var gradient = canvasContext.createLinearGradient(relativeClickPosition.x,pageCordinates.yStart, foldWidth,pageCordinates.yEnd)
				gradient.addColorStop(0.35, '#fafafa');
				gradient.addColorStop(0.73, '#eeeeee');
				gradient.addColorStop(0.9, '#fafafa');
				gradient.addColorStop(1.0, '#e2e2e2');
				canvasContext.fillStyle = gradient;
				canvasContext.fill();
			}
		}
	}

	setInterval(render,1000/100);

	init = function(){
		registerMouseEvents();
		canvasContainer = canvasContext.canvas.getBoundingClientRect();
		for (var i = 0,len = sections.length; i < len; i ++) {
			sections[i].style.zIndex = len - i;
			sections[i].style.height = BOOK_HEIGHT - 10 + 'px';
			sections[i].style.width = (BOOK_WIDTH / 2) - 15 + 'px';
			PAGE_WIDTH = parseInt(sections[i].style.width);
			pages.push({
				page: sections[i],
				dragging: false,
				location: 'right'
			});
		}
	}	
	init();
})();
