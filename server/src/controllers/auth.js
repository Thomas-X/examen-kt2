import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import is from 'is-js';
import { sign } from 'jsonwebtoken';
import uuid from 'uuid/v4';
import User from '../global/models/User';

const Auth = Router();


// Disable validation since who cares about any of that right. 🤷‍

const validations = (req, res, next) => {
    next();
};

// const validations = [
//     check('username').exists().isAlphanumeric(),
//     check('password1').exists().isLength({ min: 6 }),
// ];

const checkIfValidatorFailed = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const message = errors.formatWith(({ param }) => {
    //         return `Invalid ${param} value`;
    //     }).array();
    //     return res.status(422).json({ message: message[message.length - 1] });
    // }
    next();
};

Auth.post('/register', validations, checkIfValidatorFailed, async (req, res, next) => {
    try {
        const { username, password1 } = req.body;
        const user = (await User.find({ username: username }))[0];
        if (is.set(user)) {
            res.status(422);
            return res.json({
                message: 'User already exists',
            });
        } else if (!is.set(user)) {
            const id = uuid();
            const user = {
                id,
                username,
                password: await hash(password1, Number(process.env.salt)),
            };
            await User.create(user);
            return res.json({
                token: sign({ sub: id }, process.env.secretKey),
            });
        }
    } catch (err) {
        next(err);
    }
});

Auth.post('/login', validations, checkIfValidatorFailed, async (req, res, next) => {
    try {
        const { username, password1 } = req.body;
        const user = (await User.find({ username: username }))[0];
        if (!user) {
            res.status(422);
            return res.json({
                message: 'User does not exist',
            });
        }
        if (!await compare(password1, user.password)) {
            res.status(422);
            return res.json({
                message: 'Incorrect password',
            });
        }
        return res.json({
            token: sign({ sub: user.id }, process.env.secretKey),
        });
    } catch (err) {
        next(err);
    }
});

export default Auth;