(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 72)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 75
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        var navbar = $("#mainNav");
        if (navbar == null || navbar.offset() == null) return;
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-scrolled");
        } else {
            $("#mainNav").removeClass("navbar-scrolled");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Magnific popup calls
    $('#portfolio').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict



// // source: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript/20285053#20285053
// function toDataURL(src, callback, outputFormat) {
//   var img = new Image();
//   img.crossOrigin = 'Anonymous';
//   img.onload = function() {
//     var canvas = document.createElement('CANVAS');
//     var ctx = canvas.getContext('2d');
//     var dataURL;
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     ctx.drawImage(this, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL);
//   };
//   img.src = src;
//   if (img.complete || img.complete === undefined) {
//     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
//     img.src = src;
//   }
//
//   var imageData = canvas.toDataURL('image/png');
//   document.getElementsByName("myHiddenField")[0].setAttribute("value", imageData);
//
// }
//
// document.getElementById("imageUploaded").addEventListener("click", function() {
//     // todo: call when uploading an image to convert it to base64 encoded string
//     toDataURL(
//       document.getElementById("demo").innerHTML,
//       function(dataUrl) {
//         console.log('RESULT:', dataUrl)
//       }
//     );
// });

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
            document.getElementsByName("slika")[0].setAttribute("value", e.target.result);
            document.getElementsByName("slika")[0].setAttribute("type", "hidden");
            $('#image-upload-div').hide();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}

// GOOGLE MAPS
$.getJSON('/api/getzivali', function(data) {
   var rezultatAPIklica = data;

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

// preset for animal cards:
var animalCard = [ // todo: not used
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
})
