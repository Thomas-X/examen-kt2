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
    background-color: rgba(0, 123, 255, 0.5);
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0 1rem;
    margin: 0 0 2rem 0;
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
    
    &:hover {
        transition: all 300ms;
        background-color: rgba(0, 123, 255, 0.6);
        color: ${COLORS.white};
    }
`;

const Navigation = (props) => {

    const renderNavItem = (label, to, key, onClick) => (
        <NavItem key={`navitem-${key}`} onClick={onClick}>
            <Link to={to} style={{ color: 'inherit', textDecoration: 'none' }}>{label}</Link>
        </NavItem>
    );

    const {isLoggedIn, role} = props.user;

    return (
        <Nav>
            <Left>
                <img src="https://i.imgur.com/SpobGDB.png" style={{ width: '95px', height: '99px' }}/>
                {renderNavItem('Home', ROUTES.home.path, 3)}
                {(renderNavItem('Contact', ROUTES.contact.path, 4))}
                {(isLoggedIn && role === 'medewerker') && (renderNavItem('Cursussen overzicht', ROUTES.viewcursussen.path, 5))}
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
