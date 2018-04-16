import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../global/models/User';

export default () => {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromUrlQueryParameter('auth'),
            ExtractJwt.fromHeader('authenticationToken'),
        ]),
        secretOrKey: process.env.secretKey,
    };

    passport.use(new Strategy(options, async (jwtPayload, done) => {
        const user = (await User.find({ id: jwtPayload.sub }))[0];
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}
// TODO Add role verification here
export const authMiddleware = passport.authenticate('jwt', { session: false });