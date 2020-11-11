var express = require('express');
var router = express.Router();
var query = require("./../public/javascripts/mysql.js");

//查询
router.post('/query', function (req, res) {
    // res.set('Content-Type', 'text/html') 可以设置响应头
    var sql = 'SELECT * FROM websites';
    query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result);
        // res.end(JSON.stringify(result));
    });
})

//增
router.post('/add', function (req, res) {
    var addSql = 'INSERT INTO websites(Id,name,url,alexa,country,age) VALUES(0,?,?,?,?,?)';
    var addSqlParams = [req.body.name, req.body.url, req.body.alexa, req.body.country, req.body.age];
    query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        res.json({
            "result": "ok"
        });
    });
})

//修改
router.post('/edit', function (req, res) {
    var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
    var modSqlParams = [req.body.name, req.body.url, req.body.id];
    query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        res.json({
            "result": "ok"
        });
    });
})

//删
router.post('/del', function (req, res) {
    var delSql = `DELETE FROM websites where id=${req.body.id}`;
    query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        res.json({
            "result": "ok"
        });
    });
})


module.exports = router;