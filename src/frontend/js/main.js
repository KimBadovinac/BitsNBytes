window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "30px 10px";
    } else {
        document.getElementById("navbar").style.padding = "80px 10px";
    }
}


// source: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript/20285053#20285053
function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

// todo: call when uploading an image to convert it to base64 encoded string
toDataURL(
  'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
  function(dataUrl) {
    console.log('RESULT:', dataUrl)
  }
)





////////////// load animals from db and generate cards for first page //////////////////

// preset for animal cards:
var animalCard = [ // todo: not used
  '<div class="col-lg-4 col-md-6 mb-4">',
    '<div class="card h-100">',
      '<a href="#"><img class="card-img-top" src="{{slika}}" alt=""></a>',
      '<div class="card-body">',
        '<h4 class="card-title">',
          '<a href="#">{{ime}}</a>',
        '</h4>',
        '<h5>$24.99</h5>',
        '<p class="card-text">',
        '<ul>' +
        '<li>Barva: {{barva}}</li>' +
        '<li>Datum: {{datum}}</li>' +
        '</ul>',
        'Opis: {{opis}}',
        '</p>',
      '</div>',
      '<div class="card-footer">',
        '<small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>',
      '</div>',
    '</div>',
  '</div>'
].join("\n");

$.getJSON('/api/getzivali', function(data) {
    // JSON result in `data` variable
    document.getElementById('animalCards').innerHTML = "";
    for (const i in data) {
        const animal = data[i];
        var panelObj = {
            barva: animal.barva,
            datum: animal.datum,
            id: animal.id,
            ime: animal.ime,
            kontakt_mail: animal.kontakt_mail,
            kontakt_tel: animal.kontakt_tel,
            lokacija: animal.lokacija,
            opis: animal.opis,
            slika: animal.slika,
            status: animal.status,
            vrsta: animal.vrsta
        };
        console.log(data);
        var template = document.getElementById('animalCards').innerHTML;
        var rendered = Mustache.render(animalCard, panelObj);
        document.getElementById('animalCards').innerHTML += rendered;
        console.log(rendered);

    }
})