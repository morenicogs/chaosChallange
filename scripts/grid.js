class Grid {
	constructor(w, h) {
		this.size = {width: w, height: h }
		// this.deltaAngle = 2/size // Will be multiplied with PI 
		this.img = createImage(this.size.width, this.size.height)
		// this.img.loadPixels()

		this.createGrid()
	}

	createGrid() {
		this.img.loadPixels()
		for (let y = 0; y < this.size.height; y++) {
			for (let x = 0; x < this.size.width; x++) {
				const firstAngle = -Math.PI + ((1/this.size.height) * y * 2 * Math.PI)
				const secondAngle = -Math.PI + ((1/this.size.width) * x * 2 * Math.PI)
				
				const myPendulum = new Pendulum(width/2, height/2, settings.pendulum.length, firstAngle, secondAngle)
				// const myColor = myPendulum.getColor()
				const pixelIndex = x * y * 4
				this.img.pixels[pixelIndex] = myPendulum.color.r
				this.img.pixels[pixelIndex + 1] = myPendulum.color.g
				this.img.pixels[pixelIndex + 2] = myPendulum.color.b
				this.img.pixels[pixelIndex + 3] = 255


				settings.pendulums.push(myPendulum)
			}
			
		}
		this.img.updatePixels()

	}

	display() {
		image(this.img, 0,0)
	}

	update() {
		this.img.loadPixels()

		for (let i = 0; i < settings.pendulums.length; i++) {
			const myPendulum = settings.pendulums[i];
			myPendulum.update()

			const pixelIndex = i * 4
			this.img.pixels[pixelIndex] = myPendulum.color.r
			this.img.pixels[pixelIndex + 1] = myPendulum.color.g
			this.img.pixels[pixelIndex + 2] = myPendulum.color.b
			this.img.pixels[pixelIndex + 3] = 255
		}
		
		this.img.updatePixels()
		
	}
}