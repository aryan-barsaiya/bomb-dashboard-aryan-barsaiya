import React from 'react';
import TokenSymbol from '../../../components/TokenSymbol';

const Button1 = (props) => {
  return (
    <button disabled={props.disable ? props.disable : false}
      style={{
        margin: '5px',
        padding: '6px 6px 6px 8px',
        borderRadius: '16px',
        background: 'none',
        color: 'white',
        border: ' 2px solid white',
      }}
    >
      {props.text}&emsp;
      <TokenSymbol symbol={props.symbol} size={13} />
    </button>
  );
};

export default Button1;
