var app = function(){

  var url = 'https://api.spotify.com/v1/search?q=cats&type=album';
  makeRequest(url, requestComplete);
}

var addAlbumsToPage = function(albums){

  var albumListing = document.querySelector('#album-listing')
  
  albums.albums.items.forEach(function(album){

    console.log(album);
    
    var title = document.createElement('div');
    title.innerText = "Album: " + album.name;
    albumListing.appendChild(title);

    album.artists.forEach(function(artist){
      var artistName = document.createElement('div');
      artistName.innerText = "Artist: " + artist.name
      albumListing.appendChild(artistName);
    })

    var coverImage = document.createElement('img');
    coverImage.src = album.images[0].url;
    coverImage.width = 100;
    albumListing.appendChild(coverImage);    
  })

}


var requestComplete = function(){
  //check we get a http status 200

  if (this.status !== 200) return;

  //grab the response text
  var jsonString = this.responseText;

  //now parse the string into JSON string
  var albums = JSON.parse(jsonString);
    //hand off responsibility to another function to parse the list and put it into our webpage
 addAlbumsToPage(albums);

}



var makeRequest = function(url, callback){
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();

  //we are going to GET data 
  request.open("GET", url);

  //tell it what function to run once complete - register the event handler
  request.onload = callback; //.this (in this case) is the request object

  //send request
  request.send();
}



window.onload = app;