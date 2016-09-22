'use strict'

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const routes = require('./routes/')
//const { connect } = require('./db/database')

const app = express()

//Get port from environment and store in Express
const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug')

//middlewares


//routes
app.use(routes)

//Listens to Port for changes

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`)
})

