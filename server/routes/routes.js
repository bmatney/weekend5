var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function (req, res) {
  console.log('GET is connected');

  // get employees from DB
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employee_info', function (err, result) {
      done(); // close the connection.

      if (err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }

      res.send(result.rows);

    });

  });
});

router.post('/', function (req, res) {
  var newEmployee = req.body;
  console.log(newEmployee);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO employee_info (first_name, last_name, employee_id, job_title, salary)' +
      'VALUES ($1, $2, $3, $4, $5)',
      [newEmployee.first_name, newEmployee.last_name, newEmployee.employee_id, newEmployee.job_title, newEmployee.salary],
      function (err, result) {
        done();

        if (err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });
});

router.delete('/:id', function (req, res) {
  employeeID = req.params.id;

  console.log('employee id to delete: ', employeeID);
  pg.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log('connection error: ', err);
        res.sendStatus(500);
      }

      client.query(
      'DELETE FROM employee_info WHERE id = $1',
      [employeeID],
      function (err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });
});

module.exports = router;
