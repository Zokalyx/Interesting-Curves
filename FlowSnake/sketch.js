let f;

function setup() {
	createCanvas(600,600);
	f = new FlowSnake();
}

function draw() {
	background(0);
	translate(width/2,height/2);
	scale(1,-1);
	stroke(255);
	f.disp(200,PI/3);
}

function mouseClicked() {
	f.next();
}

class FlowSnake {

	constructor() {
		this.n = 0;
		this.status = [0];
		this.factor = 1;
		this.points = [[0,-sqrt(3)/4],[1/2,sqrt(3)/4],[-1/2,sqrt(3)/4]];
		this.init = 0;
	}

	next() {
		this.n++;
		this.factor = 1/Math.pow(sqrt(7),this.n);
		let aux = [];
		for (let j = 0; j < this.status.length; j++) {
			let aux2;
			if (this.status[j] == 0) {
				aux2 = [0,3,1,3,3,1,2,0,2,2,0,0,2,1,3];
			} else if (this.status[j] == 1) {
				aux2 = [2,0,3,1,1,3,3,1,3,0,2,2,0,2,1];
			} else {
				aux2 = [this.status[j]];
			}
			for (let i = 0; i < aux2.length; i++) {
				aux.push(aux2[i]);
			}
		}
		this.status = aux;
		let current = [0,0];
		let angle = 0;
		this.points[0] = current.slice();
		for (let j = 1; j < 3; j++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 0 || this.status[i] == 1) {
					current[0] += cos(angle);
					current[1] += sin(angle);
				} else if (this.status[i] == 2) {
					angle += PI/3;
				} else {
					angle -= PI/3;
				}
			}
			angle += 2*PI/3;
			this.points[j] = current.slice();
		}
		let centerX = 0;
		let centerY = 0;
		for (let i = 0; i < 3; i++) {
			centerX += 1/3*this.points[i][0];
			centerY += 1/3*this.points[i][1];
		}
		for (let i = 0; i < 3; i++) {
			this.points[i][0] -= centerX;
			this.points[i][1] -= centerY;
		}
		let angle0;
		if (this.points[0][0] == 0) {
			angle0 = PI/2;
			if (this.points[0][1] < 0) {
				angle0 *= -1;
			}
		} else {
			angle0 = atan(this.points[0][1],this.points[0][0]);
			if (this.points[0][0] < 0) {
				angle0 += PI;
			}
		}
		angle0 = -PI/2 - angle0;
		for (let i = 0; i < 3; i++) {
			let asd = this.points[i].slice();
			this.points[i] = [asd[0]*cos(angle0)-asd[1]*sin(angle0),asd[0]*sin(angle0)+asd[1]*cos(angle0)];
		}
		this.init = angle0;
	}

	disp(length,a) {
		let l = length*this.factor;
		rotate(this.init);
		translate(0,this.points[0][1]*l);
		rotate(-PI/6);
		for (let j = 0; j < 3; j++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 0 || this.status[i] == 1) {
					line(0,0,0,l);
					translate(0,l);
				} else if (this.status[i] == 2) {
					rotate(a);
				} else {
					rotate(-a);
				}
			}
			rotate(2*PI/3);
		}
	}

	toArray(precision) { //Precision = integer greater than 0;
		let ans = [];
	}
}