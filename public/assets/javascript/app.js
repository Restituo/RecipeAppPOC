
var ingredients = [];

$("#find-ingredient").on("click", function (event) {
	event.preventDefault();
	// create variable for ingredients input #ingredient-input
	var ingredient = $('#ingredient-input').val();

	// add value from input to ingredients array
	ingredients.push(ingredient);

	// create a list item for the ingredient
	var ingredientListItem = $("<li>").html(ingredient);

	// append ingredient to ingredients list 
	$('.ingredients-list').append(ingredientListItem);
	$('#ingredient-input').val("");
});

// This .on("click") function will trigger the AJAX Call
$("#find-recipe").one("click", function (event) {

	// event.preventDefault() can be used to prevent an event's default behavior.
	// Here, it prevents the submit button from trying to submit a form when clicked
	event.preventDefault();

	// Here we grab the ingredients from the ingredients array
	var recipe = ingredients;

	// Here we construct our URL
	var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=3d68d15b&app_key=ff6536114baba9fa9737d7daa7776171&from=0&to=3";

	// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
	// and display it in the div with an id of recipe-view
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
	
		for (var i = 0; i < response.hits.length; i++){
			console.log(response)
			console.log(response.hits[i].recipe.image);
			console.log(response.hits[i].recipe.label);
			console.log(response.hits[i].recipe.url);


			var recipeDiv = $("<div class='col-sm panel'>");

			var title = response.hits[i].recipe.label;
			// var time = "Total time: " + response.hits[i].recipe.totalTime + " minutes";
			var image = response.hits[i].recipe.image;
			var urlLink = response.hits[i].recipe.url;

			//creating an image tag for the recipe picture
			var foodImage = $("<img>");
			foodImage.addClass("recipe-image");
			foodImage.attr("src", image);
			foodImage.attr("width", "300px");
			
			//variables that hold the picture, title and time to cook
			var recipePicture = $("<a>").html(foodImage).attr("href", urlLink).attr("target", "_new");
			var recipeTitle = $("<p>").text(title);
			recipeTitle.addClass("recipe-name");

			var favoriteButton = $("<input>").addClass("favorite-button btn btn-warning");
			var star = '\u2b50';
			favoriteButton.attr("value", star);
			favoriteButton.attr("type", "submit");

			var favoriteTrigger = $("<form>").attr("action", "/update");
			favoriteTrigger.attr("method", "POST");

			favoriteTrigger.append(favoriteButton);

			recipePicture.append(favoriteTrigger);


			// var recipeTime = $("<p>").text(time);
			
			//appending the picture, title and time to browser
			recipeDiv.append(recipePicture, recipeTitle);
			recipeDiv.addClass("panel-body recipe-card");
			$("#recipe-view").append(recipeDiv);
		}
	});
});