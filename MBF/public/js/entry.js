$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var logInput = $("#logText");
  var dateInput = $("#reminderDate");
  var logList = $("tbody");
  var id = $("1");
  var logContainer = $(".log-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#log-form", handleLogFormSubmit);
  $(document).on("click", ".delete-log", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getLogs();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleLogFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !logInput
        .val()
        .trim()
        .trim() &&
      !dateInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertLog({
      log: logInput.val().trim(),
      date: dateInput.val().trim(),
      PetId: id.val().trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertLog(logData) {
    $.post("/api/entries", logData).then(getLogs);
  }

  // Function for creating a new list row for authors
  function createLogRow(logData) {
    var newTr = $("<tr>");
    newTr.data("log", logData);
    newTr.append("<td>" + logData.log + "</td>");
    newTr.append("<td>" + logData.date + "</td>");
    newTr.append("<td><a href='/addLog.html'>Create a Post</a></td>");
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-log'>Delete Log</a></td>"
    );
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getLogs() {
    $.get("/api/entries", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createLogRow(data[i]));

        console.log("this is data" + data[i]);
      }
      renderLogList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderLogList(rows) {
    logList
      .children()
      .not(":last")
      .remove();
    logContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      logList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Log before you can create a Post.");
    logContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("log");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/entries/" + id
    }).then(getLogs);
  }
});
