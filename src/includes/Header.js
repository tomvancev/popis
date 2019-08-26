import React from 'react';

 const Header  = ( props ) => {
   const divStyle = {
  margin: '20px 0',
  padding: '20px'
};
return (
  <h3 className='ui top attached header' style={divStyle}>
    {props.children}
  </h3>
);

};

export default Header;
