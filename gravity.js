var canvas = document.querySelector('canvas');
console.log(canvas);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('resize', 
	function(){
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		init();
	});

window.addEventListener('click',
	function(){
		init();
	});

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');
var gravity = 1;
var dampy = 0.9;
var dampx = 0.2;
function Ball(x, y, r, color, dx, dy){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dy = dy;
	this.dx = dx;
	this.color = color;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.fill();
		c.fillStyle = this.color;
		c.stroke();
		c.closePath();
	}

	this.update = function(){
		if(this.y + this.r + this.dy> canvas.height){
			this.dy = -this.dy * dampy;
		}
		else {
			this.dy += gravity;
		}
		if(this.x + this.r + this.dx> canvas.width || this.x - this.r + this.dx < 0){
			this.dx = -this.dx * dampx;
		}
		if(this.y + this.r >= canvas.height){
			this.dx *= 0.95;
		}

		this.y += this.dy;
		this.x += this.dx;
		this.draw();

	}
}

var balls = [];
var colors = [
	'#2E112D',
	'#540032',
	'#820333',
	'#C9283E',
	'#F0433A',	
];

function init(){
	balls = [];
	for(var i = 0; i < 300; i++){
		var x = getRandomInt(20, canvas.width - 20);
		var y = getRandomInt(50, canvas.height - 200);
		var dx = getRandomInt(-10,10);
		var dy = getRandomInt(-4,2);
		var r = getRandomInt(12,20);
		var color = colors[getRandomInt(0, 6)];
		balls.push(new Ball(x, y, r, color, dx, dy));
	}
}
init();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for(var i = 0; i < balls.length; i++){
		balls[i].update();
	}

}

animate();