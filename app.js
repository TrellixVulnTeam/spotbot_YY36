const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data.db');
const fs = require('fs');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded()
app.use(cors());
app.use(express.json());

app.get('/bot', function (req, res) {
  let data = getBotInfo();
  let botInfo = JSON.parse(data);
  res.send(botInfo);
  res.status(200);
  res.end();
})

app.post('/bot/token',urlencodedParser, function (req, res) {
  console.log(req.body.Bot_Token)
  // write the token to the file
  fs.writeFile('.env', `TOKEN=${req.body.Bot_Token}`, function (err) {
    if (err) throw err;
    console.log('Token saved!');
  });
  
  let bot = {
    bot_name : req.body.Bot_Name,
    bot_token : req.body.Bot_Token
  }
  let botInfoList = []
  botInfoList.push(bot)
  let botInfoJSON = JSON.stringify(botInfoList)

  fs.writeFile('bot.txt', `${botInfoJSON}`, function (err) {
    if (err) throw err;
    console.log('bot file saved!');
  });

  res.send('Token saved!')
  res.status(200)
  res.end()
})

app.get('/bot/start',urlencodedParser, function (req, res) {
  const bot = require('./bot')
  res.status(200)
  res.end()
})

app.get('/bot/users',function(req,res){
  var data = getUsers();
  var dataJSON = JSON.parse(data);
  res.send(dataJSON);
  res.status(200)
  res.end()
})

app.listen(3000)

function getBotInfo() {
  try {
    var data = fs.readFileSync('bot.txt', 'utf-8'); 
  } catch (error) {
    fs.writeFile('bot.txt',``, function (err, data) {
      if (err) throw err;
    });
  }
  return data
}

function getUsers() {
  var userList = []
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER UNIQUE , name TEXT, image TEXT)");
  db.each("SELECT id, name, image FROM users", (err, row) => {
    try {
      userList.push({
        id: row.id,
        name: row.name,
        image: row.image
      })
    } catch (error) {
      console.log(error);
    }
    fs.writeFile('users.txt',`${JSON.stringify(userList)}`, function (err, data) {
      if (err) throw err;
    });
  });
  try {
    var data = fs.readFileSync('users.txt', 'utf-8');
  } catch (error) {
    fs.writeFile('users.txt',``, function (err, data) {
      if (err) throw err;
    });
  }
  return data
}