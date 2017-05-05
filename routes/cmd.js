
'use strict';

const fs = require('fs');
const express = require('express');
const router = express.Router();
const cmdlib = require('../cmd-lib');
const YAML = require('yamljs');
const config = YAML.parse(fs.readFileSync(__dirname + '/../' + 'config.yml').toString());


/* GET CMD */
router.post('/', function(req, res) {
    let reqcmd = Number(req.body.cmd);
    switch (reqcmd) {
        case 1:
            let delid = req.body.id;
            let sql1 = 'delete from server where  id = ' + delid + ';';
            cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql1, 'delete', function(r) {
                if (r.length != 0) {
                    res.json({"status": 'yes'});
                } else {
                    res.json({"status": 'no'});
                }
            });
            break;
        case 2:
            let sql2 = 'insert into server (ip,domain,pro,sshpd,mysqlpd,svn,remarks) values ("' + req.body.newip + '","' + req.body.newdomain + '","' + req.body.newpro +'","' + req.body.newsshpd+'","' + req.body.newsqlpd + '","' + req.body.svn + '","' + req.body.newre+ '");'
            console.log(sql2);
            cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql2, 'insert', function(r) {
                if (r.length != 0) {
                    res.json({"status": 'yes'});
                } else {
                    res.json({"status": 'no'});
                }
            });
            break;
      case 3:
        let sql3 = 'update server set ip = "' + req.body.cip + '", domain = "' + req.body.cdomain + '",pro = "' + req.body.cpro + '",sshpd = "' + req.body.csshpd + '",mysqlpd = "' + req.body.csqlpd  + '",svn = "' + req.body.csvn + '",remarks = "' + req.body.cre + '" where id = "' + req.body.cid +  '"';
        console.log(sql3);
        cmdlib.run_sql(config.dbip, config.dbuser, config.dbpasswd, config.dbport, config.dbname, sql3, 'update', function(r) {
            if (r.length != 0) {
                res.json({"status": 'yes'});
            } else {
                res.json({"status": 'no'});
            }
        });
        break;

    default:
        res.json({'repo': 'ERROR CMD'});
    }

});

/* format the time */
Date.prototype.format = function(format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k]
                : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

module.exports = router;
