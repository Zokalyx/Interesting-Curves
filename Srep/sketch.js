let f;

function setup() {
	createCanvas(600,600);
	f = new Srep();
}

function draw() {
	background(0);
	translate(width/2,height/2);
	scale(1,-1);
	stroke(255);
	f.disp(150,map(mouseX,0,width,0,PI/2),round(map(mouseY,0,height,3,6)));
}

function mouseClicked() {
	f.next();
}

class Srep {

	constructor() {
		this.n = 0;
		this.status = [0]; //0 == A. 1 == B. 2 == Rotate Left. 3 Rotate Right
		this.a = [2,1,3,0,3,1,2];
		this.b = [3,0,2,1,2,0,3];
	}

	next() {
		this.n++;
		let aux = [];
		for (let j = 0; j < this.status.length; j++) {
			if (this.status[j] == 0) {
				for (let i = 0; i < this.a.length; i++) {
					aux.push(this.a[i]);
				}
			} else if (this.status[j] == 1) {
				for (let i = 0; i < this.b.length; i++) {
					aux.push(this.b[i]);
				}
			} else {
				aux.push(this.status[j]);
			}
		}
		this.status = aux;
	}

	disp(length,angle,it) {
		push();
		rotate(TWO_PI/it/2);
		translate(0,length);
		rotate(-TWO_PI/it/2-PI/2);
		let l = 2*length*sin(PI/it)/Math.pow(1+2*cos(angle),this.n);
		let a = angle;
		for (let j = 0; j < it; j++) {
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
			rotate(-TWO_PI/it);
		}
		pop();
	}

	toArray(precision,length,angle,it) { //Precision = integer greater than 0;
		let ansX = [];
		let ansY = [];
		let posX = 0;
		let posY = 0;
		let ang = 0;
		ang += TWO_PI/it/2;
		posX += length*cos(angle);
		posY += length*sin(angle);
		ang += -TWO_PI/it/2-PI/2;
		let l = 2*length*sin(PI/it)/Math.pow(1+2*cos(angle),this.n);
		let a = angle;
		for (let j = 0; j < it; j++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 0 || this.status[i] == 1) {
					for (let k = 0; k < precision; k++) {
						ansX.push(posX);
						ansY.push(posY);
						posX += l/precision*cos(ang);
						posY += l/precision*sin(ang);
					}
				} else if (this.status[i] == 2) {
					angle += a;
				} else {
					angle += -a;
				}
			}
			angle += -TWO_PI/it;
		}
		return [ansX,ansY];
	}
}