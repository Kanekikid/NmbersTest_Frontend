const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'))


var ParsedData = '';
const https = require('https');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

app.post('' , (req, res) => {
  console.log('tryng to enter...')
  var numSet = req.body.numSet
  var size = req.body.size
  var target = req.body.target

  //Use API
  https.get('https://api.nourhanm34.now.sh/' + numSet + '/' + size + '/' + target, (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => { 
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    /*var i;
    var x = [];
    var arr= [];
    for(i = 0; i < data.length; i++)
    {
      x[x.length] =parse(data[i]);
      arr[arr.length] = x; 
    }*/
    ParsedData = JSON.parse(data);
    console.log(ParsedData.results[0]);
  });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
/* */
  sleep(5000).then(() => {
    //do stuff
    //to redirect to the same page
    res.render('index', {
      title: 'Numbers Test',
      name: ParsedData.results
    });

    res.end() 
  })

  
})









//This tells express that we 
//are using pug as our template engine.

app.get('/', (req, res) => {
   res.render('index', {
    title: 'Numbers Test'
  });
});  


const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
