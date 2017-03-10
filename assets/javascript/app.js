//keywords to render buttons at start of app
topics = ["eye-roll", "flirt", "excited", "annoyed", "mad", "love", "anxious", "exhausted", "crying"];

function generateButton() {
	var button = $("<button>");
	button.text(topics[i]);
	$("#button-holder").append(button);
}
for (var i = 0; i < topics.length; i++) {
	generateButton();
}
$(document).on("click", "button", function() {
	var buttonVal = $(this).text();
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=dc6zaTOxFJmzC&limit=10";
	//make api call using text on button
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		//prevents buildup of gifs, refreshes when button is pressed
		$("#giphy-holder").empty();
		//loops through response obj that was returned 		
		for (var i = 0; i < response.data.length; i++) {
			var div = $("<div>").attr("id", "data-image-" + i);
			div.addClass("div-box");
			$("#giphy-holder").append(div);
			var img = $("<img>").attr({
				"id": "Image-" + i,
				"src": response.data[i].images.fixed_height_still.url,
				"alt": buttonVal,
				//to handle pausing and replaying gifs
				"data-animated": response.data[i].images.fixed_height.url,
				"data-still": response.data[i].images.fixed_height_still.url,
				"data-state": "still",
			}).appendTo(div);
			//adds rating to the bottom of ea image
			var rating = $("<p> Rated: " + response.data[i].rating.toUpperCase() + "</p>");
			rating.appendTo(div);
			//i want <div class="box"><img ...><p></p></div>
		}
	}).fail(function() {
		console.log("something went wrong");
	});
});
//pauses and replays gifs depending on data-state
$(document).on("click", "img", function() {
	if ($(this).attr("data-state") === "still") {
		$(this).attr("src", $(this).attr("data-animated"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});
/*takes user input and creates dynamic button, 
button will then make api call bc of element name */
$(document).on("click", "#user-button", function() {
	event.preventDefault();
	var userMood = $("#user-input").val().trim();
	var userButton = $("<button>");
	userButton.text(userMood);
	$("#button-holder").append(userButton);
});