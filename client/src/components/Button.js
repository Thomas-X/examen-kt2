import React from 'react';
import styled from 'styled-components';

export const Button: React.SFC<any> = (props: any ) => {
    return (
        <button className="btn btn-primary btn-block" {...props}>
            {props.children}
        </button>
    );
};