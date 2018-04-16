import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ROUTES } from '../App';
import LoginForm from '../forms/LoginForm';
import styled from 'styled-components';
import onLoginHOC from '../hoc/onLoginHOC';
import { clearError, onLogin } from '../redux/user';
import { getErrorMessage } from '../services/hasDeepProperty';
import { ErrorMessage } from './Register';

export const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    height: 100%;
`;

class Login extends Component {
    componentWillUnmount() {
        const message = getErrorMessage('user', this.props);
        if (message) {
            if (message.length > 0) {
                this.props.clearError();
            }
        }
    }

    submit = (values) => {
        if (values) {
            this.props.onLogin(values);
        }
    }

    render() {
        const message = getErrorMessage('user', this.props);
        return (
            <Container>
                {message && <ErrorMessage>{message}</ErrorMessage>}
                <LoginForm onSubmit={this.submit}/>
            </Container>
        );
    }
}

export default compose(
    onLoginHOC((ownProps) => {
        ownProps.history.push(ROUTES.home.path);
    }),
    connect(() => ({}), (dispatch) => ({
        onLogin: (values) => dispatch(onLogin(values)),
        clearError: () => dispatch(clearError()),
    })),
)(Login);