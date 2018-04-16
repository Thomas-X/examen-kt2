import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from './components/Footer';
import Navigation from './components/Navigation';
import Contact from './routes/Contact';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ViewCursussen from './routes/ViewCursussen';

export const ROUTES = {
    contact: {
        component: Contact,
        exact: true,
        path: '/contact',
        isPrivate: true,
    },
    home: {
        component: Home,
        exact: true,
        path: '/',
    },
    login: {
        component: Login,
        exact: true,
        path: '/login',
    },
    register: {
        component: Register,
        exact: true,
        path: '/register',
    },
    viewcursussen: {
        component: ViewCursussen,
        exact: true,
        path: '/viewcursussen',
        isMedewerkersOnly: true,
    },
};

const BodyContainer = styled.div`
    min-height: 90vh;
    > section {
        min-height: 90vh;
    } 
`;

const RouteComponent = connect(
    state => ({
        user: state.user,
    }),
)(props => {
    if (props.isPrivate === true && props.user.isLoggedIn === false) {
        return <Redirect to={ROUTES.home.path}/>;
    }
    if (props.isMedewerkersOnly === true && props.user.role !== 'medewerker') {
        return <Redirect to={ROUTES.home.path}/>;
    }
    return <Route {...props}/>;
});

const App = () => {
    return (
        <div>
            <Navigation/>
            <BodyContainer>
                <Switch>
                    {Object.keys(ROUTES).map((routeKey, index) => <RouteComponent key={index} {...ROUTES[routeKey]}/>)}
                </Switch>
            </BodyContainer>
            <Footer/>
        </div>
    );
};

export default App;
