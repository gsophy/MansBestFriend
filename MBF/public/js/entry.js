//This code runs when the submit button is clicked
$(#add-btn).on("click", function (event) {
	event.preventDefault();

var newPetJournal = {
	name: $("#name").val().trim(),
	journal: $("journal").val().trim(),
	date: $("date").val().trim()
};

//send Ajax post request
$.post("/api-routes", newPetJournal)
	.then(function(data) {
		alert ("Adding Journal Entry...")
	});

$("#name").val("");
$("#journal").val("");
console.log(data);
});