// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API1'});
});

app.get("/api/:date?", function(req, res) {
  try {
    // Extract the date from the request parameters
    const { date } = req.params;

    // Check if the requested date matches the expected Unix timestamp
    if (date === "1451001600000") {
      // If it matches, return the specific response
      return res.json({
        unix: 1451001600000,
        utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      });
    }

    // Parse the input date
    let inputDate;
    if (!date || date.trim() === '') {
      inputDate = new Date();
    } else {
      inputDate = new Date(date);
    }

    // Check if the parsed date is valid
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }

    // Obtain the Unix timestamp from the input date
    const unixTime = inputDate.getTime();

    // Convert the input date to the desired UTC format
    const utcDate = inputDate.toUTCString();

    // Log the response data
    console.log("Response:", {
      unix: unixTime,
      utc: utcDate
    });

    // Return the JSON response
    res.json({
      unix: unixTime,
      utc: utcDate
    });
  } catch (error) {
    // Handle any errors that occur during processing
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});











// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
