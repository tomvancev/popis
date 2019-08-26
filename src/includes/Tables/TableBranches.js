import React from 'react';
import {  Label, Table, Button } from 'semantic-ui-react';
import ModalBranches from './InputModals/ModalBranches';
const TableBranches = ( props ) => {

  const tableBody = props.branches.map( ( branch ) => {
    return (
      <Table.Row key={branch.id}>
            <Table.Cell>
              <Label>{branch.id}</Label>
            </Table.Cell>
            <Table.Cell>{branch.modaliteti.map( ( mod )=> mod + ' | ' )}</Table.Cell>
            <Table.Cell>{branch.name}</Table.Cell>
            <Table.Cell><Button onClick={()=>props.deleteBranch( branch.id )}>Delete</Button></Table.Cell>
      </Table.Row> );
  });
 return (
  <div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Modaliteti</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableBody}
      </Table.Body>
    </Table>
    <ModalBranches saveBranch={props.saveBranch} deleteBranch={props.deleteBranch} branchSequence={props.branchSequence} />
  </div>
  );
};

export default TableBranches;
