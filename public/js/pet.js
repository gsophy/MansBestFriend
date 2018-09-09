$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var nameInput = $("#petName");
    var typeInput = $("#petType");
    var ageInput = $("#petAge")
    var petList = $("tbody");
    var petContainer = $(".pet-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#pet-form", handlePetFormSubmit);
    $(document).on("click", ".delete-pet", handleDeleteButtonPress);
  
    // Getting the initial list of Authors
    getPets();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handlePetFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim() && !typeInput.val().trim().trim() && !ageInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertPet({
        name: nameInput
            .val()
            .trim()
        ,
        age: ageInput
            .val()
            .trim()
        ,
        type: typeInput
            .val()
            .trim(),
      });
    }
  
    // A function for creating an author. Calls getAuthors upon completion
    function upsertPet(petData) {
      $.post("/api/pets", petData)
        .then(getPets);
    }
  
    // Function for creating a new list row for authors
    function createPetRow(petData) {
      var newTr = $("<tr>");
      newTr.data("pet", petData);
      newTr.append("<td>" + petData.name + "</td>");
      newTr.append("<td>" + petData.age + "</td>");
      newTr.append("<td>" + petData.type + "</td>");
      newTr.append("<td><a href='/logs.html'>Go to Posts</a></td>");
      newTr.append("<td><a href='/addLog.html'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-pet'>Delete Pet</a></td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getPets() {
      $.get("/api/pets", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createPetRow(data[i]));

          console.log("this is data" + data[i])
        }
        renderPetList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderPetList(rows) {
      petList.children().not(":last").remove();
      petContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        petList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Pet before you can create a Post.");
      petContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("pet");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/pets/" + id
      })
        .then(getPets);
    }
  });
  