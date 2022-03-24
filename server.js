const express = require('express');
const redis = require("redis");
const { readdirSync } = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path')

var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const redisClient = redis.createClient(6379);
redisClient.connect();

let counter = 0;


app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log("request for homepage")
  res.sendFile(path.join(__dirname, 'public/index.html'))


});

app.get('/admin', (req, res) => {
  console.log("request for admin page")
  res.sendFile(path.join(__dirname, 'public/admin.html'))

});

app.get('/orders', async (req, res) => {

  const key = "orders";
  var items = [];

  await redisClient.hGetAll(key).then((result) => {

    for (i in result) {
      var str = JSON.parse(result[i])
      str.date = i;
      items.push(str);
    }
  })


  console.log(items)
  res.status(200).send(items)

});

app.post('/order', async (req, res) => {


  var datetime = await new Date();
  console.log(datetime.toISOString());

  const key = 'orders'

  let order = {
    bookname: req.body.bookname, 
    amount: req.body.amount
  }

  console.log(order)

  await redisClient.hSet(key, datetime.toISOString(), JSON.stringify(order), function(err){
    console.log(err)
  });

  counter = counter + 1;
  console.log(counter)

  res.send("Order Successful")

});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
