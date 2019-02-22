let f;

function setup() {
	createCanvas(600,600);
	f = new Koch();
}

function draw() {
	background(0);
	translate(width/2,height/2);
	scale(1,-1);
	stroke(255);
	f.disp(200,map(mouseX,0,width,0,TWO_PI),round(map(mouseY,0,height,2,6)));
}

function mouseClicked() {
	f.next();
}

class Koch {

	constructor() {
		this.n = 0;
		this.status = [0];
		this.a = [0,1,0,-1,-1,0,1,0];
	}

	next() {
		this.n++;
		let aux = [];
		for (let j = 0; j < this.status.length; j++) {
			if (this.status[j] == 0) {
				for (let i = 0; i < this.a.length; i++) {
					aux.push(this.a[i]);
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
		let l = 2*length*sin(PI/it)/Math.pow(2*(1+sin(angle/2)),this.n);
		let a = PI/2-angle/2;
		for (let j = 0; j < it; j++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 0) {
					line(0,0,0,l);
					translate(0,l);
				} else {
					rotate(this.status[i]*a);
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
		let l = 2*length*sin(PI/it)/Math.pow(2*(1+sin(angle/2)),this.n);
		let a = PI/2-angle/2;
		for (let j = 0; j < it; j++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 0) {
					for (let k = 0; k < precision; k++) {
						ansX.push(posX);
						ansY.push(posY);
						posX += l/precision*cos(ang);
						posY += l/precision*sin(ang);
					}
				} else {
					ang += this.status[i]*a;
				}
			}
			ang += -TWO_PI/it;
		}
		return [ansX,ansY];
	}
}