'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const router = Router()
const User = require('../models/user')



router.get('/', (req, res) => {
	res.render('index')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', ({ session, body: { email, password }}, res, err) => {
	User.findOne({ email })
		.then(user => {
			if(user) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(password, user.password, (err, matches) => {
						if(err) {
							reject(err)
						}
						else {
							resolve(matches)
						}
					})
				})
			}
			else {
				res.render('login', { msg: 'Email does not exist in our system'})
			}
		})
		.then((matches) => {
			if(matches) {
				session.email = email
				res.redirect('/')
			}
			else {
				res.render('login', {msg: "Password does not match"})
			}
		})
		.catch(err)
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', ({ body: { email, password, confirmation } }, res, err) =>{
	User.findOne({ email })
		.then(user => {
			if(user) {
				res.render('register', { msg: 'Email already registered' })
			}
			else {
				return new Promise((resolve, reject) => {
					bcrypt.hash(password, 15, (err, hash) => {
						if(err) {
							reject(err)
						}
						else {
							resolve(hash)
						}
					})
				})
			}
		})
		.then(hash => User.create({ email, password: hash }))
		.then(() => res.redirect('/login'), { msg: 'User created' })
		.catch(err)
})

router.get('/logout', (req, res) => {
	if(req.session.email) {
		res.render('logout')
	}
	else {
		res.redirect('/login')
	}
})

router.post('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) {
			throw err
		}
		res.redirect('/login')
	})
})

module.exports = router
