import React, {Component} from 'react';
import {  Button, Modal, Icon } from 'semantic-ui-react';
import Select from '../../Components/Select';
import {typeOfValidationActions, typeOfValidations} from '../../constants';

class ModalValidations extends Component {
  constructor() {
    super();
    this.clearFields = this.clearFields.bind( this );
    this.onSaveValidation = this.onSaveValidation.bind( this );

    this.handleChangeType = this.handleChangeType.bind( this );
    this.handleChangeCompareWith = this.handleChangeCompareWith.bind( this );
    this.handleChangeCompariosonOperator = this.handleChangeCompariosonOperator.bind( this );
    this.handleChangeAction = this.handleChangeAction.bind( this );
    this.handleChangeModalitet = this.handleChangeModalitet.bind( this );
    this.handleChangeFieldToCompare = this.handleChangeFieldToCompare.bind( this );

    // This.handleChangeApplyToModalities = this.handleChangeApplyToModalities.bind( this );
  }

  clearFields() {
    this.setState({
      type:'',
      fieldToCompare:'',
      compareWith:'',
      comparisonOperator:'',
      action:'',
      applyToModalities:[],
      modalitet:1,
      errMsg:''
    });
  }

  onSaveValidation() {
    let { type, compareWith, fieldToCompare, comparisonOperator, action, applyToModalities } = this.state;
    this.props.saveValidation( type, fieldToCompare, compareWith, comparisonOperator, action, applyToModalities );
    this.clearFields();
  }

  state = {
     type:'',
     fieldToCompare:'',
     compareWith:'',
     comparisonOperator:'',
     action:'',
     applyToModalities:[],
     modalitet:1,
     errMsg:''
  };

  handleChangeType( event ) {
    this.setState({ type: event.target.value });
  }
  handleChangeCompareWith( event ) {
    this.setState({ compareWith: event.target.value });
  }
  handleChangeCompariosonOperator( event ) {
    this.setState({ comparisonOperator: event.target.value });
  }
  handleChangeAction( event ) {
    this.setState({ action: event.target.value });
  }
  handleChangeModalitet( event ) {
    this.setState({ modalitet: parseInt( event.target.value, 10 ) });
  }
  handleChangeFieldToCompare( event ) {
    this.setState({ fieldToCompare: event.target.value });
  }

  addModalitet() {
    const applyToModalities = this.state.applyToModalities.slice();
    const { modalitet } = this.state;
    if ( applyToModalities.findIndex( s => s  === modalitet ) === -1 &&  parseInt( modalitet, 10 ) > 0   ) {
    applyToModalities.push( modalitet );
    this.setState({
      applyToModalities,
      modalitet:'',
      errMsg:''
    });
  }else if ( parseInt( modalitet, 10 ) < 1  ) {
    this.setState({
      errMsg: 'Can\'t add modality smaller than 1'
    });
  } else if ( applyToModalities.findIndex( s => s  === modalitet ) !== -1 ) {
      this.setState({
        errMsg: 'Can\'t add the same modality twice'
      });
    }else {
      this.setState({
        errMsg: 'Error adding modality'
      });
    }
  }

  render() {
    const applyToModalities = this.state.applyToModalities.map( ( mod, ind )=> {
      const separator =  ind === this.state.applyToModalities.length - 1 ? '' : ' | ';
      return ( <span key={mod}>
        {mod}{separator}
      </span>
      );
    });
    const { comparisonOperators, questions } = this.props;
    const questionNames = questions.map( q => {
            return { value:q.name, text:q.name, type: q.type };
          });

    let compareWith, questionNamesCompare;
    if ( 'dynamic' === this.state.type ) {
      questionNamesCompare = questionNames.filter( q=> 'normalno' === q.type  ||  'kontrolno' === q.type );
      compareWith = <Select value={this.state.compareWith} onChange={this.handleChangeCompareWith} items={questionNames} />;
    }else {
      questionNamesCompare = questionNames.filter( q=> 'prevzemeno' ===  q.type );
      compareWith = <input type='number'  placeholder='Name' value={this.state.compareWith} onChange={this.handleChangeCompareWith}/>;
    }
      return ( <Modal
        trigger={<Button onClick={( event )=> {
          event.preventDefault();
          this.clearFields();
        }}>Add new Validation</Button>}
         centered={false}>

        <Modal.Header>Add new Validation Rule</Modal.Header>
        <Modal.Content>
      <form className='ui form'>
        <div className='fields'>
          <div className='four wide field'>
            <label>Type</label>
            <Select value={this.state.type} onChange={this.handleChangeType} items={typeOfValidations} />
          </div>
          <div className='four wide field'>
            <label>Field To Compare</label>
            <Select value={this.state.fieldToCompare} onChange={this.handleChangeFieldToCompare} items={questionNamesCompare} />
          </div>
          <div className='four wide field'>
            <label> Operator</label>
            <Select value={this.state.comparisonOperator} onChange={this.handleChangeCompariosonOperator} items={comparisonOperators} />
          </div>
          <div className='four wide field'>
            <label>Compare With</label>
              {compareWith}
          </div>

        </div>
        <div className='fields'>
          <div className='four wide field'>
            <label>Action</label>
            <Select value={this.state.action} onChange={this.handleChangeAction} items={typeOfValidationActions} />
          </div>
          <div className='four wide field'>
            <label>Apply To Modalities</label>
            <input type='number'  placeholder='Modality' value={this.state.modalitet} onChange={this.handleChangeModalitet}/>
          </div>
            <div className='four wide field'>
              <label>Dodadi</label>
              <Button fluid positive onClick={( ev )=> {
                ev.preventDefault();
                this.addModalitet();
              }}> <Icon name='plus' /></Button>
            </div>
            <div className='four wide field'>
              <label>Modaliteti</label>
                {applyToModalities}
            </div>
          </div>
      </form>

        </Modal.Content>
        <Modal.Description>
          {this.state.errMsg}
        </Modal.Description>
        <Modal.Actions>
        <Button primary onClick={this.onSaveValidation}>
          Save
        </Button>

        </Modal.Actions>
      </Modal> );
  };
}

export default ModalValidations;
