function cleanResults() {
  $("#results").empty();
}

function addMessage(value) {
  var txt = "";

  switch(value) {
    case 0:
        txt = "No results found.";
        break;
    case 1:
        txt = "Please introduce what to search.";
        break;
    case 2:
        txt = "Loading...";
  }

  cleanResults();
  $("#results").addClass("text-center");
  $("#results").hide().append("<h2>"+ txt +"</h2>").fadeIn(1000);
}

function searchResults () {
  var input = $("#query").val();
  console.log(input);
  
  if (input != '') {
     getResults(input);
  }
  else {
    addMessage(1);
  }
}

function getResults(input) {
  addMessage(2);

  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      action: 'opensearch',
      search: input,
      limit: 10,
      format: 'json'
    },
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      
      if (data[1].length == 0) {
        addMessage(0);
      }
      else {
        cleanResults();
        $("#results").append("<ul class='list-unstyled' id='resultsList'></ul>");
        for (var i = 0; i < 10; i++) {
          if (typeof data[1][i] !== "undefined") {
            var item = "<li><a href='" + data[3][i] + "' target='_blank'><b>" + data[1][i] + "</b><br><small>" + data[2][i] + "</small></a></li>";
            $("#resultsList").hide().append(item).fadeIn(1000);
          }
        }

      }
    }
  });
}