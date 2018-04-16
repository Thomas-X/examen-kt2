import Auth from '../controllers/auth';
import Home from '../controllers/home';

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
];