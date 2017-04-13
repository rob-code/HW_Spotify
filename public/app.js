var app = function(){

  var url = 'https://api.spotify.com/v1/search?q=cats&type=album';
  makeRequest(url, requestComplete);
}

var addAlbumsToPage = function(albums){

  var albumListing = document.querySelector('#album-listing')
  
  albums.albums.items.forEach(function(album){

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

    coverImage.onclick = function(){
      var albumURL = "https://api.spotify.com/v1/albums/" + album.id 
      makeRequest(albumURL, trackRequestComplete)
    } 
  })
}

var playMusic = function(albumString){
  audio = document.querySelector('audio')
  audio.src = albumString.tracks.items[0].preview_url;
} 

var trackRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var albumString = JSON.parse(jsonString);
  playMusic(albumString)
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var albums = JSON.parse(jsonString);
  addAlbumsToPage(albums);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

window.onload = app;