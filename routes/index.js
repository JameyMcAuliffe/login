'use strict'

const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', (req, res) => {
	if (req.body.password === 'password') {
		res.redirect('/')
	}
	else {
		res.render('login', {error: 'Email and password combination does not match'})
	}
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) =>{
	res.redirect('/')
})

router.get('/logout', (req, res) => {
	res.render('logout')
})

module.exports = router
