window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "30px 10px";
        $('.navbar-collapse').collapse('hide');
    } else {
        document.getElementById("navbar").style.padding = "80px 10px";
        $('.navbar-collapse').collapse('show');
    }
}

const iconBase =
          "https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp";

// GOOGLE MAPS
var rezultatAPIklica = [
{ "id": 0, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": "-33.890542,151.274856", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
 { "id": 1, "ime": "prva", "vrsta": "pes", "slika": null, "barva": null, "lokacija": "-33.923036,151.259052", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 2, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": null, "lokacija": "-34.028249,151.157507", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 3, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": "-33.80010128657071,151.28747820854187", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 5, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": "-33.950198, 151.259302", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 6, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 7, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 8, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 9, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 10, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 11, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 12, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 13, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": "rumena", "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 14, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": "rdeca", "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": "lepa mačka", "status": null } ];

var locations = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 16,
  center: new google.maps.LatLng(locations[0][1], locations[0][2]),
  mapTypeId: google.maps.MapTypeId.TERRAIN
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

var icon = {
  url: iconBase,
  scaledSize: new google.maps.Size(40, 40)
}

var boxList = [];

for (i = 0; i < locations.length; i++) {
  var koordinati = rezultatAPIklica[i].lokacija.split(',');
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(koordinati[0], koordinati[1]),
    icon: icon,
    map: map,
    id: rezultatAPIklica[i].id
  });

  var contentString = "<h1>" + rezultatAPIklica[i].ime + "</h1>" +
                      "<p>" + rezultatAPIklica[i].vrsta + "</p>";

  var boxText = document.createElement("div");
    boxText.id = rezultatAPIklica[i].id;
    boxText.className = "boxText-" + rezultatAPIklica[i].id;
    boxText.innerHTML = contentString;
    boxList.push(boxText);

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(boxList[i]);
      infowindow.open(map, marker);
    }
  })(marker, i));

  google.maps.event.addDomListener(boxList[i],'click',(function(marker, i) {
                          return function() {
                            alert('clicked ' + rezultatAPIklica[i].ime)
                          }
                        })(marker, i));
}
// END GOOGLE MAPS



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