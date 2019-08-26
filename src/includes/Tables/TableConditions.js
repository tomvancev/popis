import React from 'react';
import { Label,  Table, Button } from 'semantic-ui-react';
import ModalConditions from './InputModals/ModalConditions';

const TableConditions = ( props ) => {

const tableRows = props.conditions.map( ( model, ind ) => {
  let id;
        if ( 0 === ind ) {
          id = ( <Label ribbon>{model.id}</Label> );
         }else {
           id = model.id;
         }

  return (
  <Table.Row key={model.id}>
    <Table.Cell>{id}</Table.Cell>
    <Table.Cell>{model.type}</Table.Cell>
    <Table.Cell>{model.fieldToCompare}</Table.Cell>
    <Table.Cell>{model.comparisonOperator}</Table.Cell>
    <Table.Cell>{model.compareWith}</Table.Cell>
    <Table.Cell><Button onClick={()=> {
      props.deleteCondition( model.id );
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
        <Table.HeaderCell>Actions</Table.HeaderCell>

      </Table.Row>
    </Table.Header>
    <Table.Body>
      {tableRows}
    </Table.Body>

  </Table>
    <ModalConditions
      saveCondition={props.saveCondition}
      deleteCondition={props.deleteCondition}
      comparisonOperators={props.comparisonOperators}
      questions={props.questions} />
</div>
);
};

export default TableConditions;
