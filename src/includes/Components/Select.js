import React from 'react';

const Select = ( props ) => {
  const options = props.items.map( o =>  <option key={o.value} value={o.value}>{o.text}</option> );
      return (
        <div className='field'>
          <label>{props.title}</label>
          <select className='ui fluid search dropdown' value={props.value} onChange={props.onChange} >
            <option value=''  disabled hidden>Choose here</option>
              {options}
          </select>
        </div> );
};

export default Select;
