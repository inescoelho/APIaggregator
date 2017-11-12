function searchResults () {
  var input = $("#query").val();
  console.log(input);
  
  if (input != '') {
     getResults(input);
  }
  else {
    $("#results").empty();
    $("#results").addClass("text-center");
    $("#results").hide().append("<h2>Please introduce text</h2>").fadeIn(1000);
  }
}

function getResults(input) {
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
      
      //clean results on screen
      $("#results").empty();
      
      if (data[1].length == 0) {
        $("#results").addClass("text-center");
        $("#results").hide().append("<h2>No results found.</h2>").fadeIn(1000);
      }
      else {
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