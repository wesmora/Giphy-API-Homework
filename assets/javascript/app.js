$(document).ready(function() {


var topics = ["Gone in 60 Seconds: 1967 Shelby Mustang GT500", "Smokey The Bandit Car", "Starsky and Hutch: 1976 Ford Gran Torino", "Back to The Future DeLorean", "The A-Team Van", "The Cannonball Run 1980 Lamborghini Countach", "The Fast and the Furious Supra", "Kit Knight Rider"];



function displayGifButtons() {
	$("#gifButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("cars");
		gifButton.addClass("main-gif-button")
		gifButton.attr("data-name", topics[i]);
		gifButton.text(topics[i]);
		$("#gifButtons").append(gifButton);
	}
}

function addButtons() {
	$("#addGif").on("click", function() {
		var car = $("#topicInput").val().trim();
		if (car === ""){
			return false;
		}

		});
}

function displayGifs() {
	var car = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=oMRqZSxD3UEaHqfGaNHDRc79h7Z2PZt2&limit=10&rating=pg";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifs").empty();
	
		var results = response.data;
		if (results === ""){
			alert("There is not a giffy for this!");	
		}
		for (var i = 0; i<results.length; i++){
			
			var gifDiv = $("<div1>");
			
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			
			$("#gifs").append(gifDiv);
		}
	});
}

displayGifButtons();
addButtons();

$(document).on("click", ".cars", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});