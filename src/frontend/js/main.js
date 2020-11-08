// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//         document.getElementById("navbar").style.padding = "20px 10px";
//         $('.navbar-collapse').collapse('hide');
//     } else {
//         document.getElementById("navbar").style.padding = "50px 10px";
//         $('.navbar-collapse').collapse('show');
//     }
// }

// GOOGLE MAPS
var rezultatAPIklic = [
{ "id": 0, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": "-33.890542,151.274856", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
 { "id": 1, "ime": "prva", "vrsta": "pes", "slika": null, "barva": null, "lokacija": "-33.923036,151.259052", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 2, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": null, "lokacija": "-34.028249,151.157507", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 3, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": "-33.80010128657071,151.28747820854187", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 5, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": "-33.950198, 151.259302", "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null },
  { "id": 6, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 7, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 8, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 9, "ime": "", "vrsta": "", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 10, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 11, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 12, "ime": "tretja", "vrsta": "papiga", "slika": null, "barva": null, "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 13, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": "rumena", "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": null, "status": null }, { "id": 14, "ime": "druga", "vrsta": "mačka", "slika": null, "barva": "rdeca", "lokacija": null, "datum": null, "kontakt_mail": null, "kontakt_tel": null, "opis": "lepa mačka", "status": null } ];


$.getJSON('/api/getzivali', function(data) {
   var rezultatAPIklica = data;

var locations = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

var koordinati;
if (rezultatAPIklica[0].lokacija != null){
    koordinati = rezultatAPIklica[0].lokacija.split(',');
} else {
    koordinati = [0,0];
}

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 16,
  center: new google.maps.LatLng(koordinati[0], koordinati[0]),
  mapTypeId: google.maps.MapTypeId.TERRAIN
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

var boxList = [];

for (i = 0; i < rezultatAPIklica.length; i++) {
  //console.log(rezultatAPIklica[i].lokacija);
  if (rezultatAPIklica[i].lokacija != null){
    koordinati = rezultatAPIklica[i].lokacija.split(',');
  } else {
    koordinati = [0,0];
  }

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(koordinati[0], koordinati[1]),
    map: map,
    id: rezultatAPIklica[i].id
  });

  var contentString = "<h1>" + rezultatAPIklica[i].ime + "</h1>" +
                      "<p>" + rezultatAPIklica[i].vrsta + "</p>" +
                      '<img class="h-100 w-100" src="' + rezultatAPIklica[i].slika + '">';

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
});
// END GOOGLE MAPS



////////////// load animals from db and generate cards for first page //////////////////

// preset for animal cards:
var animalCard = [
  '<div class="col-lg-4 col-md-6 mb-4">',
    '<div class="card h-100">',
      '<a href="#"><img class="card-img-top" src="{{slika}}" alt=""></a>',
      '<div class="card-body">',
        '<h4 class="card-title" style="text-align: center">',
          '<a href="#">{{vrsta}}</a>',
        '</h4>',
        // '<h5>$24.99</h5>',
        '<p class="card-text">',
        '<ul>' +
        '<li>Barva: {{barva}}</li>' +
        '<li>Datum: {{datum}}</li>' +
        '</ul>',
        '<p>Opis: {{opis}}</p>',
        '</p>',
      '</div>',
      // '<div class="card-footer">',
      //   '<small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>',
      // '</div>',
    '</div>',
  '</div>'
].join("\n");




$.getJSON('/api/getzivali', function(data) {
    // lokacijski podatki uporabnika
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showAllCards)
      } else {
        showAllCards("")
      }
    function showPosition(position) {
      // JSON result in `data` variable
      document.getElementById('animalCards').innerHTML = "";
      for (const i in data) {
          const animal = data[i];

          if (animal.lokacija == null || animal.lokacija == "") animal.lokacija = ["0,0"];
          var koordinati = animal.lokacija.toString().split(',');
          // preveri če je žival v radiju X kilometrov
          if (getDistanceFromLatLonInKm(
              position.coords.latitude, position.coords.longitude,
              koordinati[0], koordinati[1]) > 10000) continue;


          //console.log(data);
          // var template = document.getElementById('animalCards').innerHTML;
          var rendered = Mustache.render(animalCard, panelObj);
          document.getElementById('animalCards').innerHTML += rendered;
          //console.log(rendered);
      }
    }

    function showAllCards(err) {
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
              //console.log(data);
              var template = document.getElementById('animalCards').innerHTML;
              var rendered = Mustache.render(animalCard, panelObj);
              document.getElementById('animalCards').innerHTML += rendered;
              //console.log(rendered);
          }
    }

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }
    // pomožna funkcija za getDistanceFromLatLoninKm
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
});

$('#filter-submit-btn').click(function(){

});
// $("#filter-form").;

$("#filter-submit-btn").click(function(event){
  event.preventDefault();
  makeAjaxRequest();
});
function makeAjaxRequest() {
    console.log($('#filter-form').serialize());
    $.ajax({
        type: 'GET',
        url: '/api/filterzivali?',
        data: $('#filter-form').serializeArray(),
        dataType: 'json',
        success: function(data){
            // console.log(data);

            document.getElementById('animalCards').innerHTML = "";
            for (const i in data) {
                const animal = data[i];
                // console.log(animal);

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
                //console.log(data);
                var template = document.getElementById('animalCards').innerHTML;
                var rendered = Mustache.render(animalCard, panelObj);
                document.getElementById('animalCards').innerHTML += rendered;
                //console.log(rendered);
            }


        }
    });
}
