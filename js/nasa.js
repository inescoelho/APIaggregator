document.getElementById('search').getElementsByTagName('button')[0].addEventListener('click', function() {
	getImages();
});

document.getElementById('search').getElementsByTagName('input')[0].addEventListener('keypress', function(e) {
	if(e.keyCode === 13) {
		getImages();
	}
})

function getImages() {
	addLoading();

	//get user input or set default input
	let userInput = document.getElementById('search').getElementsByTagName('input')[0].value;
	let input = (userInput !== "") ? userInput : "moon";

	//set title
	var title = document.getElementById('result').getElementsByTagName('h2')[0];
	title.innerHTML = "";
	title.innerHTML = `Image results for ${input}`;

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

    addSearchtoStorage(input);
}

function processNoResults() {
	var text = document.getElementById('resultList');
	text.innerHTML = "";
	text.append("No results found");
}

function addResults(results) {
	var div = document.getElementById('resultList');
	div.innerHTML = "";
	var list = document.createElement('ul');
	list.setAttribute("id", "listImages");
	

	results.forEach(function(r) {
		var li = document.createElement('li');
		let href = r.links[0].href;
		let desc = r.data[0].description;
		li.innerHTML = `<a href="${href}"><img src="${href}" alt="${desc}" height='80' width='80'></a>`;
		list.appendChild(li);
	});

	div.appendChild(list);
}

function addLoading() {
	var text = document.getElementById('resultList');
	text.innerHTML = "";
	text.append("Loading...");
}

function addSearchtoStorage(input) {
	var searchHistory = localStorage.getItem("searchHistory");
	if(!searchHistory) {
		searchHistory = "";
	}

	searchHistory += "," + input;
	localStorage.setItem('searchHistory', searchHistory);
	console.log(searchHistory);
}