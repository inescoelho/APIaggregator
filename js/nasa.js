updateHistory();

document.getElementById('search').getElementsByTagName('button')[0].addEventListener('click', function() {
	processInput(getInput());
});

document.getElementById('search').getElementsByTagName('input')[0].addEventListener('keypress', function(e) {
	if(e.keyCode === 13) {
		processInput(getInput());
	}
})

function processInput(input) {
	getImages(input);
	addSearchtoStorage(input);
	updateHistory();
}

function getInput() {
	//get user input or set default input
	let userInput = document.getElementById('search').getElementsByTagName('input')[0].value;
	return (userInput !== "") ? userInput : "moon";
}

function getImages(input) {
	addLoading();

	//set title
	var title = document.getElementById('result').getElementsByTagName('h2')[0];
	title.innerHTML = "";
	title.innerHTML = `Results for ${input}`;

	fetch("https://images-api.nasa.gov/search?q=" + input.replace(" ", "+"))
		.then(function(r) {
			console.log(r);
			return r.json();
		})
		.then(function(r) {
			console.log(r);

			var results = r.collection.items;
			console.log(results);
			if(results.length == 0)
				processNoResults();
			else
				addResults(results);
		}),
		function (err) {
			processNoResults();
    };
}

function processNoResults() {
	var text = document.getElementById('resultList');
	text.innerHTML = "";
	text.append("No results found");
}

function addResults(results) {
	var div = document.getElementById('resultList');
	//clean previous results
	div.innerHTML = "";

	results.forEach(function(r) {
		//get data
		let href = r.links[0].href;
		let desc = r.data[0].description;

		//create div
		let el = document.createElement('div');
		el.className += "col-md-4 col-sm-6";
		//create anchor element
		let anchor = document.createElement('a');
		anchor.href = `${href}`;
		anchor.className += "d-block mb-4 h-100";
		anchor.innerHTML = `<img src="${href}" class="img-fluid img-thumbnail" width='100%' data-toggle="tooltip" title="${desc}">`;
		//add elements to list
		el.appendChild(anchor);
		div.appendChild(el);
	});
}

function addLoading() {
	var text = document.getElementById('resultList');
	text.innerHTML = "";
	text.append("Loading...");
}

function getHistory() {
	var historyObj = { searches: [] };
	if(localStorage.getItem('history') != null) {
	    historyObj = JSON.parse(localStorage.getItem('history'));
	}
	return historyObj;
}

function addSearchtoStorage(dataToSave) {
	var historyObj = getHistory();
	var index = historyObj.searches.indexOf(dataToSave);
	
	if (historyObj.searches.indexOf(dataToSave) !=-1) {
	 	historyObj.searches.splice(index, 1);

	}
	historyObj.searches.push(dataToSave);

	//keep only 10 elements in memory
	if (historyObj.searches.length > 10) {
    	historyObj.searches.splice(0, 1);
	}
	localStorage.setItem('history',JSON.stringify(historyObj));
}

function updateHistory() {
	var history = getHistory();

	if (history.searches.length > 0) {
		var div = document.getElementById("history");
		div.innerHTML = "<h4>Past searches: "

		for (var i=0; i < history.searches.length; i++) 
			div.innerHTML += `<button type="button" class="btn btn-link" onclick="processInput('${history.searches[i]}');return false;">${history.searches[i]} </button>`;

		div.innerHTML += "</h4>"
	}
}