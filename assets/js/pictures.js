function getCountryPicture(country, capital, feature) {

  let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d2c4c4fc42119d8f18ceabe5e7d353e6&tags=" + country + "%2C" + capital + "&text=" + feature + "&format=json&nojsoncallback=1&per_page=1";

  $.when(
    $.getJSON(url)
  ).then(function(result) {
    let farm = result.photos.photo[0].farm;
    let server = result.photos.photo[0].server;
    let photo_id = result.photos.photo[0].id;
    let secret = result.photos.photo[0].secret;

    let picUrl = "http://farm" + farm + ".staticflickr.com/" + server + "/" + photo_id + "_" + secret + ".jpg";
    $("#panel").append("<img src='" + picUrl + "' alt='Contry Picture' class='picture'>");
  })
}