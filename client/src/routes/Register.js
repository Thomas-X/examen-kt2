import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { ROUTES } from '../App';
import { COLORS } from '../constants/constants';
import RegisterForm from '../forms/RegisterForm';
import onLoginHOC from '../hoc/onLoginHOC';
import { clearError, onRegister } from '../redux/user';
import { getErrorMessage } from '../services/hasDeepProperty';
import { Container } from './Login';

export const ErrorMessage = styled(Well)`
    background-color: rgba(220, 53, 69, 0.2);
    background-image:none;
    color: ${COLORS.darkRed};
`;

class Register extends Component {

    componentWillUnmount () {
        const message = getErrorMessage('user', this.props);
        if (message.length > 0) {
            this.props.clearError();
        }
    }

    submit = (values: any) => {
        this.props.onRegister(values);
    };

    render () {
        const message = getErrorMessage('user', this.props);
        return (
            <Container>
                {message && <ErrorMessage>{message}</ErrorMessage>}
                <RegisterForm onSubmit={this.submit}/>
            </Container>
        );
    }
}

export default compose(
    onLoginHOC((ownProps) => {
        ownProps.history.push(ROUTES.home.path);
    }),
    connect(() => ({}), (dispatch) => ({
        onRegister: (values) => dispatch(onRegister(values)),
        clearError: () => dispatch(clearError()),
    })),
)(Register);