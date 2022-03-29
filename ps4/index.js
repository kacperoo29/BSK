const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})

app.get('/convertingLSFR', (req, res) => {
  res.sendFile('convertingLSFR.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

app.use('/public', express.static(__dirname + '/public'))
