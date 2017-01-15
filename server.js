var express = require('express');
var app = express();
var IMDB_API_KEY = 'be0aa2e8-52d7-47be-a191-63e98c5d934a';
var request = require('request');
var spotify = require('spotify');
var favicon = require('serve-favicon');

var port = process.env.PORT || 8080;


app.get('/movies-for-hero/:hero', function(req, res) {
    request('http://imdb.wemakesites.net/api/search?api_key=' + IMDB_API_KEY + '&q=' + req.params.hero,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(error);
            }
        }
    );
});

app.get('/album-for-movie/:movie', function(req, res) {
    spotify.search({ type: 'album', query: req.params.movie }, function(err, data) {
        if (data) {
            res.send(data);
            return;
        }
    });
});

app.get('/lifestyle-for-hero/:hero', function(req, res) {

    var options = {
      url: 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&phrase=' + req.params.hero + ' cosplay',
      headers: {
        'Api-Key': 'b4734jk5yhgqgv9v4grh923q'
      }
    };

    request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
    });
});

app.use(favicon(__dirname + '/src/favicon.ico'));
app.use('/', express.static(__dirname + '/src'));
app.listen(port, function() { console.log('listening on port' + port); });
