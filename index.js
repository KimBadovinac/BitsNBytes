const http = require("http"); // Use https if your app will not be behind a proxy.
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');

const app = express();

const frontendPath = __dirname + '/src/frontend';
app.use(express.static(frontendPath));
//app.use(express.static('public'))

app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!');
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,    Content-Type, Accept");
    next();
});





app.get('/', (req, res, next) => {
    res.sendFile(path.join(frontendPath,'index.html'));
});








///////////////////////////////// db dao ////////////////////////////////
const sqlite3 = require('sqlite3').verbose();


// Retrieving All Rows
app.get('/getzivali', (req, res, next) => {
    // open db conn
    let db = new sqlite3.Database('./src/frontend/media/db.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      // console.log('Connected to the database.');
    });

    // get rows
    db.all("SELECT * FROM Zivali", [], (err, rows) => {
      if (err) {
        throw err;
      }
      // rows.forEach((row) => {
      //   console.log(row);
      // });
      res.send(JSON.stringify(rows, null, 2));
    });

    // close db conn
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log('Close the database connection.');
    });
});

// inserting
// todo: make post
// app.post('/api/users', function(req, res) {
//     var user_id = req.body.id;
//     var token = req.body.token;
//     var geo = req.body.geo;
//
//     res.send(user_id + ' ' + token + ' ' + geo);
// });
app.get('/insertzival', (req, res, next) => {

    // open db conn
    let db = new sqlite3.Database('./src/frontend/media/db.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      // console.log('Connected to the database.');
    });

    // insert data
    let data = ['tretja', "papiga"]
    db.run(`INSERT INTO Zivali(ime, vrsta) VALUES(?, ?)`, data,
        function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // close db conn
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log('Close the database connection.');
    });

});


