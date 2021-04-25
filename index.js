/*
    node index.js
    localhost:3000
    ctrl + c to kill express in console

    express
    ejs
    body-parser
    mysql
*/

var express = require('express');
var mysql = require('mysql');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'develop',
    password: 'develop',
    database: 'todo'
});

var task = [];
var complete = [];
con.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log('Connected!');
    refreshTasks(task);
    con.query("select * from list where complete = 'Y'", function(err, result) {
        if (err) {
            throw err;
        }
        complete = result;
    });
});

app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    createTask(newTask);
    refreshTasks(task);
    res.redirect('/');
});

app.post('/removetask', function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === 'string') {
        var completeTaskHolder = task.splice(task.indexOf(completeTask), 1);
        var completeTaskObject = completeTaskHolder[0];
        markComplete(completeTaskObject);
        complete.push(completeTaskObject);
    } else if (typeof completeTask === 'object') {  
        for (var i = 0; i < completeTask.length; i++) {     
            var completeTaskHolder = task.splice(task.indexOf(completeTask[i]), 1);
            var completeTaskObject = completeTaskHolder[0];
            markComplete(completeTaskObject);
            complete.push(completeTaskObject);
        }
    }

    res.redirect('/');
});

app.get('/', function(req, res) {    
  res.render('index', { task: task, complete: complete });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});

function markComplete(task) {
    con.query("update list set complete = 'Y' where id = " + task.id, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("1 task marked complete");
    });
}

function createTask(taskText) {
    var query = "insert into list (description) values ('" + taskText + "')";
    con.query(query, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("1 row inserted");
    });
}

function refreshTasks() {
    con.query("select * from list where complete = 'N'", function(err, result) {
        if (err) {
            throw err;
        }
        task = result;
    });
}