class Ball {
	constructor(x, y, m, r, a) {
		this.position = createVector(x, y)
		this.mass = m
		this.radius = r
		this.angle = a
		this.angularVelocity = 0
		this.angularAcceleration = 0
	}

	display() {
		push()
		noStroke()
		fill("red")
		circle(this.position.x, this.position.y, this.radius * 2)
		pop()
	}

	updateAngle() {
		this.angularVelocity = this.angularVelocity + this.angularAcceleration
		this.angle = this.angle  + this.angularVelocity

		this.angularAcceleration = 0

		this.angularVelocity = normalizeAngle(this.angularVelocity)
		this.angle = normalizeAngle(this.angle)
	}
}