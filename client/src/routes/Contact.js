import * as React from 'react';
import { Col, Grid, Jumbotron, Row } from 'react-bootstrap';
import { compose } from 'redux';

const ContactRow = props => (
    <Row>
        <Col xs={6} sm={3} md={3}>
            <h5><strong>{props.title}</strong></h5>
        </Col>
        <Col xs={6} sm={9} md={9}>
            <h5>{props.desc}</h5>
        </Col>
    </Row>
);

class Contact extends React.Component {

    render () {
        return (
            <div>
                <Jumbotron style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <h2>Contact</h2>
                    <p style={{ width: '50%', textAlign: 'center' }}>
                        Hier ziet u meerdere mogelijkheden om contact met ons op te nemen.
                    </p>
                </Jumbotron>

                    <ContactRow title={'Adres'} desc={'Sesamstraat 123'}/>
                    <ContactRow title={'Telefoonnummer'} desc={'06123123'}/>
                    <ContactRow title={'Email adres'} desc={'zeilschool@dewaai.nl'}/>
            </div>
        );
    }
}

export default compose()(Contact);