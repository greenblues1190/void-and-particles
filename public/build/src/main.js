

var viewCenter = view.center;
var loadItem = 11;

var sounds = [
	new Howl({ src: '../../assets/sounds/e4.mp3' }),
	new Howl({ src: '../../assets/sounds/d4.mp3' }),
	new Howl({ src: '../../assets/sounds/fsharp3.mp3' }),
	new Howl({ src: '../../assets/sounds/g4.mp3' }),
	new Howl({ src: '../../assets/sounds/a4.mp3' }),
	new Howl({ src: '../../assets/sounds/csharp3.mp3' }),
	new Howl({ src: '../../assets/sounds/fsharp4.mp3' }),
	new Howl({ src: '../../assets/sounds/a3.mp3' }),
	new Howl({ src: '../../assets/sounds/b4.mp3' })
];
for (var i = 0; i < sounds.length; i++) {
	sounds[i].preload = true;
}

/*
var sounds = new Howl({
	src: ['../../assets/sounds/e4.mp3', '../../assets/sounds/d4.mp3', '../../assets/sounds/fsharp3.mp3', '../../assets/sounds/g4.mp3', '../../assets/sounds/a4.mp3', 
	'../../assets/sounds/csharp3.mp3', '../../assets/sounds/fsharp4.mp3', '../../assets/sounds/a3.mp3', '../../assets/sounds/b4.mp3'],
	preload: true
});
*/

var keyList = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

var keyData = {
	a: {
		sound: sounds[0],
		color: '#f1c40f'
	},
	s: {
		sound: sounds[1],
		color: '#e67e22'
	},
	d: {
		sound: sounds[2],
		color: '#e74c3c'
	},
	f: {
		sound: sounds[3],
		color: '#95a5a6'
	},
	g: {
		sound: sounds[4],
		color: '#f39c12'
	},
	h: {
		sound: sounds[5],
		color: '#d35400'
	},
	j: {
		sound: sounds[6],
		color: '#1abc9c'
	},
	k: {
		sound: sounds[7],
		color: '#2ecc71'
	},
	l: {
		sound: sounds[8],
		color: '#3498db'
	}
}

var atmos1 = new Howl({
	src: ['../../assets/sounds/atmos1.mp3'],
	loop: true,
	preload: true,
	html5: true,
	volume: 0.7
});
var atmos2 = new Howl({
	src: ['../../assets/sounds/atmos2.mp3'],
	loop: true,
	preload: true,
	html5: true,
	volume: 1.0
});


// Clear listener after first call.
atmos1.once('load', function () {
	loadItem--;
});
atmos2.once('load', function () {
	loadItem--;
});
sounds[0].once('load', function () {
	loadItem--;
});
sounds[1].once('load', function () {
	loadItem--;
});
sounds[2].once('load', function () {
	loadItem--;
});
sounds[3].once('load', function () {
	loadItem--;
});
sounds[4].once('load', function () {
	loadItem--;
});
sounds[5].once('load', function () {
	loadItem--;
});
sounds[6].once('load', function () {
	loadItem--;
});
sounds[7].once('load', function () {
	loadItem--;
});
sounds[8].once('load', function () {
	loadItem--;
});

function circle(circlePath, color, distance, position) {
	this.circlePath = circlePath;
	this.color = color;
	this.distance = distance;
	this.pos = position;
}
var circles = [];
var maxSize = 80;
var bgmplay = 0;

var squaresLayer = new Layer();

var blkSquare = new Path.Rectangle({
	position: view.center,
	size: 2000,
	fillColor: 'black'
});
var whtSquare = new Path.Rectangle({
	position: view.center,
	size: 2000,
	fillColor: 'white'
});

var currentSquare = whtSquare;

var instruction = new PointText({
	position: view.center + [0, 0],
	fillColor: 'black',
	justification: 'center',
	fontSize: 20,
	content: 'Loading.. (0/11)'
});

while (loadItem == 0) {

	update();
}

var circlesLayer = new Layer();

var firstEvent = 1;
var gameflag = 0;
var bwmode = 0;
var speed = 0.97;
var squareSpeed = 1.01;

function getTrueDistance(circle1, circle2, maxDistance) {
	var center1 = circle1.circlePath.position;
	var center2 = circle2.circlePath.position;
	var radius1 = circle1.circlePath.bounds.width / 2;
	var radius2 = circle2.circlePath.bounds.width / 2;
	var a = circle1.pos.getDistance(circle2.pos);
	var b = circle2.distance - circle1.distance;
	var d = Math.sqrt(a * a + b * b);
	if (radius1 == 0 || radius2 == 0) {
		return -1;
	}
	if (d > maxDistance) {
		return -1;
	}
	if (center1.getDistance(center2) <= Math.abs(radius1 - radius2)) {
		return -1;
	}

	return {
		center1: center1,
		center2: center2,
		distance: d
	};
}

function onMouseDown(event) {
	if (loadItem > 0) {
		return;
	}

	if (bgmplay == 0) {
		atmos1.play();
		bgmplay = 1;
	}
	var point = event.point;
	var randomKey = keyList[Math.floor(Math.random() * 9)];
	var newCircle = new circle(
		new Path.Circle(point, maxSize * Math.random() + 10),
		keyData[randomKey].color,
		800,
		point
	);
	if (bwmode == 0) {
		newCircle.circlePath.fillColor = keyData[randomKey].color;
		keyData[randomKey].sound.play();
	}
	else {
		newCircle.circlePath.fillColor = 'white';
	}

	circles.push(newCircle);

	if (gameflag == 0) {
		gameflag = 1;
	}
	/*
	else if (gameflag == 1 && event.key == 'space') {
		if (bwmode == 0) {
			circlesLayer.blendMode = 'exclusion';
			bwmode = 1;
			circlesLayer.fillColor = 'white';
			atmos1.pause();
			atmos2.play();
			for (var i = 0; i < sounds.length; i++) {
				sounds[i].stop();
			}
			blkSquare.fillColor = 'white';
			whtSquare.fillColor = 'black';
			speed = 0.987;
			squareSpeed = 1.003;
		}
		else {
			bwmode = 0;
			circlesLayer.blendMode = 'normal';
			for (var i = 0; i < circles.length; i++) {
				circles[i].circlePath.fillColor = circles[i].color;
			}
			atmos2.stop();
			atmos1.play();
			blkSquare.fillColor = 'black';
			whtSquare.fillColor = 'white';
			speed = 0.97;
			squareSpeed = 1.01;
		}
	}
	*/
}

function onKeyDown(event) {
	console.log('key code: ' + event.key);

	if (keyData[event.key] && loadItem == 0) {
		if (bgmplay == 0) {
			atmos1.play();
			bgmplay = 1;
		}
		var maxPoint = new Point(view.size.width, view.size.height);
		var randomPoint = Point.random();
		var point = maxPoint * randomPoint;
		var newCircle = new circle(
			new Path.Circle(point, maxSize * Math.random() + 10),
			keyData[event.key].color,
			800,
			point
		);
		if (bwmode == 0) {
			newCircle.circlePath.fillColor = keyData[event.key].color;
			keyData[event.key].sound.play();
		}
		else {
			newCircle.circlePath.fillColor = 'white';
		}

		circles.push(newCircle);

		if (gameflag == 0) {
			gameflag = 1;
		}
	}
	else if (gameflag == 1 && event.key == 'space') {
		if (bwmode == 0) {
			circlesLayer.blendMode = 'exclusion';
			bwmode = 1;
			circlesLayer.fillColor = 'white';
			atmos1.pause();
			atmos2.play();
			for (var i = 0; i < sounds.length; i++) {
				sounds[i].stop();
			}
			blkSquare.fillColor = 'white';
			whtSquare.fillColor = 'black';
			speed = 0.987;
			squareSpeed = 1.003;
		}
		else {
			bwmode = 0;
			circlesLayer.blendMode = 'normal';
			for (var i = 0; i < circles.length; i++) {
				circles[i].circlePath.fillColor = circles[i].color;
			}
			atmos2.stop();
			atmos1.play();
			blkSquare.fillColor = 'black';
			whtSquare.fillColor = 'white';
			speed = 0.97;
			squareSpeed = 1.01;
		}
	}
}

function initialize() {
if (loadItem > 0) {
		instruction.content = 'Loading.. (' + (11 - loadItem) + '/11)';
	}
	else if (gameflag == 0) {
		if (detectmobile()) {
			// mobile
			instruction.content = 'Touch the screen';
		}
		else {
			// pc
			instruction.content = 'Click or press any key on keyline [A-L] to start\nPress spacebar to change mode';
		}
	}
}

var connections = new Group();
var connectedList = [];
function onFrame(event) {
	initialize();
	
	if (gameflag == 1) {

		if (instruction && instruction.opacity >= 0.005) {
			instruction.opacity -= 0.005;
		}
		else {
			instruction.remove();
		}
		if (currentSquare.area < 10000000) {
			currentSquare.scale(squareSpeed);
		}
		else {
			if (currentSquare == blkSquare) {
				squaresLayer.insertChild(0, blkSquare);
				whtSquare.scale(0.0005);
				currentSquare = whtSquare;
				console.log("change to white");
			}
			else {
				squaresLayer.insertChild(0, whtSquare);
				blkSquare.scale(0.0005);
				currentSquare = blkSquare;
				console.log("change to black");

			}

		}
		connections.removeChildren();
		for (var i = 0; i < circles.length; i++) {
			circles[i].circlePath.fillColor.brightness -= 0.001;
			circles[i].circlePath.scale(speed, viewCenter);
			circles[i].distance -= 4;
			if (circles[i].circlePath.area < 1) {
				circles[i].circlePath.remove();
				circles.splice(i, 1);
				i--;
			}
		}
		if (bwmode == 1) {
			for (var i = 0; i < circles.length; i++) {
				for (var j = i + 1; j < circles.length; j++) {
					var centerPoint = getTrueDistance(circles[i], circles[j], 250);
					if (centerPoint != -1) {
						connectedList.push(centerPoint);
					}
				}
				connectedList.sort(function (a, b) {
					return a.distance - b.distance;
				});
				for (var k = 0; k < 2 && k < connectedList.length; k++) {
					var connectedLine = connectedList.pop();
					var newLine = new Path.Line(connectedLine.center1, connectedLine.center2);
					newLine.strokeColor = 'white';
					connections.appendTop(newLine);
				}

				for (var k = 0; k < connectedList.length; k++) {
					connectedList.pop();
				}
			}
		}
	}
}
