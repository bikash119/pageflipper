var flipbook = (function() {

	var BOOK_WIDTH = 830;
	var BOOK_HEIGHT = 260;
	var PAGE_WIDTH = 400;
	var PAGE_HEIGHT = BOOK_HEIGHT - 20;
	var canvasContainer;
	var sections = document.getElementsByTagName('section');
	var leafCanvasCtxt = document.getElementById('flip-canvas').getContext('2d');
	leafCanvasCtxt.canvas.width = BOOK_WIDTH;
	leafCanvasCtxt.canvas.height = BOOK_HEIGHT;
	var leaves = [];
	var mousePosition = {x:0 , y:0};
	var leftLeavesCount = 0;
	var rightLeavesCount = sections.length - 1;
	var nextClicked = false;
	var previousClicked = false;
	var resizeWidth = 0;

	navigateToNextPage = function(e){
		console.log( "Next Button Clicked");
		if(rightLeavesCount > -1){
			nextClicked = true;
			if(leftLeavesCount < 0){
				leaves[0].dragging = true;
			}else{
				leaves[leftLeavesCount].dragging = true;
			}
			leftLeavesCount += 1;
			rightLeavesCount -= 1;
		}
	}

	navigateToPreviousPage = function(e){
		console.log( "Previous Button clicked");
		if(leftLeavesCount > -1){
			previousClicked = true;
			if(leftLeavesCount == 0){
				leaves[0].dragging = true;
			}else{
				leaves[leftLeavesCount].dragging = true;
				leftLeavesCount -= 1;
				rightLeavesCount += 1;
			}
		}
	}

	render = function(){
		for (var i = 0,len=leaves.length; i < len; i++) {
			if(leaves[i].dragging === true && leaves[i].leaf.clientWidth > 0){
				resizeLeaf(leaves[i]);
				drawShadowRect(leaves[i]);
			}
		}
	}

	resizeLeaf = function(currentLeaf){
		resizeWidth = currentLeaf.leaf.clientWidth - 10;
		currentLeaf.leaf.style.width = resizeWidth + 'px';
		currentLeaf.leaf.clientWidth = resizeWidth;

	}

	drawShadowRect = function(currentLeaf){
		leafCanvasCtxt.save();
		var shadowStart = {x:0,y:0};
		var foldWidth = Math.abs((PAGE_WIDTH - rectStart.x)/2);
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

	mousePositionHandler = function(e){
		console.log( "Mouse clicked at" +e.pageX + ","+e.pageY);
	}

	startTurn = function(e){

	}

	keepTurning = function(e){

	}

	stopTurn = function(e){

	}

	registerButtonClickEvents = function(){
		var nextButton = document.getElementById('nextButton');
		var previousButton = document.getElementById('previousButton');
		nextButton.addEventListener('click',navigateToNextPage,false);
		previousButton.addEventListener('click',navigateToPreviousPage,false);
		leafCanvasCtxt.canvas.addEventListener('mousedown',startTurn,false);
		leafCanvasCtxt.canvas.addEventListener('mousemove',keepTurning,false);
		leafCanvasCtxt.canvas.addEventListener('mouseup',stopTurn,false);
		document.addEventListener('click',mousePositionHandler,false);
	}

	init = function(){
		//convert all the sections as leaf of book
		for (var i = 0, leafCount = sections.length; i < leafCount; i++) {
			sections[i].style.zIndex = leafCount -i;
			leaves.push({
				dragging: false,
				leaf:sections[i],
				target: 1,
				progress:1
			});
		};
		canvasContainer = leafCanvasCtxt.canvas.getBoundingClientRect();
		registerButtonClickEvents();
		setInterval(render,1000/60);
	}
	init();
})();
