/*
poisson-disk-sample
https://github.com/jeffrey-hearn/poisson-disk-sample
MIT License
*/
define(["require", "exports", 'core/windowController'], function(require, exports, WindowController) {
    
    var SplashScreen;
    (function (SplashScreen) {
        var Particle = (function () {
            function Particle(startPosition) {
                this.drag = .85;
                this.initialPosition = startPosition;
                this.positionVector = new Vector(startPosition.x, startPosition.y);
                this.positionPoint = this.positionVector.toPoint();
                this.velocity = new Vector(Math.random() / 3 * (Math.random() > 0.5 ? 1 : -1), 0);
                this.acceleration = new Vector(0, 0);
            }
            //impulse
            Particle.prototype.impulse = function (direction) {
                this.acceleration = this.acceleration.add(direction);
            };

            Particle.prototype.startPoint = function () {
                return this.initialPosition;
            };

            Particle.prototype.point = function () {
                this.positionPoint = this.positionVector.toPoint();
                return this.positionPoint;
            };

            Particle.prototype.color = function () {
                // light
                return 'rgba(238, 240, 245, ' + (this.velocity.x + 0.2) + ')';
                // dark
                // return 'rgba(44, 62, 80,' + (this.velocity.x+0.2) + ')';
            };

            Particle.prototype.checkBounds = function (width, height) {
                var check = this.point();
                if (check.x > width) {
                    check.x = check.x - width;
                } else if (check.x < 0) {
                    check.x = width + check.x;
                }

                if (check.y > height) {
                    check.y = check.y - height;
                } else if (check.y < 0) {
                    check.y = height + check.y;
                }
                this.positionVector = new Vector(check.x, check.y);
                this.positionPoint = this.positionVector.toPoint();
            };

            Particle.prototype.update = function (boundWidth, boundHeight) {
                this.acceleration = this.acceleration.multiply(this.drag);
                this.velocity = this.velocity.add(this.acceleration); //.multiply(this.drag);
                this.checkBounds(boundWidth, boundHeight);
                this.positionVector = this.positionVector.add(this.velocity);
                return this.point();
            };
            return Particle;
        })();

        var Display = (function () {
            function Display(_w, _h, withGrid) {
                if (typeof _w === "undefined") { _w = 500; }
                if (typeof _h === "undefined") { _h = 500; }
                if (typeof withGrid === "undefined") { withGrid = false; }
                this.poissonInProgress = true;
                this.shouldDelete = false;
                this.$body = $(document.body);
                this.width = _w;
                this.height = _h;

                this.$canvas = $('<canvas id="preloader-gfx" width="' + this.width + '" height="' + this.height + '"></canvas>');
                $(document.body).append(this.$canvas);
                var really = this.$canvas.get(0);
                this.canvasContext = really.getContext('2d');

                // this.canvasContext.webkitImageSmoothingEnabled = true;
                // this.canvasContext.globalCompositeOperation = 'destination-atop';
                this.sampler = new Sampler(this.width, this.height, 25, 50);
                if (withGrid && !window.hasOwnProperty('ontouchstart')) {
                    var $grid = $('<canvas class="bg" width="' + this.width + '" height="' + this.height + '"></canvas>');
                    var $footerGrid = $('<canvas class="bg footer-bg" width="' + $('.footer-section').width() + '" height="' + $('.footer-section').height() + '"></canvas>');
                    $(document.body).append($grid);
                    $('.footer-section').append($footerGrid);

                    this.sampler.grid.drawGrid($grid.get(0).getContext('2d'));
                    this.sampler.grid.drawGrid($footerGrid.get(0).getContext('2d'));

                    WindowController.on('resize', function (e) {
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
            Display.prototype.stepWrapper = function () {
                return this.animateStep();
            };

            Display.prototype.animateStep = function () {
                var self = this;

                // if(self.shouldDelete){
                // return;
                // self.sampler.removePoint();
                // self.poissonInProgress = false;
                // self.sampler.drawOutputList(self.canvasContext);
                // }
                if (self.poissonInProgress) {
                    if (self.sampler.sample()) {
                        self.sampler.drawOutputList(self.canvasContext);
                    } else {
                        self.poissonInProgress = false;
                    }
                }

                if (self.$body.hasClass('has-dim')) {
                    self.sampler.animateOutput(self.canvasContext);
                }

                window.requestAnimationFrame(function () {
                    return self.stepWrapper();
                });
            };
            return Display;
        })();
        SplashScreen.Display = Display;

        var Sampler = (function () {
            function Sampler(_w, _h, _min, _sample) {
                this.oldTop = 0;
                this.width = _w;
                this.height = _h;
                this.minDistance = _min;
                this.sampleFrequency = _sample;

                this.reset();
            }
            Sampler.prototype.reset = function () {
                this.grid = new Grid(this.width, this.height, this.minDistance);
                this.outputList = [];
                this.processingQueue = new RandomQueue();
            };

            Sampler.prototype.sampleUntilSolution = function () {
                var counter = 0;
                while (this.sample()) {
                    counter++;
                }

                return this.outputList;
            };

            Sampler.prototype.sample = function () {
                // this.minDistance *= 1.01;
                // this.grid.minDistance = this.minDistance;
                // If this is the first sample
                if (0 === this.outputList.length) {
                    // Generate first points
                    // this.queueToAll( {'x': 0, 'y': this.height * 0.5} );
                    // this.queueToAll( {'x': this.width*0.75, 'y': this.height * 0.5} );
                    this.queueToAll({ 'x': this.width * 0.45, 'y': this.height * 0.45 });

                    // this.queueToAll( this.grid.randomPoint() );
                    // this.queueToAll( this.grid.randomPoint() );
                    return true;
                }

                var processPoint = this.processingQueue.pop();

                // Processing queue is empty, return failure
                if (processPoint == null) {
                    return false;
                }

                for (var i = 0; i < this.sampleFrequency; i++) {
                    var samplePoint = this.grid.randomPointAround(processPoint.point());

                    if (!this.grid.inNeighborhood(samplePoint)) {
                        // No on in neighborhood, welcome to the club
                        this.queueToAll(samplePoint);
                    }
                }

                // Sample successful since the processing queue isn't empty
                return true;
            };

            Sampler.prototype.queueToAll = function (pt) {
                var valid = this.grid.addPointToGrid(pt, this.grid.pixelsToGridCoords(pt));
                if (!valid || this.outputList.length > 500) {
                    return;
                }
                var particle = new Particle(pt);
                this.processingQueue.push(particle);
                this.outputList.push(particle);
            };

            Sampler.prototype.drawOutputList = function (context) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);

                for (var i = 0; i < this.outputList.length; i++) {
                    this.grid.drawParticle(this.outputList[i].point(), this.outputList[i].color(), context); //'#121c28', context );
                }
                if (this.outputList.length > 50) {
                    this.removePoint();
                }
            };

            Sampler.prototype.removePoint = function (index) {
                if (typeof index === "undefined") { index = 0; }
                var removedPoint = this.outputList.splice(index, 1)[0];
                var ptToRemove = this.grid.pixelsToGridCoords(removedPoint.startPoint());

                return this.grid.removePointFromGrid(ptToRemove);
            };

            Sampler.prototype.animateOutput = function (context) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);

                this.outputList.forEach(function (v) {
                    v.update(context.canvas.width, context.canvas.height);
                    this.grid.drawParticle(v.point(), v.color(), context); // '#121c28', context );
                }, this);
            };
            return Sampler;
        })();

        var Grid = (function () {
            function Grid(_w, _h, _min) {
                this.pointSize = 10;
                this.width = _w;
                this.height = _h;
                this.minDistance = _min;

                this.cellSize = this.minDistance / Math.SQRT2;

                // this.pointSize = 2;
                this.cellsWide = Math.ceil(this.width / this.cellSize);
                this.cellsHigh = Math.ceil(this.height / this.cellSize);

                // Initialize grid
                this.grid = [];
                for (var x = 0; x < this.cellsWide; x++) {
                    this.grid[x] = [];
                    for (var y = 0; y < this.cellsHigh; y++) {
                        this.grid[x][y] = null;
                    }
                }
            }
            Grid.prototype.pixelsToGridCoords = function (pt) {
                var gridX = Math.floor(pt.x / this.cellSize);
                var gridY = Math.floor(pt.y / this.cellSize);
                return { x: gridX, y: gridY };
            };

            Grid.prototype.addPointToGrid = function (pointCoords, gridCoords) {
                // Check that the coordinate makes sense
                if (gridCoords.x < 0 || gridCoords.x > this.grid.length - 1) {
                    return false;
                }
                if (gridCoords.y < 0 || gridCoords.y > this.grid[gridCoords.x].length - 1) {
                    return false;
                }
                this.grid[gridCoords.x][gridCoords.y] = pointCoords;

                return true;
            };

            Grid.prototype.removePointFromGrid = function (gridCoords) {
                var toRemove = this.grid[gridCoords.x][gridCoords.y];
                if (toRemove !== null) {
                    this.grid[gridCoords.x][gridCoords.y] = null;
                    return true;
                }
                return false;
            };

            // MDN Random Number Functions
            // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
            Grid.prototype.getRandomArbitrary = function (min, max) {
                return Math.random() * (max - min) + min;
            };

            Grid.prototype.randomPoint = function () {
                return { x: this.getRandomArbitrary(0, this.width), y: this.getRandomArbitrary(0, this.height) };
            };

            Grid.prototype.randomPointAround = function (pt) {
                var r1 = Math.random();
                var r2 = Math.random();

                // get a random radius between the min distance and 2 X mindist
                var radius = this.minDistance * (r1 + 1);

                // get random angle around the circle
                var angle = 2 * Math.PI * r2;

                // get x and y coords based on angle and radius
                var x = pt.x + radius * Math.cos(angle);
                var y = pt.y + radius * Math.sin(angle);
                return { x: x, y: y };
            };

            Grid.prototype.inNeighborhood = function (pt) {
                var gridPoint = this.pixelsToGridCoords(pt);

                var cellsAroundPt = this.cellsAroundPoint(pt);

                for (var i = 0; i < cellsAroundPt.length; i++) {
                    if (cellsAroundPt[i] != null) {
                        if (this.calcDistance(cellsAroundPt[i], pt) < this.minDistance) {
                            return true;
                        }
                    }
                }
                return false;
            };

            Grid.prototype.cellsAroundPoint = function (pt) {
                var gridCoords = this.pixelsToGridCoords(pt);
                var neighbors = [];

                for (var x = -2; x < 3; x++) {
                    var targetX = gridCoords.x + x;

                    // make sure lowerbound and upperbound make sense
                    if (targetX < 0) {
                        targetX = 0;
                    }
                    if (targetX > this.grid.length - 1) {
                        targetX = this.grid.length - 1;
                    }

                    for (var y = -2; y < 3; y++) {
                        var targetY = gridCoords.y + y;

                        // make sure lowerbound and upperbound make sense
                        if (targetY < 0) {
                            targetY = 0;
                        }
                        if (targetY > this.grid[targetX].length - 1) {
                            targetY = this.grid[targetX].length - 1;
                        }
                        neighbors.push(this.grid[targetX][targetY]);
                    }
                }
                return neighbors;
            };

            Grid.prototype.calcDistance = function (pointInCell, pt) {
                return Math.sqrt((pt.x - pointInCell.x) * (pt.x - pointInCell.x) + (pt.y - pointInCell.y) * (pt.y - pointInCell.y));
            };

            Grid.prototype.drawGrid = function (context) {
                context.beginPath();
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.closePath();

                context.lineWidth = 0.05;
                context.strokeStyle = 'black';

                // Borders
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(context.canvas.width, 0);
                context.lineTo(context.canvas.width, context.canvas.height);
                context.lineTo(0, context.canvas.height);
                context.lineTo(0, 0);
                context.stroke();
                context.closePath();

                var percent = 1, winWidth = $(window).width();

                if (winWidth < 800) {
                    percent = 10;
                } else if (winWidth < 1000) {
                    percent = 5;
                }
                if (winWidth < 1200) {
                    percent = 3;
                } else if (winWidth < 1400) {
                    percent = 2;
                }
                var vw = $(window).width() * (percent / 100);
                var vh = vw;

                for (var x = 1; x < (100 / percent); x++) {
                    context.beginPath();
                    context.moveTo(x * vw, 0);
                    context.lineTo(x * vw, context.canvas.height);
                    context.stroke();
                    context.closePath();
                }

                for (var y = 1; y < context.canvas.height / vh; y++) {
                    context.beginPath();
                    context.moveTo(0, y * vh);
                    context.lineTo(context.canvas.width, y * vh);
                    context.stroke();
                    context.closePath();
                }
            };

            Grid.prototype.drawParticle = function (pt, color, canvas) {
                // this.drawCircle(pt, color, canvas);
                this.drawX(pt, color, canvas);
                this.drawX(pt, color, canvas);
            };

            Grid.prototype.drawCircle = function (pt, color, canvas) {
                // Draw a circle
                canvas.beginPath();

                // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                canvas.arc(pt.x, pt.y, this.pointSize, 0, 2 * Math.PI, false);
                canvas.fillStyle = color;
                canvas.fill();
                canvas.closePath();
            };

            Grid.prototype.drawX = function (pt, color, canvas, size) {
                if (typeof size === "undefined") { size = this.pointSize; }
                canvas.beginPath();
                canvas.strokeStyle = color; //'#121c28';
                canvas.moveTo(pt.x, pt.y - size / 4);
                canvas.lineTo(pt.x, pt.y + size / 4);
                canvas.moveTo(pt.x - size / 4, pt.y);
                canvas.lineTo(pt.x + size / 4, pt.y);
                canvas.stroke();
                canvas.closePath();
            };

            Grid.prototype.drawLine = function (ptFrom, ptTo, canvas) {
                canvas.beginPath();
                canvas.moveTo(ptFrom.x, ptFrom.y);
                canvas.lineTo(ptTo.x, ptTo.y);
                canvas.strokeStyle = 'rgba(0,0,0,0.1)';
                canvas.stroke();
                canvas.closePath();
            };
            return Grid;
        })();

        var RandomQueue = (function () {
            function RandomQueue(_q) {
                if (typeof _q === "undefined") { _q = []; }
                this.queue = _q;
            }
            RandomQueue.prototype.push = function (element) {
                this.queue.push(element);
            };

            RandomQueue.prototype.pop = function () {
                // return this.queue.pop();
                var randomIndex = this.getRandomInt(0, this.queue.length);
                while (this.queue[randomIndex] === undefined) {
                    // Check if the queue is empty
                    var empty = true;
                    for (var i = 0; i < this.queue.length; i++) {
                        if (this.queue[i] !== undefined) {
                            empty = false;
                        }
                    }
                    if (empty) {
                        return null;
                    }

                    randomIndex = this.getRandomInt(0, this.queue.length);
                }

                // var element:any = this.queue[ randomIndex ];
                return this.queue.splice(randomIndex, 1)[0];
                // return element;
            };

            RandomQueue.prototype.getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            RandomQueue.prototype.splice = function (index, length) {
                if (typeof index === "undefined") { index = 0; }
                if (typeof length === "undefined") { length = 1; }
                this.queue.splice(index, length);
                return this.queue;
            };
            return RandomQueue;
        })();

        /** motion stuff **/
        var Vector = (function () {
            function Vector(_x, _y) {
                this.x = _x;
                this.y = _y;
            }
            Vector.prototype.add = function (vec) {
                this.x += vec.x;
                this.y += vec.y;

                return this;
            };

            Vector.prototype.multiply = function (scale) {
                this.x *= scale;
                this.y *= scale;

                return this;
            };

            Vector.prototype.magnitude = function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            };

            Vector.prototype.angle = function () {
                return Math.atan2(this.y, this.x);
            };

            Vector.prototype.force = function () {
                return new Vector(this.magnitude() * Math.cos(this.angle()), this.magnitude() * Math.sin(this.angle()));
            };

            Vector.prototype.toPoint = function () {
                return { 'x': this.x, 'y': this.y };
            };
            return Vector;
        })();
    })(SplashScreen || (SplashScreen = {}));
    return SplashScreen;
});
