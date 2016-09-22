'use strict'

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const bodyParser = require('body-parser')

const routes = require('./routes/')
//const { connect } = require('./db/database')

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
	secret: process.env.SESSION_SECRET || 'loginsecretkey'
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.use(routes)

//Listens to Port for changes

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`)
})

