class Pendulum {
	constructor(originX, originXY, l, firstAngle, secondAngle) {
		this.origin = createVector(originX, originXY)
		this.balls = [new Ball(0, 0, settings.ball.mass, 2.5, firstAngle), new Ball(0, 0, settings.ball.mass, 2.5, secondAngle)]
		this.length = {
			first: l,
			second: l
		}
		
		this.updateLocations()
		this.getColor()
	}

	display() {
		push()
		noFill()
		stroke(this.color.r, this.color.g, this.color.b)
		line(this.origin.x, this.origin.y, this.balls[0].position.x, this.balls[0].position.y)
		line(this.balls[0].position.x, this.balls[0].position.y, this.balls[1].position.x, this.balls[1].position.y)
		pop()

		// this.balls.forEach(b => b.display())
	}

	updateLocations() {
		
		const x1 = this.length.first * Math.sin(this.balls[0].angle)
		const y1 = this.length.first * Math.cos(this.balls[0].angle)

		this.balls[0].position.set(x1 + this.origin.x, y1 + this.origin.y)

		const x2 = x1 + this.length.second * Math.sin(this.balls[1].angle)
		const y2 = y1 + this.length.second * Math.cos(this.balls[1].angle)

		this.balls[1].position.set(x2 + this.origin.x, y2 + this.origin.y)

	}

	updateAngles() {

		const g = settings.g
		const m1 = this.balls[0].mass
		const m2 = this.balls[1].mass
		const a1 = this.balls[0].angle
		const a2 = this.balls[1].angle

		const r1 = this.length.first
		const r2 = this.length.second

		const a1_v = this.balls[0].angularVelocity
		const a2_v = this.balls[1].angularVelocity

		let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
		let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
		let num3 = -2 * Math.sin(a1 - a2) * m2;
		let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
		let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
		this.balls[0].angularAcceleration = (num1 + num2 + num3 * num4) / den;
	  
		num1 = 2 * sin(a1 - a2);
		num2 = (a1_v * a1_v * r1 * (m1 + m2));
		num3 = g * (m1 + m2) * cos(a1);
		num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
		den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
		this.balls[1].angularAcceleration = (num1 * (num2 + num3 + num4)) / den;

		
		// const part1A = -settings.g * (2 * this.balls[0].mass + this.balls[1].mass) * Math.sin(this.balls[0].angle)
		// const part1B = -this.balls[1].mass * settings.g * Math.sin(this.balls[0].angle - 2 * this.balls[1].angle)
		// const part1C= - 2 * Math.sin(this.balls[0].angle - this.balls[1].angle) * this.balls[1].mass
		// const part1D = Math.pow(this.balls[1].angularVelocity ,2) * this.length + Math.pow(this.balls[0].angularVelocity ,2) * this.length * Math.cos(this.balls[0].angle - this.balls[1].angle)
		// console.log(part1A, part1B, part1C, part1D)
		// const noemner1 = this.length * (2 * this.balls[0].mass + this.balls[1].mass - this.balls[1].mass * Math.cos(2 * this.balls[0].angle - 2 * this.balls[1].angle))
 		
		// this.balls[0].angularAcceleration = (part1A + part1B + part1C + part1D) / noemner1



		// const part2A = 2 * Math.sin(this.balls[0].angle - this.balls[1].angle)
		// const part2B = Math.pow(this.balls[0].angularVelocity, 2) * this.length * (this.balls[0].mass + this.balls[1].mass)
		// const part2C = settings.g * (this.balls[0].mass + this.balls[1].mass) * Math.cos(this.balls[0].angle)
		// const part2D = Math.pow(this.balls[1].angularVelocity, 2) * this.length * this.balls[1].mass * Math.cos(this.balls[0].angle - this.balls[1].angle)
		

		// this.balls[1].angularAcceleration = (part2A * (part2B + part2C + part2D))/ noemner1
		


		this.balls.forEach(ball => ball.updateAngle())
	}

	update() {
		this.updateLocations()

		this.updateAngles()


		this.getColor()
	}

	getColor() {
		const r = Math.min(255, 127 + 127 * Math.cos(this.balls[1].angle) * Math.sin(this.balls[0].angle))
		const g = Math.min(255, 127 + 127 * Math.sin(this.balls[1].angle) * Math.sin(this.balls[0].angle))
		const b = Math.min(255, 127 + 127 * Math.cos(this.balls[0].angle))

		this.color = {r,g,b}

		return this.color
	}

} 