var path = require('path');
var express = require('express');
var app = express();
var MONTH = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/:str', function (req, res) {
	var result = {};
	var regex = /^[0-9]+$/;
	var param = req.params.str;

	if (param.split(' ').length == 3 && MONTH.indexOf(param.split(' ')[0]) !== -1) {
		var s = new Date(param);
		result.unix = Math.round(+s.getTime()/1000);
		result.natural = param;
		res.send(JSON.stringify(result));

	} else if (param.match(regex) !== null) {
		var d = new Date(0);
		d.setUTCSeconds(param);
		result.unix = param;
		result.natural = MONTH[d.getMonth()] +' '+ (d.getDate()+1) +", " + d.getFullYear();
		res.send(JSON.stringify(result));
	} else {
		result.unix = null;
		result.natural = null;
		res.send(JSON.stringify(result));
	}
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});