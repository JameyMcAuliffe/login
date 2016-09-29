'use strict'

// Route 1: “/” h1 welcome <a@b.com>
// Route 2: input email - input pw - submit 
// Route 3: “/register”  input email - input pw - submit 
// Route 4: /logout
// Deployed


const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const bodyParser = require('body-parser')

const routes = require('./routes/')
const { connect } = require('./db/database')

const app = express()

//Get port from environment and store in Express
const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug')

//middlewares
app.use(session({
	store: new RedisStore({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	}),
	//fixes deprecation warnings
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET || 'loginsecretkey'
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.use(routes)

//Listens to Port for changes
connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)

// app.listen(port, () => {
// 	console.log(`Express server listening on port ${port}`)
// })

