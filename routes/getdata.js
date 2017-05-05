/** 获取数据

 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cmdlib = require('../cmd-lib');
const YAML = require('yamljs');
const config = YAML.parse(fs.readFileSync(__dirname + '/../' + 'config.yml').toString());

router.get('/', function(req, res, next) {

switch (Number(req.query.case)) {
    case 1:
        let sql1 = 'select * from server order by id;'
        cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql1, 'select', function(r) {
                res.json(r);
        });
        break;
    case 2:
        let id = req.query.id;
        let sql2 = 'select * from server where id = ' + id;
        console.log(sql2);
        cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql2, 'select', function(r) {
                console.log(r);
                res.json(r);
        });
        break;
    }
});

module.exports = router;
