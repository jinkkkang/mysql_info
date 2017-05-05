var fs = require('fs');
const cmdlib = require('../cmd-lib');
const YAML = require('yamljs');
const config = YAML.parse(fs.readFileSync(__dirname + '/../' + 'config.yml').toString());

var ws=fs.createWriteStream('../'+ '1.txt', 'utf-8');
ws.write('');
ws.end()
/* GET home page. */
	let sql = 'select * from server';
    cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql, 'select', function(r) {
     for (var i = 0; i < r.length; i++) {
 	     	 fs.appendFileSync('../' + '1.txt', '==+==+==+==+==+==+==+==+==+==+==+==+==+==+' + '\n')
     	 
     	 for(x in r[i]){
     	 	console.log(r[i][x])
     	 	fs.appendFileSync('../' + '1.txt', '||   ' + x + '      ' + r[i][x] +'\n')
     	 }
       fs.appendFileSync('../' + '1.txt', '==+==+==+==+==+==+==+==+==+==+==+==+==+==+' + '\n')      
 
     	}
});