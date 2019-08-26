import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import ModalValidations from './InputModals/ModalValidations';

const TableValidations = ( props ) => {

const tableRows = props.validations.map( ( model, ind ) => {
  return (
  <Table.Row key={model.id}>
    <Table.Cell>{model.id}</Table.Cell>
    <Table.Cell>{model.type}</Table.Cell>
    <Table.Cell>{model.fieldToCompare}</Table.Cell>
    <Table.Cell>{model.comparisonOperator}</Table.Cell>
    <Table.Cell>{model.compareWith}</Table.Cell>
    <Table.Cell>{model.action}</Table.Cell>
    <Table.Cell>{model.applyToModalities.map( ( mod, ind )=> {
      const separator =  ind === model.applyToModalities.length - 1 ? '' : ' | ';
      return ( <span key={mod}>
        {mod}{separator}
      </span>
      );
    })}</Table.Cell>
    <Table.Cell><Button onClick={()=> {
      props.deleteValidation( model.id );
    }} >Delete</Button></Table.Cell>

  </Table.Row>
  );
});

 return (
 <div>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Field To Compare</Table.HeaderCell>
        <Table.HeaderCell>Comparison Operator</Table.HeaderCell>
        <Table.HeaderCell>Compare With</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        <Table.HeaderCell>Apply To Modalities</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>

      </Table.Row>
    </Table.Header>
    <Table.Body>
      {tableRows}
    </Table.Body>

  </Table>
    <ModalValidations
      saveValidation={props.saveValidation}
      deleteValidation={props.deleteValidation}
      comparisonOperators={props.comparisonOperators}
      questions={props.questions} />
</div>
);
};

export default TableValidations;
