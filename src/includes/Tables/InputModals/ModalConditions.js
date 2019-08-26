import React, {Component} from 'react';
import {  Button, Modal } from 'semantic-ui-react';
import Select from '../../Components/Select';
import {typeOfConditions} from '../../constants';

class ModalConditions extends Component {
  constructor() {
    super();
    this.clearFields = this.clearFields.bind( this );
    this.onSaveCondition = this.onSaveCondition.bind( this );

    this.handleChangeType = this.handleChangeType.bind( this );
    this.handleChangeCompareWith = this.handleChangeCompareWith.bind( this );
    this.handleChangeCompariosonOperator = this.handleChangeCompariosonOperator.bind( this );
    this.handleChangeFieldToCompare = this.handleChangeFieldToCompare.bind( this );
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

  onSaveCondition() {
    const { type, compareWith, fieldToCompare, comparisonOperator } = this.state;
    this.props.saveCondition( type, fieldToCompare, compareWith, comparisonOperator );
    this.clearFields();
  }

  state = {
     type:'',
     fieldToCompare:'',
     compareWith:'',
     comparisonOperator:'',
     action:'',
     applyToModalities:[],
     modalitet:'',
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
    if ( applyToModalities.findIndex( s => s  === modalitet ) === -1 && parseInt( modalitet, 10 ) > 0  ) {
    applyToModalities.push( modalitet );
    this.setState({
      applyToModalities,
      modalitet:0,
      errMsg:''
    });
    } else if ( parseInt( modalitet, 10 ) < 1  ) {
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
        const { comparisonOperators, questions } = this.props,
          questionNames = questions.map( q => {
            return { value: q.name, text: q.name, type:q.type };
          });

    let compareWith, questionNamesCompare;
    if ( 'dynamic' === this.state.type ) {
      questionNamesCompare = questionNames.filter( q=> 'prevzemeno' !== q.type );
      compareWith = <Select value={this.state.compareWith} onChange={this.handleChangeCompareWith} items={questionNames} />;
    }else {
      questionNamesCompare = questionNames.filter( q=> 'prevzemeno' ===  q.type );
      compareWith = <input type='number'  placeholder='Name' value={this.state.compareWith} onChange={this.handleChangeCompareWith}/>;
    }
      return ( <Modal
        trigger={<Button onClick={( event )=> {
          event.preventDefault();
          this.clearFields();
        }}>Add new Condition</Button>}
         centered={false}>

        <Modal.Header>Add new Condition Rule</Modal.Header>
        <Modal.Content>
      <form className='ui form'>
        <div className='fields'>
          <div className='four wide field'>
            <label>Type</label>
            <Select value={this.state.type} onChange={this.handleChangeType} items={typeOfConditions} />

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
      </form>


        </Modal.Content>
        <Modal.Description>
          {this.state.errMsg}
        </Modal.Description>
        <Modal.Actions>
        <Button primary onClick={this.onSaveCondition}>
          Save
        </Button>

        </Modal.Actions>
      </Modal> );
  };
}

export default ModalConditions;
