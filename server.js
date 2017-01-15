var express = require('express');
var app = express();
var marvelApi = require('marvel-api');
var IMDB_API_KEY = 'be0aa2e8-52d7-47be-a191-63e98c5d934a';
var request = require('request');
var spotify = require('spotify');

var marvel = marvelApi.createClient({
    publicKey: '370fd503b7f029876272c226e5f61328',
    privateKey: 'cd019298c2f4263486d5612ffa4849727eb0aa4e'
});


app.get('/movies-for-hero/:hero', function(req, res) {

    request('http://imdb.wemakesites.net/api/search?api_key=' + IMDB_API_KEY + '&q=' + req.params.hero,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        })
})

app.get('/album-for-movie/:movie', function(req, res) {
    spotify.search({ type: 'album', query: req.params.movie }, function(err, data) {


        if (data) {
        	res.send(data);
            console.log(data);
            return;
        }

        // Do something with 'data' 
    });

})




app.use('/', express.static(__dirname + '/src'));
app.listen(3000, function() { console.log('listening') });
