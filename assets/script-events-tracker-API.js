var concertEventsData;

async function userSearch() {

	if(document.getElementById('search-results') !== null) {
        document.getElementById('search-results').remove();
    }

	if(document.getElementById('no-result-message') !== null) {
        document.getElementById('no-result-message').remove();
    }

	document.querySelectorAll('[id^="narrow-search"]').forEach((element) => { element.remove() })
	document.querySelectorAll('[id^="artist-image"]').forEach((element) => { element.remove() })
	document.querySelectorAll('[id^="artist-header"]').forEach((element) => { element.remove() })

	var searchInput = document.getElementById('search-artist').value;
	console.log(searchInput);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '5ac5fba21cmshac3770b600a15c1p1f2a5cjsned074628e89a',
			'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
		}
	};

	// display search results and then another field to further narrow by zipcode or city.
	// FETCH BY ARTIST NAME
	await fetch('https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=' + searchInput, options)
		.then(response => response.json())
		.then(response => {concertEventsData = response;})
		.then(() => console.log(concertEventsData))
		.catch(err => console.error(err));

	var noResult = document.createElement('div');
	noResult.setAttribute('id', 'no-result-message');
	noResult.setAttribute('style', 'text-align: center; font-size: 24px');

	noResult.innerHTML = 'No Events Found For This Artist';

	if(concertEventsData.data.length === 0) {
		console.log('No Events Found For This Artist')
		document.getElementById('search-results-container').appendChild(noResult);
	}

	var divResults = document.createElement('div');
	divResults.setAttribute('id', 'search-results');

	var divArtistImage = document.createElement('div');
	var artistName = document.createElement('h2');
	artistName.setAttribute('id', 'artist-header');
	artistName.setAttribute('style', 'text-align: center');
	artistName.innerHTML = "ARTIST: " + searchInput.toUpperCase();

	divArtistImage.setAttribute('id', 'artist-image');
	divArtistImage.setAttribute('style', 'text-align: center');
	divArtistImage.innerHTML = "<img src='" + concertEventsData.data[0].image + "'>";

	var narrowSearchContainer = document.createElement('div');
	narrowSearchContainer.setAttribute('id', 'narrow-search');
	narrowSearchContainer.setAttribute('style', 'text-align: center');
	narrowSearchContainer.innerHTML = 'Narrow your search: ';


	var narrowSearchField = document.createElement('input');
	narrowSearchField.setAttribute('id', 'narrow-search-field');
	narrowSearchField.setAttribute('placeholder', 'Type Your Postal Code');

	var narrowSearchButton = document.createElement('button');
	narrowSearchButton.setAttribute('id', 'narrow-search-button');
	narrowSearchButton.setAttribute('onclick', 'narrowSearch()');
	narrowSearchButton.innerHTML = 'Narrow Results';


	document.getElementById('search-results-container').appendChild(artistName);
	document.getElementById('search-results-container').appendChild(divArtistImage);
	document.getElementById('search-results-container').appendChild(narrowSearchContainer);
	document.getElementById('narrow-search').appendChild(narrowSearchField);
	document.getElementById('narrow-search').appendChild(narrowSearchButton);

    document.getElementById('search-results-container').appendChild(divResults);

	for(var i = 0; i < concertEventsData.data.length; i++) {

		var divResultItem = document.createElement('div');
		divResultItem.setAttribute('id', 'search-result-item' + i);
		divResultItem.setAttribute('class', 'result-item');
		document.getElementById('search-results').appendChild(divResultItem);

		var descriptionText = document.createElement('p');
		descriptionText.innerHTML = concertEventsData.data[i].description;
		// document.getElementById('search-results').appendChild(descriptionText);
		document.getElementById('search-result-item' + i).appendChild(descriptionText);

		var startText = document.createElement('p');
		startText.innerHTML = "START DATE: " + concertEventsData.data[i].startDate;
		// document.getElementById('search-results').appendChild(startText);
		document.getElementById('search-result-item' + i).appendChild(startText);

		var endText = document.createElement('p');
		endText.innerHTML = "END DATE: " + concertEventsData.data[i].endDate;
		// document.getElementById('search-results').appendChild(endText);
		document.getElementById('search-result-item' + i).appendChild(endText);

		var locationName = document.createElement('p');
		locationName.innerHTML = concertEventsData.data[i].location.name;
		// document.getElementById('search-results').appendChild(locationName);
		document.getElementById('search-result-item' + i).appendChild(locationName);

		var locationAddress = document.createElement('p');
		locationAddress.innerHTML =  concertEventsData.data[i].location.address.streetAddress + " " +
			concertEventsData.data[i].location.address.addressLocality + " " +
			concertEventsData.data[i].location.address.postalCode + " " +
			concertEventsData.data[i].location.address.addressCountry;
		// document.getElementById('search-results').appendChild(locationAddress);
		document.getElementById('search-result-item' + i).appendChild(locationAddress);

		var saveButton = document.createElement('button');
		saveButton.setAttribute('id', 'save-event-button' + i);
		saveButton.setAttribute('class', 'save-button-style');
		// saveButton.setAttribute('onclick', 'saveToList()');
		saveButton.innerHTML = "Save Event!"
		// divResultItem.setAttribute('class', 'result-item');
		document.getElementById('search-result-item' + i).appendChild(saveButton);


		document.getElementById('save-event-button' + i).addEventListener("click", function(event) {
			// console.log("CLICKED!");
			// console.log("button id: " + event.target.id);
			var saveButtonClicked = event.target.id;
			var saveButtonClickedParent = event.target.parentNode.id;
			// console.log("button stored in variable: id is: " + saveButtonClicked);
			// console.log(saveButtonClickedParent);
			var savedButton = document.getElementById(saveButtonClicked);
			savedButton.setAttribute('style', 'background-color: #4C4E52');
			
			var paragraphs = document.querySelectorAll('#' + saveButtonClickedParent + ' p');
			paragraphTexts = [];
			// console.log(paragraphs.innerHTML);

			paragraphs.forEach(function(paragraph) {
				paragraphTexts.push(paragraph.innerHTML);
			});

			console.log(paragraphTexts);
			localStorage.setItem(saveButtonClickedParent, JSON.stringify(paragraphTexts));

			savedButton.innerHTML = "Saved!";
			saveButton.disabled = true;
		});

	}

}

function narrowSearch() {

	console.log("NARROW SEARCH BUTTON CLICKED!");

	var narrowSearchValue = document.getElementById('narrow-search-field').value;
	console.log(narrowSearchValue);

	if(document.getElementById('search-results') !== null) {
		for(var i = 0; i < concertEventsData.data.length; i++){
			document.querySelectorAll('[id^="search-result-item"]').forEach((element) => { element.remove() })
		}
    }

	if(document.getElementById('no-result-message') !== null) {
        document.getElementById('no-result-message').remove();
    }

	for(var i = 0; i < concertEventsData.data.length; i++) {
		if(concertEventsData.data[i].location.address.postalCode === narrowSearchValue) {
			console.log("MATCHING SEARCH VALUE FOUND: " + narrowSearchValue);

			var divResultItem = document.createElement('div');
			divResultItem.setAttribute('id', 'search-result-item' + i);
			divResultItem.setAttribute('class', 'result-item');
			document.getElementById('search-results').appendChild(divResultItem);
	
			var descriptionText = document.createElement('p');
			descriptionText.innerHTML = concertEventsData.data[i].description;
			document.getElementById('search-result-item' + i).appendChild(descriptionText);
	
			var startText = document.createElement('p');
			startText.innerHTML = "START DATE: " + concertEventsData.data[i].startDate;
			document.getElementById('search-result-item' + i).appendChild(startText);
	
			var endText = document.createElement('p');
			endText.innerHTML = "END DATE: " + concertEventsData.data[i].endDate;
			document.getElementById('search-result-item' + i).appendChild(endText);
	
			var locationName = document.createElement('p');
			locationName.innerHTML = concertEventsData.data[i].location.name;
			document.getElementById('search-result-item' + i).appendChild(locationName);
	
			var locationAddress = document.createElement('p');
			locationAddress.innerHTML =  concertEventsData.data[i].location.address.streetAddress + " " +
				concertEventsData.data[i].location.address.addressLocality + " " +
				concertEventsData.data[i].location.address.postalCode + " " +
				concertEventsData.data[i].location.address.addressCountry;
			document.getElementById('search-result-item' + i).appendChild(locationAddress);
	
			var saveButton = document.createElement('button');
			saveButton.setAttribute('id', 'save-event-button' + i);
			saveButton.setAttribute('class', 'save-button-style');
			// saveButton.setAttribute('onclick', 'saveToList()');
			saveButton.innerHTML = "Save Event!"
			document.getElementById('search-result-item' + i).appendChild(saveButton);

			document.getElementById('save-event-button' + i).addEventListener("click", function(event) {
				// console.log("CLICKED!");
				// console.log("button id: " + event.target.id);
				var saveButtonClicked = event.target.id;
				var saveButtonClickedParent = event.target.parentNode.id;
				// console.log("button stored in variable: id is: " + saveButtonClicked);
				// console.log(saveButtonClickedParent);
				var savedButton = document.getElementById(saveButtonClicked);
				savedButton.setAttribute('style', 'background-color: #4C4E52');
				
				var paragraphs = document.querySelectorAll('#' + saveButtonClickedParent + ' p');
				paragraphTexts = [];
				// console.log(paragraphs.innerHTML);
	
				paragraphs.forEach(function(paragraph) {
					paragraphTexts.push(paragraph.innerHTML);
				});
	
				console.log(paragraphTexts);
				localStorage.setItem(saveButtonClickedParent, JSON.stringify(paragraphTexts));
	
				savedButton.innerHTML = "Saved!";
				saveButton.disabled = true;
			});
		}
	}
}