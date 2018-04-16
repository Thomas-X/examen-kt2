import bodyParser from 'body-parser';
import chalk from 'chalk';
import * as cors from 'cors';
import express from 'express';
import { Server as HttpServer } from 'http';
import ip from 'ip';
import is from 'is-js';
import mongoose from 'mongoose';
import createAuthHandler, { authMiddleware } from './factories/createAuthHandler';
import { ROUTES } from './global/constants';
import { error, info, warn } from './services/log';
import Socket from './socket';

const MONGO_URI = require('./global/mongoUri').MONGO_URI;

require('dotenv').config();

class Server {
    port;

    constructor () {
        this.app = express();
        this.port = process.env.PORT || 3004;
        this.connectToDb()
            .catch(err => error(err));
    }

    onListen = (err) => {
        if (err) {
            error(`Unable to start server on port ${this.port}`, err);
            return;
        }

        if (process.env.__DEV__) {
            warn('We\'re in development mode.');
        }

        info(`We're live.\r\n`);
        info(chalk`{bold On your network:}     {underline http://${ip.address('public')}:{bold ${this.port.toString()}}/}`);
        info(chalk`Local:               {underline http://${ip.address('private')}:{bold ${this.port.toString()}}/}`);
    };

    connectToDb = async () => {
        try {
            mongoose.connect(MONGO_URI, {
                useMongoClient: true,
            });
            mongoose.Promise = global.Promise;
            const db = mongoose.connection;

            db.on('error', (err) => {
                console.log();
                error(err);
                throw new Error(err);
            });
            db.once('open', () => {
                info('Successfully connected to database!');
                console.log();
                this.start()
                    .catch(err => {
                        console.log();
                        error(err);
                        throw new Error(err);
                    });
            });
        } catch (err) {
            throw new Error(err);
        }
    };

    start = async () => {
        this.app.use(bodyParser.json());
        // TODO Change cors to not allow all origins, just frontend location.
        this.app.use(cors());
        createAuthHandler();
        this.setRoutes();
        const http = new HttpServer(this.app);
        this.socket = new Socket(http);
        this.socket.bindSockets();
        http.listen(this.port, this.onListen);
    };

    setRoutes = () => {

        for (const route of ROUTES) {
            const { isPrivate, allowedRoles, path, controller } = route;

            if (!is.set(isPrivate) || !is.set(allowedRoles) || !is.set(path) || !is.set(controller) || typeof controller !== 'function') {
                continue;
            }

            const checkRole = (req, res, next) => {
                // TODO implement roles. Get user via req.user and check if the role is supported
                next();
            };

            // TODO Implement roles
            if (isPrivate === true && allowedRoles.length === 0) {
                this.app.use(path, authMiddleware, controller);
            } else if (allowedRoles.length > 0 && isPrivate === true) {
                this.app.use(path, authMiddleware, checkRole, controller);
            } else if (isPrivate === false) {
                this.app.use(path, controller);
            }
        }

        // Last route, 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).send('Not found');
        });
    };
}

export default new Server();