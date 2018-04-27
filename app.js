var express = require("express");
var app = express();
var oracledb = require('oracledb');
var bodyParser = require('body-parser');
var cors = require('cors');

const request = require('request');

app.use(cors());
app.options('*',cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //URL encoded parameters

app.post('/test', function (req, res) {
	"use strict;"
	var oracledb = require('oracledb');
//	console.log(req);
	var sqlQuery = req.body.sql;
	console.log(sqlQuery);
	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : "vaishali",
	    password      : "Manasa*8",
	    connectString : "oracle.cise.ufl.edu/orcl"
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      sqlQuery,

	      // The "bind value" 180 for the bind variable ":id"
	      [],

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.
	      { maxRows: 1000
	        , outFormat: oracledb.OBJECT  // query result format
	        //, extendedMetaData: true      // get extra metadata
	        //, fetchArraySize: 100         // internal buffer allocation size for tuning
	      },

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	        x = result.rows;
	        console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
	        console.log(result.rows);     // [ [ 180, 'Construction' ] ]
	        doRelease(connection);
	        res.send(x);
	        });
	    
	  });
	//}

	// Note: connections should always be released when not needed
	function doRelease(connection) {
	  connection.close(
	    function(err) {
	      if (err) {
	        console.error(err.message);
	      }
	    });
	}
});



app.get('/', function (req, res) {
	"use strict;"
	var oracledb = require('oracledb');
	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : "psaxena",
	    password      : "mrpp#AVNN20",
	    connectString : "oracle.cise.ufl.edu/orcl"
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }

	    connection.execute(
	      // The statement to execute
	      `select * from (select * from crime order by date_occured desc) where rownum<=10`,

	      // The "bind value" 180 for the bind variable ":id"
	      [],

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.
	      { maxRows: 1000
	        //, outFormat: oracledb.OBJECT  // query result format
	        //, extendedMetaData: true      // get extra metadata
	        //, fetchArraySize: 100         // internal buffer allocation size for tuning
	      },

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	        x = result.rows;
	        console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
	        console.log(result.rows);     // [ [ 180, 'Construction' ] ]
	        doRelease(connection);
	        res.send(x);
	        });
	    
	  });
	//}

	// Note: connections should always be released when not needed
	function doRelease(connection) {
	  connection.close(
	    function(err) {
	      if (err) {
	        console.error(err.message);
	      }
	    });
	}
});




var server = app.listen(3000, function () {
    "use strict";

    var host = server.address().address,
        port = server.address().port;

    console.log(' Server is listening at http://%s:%s', host, port);
});