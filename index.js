const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
var cache = require('lru-node-cache')
var cors = require('cors')
const PORT = 80

let mcache = new cache.LRU(7000);

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/profile',function(req, res) {
  if(req.query.op=="get") {
    res.json(mcache.get(req.query.orem))
  }
  else if (req.query.op=="set") {
    mcache.set(req.query.orem,req.query.v)
    res.json(mcache.get(req.query.orem))
  }

  console.log(mcache.get(req.query.orem))
})

app.post('/profile', upload.array(), function (req, res, next) {
  //console.dir(cache.get(req.body.orem))
  if(req.body.op=="get") {
    res.json(mcache.get(req.body.orem))
  }
  else if (req.body.op=="set") {
    mcache.set(req.body.orem,req.body.v)
    res.json(mcache.get(req.body.orem))
  }

  console.log(req.body)
})





app.listen(PORT, () => {
 console.log(`Server listening on port: ${PORT}`);
});
