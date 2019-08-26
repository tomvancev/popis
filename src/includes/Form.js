import React, {Component} from 'react';
import {Tab, Button, Segment} from 'semantic-ui-react';
import TableValidations from './Tables/TableValidations';
import TableConditions from './Tables/TableConditions';
import TableBranches from './Tables/TableBranches';
import {comparisonOperators, typeOfQuestions} from './constants';
import Select from './Components/Select';

class Form extends Component {

  render() {

    const panes = [
      { menuItem: 'Branches', render: () => (
        <Tab.Pane>
          <TableBranches
            branches={this.props.QuestionBranches}
            saveBranch={this.props.saveBranch}
            deleteBranch={this.props.deleteBranch}  />
        </Tab.Pane> )
      },
      { menuItem: 'Validations', render: () => <Tab.Pane>
        <TableValidations
          validations={this.props.validations}
          saveValidation={this.props.saveValidation}
          deleteValidation={this.props.deleteValidation}
          comparisonOperators={comparisonOperators}
          questions={this.props.questions}/>
        </Tab.Pane> },
      { menuItem: 'Conditions', render: () => <Tab.Pane>
        <TableConditions
          conditions={this.props.conditions}
          saveCondition={this.props.saveCondition}
          deleteCondition={this.props.deleteCondition}
          comparisonOperators={comparisonOperators}
          questions={this.props.questions}/>
    </Tab.Pane> }
    ];
    const validationErrors = this.props.errMsg ? ( <Segment color='red'>
                {this.props.errMsg}
              </Segment> ) : '';

    const branches = this.props.branches.map( b=> {
      return { value:b.id, text:b.name };
     } );

    return ( <form className='ui form' onSubmit={( ev )=>ev.preventDefault()}>
      <div className='fields'>
        <div className='four wide field'>
          <label>Question Name</label>
          <input type='text' placeholder='Name' value={this.props.name} onChange={this.props.handleChangeName}/>
        </div>
        <div className='four wide field'>
            <Select title='Type' value={this.props.type} onChange={this.props.handleChangeType} items={typeOfQuestions} />
        </div>
        <div className='four wide field'>
            <Select title='On Branch' value={this.props.onBranch} onChange={this.props.handleChangeOnBranch} items={branches} />
        </div>
        <div className='four wide field'>
          <label>Order on Branch</label>
          <input type='number' value={this.props.orderOnBranch} onChange={this.props.handleChangeOrderOnBranch}/>
        </div>
      </div>

        <Tab panes={panes} style={{ marginTop:'24px', marginBottom:'24px' }} />
        <Button.Group style={{ marginBottom:'12px' }}> 
          <Button onClick={this.props.cancelAddQuestion}>Cancel</Button>
          <Button.Or />
          <Button onClick={this.props.saveQuestion} positive>Save</Button>
        </Button.Group>
        {validationErrors}
    </form> );
  }

}
export default Form;
