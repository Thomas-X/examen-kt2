import { Router } from 'express';

const Home = Router();

Home.get('/', (req, res) => {
    res.send('hi from api / backend');
});

export default Home;