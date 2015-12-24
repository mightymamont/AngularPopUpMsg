var express = require('express')
var app = express()

var path = __dirname.replace('raw\\server', 'build\\'),
	docPath = path.replace('build\\','docs\\');

app.use(express.static(path));
app.use('/docs', express.static(docPath));
console.log('Static server started from "%s" folder. Docs in %s',path, docPath);

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})