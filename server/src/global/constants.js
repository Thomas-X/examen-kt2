import Auth from '../controllers/auth';
import Home from '../controllers/home';
import Cursus from './models/Cursus';
import Cursist from './models/Cursist';

export const ROLES = {
    admin: 'admin',
    manager: 'manager',
    user: 'user',
};

export const ROUTES = [
    {
        path: '/',
        controller: Home,
        allowedRoles: [],
        isPrivate: false,
    },
    {
        path: '/auth',
        controller: Auth,
        allowedRoles: [],
        isPrivate: false,
    },
    {
        path: '/someAuthedRoute',
        controller: (req, res) => {
            res.send('hi from authed route');
        },
        allowedRoles: [],
        isPrivate: true,
    },
    {
        path: '/api/getAllCursus',
        controller: async (req,res) => {
            res.json({
                cursussen: await Cursus.find({}),
            });
        },
        allowedRoles: [],
        isPrivate: false,
    },
    {
        path: '/api/getAllCursistenFromCursus',
        controller: async (req,res) => {
            const cursisten = [];
            const cursusId = req.body.cursusId;
            const cursus = (await Cursus.find({ id: cursusId }))[0];
            if(!cursus.inschrijvingen) {
                res.json({
                    cursisten: [],
                });
            }
            for (const inschrijving of cursus.inschrijvingen) {
                const cursist = (await Cursist.find({ id: inschrijving }))[0];
                cursisten.push(cursist);
            }
            res.json({
                cursisten
            });
        },
        allowedRoles: [],
        isPrivate: false,
    }
];