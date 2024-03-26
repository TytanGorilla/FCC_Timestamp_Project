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

app.get("/api/:date?", function(req, res){
  //Extract passed date from req.params
  const {date} = req.params;
  //Check if inputted date is valid
  let inputtedDate = new Date(date);
  if(!inputtedDate || inputtedDate.trim === ('')){
    const responseObject = {
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString()
    };
    res.json(responseObject)
  }

  if(isNaN(inputtedDate.getTime())){
    return res.json({error: "Invalid Date"})
  }

  //Obtain Unix number from inputtedDate
  let unixTime = inputtedDate.getTime();
  // Convert the input date to the desired UTC format
  const utcDate = inputtedDate.toUTCString();
  //Respond with UnixTime
  res.json({
    unix: unixTime,
    utc: utcDate
  })  
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
