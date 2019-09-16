import React from 'react';
import {  Checkbox, Input} from 'semantic-ui-react';
import Select from './Select';
import {TipNaGreska} from '../constants';

const DataValidations = ( props ) => {

		const required = props.requiredDV ?
		( <div style={{ width:'150px' }}><Select placeholder='Izberi tip na greska' items={TipNaGreska} value={props.tipGreskaDV} onChange={props.handleChangeTipGreskaDV}/></div> ) :
		'';
		const numericOrText = props.numericDV ?
		( <div style={{ marginTop:'20px' }}>
			 <Input placeholder='Min...' label='Min' value={props.minValueDV} onChange={props.handleChangeMinValueDV} />
			 <p style={{ clear:'both' }}></p>
			 <Input placeholder='Max...' label='Max' value={props.maxValueDV} onChange={props.handleChangeMaxValueDV}  />
		</div> )
		: ( <div style={{ marginTop:'20px' }}>
			 <Input placeholder='Min Length...' label='Min Length' value={props.minLengthDV}  onChange={props.handleChangeMinLengthDV} />
			 <p style={{ clear:'both' }}></p>
			 <Input placeholder='Max Length...' label='Max Length' value={props.maxLengthDV}  onChange={props.handleChangeMaxLengthDV}  />
		</div> );

	    return ( <div>
	    		<h3>Data validatons</h3>
	 			<Checkbox
					toggle
					onChange={props.handleChangeRequiredDV}
					checked={props.requiredDV}
					label='Required' />
 				<p style={{ clear:'both' }}></p>
	 			{required}
	 			 <p style={{ clear:'both' }}></p>
	 			<Checkbox	toggle
					onChange={props.handleChangeNumericDV}
					checked={props.numericDV}
					label='Numeric' />
	 			{numericOrText}
	    	</div> );
};

export default DataValidations;
