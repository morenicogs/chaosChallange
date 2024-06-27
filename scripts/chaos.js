class Chaos { 
	constructor(w, h) {
		this.size = {width: w, height: h }
		this.samples = settings.chaos.samples
		this.diffMass = settings.chaos.conditions.mass - settings.ball.mass
		this.diffLength = settings.chaos.conditions.length - settings.pendulum.length

		this.createChaos()
	}

	createChaos() {
		for (let i = 0; i <= this.samples; i++) {
			// const element = array[i];
			const factor = i / this.samples

			const myPendulum = new Pendulum(this.size.width/2, this.size.height/2, settings.pendulum.length, Math.PI*3/4, Math.PI*3/4)
			myPendulum.length.first += (factor * this.diffLength)
			myPendulum.length.second -= (factor * this.diffLength)

			myPendulum.balls[0].mass += (factor * this.diffMass)
			myPendulum.balls[1].mass -= (factor * this.diffMass)

			myPendulum.updateLocations()


			settings.pendulums.push(myPendulum)

		}
	}

	display() {
		strokeWeight(3)
		settings.pendulums.forEach(p => p.display())
	}

	update() {
		settings.pendulums.forEach(p => p.update())
	}
}