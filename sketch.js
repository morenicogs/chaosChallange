
// TODO Implement CCapture
function preload() {
	if(settings.chaos.active) {
		addChaosSettings()
	}

	if(settings.matrix.active) {
		addMatrixSettings()
	}
	
	if(settings.fractal.active) {
		addFractalSettings()
	}

	addAnimationSettings()
}


function setup() {
	createCanvas(windowWidth, windowHeight);

	if(settings.chaos.active) {
		settings.grid = new Chaos(width, height)
	}

	if(settings.matrix.active) {
		settings.grid = new Matrix(width, height)
	}

	if(settings.fractal.active) {
		settings.grid = new Grid(width, height)
	}
  
//   settings.grid = new Matrix(width, height, 20)
//   settings.grid = new Grid(width, height)
//   settings.grid = new Chaos(width, height)

//   frameRate(1)
}
    
function draw() {
  	// background(220);
	  pixelDensity(3)
	
	settings.grid.display()
	settings.grid.update()
 	// settings.pendulums.forEach(pendulum => {
	// 	pendulum.update()
	// })

	// settings.pendulums.forEach(pendulum => {
	// 	pendulum.display()
	// })
	if(!settings.animation) {
		if(frameCount !== 1) {
			noLoop()
		}
	} else {
		loop()
	}

	if(frameCount == 1) {
		// redraw()
	}
}
