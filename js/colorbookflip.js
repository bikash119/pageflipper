var flipbook = (function() {
	var canvasContext = document.getElementById("flip-canvas").getContext("2d");
	var bookContainer = document.getElementById("flippingcolorbook");
	var sections = document.getElementsByTagName("section");
	var CANVAS_PADDING = 120;
	var mousePosition = {x:0,y:0};
	var pages = [];
	var BOOK_WIDTH = bookContainer.clientWidth;
	var BOOK_HEIGHT = bookContainer.clientHeight;
	canvasContext.canvas.width = BOOK_WIDTH + CANVAS_PADDING;
	canvasContext.canvas.height = BOOK_HEIGHT + CANVAS_PADDING;
	var canvasOrigin = {x:0,y:0};
	var canvasContainer;
	var foldStrength = 0;
	var pageNumber = 0;
	var pageCoordinates = {xStart:0,yStart:0,xEnd:0,yEnd:0};
	var bookCoordinates = {xStart:0,yStart:0,xEnd:0,yEnd:0};
	var orientation = 'rtl';

	getX = function(xPosition){
		return Math.round(xPosition - canvasContainer.left);

	}

	getY = function(yPosition){
		return Math.round(yPosition - canvasContainer.top);
	}

	getPageCoordinates = function(){
		pageCoordinates.xStart = Math.abs( (bookCoordinates.xStart + bookCoordinates.xEnd) / 2);
		pageCoordinates.yStart = Math.abs( bookCoordinates.yStart + 5);
		pageCoordinates.xEnd = Math.abs(( bookCoordinates.xEnd - 15));
		pageCoordinates.yEnd = Math.abs(bookCoordinates.yStart + BOOK_HEIGHT - 5);
	}

	getBookCoordinates = function(){
		bookCoordinates.xStart = bookContainer.offsetLeft;
		bookCoordinates.yStart = bookContainer.offsetTop;
		bookCoordinates.xEnd = bookContainer.offsetLeft + BOOK_WIDTH;
		bookCoordinates.yEnd = bookContainer.offsetTop + BOOK_HEIGHT;
	}
	getFoldStrength = function(mousePosition){
		var distance = Math.round(pageCoordinates.xEnd - mousePosition.x);
		var mouseClick = Math.min(mousePosition.x,pageCoordinates.xStart);
		if(mouseClick == mousePosition.x){
			distance = Math.abs(bookCoordinates.xStart - mousePosition.x);
		}
		foldStrength = distance * getTan(30);
		foldStrength = Math.floor(foldStrength/10);
		
	}

	isValidMouseDownPosition = function(e){
		var valid = {x:false,y:false};
		if(e.pageX < pageCoordinates.xEnd && e.pageX > bookCoordinates.xStart + 10){
			valid.x = true;
		}
		if(e.pageY < pageCoordinates.yEnd && e.pageY > pageCoordinates.yStart){
			valid.y = true;
		}
		return valid;	
	}

	mouseDownHandler = function(e){
		e.preventDefault();
		var valid = isValidMouseDownPosition(e);
		if(valid.x && valid.y){
			mousePosition.x = e.pageX;
			mousePosition.y = e.pageY;
			getFoldStrength(mousePosition);
			if(e.pageX < pageCoordinates.xStart && pageNumber > 0){
				pageNumber -= 1;
				pages[pageNumber].dragging = true;
			}else{
				pages[pageNumber].dragging = true;
			}
		}
	}

	performAnimation = function(){
		animate();
	}

	isValidMouseDrag = function(e){
		var valid = {x:false,y:false};
		if(e.pageX < pageCoordinates.xEnd && e.pageX > bookCoordinates.xStart + 10){
			valid.x = true;
		}
		if(e.pageY < pageCoordinates.yEnd && e.pageY > pageCoordinates.yStart){
			valid.y = true;
		}
		return valid;	
	}

	mouseMoveHandler = function(e){
		var valid = isValidMouseDrag(e);
		if(valid.x && valid.y){
			mousePosition.x = e.pageX;
			mousePosition.y = e.pageY;
			getFoldStrength(mousePosition);
		}
	}

	mouseUpHandler = function(e){
		var temp = Math.min(pageCoordinates.xStart,mousePosition.x);
		canvasContext.clearRect(0,0,canvasContext.canvas.width, canvasContext.canvas.height);
		var increasePageNumber = false;
		for (var i = 0, len = pages.length; i < len; i++) {
			pages[i].dragging = false;
			if (temp == mousePosition.x && parseInt(pages[i].page.style.width) <= 0 ){
				increasePageNumber = true;
			}
		};
		if(increasePageNumber){
			pageNumber += 1;
		}
	}

	registerMouseEvents = function(){
		document.addEventListener('mousedown',mouseDownHandler,false);
		document.addEventListener('mousemove',mouseMoveHandler,false);
		document.addEventListener('mouseup',mouseUpHandler,false);
	}


	getTan = function(deg){
		var rad = deg * Math.PI/180;
		return Math.tan(rad);
	}

	setInterval(performAnimation,1000/60);

	animate = function(){
		for (var i = 0,len = pages.length; i < len; i++) {
			if(pages[i].dragging == true){
				var width = mousePosition.x - pageCoordinates.xStart ;
				var temp = Math.min(0,width);
				if(temp == 0){
					width = width;
				}else{
					width = 0;
				}
				pages[i].page.style.width = width + 'px';
				canvasContext.clearRect(0,0,canvasContext.canvas.width, canvasContext.canvas.height);
				canvasContext.strokeStyle = 'black';
				canvasContext.fillStyle = 'white';
				canvasContext.beginPath();
				canvasContext.moveTo(getX(mousePosition.x),getY(pageCoordinates.yStart - foldStrength));
				canvasContext.quadraticCurveTo(getX( (mousePosition.x + pageCoordinates.xEnd)/2 ),getY(pageCoordinates.yStart - foldStrength - 10),getX( (mousePosition.x + pageCoordinates.xEnd)/2 ),getY(pageCoordinates.yStart));
				canvasContext.lineTo(getX( (mousePosition.x + pageCoordinates.xEnd)/2 ),getY(pageCoordinates.yEnd));
				canvasContext.quadraticCurveTo(getX( (mousePosition.x + pageCoordinates.xEnd)/2 ),getY(pageCoordinates.yEnd + foldStrength + 10),getX(mousePosition.x),getY(pageCoordinates.yEnd + foldStrength));
				canvasContext.lineTo(getX(mousePosition.x),getY(pageCoordinates.yStart - foldStrength));
				canvasContext.fill();
			}
		};
	}

	init = function(){
		registerMouseEvents();
		getBookCoordinates();
		getPageCoordinates();
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
