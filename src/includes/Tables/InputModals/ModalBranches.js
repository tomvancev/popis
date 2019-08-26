import React, {Component} from 'react';
import {  Button, Modal, Icon } from 'semantic-ui-react';
class ModalBranches extends Component {
  constructor() {
    super();
    this.clearFields = this.clearFields.bind( this );
    this.onSaveBranch = this.onSaveBranch.bind( this );

    this.handleChangeName = this.handleChangeName.bind( this );
    this.handleChangeModalitet = this.handleChangeModalitet.bind( this );
  }

  clearFields() {
    this.setState({
      modaliteti:[],
      name:''
    });
  }

  onSaveBranch() {
    const { modaliteti, name } = this.state;
    this.props.saveBranch(  modaliteti, name );
    this.setState({ id: parseInt( this.state.id, 10 ) + 1 });
    this.clearFields();
  }

  state = {
    modalitet:0,
    modaliteti:[],
    name:'',
    errMsg:''
  };

  handleChangeName( event ) {
    this.setState({ name: event.target.value });
  }
  handleChangeModalitet( event ) {
    this.setState({ modalitet: parseInt( event.target.value, 10 ) });
  }
  addModalitet() {
    const modaliteti = this.state.modaliteti.slice();
    const { modalitet } = this.state;
    if ( modaliteti.findIndex( s => s  === modalitet ) === -1 ) {
    modaliteti.push( modalitet );
    this.setState({
      modaliteti,
      modalitet:0
    });
  } else {
    this.setState({
      errMsg: 'Can\'t add the same modality twice'
    });
  }
  }

  render() {
    const modaliteti = this.state.modaliteti.map( ( mod )=> {
      return ( <span key={mod}>
        {mod} |
      </span>
      );
    });
      return ( <Modal
        trigger={<Button onClick={( event )=> {
          event.preventDefault();
          this.clearFields();
        }}>Add new Branch</Button>}
         centered={false}>
        <Modal.Header>Add new Branch</Modal.Header>
        <Modal.Content>
      <form className='ui form'>
        <div className='fields'>
          <div className='four wide field'>
            <label>Branch Name</label>
            <input type='text'  placeholder='Name' value={this.state.name} onChange={this.handleChangeName}/>
          </div>
          <div className='four wide field'>
            <label>Modalitet</label>
            <input type='number'  placeholder='Name' value={this.state.modalitet} onChange={this.handleChangeModalitet}/>
          </div>
          <div className='two wide field'>
            <label>Dodadi</label>
            <Button positive onClick={( ev )=> {
              ev.preventDefault();
              this.addModalitet();
            }}> <Icon name='plus' /></Button>
          </div>
          <div className='four wide field'>
            <label>Modaliteti</label>
              {modaliteti}
          </div>
        </div>
      </form>


        </Modal.Content>
        <Modal.Description>
          {this.state.errMsg}
        </Modal.Description>
        <Modal.Actions>
        <Button primary onClick={this.onSaveBranch}>
          Save
        </Button>

        </Modal.Actions>
      </Modal> );
  };
}

export default ModalBranches;
