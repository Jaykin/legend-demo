const express = require('../nextjs/node_modules/express')
const app = express()

// Routes
app.get(`/`, (req, res) => {
  res.send({
    msg: `Serverless Express Application, Request received: ${req.method} - ${req.path}`
  })
})

// Error handler
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

module.exports = app
