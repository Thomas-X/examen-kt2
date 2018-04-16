import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action, compose, Dispatch } from 'redux';
import styledComponent, { css } from 'styled-components';
import { ROUTES } from '../App';
import { COLORS, NAVBAR_HEIGHT } from '../constants/constants';
import { onLogout } from '../redux/user';

const styled = styledComponent;

const Nav = styled.nav`
    width:100%;
    background-color: ${COLORS.white};
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
    border: 1px solid black;
`;

const NavListCss = css`
    margin: 0;
    padding: 0;
    flex-grow: 1;
    display:flex;
    flex-direction: row;
    align-items: center;
`;

const Left = styled.ul`
    justify-content: flex-start;
    ${NavListCss}
`;

const Right = styled.ul`
    justify-content: flex-end;
    ${NavListCss}
`;

const NavItem = styled.li`
    list-style: none;
    height: ${NAVBAR_HEIGHT};
    min-width: 2rem;
    padding: 0 1rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Navigation = (props) => {

    const renderNavItem = (label, to, key, onClick) => (
        <NavItem key={`navitem-${key}`} onClick={onClick}>
            <Link to={to}>{label}</Link>
        </NavItem>
    );

    const {isLoggedIn} = props.user;

    return (
        <Nav>
            <Left>
                {renderNavItem('Home', ROUTES.home.path, 3)}
                {isLoggedIn && (renderNavItem('Contact', ROUTES.contact.path, 4))}
            </Left>
            <Right>
                {!isLoggedIn && ([renderNavItem('Login', ROUTES.login.path, 1), renderNavItem('Register', ROUTES.register.path, 2)])}
                {isLoggedIn && (renderNavItem('Logout', '', 3, props.onLogout))}
            </Right>
        </Nav>
    );
};

export default compose(
    connect(
        (state) => ({
            user: state.user,
        }),
        (dispatch) => ({
            onLogout: () => dispatch(onLogout()),
        })),
)(Navigation);