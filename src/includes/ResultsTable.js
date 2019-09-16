import React, {Component} from 'react';
import { Label, Table, Button, Input} from 'semantic-ui-react';
class ResultsTable extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind( this );
    this.sortColumn = this.sortColumn.bind( this );

  }
  state = {
    Id:'', Name:'', Type:'', OnBranch:'', OrderOnBranch:'', sortBy:'id', reverseSort:false, lastClicked:'id'
  };
  sortColumn( sortBy ) {
    let { reverseSort,  lastClicked } = this.state ;
    if ( sortBy === lastClicked && false  === reverseSort ) {
      reverseSort = true;
    }else {
      reverseSort = false;
    }
    this.setState({ sortBy, reverseSort, lastClicked:sortBy });
  }

  handleChange( event ) {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  }

  render() {
    const { deleteRow, tableRows, editQuestion } = this.props;

    const tableBody = tableRows.sort( ( a, b ) => {
        if ( b.isUpdating ) {
          return 1;
        }else if ( a.isUpdating ) {
          return -1;
        }
        if (  false === this.state.reverseSort ) {
          if ( Number.isNaN( parseInt( a[this.state.sortBy], 10 ) )  ) {
            return ( a[this.state.sortBy] ).localeCompare( b[this.state.sortBy] );
          }
          return a[this.state.sortBy] - b[this.state.sortBy];
      }else {
        if ( Number.isNaN( parseInt( a[this.state.sortBy], 10 ) ) ) {
          return ( b[this.state.sortBy] ).localeCompare( a[this.state.sortBy] );
        }
        return b[this.state.sortBy] - a[this.state.sortBy];
      }
    } ).filter( q=> {
      const { Id, Name, Type, OnBranch, OrderOnBranch } = this.state;
      const reducer = ( accumulator, currentValue ) => accumulator && currentValue;
      let result = [];
      if ( Id.length > 0 ) {
       result.push(  q.id.toString( 10 ).includes( Id ) );
      }
      if ( Name.length > 0 ) {
       result.push( q.name.toUpperCase().includes(  Name ) );
      }
      if ( Type.length > 0 ) {
       result.push( q.type.toUpperCase().includes(  Type ) );
      }
      if ( OnBranch.length > 0 ) {
       result.push( q.onBranch.toString( 10 ).includes( OnBranch ) );
      }
      if ( OrderOnBranch.length > 0 ) {
       result.push( q.orderOnBranch.toString( 10 ).includes( OrderOnBranch ) );
      }

      return result.length > 0 ? result.reduce( reducer ) : true;
    }).map( ( rule ) => {
      const { id, name, type, onBranch, orderOnBranch, isUpdating } = rule,
      style = isUpdating ? { backgroundColor:'#21ba45' } : {};

      return (
      <Table.Row key={id} style={style} >
        <Table.Cell>
          <Label ribbon>{id}</Label>
        </Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{type}</Table.Cell>
        <Table.Cell>{onBranch}</Table.Cell>
        <Table.Cell>{orderOnBranch}</Table.Cell>
        <Table.Cell><Button onClick={()=>deleteRow( id )}>Delete</Button><Button onClick={()=>editQuestion( id )}>Edit</Button></Table.Cell>
      </Table.Row>
    );
  });
  const flipped = this.state.reverseSort ? 'vertically' : 'horizontally',
  iconObject = { name:'arrow circle down', flipped };
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Button fluid icon={ 'id' === this.state.sortBy ? iconObject : {}} content='Id'
              onClick={()=> {
              this.sortColumn( 'id' );
            }} /></Table.HeaderCell>
            <Table.HeaderCell>
              <Button fluid icon={'name' ===  this.state.sortBy ? iconObject : {}} content='Name'
                onClick={()=> {
                this.sortColumn( 'name' );
              }} /></Table.HeaderCell>
            <Table.HeaderCell>
              <Button fluid icon={'type' === this.state.sortBy ? iconObject : {}} content='Type'
              onClick={()=> {
              this.sortColumn( 'type' );
            }} /></Table.HeaderCell>
            <Table.HeaderCell>
              <Button fluid icon={ 'onBranch' === this.state.sortBy ? iconObject : {}} content='On Branch'
              onClick={()=> {
              this.sortColumn( 'onBranch' );
            }} /></Table.HeaderCell>
            <Table.HeaderCell>
              <Button fluid icon={ 'orderOnBranch' === this.state.sortBy ? iconObject : {}} content='Order On Branch'
                onClick={()=> {
                this.sortColumn( 'orderOnBranch' );
              }} /></Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell><Input fluid icon='search' onChange={this.handleChange} size='mini' value={this.state.Id} name='Id' placeholder='Search Id' /></Table.HeaderCell>
            <Table.HeaderCell><Input fluid icon='search' onChange={this.handleChange} size='mini' value={this.state.Name} name='Name' placeholder='Search Name' /></Table.HeaderCell>
            <Table.HeaderCell><Input fluid icon='search' onChange={this.handleChange} size='mini' value={this.state.Type} name='Type' placeholder='Search Type' /></Table.HeaderCell>
            <Table.HeaderCell><Input fluid icon='search' onChange={this.handleChange} size='mini' value={this.state.OnBranch} name='OnBranch' placeholder='Search On Branch' /></Table.HeaderCell>
            <Table.HeaderCell><Input fluid icon='search' onChange={this.handleChange} size='mini' value={this.state.OrderOnBranch} name='OrderOnBranch' placeholder='Search Order On Branch' /></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {tableBody}
        </Table.Body>
      </Table>
  );
  }

}

export default ResultsTable;
