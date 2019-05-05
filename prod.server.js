const express = require('express');
const config = require('./config/index.js');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();
const appData = require('./data.json')
const apiRouters = express.Router()

const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
router.get('/',function (req,res,next) {
  req.url = '/index.html';
  next();
});

app.use(router);

apiRouters.get('/api/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
apiRouters.get('/api/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRouters.get('/api/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use(express.static('.dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening' + port + '\n')
})