var channels = ["ESL_SC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
var url = "https://wind-bow.glitch.me/twitch-api"

$('document').ready(function() {
  fetchChannelInformation();
  
  //make table row clickable
   $('tr').click(function() {
      var href = $(this).find("a").attr("href");
      if(href) {
         var win = window.open(href, '_blank');
         win.focus();
      }
   });
});

function fetchChannelInformation() {
  channels.forEach(function(ch){
    let line = document.createElement('tr');
    line.innerHTML = `<td></td><td class="align-middle"><b>${ch}</b></td><td class="align-middle"></td><td class="align-middle"></td>`;
    line.setAttribute('id', `tr${ch}`);
    document.getElementsByTagName('tbody')[0].appendChild(line);
    
    fetch(url + "/channels/" + ch)
    .then(function(r) {
      return r.json();
    })
    .then(function(r) {
      console.log(r);
      addChannelInformation(ch, r);
    })
    
    fetch(url + "/streams/" + ch)
    .then(function(r) {
      return r.json();
    })
    .then(function(r) {
      //console.log(r);
      addChannelAvailabilityInformation(ch, r);
    });
  });
}

function addChannelInformation(name, channel) {
  let line = document.getElementById(`tr${name}`);
  
  let link = document.createElement('a');
  link.setAttribute('href', channel.url);
  link.innerHTML=`<img src=${channel.logo} width='50' class="img rounded-circle mx-auto d-block" target="_blank">`;
  line.getElementsByTagName('td')[0].appendChild(link);
  
  line.getElementsByTagName('td')[2].innerHTML=`${channel.status}`;
}

function addChannelAvailabilityInformation(name, stream) {
  let availability = document.getElementById(`tr${name}`).getElementsByTagName('td')[3];
  
   if(stream.stream)
        availability.innerHTML = "<i class='greenLight'>Available</i>";
      else
        availability.innerHTML = "<i class='redLight'>Offline</i>";
}