require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const {keystone, apps} = require('./cms/keystone')
const DEV = process.env.NODE_ENV !== 'production'
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

const files = path.join(__dirname, '../build')
const fontEndRoutes = ['/', '/about', '/donate', '/letter/:id']
fontEndRoutes.forEach(route => app.use(route, express.static(files)))

keystone
  .prepare({
    apps: apps,
    dev: process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    if(!DEV) app.set('trust proxy', 1);
    app.use(cors(corsOptions))
    app.use(middlewares).listen(4000);
    app.listen(port, () => console.log(`listening at ${port}`))
  });
