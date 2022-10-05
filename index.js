let main = document.querySelector("main");
//TODO: change this to Oct 5 when you're done testing!
let startDate = new Date("October 1, 2022");
let now = Date.now();

let tinyThingTitles = [
	"cupcake sprinkles",
	"a button on a TV remote",
	"a chewable vitamin",
	"an eraser",
	"a gum wrapper",
	"a bitcoin",
	"a spy camera",
	"a pigeonhole",
	"a dog tag",
	"Rhode Island (on a map)",
	"a one-letter word",
	"a nail art design",
	"freckles",
	"the eye of a sewing needle",
	"a thimble",
	"a coat button",
	"a pearl onion",
	"the last bite of a cookie",
	"a tooth filling",
	"the date on a penny",
	"a garbanzo bean",
	"an apple stem",
	"a chocolate chip",
	"a snowflake",
	"a cornflake",
	"a robin's egg",
	"a tiger's claw"
];

for (let i = 0; i < 365; i++) {
	let tinyThingContainer = document.createElement("div");
	tinyThingContainer.classList.add("tinyThingContainer");

	let releaseDate = new Date(startDate);
	releaseDate.setDate(releaseDate.getDate() + i);
	let releaseDateString = releaseDate.toLocaleDateString("en-US");

	let remainingTime = releaseDate - now;

	let tinyThingTitle = "";

	// days left (for anything longer than 48 hours)
	if (remainingTime > 86400000 * 2) {
		tinyThingTitle = `Check back in ${Math.floor(remainingTime / 86400000)} days.`;
	}
	// hours left
	else if (remainingTime > 0) {
		tinyThingTitle = `Check back in ${Math.floor(remainingTime / 3600000)} hours.`;
	}
	// no time left
	else if (tinyThingTitles.length > i) {
		tinyThingTitle = `"${tinyThingTitles[i]}"`;
		AppendSVG(tinyThingContainer, i);
	}
	// oops
	else {
		tinyThingTitle = "Something went wrong! Ask Matt about it."
	}

	let text = document.createElement("div");
	text.classList.add("label");
	text.innerHTML = `${releaseDateString}<br/>${tinyThingTitle}`;
	tinyThingContainer.appendChild(text);

	main.appendChild(tinyThingContainer);
}

function AppendSVG(container, index) {
	fetch(`SVGs/tinyThing${index}.svg`)
		.then(response => response.text())
		.then((data) => {
			let svg = document.createElement("div");
			svg.innerHTML = data;
			container.appendChild(svg);
		});
}

//////////////////////////////////////////////////////////

// hacky timeout lol
setTimeout(() => {
	
	// controls how often the effect is applied
	let frameInterval = 300;
	let variance = 100;

	// controls how far the points are allowed to move
	let effectScale = 2;

	// controls the type of points that are affected
	// this is just trial-and-error; some types cause unattractive movement
	let typesToAffect = ["m"];

	// record the original positions for every point
	let paths = document.querySelectorAll("path");
	let data = [];
	for (let i = 0; i < paths.length; i++) {
		data[i] = paths[i].getPathData();
	}

	// randomize positions for every point
	// (or, at least, every point allowed by typesToAffect)
	setInterval(() => {
		let clonedData = structuredClone(data); // deep clone necessary to preserve original data
		for (let i = 0; i < clonedData.length; i++) {
			let pathData = clonedData[i];
			for (let j = 0; j < pathData.length; j++) {
				let pointData = pathData[j].values;
				let pointType = pathData[j].type;
				if (typesToAffect.includes(pointType.toLowerCase())) {
					for (let k = 0; k < 2; /* only to 2 here because that's x & y */ k++) {
						pointData[k] += Math.random() * effectScale;
					}
				}
			}
			paths[i].setPathData(pathData);
		}
	}, (Math.random() * variance) + (frameInterval - (variance / 2)));
}, 1000);