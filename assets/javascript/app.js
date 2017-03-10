topics = ["eye-roll", "whatever", "excited", "annoyed", "mad"];

function generateButton(){
	var button = $("<button>");
		button.text(topics[i]);
	$("#button-holder").append(button);
}

for(var i = 0; i < topics.length; i++){
	generateButton();
}


$(document).on("click", "button", function() {

	var buttonVal = $(this).text();

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	buttonVal + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log("this is the value of the button: " + buttonVal);
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function (response){
		console.log(response.data[0].images);
		$("#giphy-holder").empty();
		for(var i = 0; i < response.data.length; i++){
 		
	 		var img = $("<img>").attr({
	            "id": "Image-" + i,
	            "src": response.data[i].images.fixed_height_still.url,
	            "alt": buttonVal,
	        }).appendTo("#giphy-holder");		
 		}

		// $("#giphy-holder").html(response);
	}).fail(function() {
		console.log("something went wrong");
	});

});


// generateButton();
