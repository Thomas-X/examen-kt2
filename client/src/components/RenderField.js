import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants/constants';
import { Button } from './Button';
import { Col, Row } from 'react-bootstrap';

const Error = styled.span`
    color: ${COLORS.red};
`;

const StyledLabel = styled.label`
    padding: 1rem 2rem 1rem 2rem;
    margin: 0.5rem;
    border: 1px solid ${COLORS.darkRed};
    cursor:pointer;
`;

// @ts-ignore
export class RenderField extends React.Component {

    state = {
        numbers: [],
        creditCardValue: ''
    };

    addNumber = () => {
        const numbers = this.state.numbers.slice();
        numbers.push(this.state.creditCardValue);
        this.setState({
            numbers,
            creditCardValue: '',
        });
        this.props.updateNumbers(numbers);
    }

    removeNumber = (whatNumberToRemove) => {
        const idx = this.state.numbers.findIndex((val) => val === whatNumberToRemove);
        const numbers = this.state.numbers.slice();
        numbers.splice(idx, 1);
        this.setState({
            numbers,
        });
        this.props.updateNumbers(numbers);
    }

    render() {
        const { type } = this.props;

        if (type === 'numberPicker') {
            return (
                <div>
                    <label>Credit cards</label>
                    <div className="form-group">
                        <Row>
                            <Col sm={8}>
                                <input
                                    placeholder="Add a credit card.."
                                    type="text"
                                    className="form-control"
                                    value={this.state.creditCardValue}
                                    onChange={(e) => {
                                        this.setState({
                                            creditCardValue: e.target.value,
                                        });
                                    }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Button style={{width: '100%'}} onClick={this.addNumber} disabled={this.state.creditCardValue === ''}>
                                    Add credit card
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                        <ul>
                            {this.state.numbers.map((numberFromState, index) => {
                                return (
                                    <StyledLabel
                                        key={index}
                                        onClick={() => this.removeNumber(numberFromState)}
                                    >
                                            {numberFromState}
                                    </StyledLabel>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            );
        }

        const {input, label, meta: {touched, error, warning}} = this.props;

        if (type === 'textarea') {
            return (
                <div>
                    <label>{label}</label>
                    <div className="form-group">
                        <textarea {...input} placeholder={label} type={type} className="form-control"/>
                        {touched &&
                        ((error && <Error>{error}</Error>) ||
                            (warning && <span>{warning}</span>))}
                    </div>
                </div>
            );
        }
        if (type !== 'textarea') {
            return (
                <div>
                    <label>{label}</label>
                    <div className="form-group">
                        <input {...input} placeholder={label} type={type} className="form-control"/>
                        {touched &&
                        ((error && <Error>{error}</Error>) ||
                            (warning && <span>{warning}</span>))}
                    </div>
                </div>
            );
        }
        return null;
    }
}