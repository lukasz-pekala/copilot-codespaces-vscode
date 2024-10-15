// Create web server with express to handle comments

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.get('/comments', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(data.toString());
    }
  });
});

app.post('/comments', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments.json');
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing comments.json');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(port, function () {
  console.log('Server started on http://localhost:' + port);
});
