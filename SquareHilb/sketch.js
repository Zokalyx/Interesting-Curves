let f;

function setup() {
	createCanvas(600,600);
	f = new Hilbert();
}

function draw() {
	background(0);
	translate(width/2,height/2);
	scale(1,-1);
	stroke(255);
	f.disp(width/2);
}

function mouseClicked() {
	f.next();
}

class Hilbert {

	constructor() {
		this.n = 1;
		this.status = [3,1,3,1,3];   //0 = A (dot).1 = Turn (Right by default). 2 = Flip rotation orientation. 3. Move forward.
	}

	next() {
		this.n++;
		let aux = [1,2];
		for (let i = 0; i < this.status.length; i++) {
			aux.push(this.status[i]);
		}
		aux.push(2);
		aux.push(1);
		aux.push(3);
		for (let i = 0; i < this.status.length; i++) {
			aux.push(this.status[i]);
		}
		aux.push(2);
		aux.push(1);
		aux.push(3);
		aux.push(1);
		aux.push(2);
		for (let i = 0; i < this.status.length; i++) {
			aux.push(this.status[i]);
		}
		aux.push(3);
		aux.push(1);
		aux.push(2);
		for (let i = 0; i < this.status.length; i++) {
			aux.push(this.status[i]);
		}
		aux.push(2);
		aux.push(1);
		this.status = aux;
	}

	disp(length) {
		push();
		let l = length/Math.pow(2,this.n);
		let flipped = -1; //1 = True, -1 False.
		translate(-length+l/2,l/2);
		for (let asd = 0; asd < 4; asd++) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == 3) {
					line(0,0,0,l);
					translate(0,l);
				} else if (this.status[i] == 2) {
					flipped *= -1;
				} else if (this.status[i] == 1) {
					rotate(flipped*PI/2);
				}
			}
			if (asd == 0 || asd == 2) {
				rotate(PI/2);
				line(0,0,0,l);
				translate(0,l);
				rotate(PI/2);
			} else {
				line(0,0,0,l);
				translate(0,l);
			}
		}
		pop();
	}

	toArray(precision,length) { //Precision = integer greater than 0;
		let ansX = [];
		let ansY = [];
		let ang = PI/2;
		let flipped = -1;
		let l = length/Math.pow(2,this.n);
		let posX = -length+l/2;
		let posY = 0;
		for (let j = 0; j < 2; j++) {
			for (let k = 0; k < precision/2; k++) {
				ansX.push(posX);
				ansY.push(posY);
				posX += l/precision*cos(ang);
				posY += l/precision*sin(ang);
			}
			for (let asd = 0; asd < 2; asd++) {
				for (let i = 0; i < this.status.length; i++) {
					if (this.status[i] == 3) {
						for (let k = 0; k < precision; k++) {
							ansX.push(posX);
							ansY.push(posY);
							posX += l/precision*cos(ang);
							posY += l/precision*sin(ang);
						}
					} else if (this.status[i] == 2) {
						flipped *= -1;
					} else if (this.status[i] == 1) {
						ang += flipped*PI/2;
					}
				}
				if (asd == 0) {
					ang += PI/2;
					for (let k = 0; k < precision; k++) {
						ansX.push(posX);
						ansY.push(posY);
						posX += l/precision*cos(ang);
						posY += l/precision*sin(ang);
					}
					ang += PI/2
				}
			}
			for (let k = 0; k < precision/2; k++) {
				ansX.push(posX);
				ansY.push(posY);
				posX += l/precision*cos(ang);
				posY += l/precision*sin(ang);
			}
		}
		return [ansX,ansY];
	}
}