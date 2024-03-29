express = require('express')
port = process.argv[2] || 3000
app = express.createServer()

app.configure ->
  app.use express.static(__dirname + '/public')

app.configure 'development', ->
  app.use express.errorHandler { dumpExceptions: true, showStack: true }

app.get '/', (req, res) ->
  res.render 'index'

app.get '/ts', (req, res) ->
  res.send "vizpos.#{Date.now()}"

app.listen(port)
console.log("Express server listening on port %d in %s mode", port, app.settings.env)


