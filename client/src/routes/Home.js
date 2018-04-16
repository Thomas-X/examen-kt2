import React, { Component } from 'react';
import { Col, Grid, Jumbotron, Row } from 'react-bootstrap';
import { compose } from 'redux';
import styled from 'styled-components';

const ColTextContainer = styled.div`
    height: 60%;
    width: 100%;
`;

const ColImage = styled.img`
    width: 100%;
    height: 40%;
`;

const ColText = styled.p`
    font-size: 12px;
`;

const ColImageComponent = props => (
    <Col sm={6} md={4} xs={12}>
        <ColImage src={props.imageURL}/>
        <ColTextContainer>
            <h2>
                {props.title}
            </h2>
            <ColText>
                {props.desc}
            </ColText>
        </ColTextContainer>
    </Col>
);

class Home extends Component {

    render () {
        return (
            <div>
                <Jumbotron style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <h2>Zeilschool de Waai</h2>
                    <p style={{ width: '50%', textAlign: 'center' }}>
                        Lorem ipsum dolor sit amet.
                    </p>
                </Jumbotron>
                    <Row>
                        <ColImageComponent imageURL={'https://i.imgur.com/2UD5k7Q.jpg'} title={'Ons gebouw'} desc={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}/>
                        <ColImageComponent imageURL={'https://i.imgur.com/yI7K2iT.jpg'} title={'Lorem ipsum'} desc={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}/>
                        <ColImageComponent imageURL={'https://i.imgur.com/POZ9CDn.jpg'} title={'Lorem ipsum'} desc={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}/>
                    </Row>
            </div>
        );
    }
}

export default compose(
)(Home);

// import React, { Component } from 'react';
// import { compose } from 'redux';
//
// class Home extends Component {
//
//     render() {
//         <div>
//
//         </div>
//     }
// }
//
// export default compose(
// )(Home);
