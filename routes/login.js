var express = require('express');
var router = express.Router();
var fs = require('fs');
const YAML = require('yamljs');
const cmdlib = require('../cmd-lib');
const config = YAML.parse(fs.readFileSync(__dirname + '/../' + 'config.yml').toString());

/* GET users listing. */
router.post('/', function(req, res, next) {
  const passwd = req.body.password;
  
  if(passwd == config.loginpd){
   		 let sql1 = 'select * from server order by id;'
        cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql1, 'select', function(r) {
                console.log(r);
                res.render("home",{data:r});

        });
    
  }else{
	res.status(404).send("wrong password");
  }
});

module.exports = router;
