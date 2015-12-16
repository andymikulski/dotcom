/*
poisson-disk-sample
https://github.com/jeffrey-hearn/poisson-disk-sample
MIT License
*/

import Base = require('core/base');
import WindowController = require('core/windowController');

export = SplashScreen;
module SplashScreen {

	interface Point {
		x:number;
		y:number;
	}

	class Particle implements Point {
		public x:number;
		public y:number;

		public initialPosition:Point;
		public positionPoint:Point;
		public positionVector:Vector;
		public velocity:Vector;
		public acceleration:Vector;

		public drag:number = .85;

		constructor(startPosition:Point) {
			this.initialPosition = startPosition;
			this.positionVector = new Vector(startPosition.x, startPosition.y);
			this.positionPoint = this.positionVector.toPoint();
			this.velocity = new Vector(Math.random()/3 * (Math.random() > 0.5 ? 1 : -1), 0);
			this.acceleration = new Vector(0,0);
		}

		//impulse
		impulse(direction:Vector):void {
			this.acceleration = this.acceleration.add(direction);
		}

		startPoint():Point {
			return this.initialPosition;
		}

		point():Point {
			this.positionPoint = this.positionVector.toPoint();
			return this.positionPoint;
		}

		color():string {
			// light
			return 'rgba(238, 240, 245, ' + (this.velocity.x+0.2) + ')';
			// dark
			// return 'rgba(44, 62, 80,' + (this.velocity.x+0.2) + ')';
		}

		checkBounds(width:number, height:number):void {
			var check:Point = this.point();
			if(check.x > width){
				check.x = check.x - width;
			}else if(check.x < 0){
				check.x = width + check.x;
			}

			if(check.y > height){
				check.y = check.y - height;
			}else if(check.y < 0){
				check.y = height + check.y;
			}
			this.positionVector = new Vector(check.x, check.y);
			this.positionPoint = this.positionVector.toPoint();
		}

		update(boundWidth:number, boundHeight:number):Point {
			this.acceleration = this.acceleration.multiply(this.drag);
			this.velocity = this.velocity.add(this.acceleration);//.multiply(this.drag);
			this.checkBounds(boundWidth, boundHeight);
			this.positionVector = this.positionVector.add(this.velocity);
			return this.point();
		}
	}

	export class Display {
		private width:number;
		private height:number;

		private $canvas:JQuery;
		private canvasContext:any;

		private sampler:Sampler;

		private poissonInProgress:boolean = true;
		public shouldDelete:boolean = false;

		private $body:JQuery = $(document.body);

		constructor(_w:number = 500, _h:number = 500, withGrid:boolean = false){

			this.width = _w;
			this.height = _h;

			this.$canvas = $('<canvas id="preloader-gfx" width="' + this.width + '" height="' + this.height + '"></canvas>');
			$(document.body).append(this.$canvas);
			var really:any = this.$canvas.get(0);
			this.canvasContext = really.getContext('2d');
			// this.canvasContext.webkitImageSmoothingEnabled = true;
			// this.canvasContext.globalCompositeOperation = 'destination-atop';

			this.sampler = new Sampler( this.width, this.height, 25, 50 );
			if(withGrid && !window.hasOwnProperty('ontouchstart')){
				var $grid:any = $('<canvas class="bg" width="' + this.width + '" height="' + this.height + '"></canvas>');
				var $footerGrid:any = $('<canvas class="bg footer-bg" width="' + $('.footer-section').width() + '" height="' + $('.footer-section').height() + '"></canvas>');
				$(document.body).append($grid);
				$('.footer-section').append($footerGrid);


				this.sampler.grid.drawGrid($grid.get(0).getContext('2d'));
				this.sampler.grid.drawGrid($footerGrid.get(0).getContext('2d'));

				WindowController.on('resize', function(e:WindowController.WindowEvent){
					$grid.attr('width', e.winWidth).attr('height', e.winHeight);
					this.sampler.grid.drawGrid($grid.get(0).getContext('2d'));

					$footerGrid.attr('width', $('.footer-section').width()).attr('height', $('.footer-section').height());
					this.sampler.grid.drawGrid($footerGrid.get(0).getContext('2d'));

					// this.$canvas.attr('width', e.winWidth).attr('height', e.winHeight);
					this.canvasContext.canvas.width = e.winWidth;
					this.canvasContext.canvas.height = e.winHeight;
					this.sampler.drawOutputList(this.canvasContext);
				}, this);

			}
			this.animateStep();
			// var solution = sampler.sampleUntilSolution();
			// sampler.drawOutputList( this.canvasContext );
		}

		stepWrapper():void {
			return this.animateStep();
		}

		animateStep(){
			var self:Display = this;

	        // if(self.shouldDelete){
	        	// return;
	        	// self.sampler.removePoint();
	        	// self.poissonInProgress = false;
	        	// self.sampler.drawOutputList(self.canvasContext);
	        // }
	        if(self.poissonInProgress){
	        	if(self.sampler.sample()){
	        		self.sampler.drawOutputList(self.canvasContext);
	        	}else{
	        		self.poissonInProgress = false;
	        	}
	        }

	        if(self.$body.hasClass('has-dim')){
				self.sampler.animateOutput(self.canvasContext);
			}

        	window.requestAnimationFrame(function(){
        		return self.stepWrapper();
        	});
		}
	}

	class Sampler {
		private width:number;
		private height:number;
		private minDistance:number;
		private sampleFrequency:number;

		private oldTop:number = 0;
		public grid:Grid;
		public outputList:Array<Particle>;
		private processingQueue:RandomQueue;

		constructor(_w:number, _h:number, _min:number, _sample:number) {
			this.width = _w;
			this.height = _h;
			this.minDistance = _min;
			this.sampleFrequency = _sample;

			this.reset();
		}

		reset():void {
			this.grid = new Grid(this.width, this.height, this.minDistance);
			this.outputList = [];
			this.processingQueue = new RandomQueue();
		}

		sampleUntilSolution():Array<Particle> {
			var counter:number = 0;
			while( this.sample() ){
				counter++;
			}

			return this.outputList;
		}

		sample():boolean {
			// this.minDistance *= 1.01;
			// this.grid.minDistance = this.minDistance;
			// If this is the first sample
			if ( 0 === this.outputList.length){
				// Generate first points
				// this.queueToAll( {'x': 0, 'y': this.height * 0.5} );
				// this.queueToAll( {'x': this.width*0.75, 'y': this.height * 0.5} );
				this.queueToAll( {'x': this.width * 0.45, 'y': this.height * 0.45} );
				// this.queueToAll( this.grid.randomPoint() );
				// this.queueToAll( this.grid.randomPoint() );
				return true;
			}

			var processPoint = this.processingQueue.pop();

			// Processing queue is empty, return failure
			if ( processPoint == null ) {
				return false;
			}

			// Generate sample points around the processing point
			// And check if they have any neighbors on the grid
			// If not, add them to the queues
			for ( var i = 0; i < this.sampleFrequency; i++ ){
				var samplePoint:Point = this.grid.randomPointAround( processPoint.point() );

				if ( ! this.grid.inNeighborhood( samplePoint ) ){
					// No on in neighborhood, welcome to the club
					this.queueToAll( samplePoint );
				}
			}
			// Sample successful since the processing queue isn't empty
			return true;
		}

		queueToAll(pt:Point):void {
			var valid = this.grid.addPointToGrid( pt, this.grid.pixelsToGridCoords( pt ) );
			if ( ! valid || this.outputList.length > 500) {
				return;
			}
			var particle = new Particle(pt);
			this.processingQueue.push( particle );
			this.outputList.push( particle );
		}

		drawOutputList(context:any):void {
			context.clearRect(0,0,context.canvas.width, context.canvas.height);

			for ( var i = 0; i < this.outputList.length; i++ ){

				this.grid.drawParticle( this.outputList[ i ].point(), this.outputList[i].color(), context);//'#121c28', context );
			}
			if(this.outputList.length > 50){
				this.removePoint();
			}
		}

		removePoint(index:number = 0):boolean {
			var removedPoint:Particle = this.outputList.splice(index,1)[0];
			var ptToRemove:Point = this.grid.pixelsToGridCoords(removedPoint.startPoint());

			return this.grid.removePointFromGrid(ptToRemove);
		}

		animateOutput(context:any):void {
			context.clearRect(0,0,context.canvas.width, context.canvas.height);

			this.outputList.forEach(function(v:Particle){
        		v.update(context.canvas.width, context.canvas.height);
				this.grid.drawParticle( v.point(), v.color(), context);// '#121c28', context );
        	}, this);
		}
	}

	class Grid {
		private width:number;
		private height:number;
		public minDistance:number;
		private cellSize:number;

		private pointSize:number = 10;
		private cellsWide:number;
		private cellsHigh:number;

		private grid:Array<any>;

		constructor(_w:number, _h:number, _min:number){
			this.width = _w;
			this.height = _h;
			this.minDistance = _min;

			this.cellSize = this.minDistance / Math.SQRT2;
			// this.pointSize = 2;

			this.cellsWide = Math.ceil( this.width / this.cellSize );
			this.cellsHigh = Math.ceil( this.height / this.cellSize );

			// Initialize grid
			this.grid = [];
			for ( var x = 0; x < this.cellsWide; x++ ){
				this.grid[x] = [];
				for ( var y = 0; y < this.cellsHigh; y++ ){
					this.grid[x][y] = null;
				}
			}
		}

		pixelsToGridCoords(pt:Point):Point {
			var gridX = Math.floor( pt.x / this.cellSize );
			var gridY = Math.floor( pt.y / this.cellSize );
			return { x: gridX, y: gridY };
		}

		addPointToGrid(pointCoords:Point, gridCoords:Point):boolean {
			// Check that the coordinate makes sense
			if ( gridCoords.x < 0 || gridCoords.x > this.grid.length - 1 ) {
				return false;
			}
			if ( gridCoords.y < 0 || gridCoords.y > this.grid[gridCoords.x].length - 1 ) {
				return false;
			}
			this.grid[ gridCoords.x ][ gridCoords.y ] = pointCoords;

			return true;
		}

		removePointFromGrid(gridCoords:Point):boolean {
			var toRemove = this.grid[gridCoords.x][gridCoords.y];
			if(toRemove !== null){
				this.grid[gridCoords.x][gridCoords.y] = null;
				return true;
			}
			return false;
		}


		// MDN Random Number Functions
		// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
		getRandomArbitrary(min, max):number {
			return Math.random() * (max - min) + min;
		}


		randomPoint():Point {
			return { x: this.getRandomArbitrary(0,this.width), y: this.getRandomArbitrary(0,this.height) };
		}

		randomPointAround(pt:Point):Point {
			var r1 = Math.random();
			var r2 = Math.random();
			// get a random radius between the min distance and 2 X mindist
			var radius = this.minDistance * (r1 + 1);
			// get random angle around the circle
			var angle = 2 * Math.PI * r2;
			// get x and y coords based on angle and radius
			var x = pt.x + radius * Math.cos( angle );
			var y = pt.y + radius * Math.sin( angle );
			return { x: x, y: y };
		}

		inNeighborhood(pt:Point):boolean {
			var gridPoint = this.pixelsToGridCoords( pt );

			var cellsAroundPt = this.cellsAroundPoint( pt );

			for ( var i = 0; i < cellsAroundPt.length; i++ ){
				if ( cellsAroundPt[i] != null ){
					if ( this.calcDistance( cellsAroundPt[i], pt ) < this.minDistance ){
						return true;
					}
				}
			}
			return false;
		}

		cellsAroundPoint(pt:Point):Array<any> {
			var gridCoords = this.pixelsToGridCoords( pt );
			var neighbors:Array<any> = [];

			for ( var x = -2; x < 3; x++ ){
				var targetX = gridCoords.x + x;
				// make sure lowerbound and upperbound make sense
				if ( targetX < 0 ) {
					targetX = 0;
				}
				if ( targetX > this.grid.length - 1 ) {
					targetX = this.grid.length - 1;
				}

				for ( var y = -2; y < 3; y++ ){
					var targetY = gridCoords.y + y;
					// make sure lowerbound and upperbound make sense
					if ( targetY < 0 ) {
						targetY = 0;
					}
					if ( targetY > this.grid[ targetX ].length - 1 ) {
						targetY = this.grid[ targetX ].length - 1;
					}
					neighbors.push( this.grid[ targetX ][ targetY ] );
				}
			}
			return neighbors;
		}

		calcDistance(pointInCell:Point, pt:Point):Number {
			return Math.sqrt( (pt.x - pointInCell.x)*(pt.x - pointInCell.x)
	                + (pt.y - pointInCell.y)*(pt.y - pointInCell.y) );
		}


		drawGrid(context:any):void {
			context.beginPath();
			context.clearRect(0,0,context.canvas.width,context.canvas.height);
			context.closePath();

			context.lineWidth = 0.05;
			context.strokeStyle = 'black';

			// Borders
			context.beginPath();
			context.moveTo( 0, 0 );
			context.lineTo( context.canvas.width, 0 );
			context.lineTo( context.canvas.width, context.canvas.height );
			context.lineTo( 0, context.canvas.height );
			context.lineTo( 0, 0 );
			context.stroke();
			context.closePath();

			var percent = 1,
				winWidth = $(window).width();


			if(winWidth < 800){
				percent = 10;
			}else if(winWidth < 1000){
				percent = 5;
			}if(winWidth < 1200){
				percent = 3;
			}else if(winWidth < 1400){
				percent = 2;
			}
			var vw = $(window).width() * (percent/100);
			var vh = vw;//$(window).height() * 0.01;

			// Vertical lines
			for ( var x = 1; x < (100/percent); x++ ){
				context.beginPath();
				context.moveTo( x * vw, 0 );
				context.lineTo( x * vw, context.canvas.height );
				context.stroke();
				context.closePath();
			}

			// Horizontal lines
			for ( var y = 1; y < context.canvas.height / vh; y++ ){
				context.beginPath();
				context.moveTo( 0, y * vh );
				context.lineTo( context.canvas.width, y * vh );
				context.stroke();
				context.closePath();
			}
		}

		drawParticle(pt:Point, color:string, canvas:any):void {
			// this.drawCircle(pt, color, canvas);
			this.drawX(pt, color, canvas);
			this.drawX(pt, color, canvas);
		}

		drawCircle(pt:Point, color:string, canvas:any):void {
			// Draw a circle
			canvas.beginPath();
			// arc(x, y, radius, startAngle, endAngle, anticlockwise)
			canvas.arc( pt.x, pt.y, this.pointSize, 0, 2 * Math.PI, false);
			canvas.fillStyle = color;
			canvas.fill();
			canvas.closePath();
		}

		drawX(pt:Point, color:string, canvas:any, size:number = this.pointSize):void {
			canvas.beginPath();
			canvas.strokeStyle = color;//'#121c28';
			canvas.moveTo(pt.x, pt.y - size/4);
			canvas.lineTo(pt.x, pt.y + size/4);
			canvas.moveTo(pt.x - size/4, pt.y);
			canvas.lineTo(pt.x + size/4, pt.y);
			canvas.stroke();
			canvas.closePath();
		}

		drawLine(ptFrom:Point, ptTo:Point, canvas:any):void {
			canvas.beginPath();
			canvas.moveTo(ptFrom.x, ptFrom.y);
			canvas.lineTo(ptTo.x, ptTo.y);
			canvas.strokeStyle = 'rgba(0,0,0,0.1)';
			canvas.stroke();
			canvas.closePath();
		}
	}

	class RandomQueue {
		private queue:Array<any>;

		constructor(_q:Array<any>=[]){
			this.queue = _q;
		}

		push(element:any):void {
			this.queue.push(element);
		}

		pop():any {
			// return this.queue.pop();
			var randomIndex:number = this.getRandomInt( 0, this.queue.length );
			while( this.queue[randomIndex] === undefined ){

				// Check if the queue is empty
				var empty = true;
				for ( var i = 0; i < this.queue.length; i++ ){
					if ( this.queue[i] !== undefined ) {
						empty = false;
					}
				}
				if ( empty ) {
					return null;
				}

				randomIndex = this.getRandomInt( 0, this.queue.length );
			}

			// var element:any = this.queue[ randomIndex ];
			return this.queue.splice(randomIndex, 1)[0];
			// return element;
		}

		getRandomInt(min, max):number {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		splice(index:number = 0, length:number = 1):Array<any> {
			this.queue.splice(index,length);
			return this.queue;
		}
	}









	/** motion stuff **/
	class Vector {
		public x:number;
		public y:number;

		constructor(_x:number, _y:number) {
			this.x = _x;
			this.y = _y;
		}

		add(vec:Vector):Vector {
			this.x += vec.x;
			this.y += vec.y;

			return this;
		}

		multiply(scale:number):Vector{
			this.x *= scale;
			this.y *= scale;

			return this;
		}

		magnitude():number {
	  		return Math.sqrt( (this.x * this.x) + (this.y * this.y));
		}

		angle():number {
			return Math.atan2(this.y,this.x);
		}

		force():Vector {
	  		return new Vector(this.magnitude() * Math.cos(this.angle()), this.magnitude() * Math.sin(this.angle()));
		}

		toPoint():Point {
			return {'x': this.x, 'y': this.y};
		}
	}
}
