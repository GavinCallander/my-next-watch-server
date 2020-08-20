require('dotenv').config();
const JWT = require('jsonwebtoken');
const DB = require('../models');
const ROUTER = require('express').Router();

ROUTER.post('/login', (req, res) => {
    DB.User.findOne({ username: req.body.username})
    .populate('lists')
    .populate('movies')
    .then(user => {
        if (!user || !user.password) {
            return res.status(404).send({ message: 'User not found.' });
        };
        if (!user.isAuthenticated(req.body.password)) {
            return res.status(406).send({ message: 'Invalid credentials.' });
        };
        let token = JWT.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60
        });
        res.send({ token });
    })
    .catch(err => {
        res.status(503).send({ message: 'Database error.' });
    });
});

ROUTER.post('/signup', (req, res) => {
    DB.User.findOne({ username: req.body.username })
    .then(user => {
        if (user) {
            return res.status(409).send({ message: 'Username already in use. Please try another.' });
        };
        DB.User.create(req.body)
        .then(newUser => {
            let token = JWT.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 120
            });
            res.send({ token });
        })
        .catch(err => {
            res.status(500).send({ message: 'Internal server error.' });
        })
    })
    .catch(err => {
        res.status(503).send({ message: 'Database error.' });
    });
});

module.exports = ROUTER;