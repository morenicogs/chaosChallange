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
	animation: false
}

const pane = new Tweakpane.Pane();


pane.addInput(settings.ball, "size")
pane.addInput(settings.ball, "mass")
pane.addInput(settings.pendulum, "length")

pane.addButton({title: "Sync Settings",})
	.on("click", () => syncSettings())
pane.addButton({title: "Next step",})
	.on("click", () => redraw())
pane.addButton({title: "Toggle Animation",})
	.on("click", () => settings.animation = !settings.animation)

function syncSettings() {
	for (const pendulum of settings.pendulums) {
		pendulum.balls.forEach(ball => {
			ball.mass = settings.ball.mass
			ball.radius = settings.ball.size
		});

		pendulum.length = settings.pendulum.length	
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