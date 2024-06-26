class Matrix{
	constructor(w, h, detail) {
		this.size = {width: w, height: h }
		this.detail = detail
		this.cols = Math.floor(width/this.detail)
		this.rows = Math.floor(height/this.detail)

		this.createGrid()
	}

	createGrid() {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				const firstAngle = -Math.PI + ((1/this.rows) * row * 2 * Math.PI)
				const secondAngle = -Math.PI + ((1/this.cols) * col * 2 * Math.PI)
				
				const originX =  col * this.detail + this.detail/2//(1/this.cols) *
				const originY = row * this.detail + this.detail/2 //(1/this.rows) * 

				const myPendulum = new Pendulum(originX, originY, this.detail/2, firstAngle, secondAngle)

				settings.pendulums.push(myPendulum)
			}
			
		}
	}

	display() {
		strokeWeight(5)
		settings.pendulums.forEach(p => p.display())
	}

	update() {
		settings.pendulums.forEach(p => p.update())
	}

}