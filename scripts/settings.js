const settings = {
	pendulums: [],
	g: 9.81/100,
	ball: {
		size: 0,
		mass: .001
	},
	pendulum: {
		length: 100,
	},
	grid: {},
	animation: false,
	matrix: {
		active: false,
		detail: 20,
		strokeW: 5,
	},
	chaos: {
		active: false,
		samples: 20,
		conditions: {
			mass: 0.001,
			length: 100.1
		}
	},
	fractal: {
		active: false,
		pixelDensity: 3,
	},
}

const pane = new Tweakpane.Pane();


// pane.addInput(settings.ball, "size")
// pane.addInput(settings.ball, "mass")
// pane.addInput(settings.pendulum, "length")

// pane.addButton({title: "Apply Settings",})
// 	.on("click", () => syncSettings())
// pane.addButton({title: "Next step",})
// 	.on("click", () => redraw())
// pane.addButton({title: "Toggle Animation",})
// 	.on("click", () => {
// 		settings.animation = !settings.animation
// 		redraw()
// 	})

function syncSettings() {
	for (const pendulum of settings.pendulums) {
		pendulum.balls.forEach(ball => {
			ball.mass = settings.ball.mass
		});

		pendulum.length.first = settings.pendulum.length
		pendulum.length.second = settings.pendulum.length
		
		pendulum.updateLocations()
	}
}

function normalizeAngle(angle) {
	let newAngle = angle % (2 * Math.PI )

	if(newAngle > 0 && newAngle > Math.PI) {
		newAngle -= 2 * Math.PI
	} else if(newAngle < 0 && newAngle < -Math.PI) 
		newAngle += 2 * Math.PI
	return newAngle
}

function addMatrixSettings() {
	pane.addInput(settings.matrix, "detail")
	pane.addInput(settings.matrix, "strokeW")
	pane.addButton({title: "New Matrix",})
	.on("click", () => {
		settings.pendulums = []
		settings.grid = new Matrix(width, height)
		redraw()
	})
}

function addChaosSettings() {
	const pendOne = pane.addFolder({
		title: 'Initial Conditions',
	});
	pendOne.addInput(settings.ball, "mass")
	pendOne.addInput(settings.pendulum, "length")


	const pendTwo = pane.addFolder({
		title: 'Compare with',
	});
	pendTwo.addInput(settings.chaos.conditions, "mass")
	pendTwo.addInput(settings.chaos.conditions, "length")
	pane.addInput(settings.chaos, "samples")

	pane.addButton({title: "New Comparison",})
	.on("click", () => {
		settings.pendulums = []
		settings.grid = new Chaos(width, height)
		redraw()
	})
}

function addFractalSettings() {
	pane.addInput(settings.ball, "mass")
	pane.addInput(settings.pendulum, "length")
	pane.addInput(settings, "g")
	pane.addInput(settings.fractal, "pixelDensity")


	pane.addButton({title: "Update Simulation",})
		.on("click", () => syncSettings())
	pane.addButton({title: "New Simulation",})
		.on("click", () => {
			settings.pendulums = []
			settings.grid = new Grid(width, height)
			redraw()
		})
}

function addAnimationSettings() {
	pane.addSeparator();
	pane.addButton({title: "Next step",})
		.on("click", () => redraw())
	pane.addButton({title: "Toggle Animation",})
		.on("click", () => {
			settings.animation = !settings.animation
			redraw()
		})
}