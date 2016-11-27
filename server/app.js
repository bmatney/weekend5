var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/routes', routes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.use(express.static(path.resolve('./server/public')));

app.listen(3000, function () {
  console.log("server running, check localhost:3000");
});
