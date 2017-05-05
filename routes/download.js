var express = require('express');
var router = express.Router();
var fs = require('fs');
const cmdlib = require('../cmd-lib');
const YAML = require('yamljs');
const path = require('path');
const config = YAML.parse(fs.readFileSync(__dirname + '/../' + 'config.yml').toString());
/* GET home page. */

router.get('/', function(req, res, next) {
	var ws=fs.createWriteStream(path.join(__dirname + '/../'+ 'server.txt'), 'utf-8');
    ws.write('');
    ws.end()
	let sql = 'select * from server';
    cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql, 'select', function(r) {
     for (var i = 0; i < r.length; i++) {
 	     	 fs.appendFileSync(path.join(__dirname + '/../'+ 'server.txt'), '==+==+==+==+==+==+==+==+==+==+==+==+==+==+' + '\r\n')
     	 
     	 for(x in r[i]){
     	 	console.log(r[i][x])
     	 	fs.appendFileSync(path.join(__dirname + '/../'+ 'server.txt'), '||   ' + x + '      ' + r[i][x] +'\r\n')
     	 }
     
     	} 
    res.download('server.txt');
})
  }); 
    
module.exports = router;
