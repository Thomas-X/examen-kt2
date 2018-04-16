import React from 'react';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button } from '../components/Button';
import { RenderField } from '../components/RenderField';
import validations, { FORM_VALIDATIONS, FORM_NAMES } from '../services/validations';

// type Props = OwnProps & ReduxFormProps

const LoginForm = (props) => {
        const { handleSubmit, pristine, reset, submitting } = props;
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name={FORM_NAMES.username}
                    type="text"
                    component={RenderField}
                    label="Username"
                />
                <Field
                    name={FORM_NAMES.passwordOne}
                    type="password"
                    component={RenderField}
                    label="Password"
                />
                <div>
                    <Button type="submit" disabled={submitting}>
                        Submit
                    </Button>
                    <Button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </Button>
                </div>
            </form>
        );
};

export default compose(
    reduxForm({
        form: 'login',
    })
)(LoginForm);