
// TODO create grid with angle1 and angle2 as x and y axis
// TODO Implement CCapture



function setup() {
  createCanvas(windowWidth, windowHeight);
  settings.grid = new Matrix(width, height, 20)

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
