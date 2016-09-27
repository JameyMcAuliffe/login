'use strict'

const { Router } = require('express')

const router = Router()
const User = require('../models/user')

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', ({ body: { email, password }}, res, err) => {
	User.findOne({ email })
		.then(user => {
			if(user && password === user.password) {
				res.redirect('/')
			}
			else if (user) {
				res.render('login', { msg: 'Password does not match'})
			}
			else {
				res.render('login', { msg: 'Email does not exist in our system'})
			}
		})
		.catch(err)
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', ({ body: { email, passwword, confirmation } }, res, err) =>{
	User.findOne({ email })
		.then(user => {
			if(user) {
				res.render('register', { msg: 'Email already registered' })
			}
			else {
				return User.create({ email, password })
			}
		})
		.then(() => res.redirect('/login'), { msg: 'User created' })
		.catch(err)
})

router.get('/logout', (req, res) => {
	res.render('logout')
})

module.exports = router
