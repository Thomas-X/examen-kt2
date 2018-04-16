import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    width: 100%;
    background-color: rgba(0, 123, 255, 0.5);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Text = styled.span`
    font-size: 18px;
   
`;

export const Footer = (props) => {

    return (
        <Container>
            <Text>Copright &copy; Zeilschool de Waai 2018</Text>
        </Container>
    );
};