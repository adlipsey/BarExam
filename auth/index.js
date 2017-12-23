const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const passport = require('../passport');

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======');
	console.log(req.user);
	if (req.user) {
		return res.json({ user: req.user });
	} else {
		return res.json({ user: null });
	}
});

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser.password) {
			delete cleanUser.password;
		}
		res.redirect("/user-dashboard/" + req.user.username);
	}
);

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('connect.sid'); // clean up!
		return res.json({ msg: 'logging you out' });
	} else {
		return res.json({ msg: 'no user to log out!' });
	}
});

router.post('/register', (req, res) => {
	const { username, email, password } = req.body;
	// ADD VALIDATION
	User.findOne({ 'username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'username': username,
			'email': email,
			'password': password
		});
		console.log("newUser: "+ newUser);
		newUser.save((err, savedUser) => {
			if (err) return console.log(err);
			console.log("Save user: "+ savedUser);
			res.render("login", {data: {username: savedUser.username, fromSignUp: true}});
		});
	});
});

module.exports = router;