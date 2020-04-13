const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

let files = path.join(__dirname, 'build')
console.log(files)
app.use(express.static(files))

app.get('/api', (req, res) => {
  res.send('OK')
})

app.listen(port, () => console.log(`listening at ${port}`))