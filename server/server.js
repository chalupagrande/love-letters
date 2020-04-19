
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

let files = path.join(__dirname, '../build')


app.use(cors(corsOptions))
app.use(express.static(files))
app.listen(port, () => console.log(`listening at ${port}`))