import React from 'react';
import './App.css';
import Form from './includes/Form';
import ResultsTable from './includes/ResultsTable';
import BranchModel from './includes/Models/BranchModel';
import ValidationsModel from './includes/Models/ValidationsModel';
import ConditionsModel from './includes/Models/ConditionsModel';
import { Icon, Header, Grid } from 'semantic-ui-react';
import Select from './includes/Components/Select';
import { formsArray, AJAX_URL } from './includes/constants';

import QuestionModel from './includes/Models/QuestionModel';

class App extends React.Component {

  constructor() {
    super();
    this.handleFormSelected = this.handleFormSelected.bind( this );
    this.saveQuestionsToPersistance = this.saveQuestionsToPersistance.bind( this );
    this.getQuestionsFromPersistance = this.getQuestionsFromPersistance.bind( this );
    this.getQuestionsForForm = this.getQuestionsForForm.bind( this );
    this.sendOutAjaxSave = this.sendOutAjaxSave.bind( this );

    this.handleChangeName = this.handleChangeName.bind( this );
    this.handleChangeType = this.handleChangeType.bind( this );
    this.handleChangeOrderOnBranch = this.handleChangeOrderOnBranch.bind( this );
    this.handleChangeOnBranch = this.handleChangeOnBranch.bind( this );

    this.saveQuestion = this.saveQuestion.bind( this );
    this.deleteQuestion = this.deleteQuestion.bind( this );

    this.cancelAddQuestion = this.cancelAddQuestion.bind( this );

    this.clearForm = this.clearForm.bind( this );

    this.generateId = this.generateId.bind( this );

    //Branches
    this.saveBranch = this.saveBranch.bind( this );
    this.deleteBranch = this.deleteBranch.bind( this );

    // Validations
    this.saveValidation = this.saveValidation.bind( this );
    this.deleteValidation = this.deleteValidation.bind( this );

    // Conditions
    this.saveCondition = this.saveCondition.bind( this );
    this.deleteCondition = this.deleteCondition.bind( this );

    // Data Validations
    this.handleChangeRequiredDV = this.handleChangeRequiredDV.bind( this );
    this.handleChangeNumericDV = this.handleChangeNumericDV.bind( this );
    this.handleChangeMinValueDV = this.handleChangeMinValueDV.bind( this );
    this.handleChangeMaxValueDV = this.handleChangeMaxValueDV.bind( this );
    this.handleChangeMinLengthDV = this.handleChangeMinLengthDV.bind( this );
    this.handleChangeMaxLengthDV = this.handleChangeMaxLengthDV.bind( this );
    this.handleChangeTipGreskaDV = this.handleChangeTipGreskaDV.bind( this );

    this.recalcBranches = this.recalcBranches.bind( this );
    this.editQuestion = this.editQuestion.bind( this );

  }

  componentDidMount() {
    this.getQuestionsFromPersistance();
  }

  state ={
    questions: [],
    branches:[new BranchModel( 0, [], 'root' )], // Do not clear (holds all the branches)
    QuestionBranches:[],
    validations:[],
    conditions:[],

    dataValidations: [],
    requiredDV:false,
    numericDV:false,
    minValueDV:0,
    maxValueDV:0,
    minLengthDV:0,
    maxLengthDV:0,
    tipGreskaDV:'',

    name:'',
    type:'',
    onBranch:'',
    orderOnBranch:'',
    isUpdating:-1,
    formSelected: 3,
    formsCollection: [],
    formErrors:[]
  };

  clearForm() {
    this.setState({
        name:'',
        type:'',
        onBranch:'',
        orderOnBranch:'',
        QuestionBranches:[],
        conditions:[],
        validations:[],

        dataValidations: [],
        requiredDV:false,
        numericDV:false,
        minValueDV:0,
        maxValueDV:0,
        minLengthDV:0,
        maxLengthDV:0,
        tipGreskaDV:'',

        errMsg:'',
        isUpdating:-1,
        formErrors:[]
       });

  }

  cancelAddQuestion() {
    this.clearForm();
    const questions = this.state.questions.slice();
    questions.forEach( q=> q.isUpdating = 0 );
    this.setState({ questions });
  };

  handleFormSelected( event ) {
    this.setState({ formSelected: event.target.value });
    this.getQuestionsForForm( event.target.value );
  };

  // UTILITIES
  generateId() {
    let newId = 1;
    [].forEach.call( arguments, ( arr=> arr.forEach( x=> newId = newId > x.id ? newId : x.id + 1 ) ) );
    return newId;
  }

  recalcBranches( questionsPar ) {
    const questions = questionsPar || this.state.questions;
    let branches = [new BranchModel( 0, [], 'root' )];
    questions.filter( q=>q.branches.length > 0 ).forEach( q => {
      branches = branches.concat( q.branches );
    });
    this.setState( { branches } );
  }

  // PERSISTANCE
  saveQuestionsToPersistance( questions ) {
    if ( 0 === AJAX_URL.length ) {
       window.localStorage[this.state.formsCollection
      .find( f=> f.id === parseInt( this.state.formSelected, 10 ) )
      .storageObject] = JSON.stringify( questions );
    }else {
      this.sendOutAjaxSave( this.state.formSelected, questions );
    }
  }

  sendOutAjaxSave( formId, questionsObj ) {
    const data = JSON.stringify( {
      formId,
      questions: JSON.stringify( questionsObj )
    });
    if ( AJAX_URL.length > 0 ) {
      fetch( AJAX_URL + '/Save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    }else {
      console.log( JSON.parse( JSON.parse( data ).questions ) );
    }

  }

  getQuestionsFromPersistance() {
    fetch( AJAX_URL + '/GetAll' )
    .then( res => res.json() )
    .then( data => JSON.parse( data.d ) )
    .then(
      ( formsCollection ) => {
        this.setState({ formsCollection });
        this.getQuestionsForForm( this.state.formSelected );
      }, ( error ) => {
        this.setState({ formsCollection: formsArray });
        this.getQuestionsForForm( this.state.formSelected );
        console.log( 'Ajax Call failed', error );
      }
    );
  }

  getQuestionsForForm( formSelected ) {
    const selectedFormObj = this.state.formsCollection.find( f=> parseInt( f.id, 10 ) === parseInt( formSelected, 10 ) );
    let questions = [];
    if ( 0 === AJAX_URL.length  ) {
      questions = localStorage[selectedFormObj.storageObject] ? JSON.parse( localStorage[selectedFormObj.storageObject] ) : [] ;
    }else {
      if ( selectedFormObj ) {
        questions =  selectedFormObj.payload ? JSON.parse( selectedFormObj.payload ) : [];
      }
    }
    this.recalcBranches( questions );

    this.setState({ questions });
  }

  //Top part of form

  handleChangeName( event ) {
    this.setState({ name: event.target.value });
  }
  handleChangeType( event ) {
    this.setState({ type: event.target.value });
  }
  handleChangeOrderOnBranch( event ) {
    this.setState({ orderOnBranch: event.target.value });
  }
  handleChangeOnBranch( event ) {
    this.setState({ onBranch: event.target.value });
  }

  // BRANCHES

  saveBranch( modaliteti, name  ) {
    const QuestionBranches = this.state.QuestionBranches.slice();
    let newId = this.generateId( this.state.branches, QuestionBranches );
    QuestionBranches.push( new BranchModel( newId, modaliteti, name ) );
    this.setState({ QuestionBranches });
  }
  deleteBranch( id ) {
    const QuestionBranches = this.state.QuestionBranches.filter( s=> {
      return s.id !== id;
    });
    this.setState({ QuestionBranches });
  }

  // VALIDATIONS
  saveValidation( type, fieldToCompare, compareWith, comparisonOperator, action, applyToModalities ) {
    const validations = this.state.validations.slice();
    let newId = this.generateId( this.state.validations, ...this.state.questions.filter( q=> q.validations.length > 0 ).map( c=> c.validations ) );
    validations.push( new ValidationsModel( newId, type, fieldToCompare, compareWith, comparisonOperator, action, applyToModalities )  );
    this.setState({ validations });
  }

  deleteValidation( id ) {
    const validations = this.state.validations.filter( s=> {
      return s.id !== id;
    });
    this.setState({ validations });
  }

  // CONDITIONS

  saveCondition( type, fieldToCompare, compareWith, comparisonOperator  ) {
    const conditions = this.state.conditions.slice();
    let newId = this.generateId( conditions, ...this.state.questions.filter( q=> q.conditions.length > 0 ).map( c=> c.conditions ) );
    conditions.push( new ConditionsModel( newId, type, fieldToCompare, compareWith, comparisonOperator )  );
    this.setState({ conditions });
  }

  deleteCondition( id ) {
    const conditions = this.state.conditions.filter( s=> {
      return s.id !== id;
    });
    this.setState({ conditions });
  }

  // DATA VALIDATION
  handleChangeRequiredDV = ( e, { checked }) => {
      this.setState({ requiredDV:checked });
  };
  handleChangeNumericDV = ( e, { checked }) => {
      this.setState({ numericDV:checked });
  };

  handleChangeMinValueDV( e ) {
    console.log();
    this.setState({ minValueDV: parseInt( e.target.value, 10 ) });
  }
  handleChangeMaxValueDV( e ) {
    this.setState({ maxValueDV: parseInt( e.target.value, 10 ) });
  }
  handleChangeMinLengthDV( e ) {
    this.setState({ minLengthDV: parseInt( e.target.value, 10 ) });
  }
  handleChangeMaxLengthDV( e ) {
    this.setState({ maxLengthDV: parseInt( e.target.value, 10 ) });
  }
  handleChangeTipGreskaDV( e ) {
    this.setState({ tipGreskaDV: e.target.value });
  }

  // Form Question

  saveQuestion() {
    const questions = this.state.questions.slice(),
     { name, type, onBranch, orderOnBranch, conditions, validations, requiredDV, tipGreskaDV, numericDV, minValueDV, maxValueDV, minLengthDV, maxLengthDV } = this.state;

    let { QuestionBranches, isUpdating } = this.state;
    if ( ! name || ! type || ! onBranch || ! orderOnBranch  ) {
      this.setState({ errMsg: 'A question must have a name, type, onBranch and orderOnBranch ' });
      return;
    }
    if ( !! requiredDV && ! tipGreskaDV ) {
      this.setState({ errMsg: 'If Required is true, Tip Greska cannot be empty' });
      return;
    }

    if ( -1 === isUpdating ) {

      if ( questions.findIndex( q=> q.name === name ) !== -1 ) {
        this.setState({ errMsg: 'This question already exists' });
        return;
      }
      let newId = this.generateId( questions );

      const question =
      new QuestionModel( newId, name, type, onBranch, orderOnBranch, QuestionBranches, conditions, validations, requiredDV, tipGreskaDV, numericDV, minValueDV, maxValueDV, minLengthDV, maxLengthDV );
      questions.push( question );
      console.log( question );
    }else {
      const questionId = questions.findIndex( q=> q.id === isUpdating );
      if ( questionId === -1 ) {
        console.log( 'ERROR UPDATE QUESTION NOT FOUND ID: ' + isUpdating );
        return;
      }
      const question = questions[questionId];
      question.name = name;
      question.type = type;
      question.onBranch = onBranch;
      question.orderOnBranch = orderOnBranch;
      question.branches = QuestionBranches;
      question.conditions = conditions;
      question.validations = validations;
      question.requiredDV = requiredDV;

      question.tipGreskaDV = tipGreskaDV;
      question.numericDV = numericDV;
      question.minValueDV = minValueDV;
      question.maxValueDV = maxValueDV;
      question.minLengthDV = minLengthDV;
      question.maxLengthDV = maxLengthDV;
      console.log( question );

      question.isUpdating = 0;
      isUpdating = -1;

    }

      this.setState({ questions, isUpdating });
      this.saveQuestionsToPersistance( questions );

      this.recalcBranches( questions );

    this.clearForm();
  };

  deleteQuestion( id ) {
    const questions = this.state.questions.slice().filter( s => s.id !== id );
    if ( window.confirm( 'Delete question: ' + id ) ) {
      this.setState({ questions });
      this.saveQuestionsToPersistance( questions );
      this.recalcBranches( questions );
      if (  0 < this.state.isUpdating ) {
        this.clearForm();
      }
    }

  };

  editQuestion( id ) {
    const questions = this.state.questions.slice(),
     questionId = questions.findIndex( s => s.id === id ),
     question = questions.find( s => s.id === id ),
    { branches, validations, conditions, name, type, onBranch, orderOnBranch, requiredDV, tipGreskaDV, numericDV, minValueDV, maxValueDV, minLengthDV, maxLengthDV } = question;
    questions.forEach( q=> q.isUpdating = 0 );
    questions[questionId].isUpdating = 1;
    this.setState({ isUpdating:question.id,
     QuestionBranches: branches, validations, conditions, name, type, onBranch, orderOnBranch, questions,  requiredDV, tipGreskaDV, numericDV, minValueDV, maxValueDV, minLengthDV, maxLengthDV });
  }

  // RENDER

  render() {
    const SelectedForm = this.state.formsCollection.find( f=> parseInt( f.id, 10 ) === parseInt( this.state.formSelected, 10 ) ),
    SelectedFormName = SelectedForm ? SelectedForm.name : '',
    SelectedFormDataSource = this.state.formsCollection.map( f=> {
                              return { value: f.id, text:f.name };
                            });
    return ( <div className='ui container' >
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h2' style={{ margin:'40px 0' }}>
                <Icon name='settings' />
                <Header.Content>
                  Popis Questions
                  <Header.Subheader>Promeni Podatoci za {SelectedFormName}</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>

            <Grid.Column width={4} style={{ margin:'40px 0' }}>
            </Grid.Column>

            <Grid.Column width={4} style={{ margin:'40px 0' }}>
              <Select items={SelectedFormDataSource} title='Forma' value={this.state.formSelected} onChange={this.handleFormSelected} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      <Form
        name={this.state.name}
        type={this.state.type}
        onBranch={this.state.onBranch}
        QuestionBranches={this.state.QuestionBranches}
        orderOnBranch={this.state.orderOnBranch}

        branches={this.state.branches}
        validations={this.state.validations}
        conditions={this.state.conditions}
        dataValidations={this.state.dataValidations}

        questions={this.state.questions}
        saveQuestion={this.saveQuestion}
        deleteQuestion={this.deleteQuestion}

        saveBranch={this.saveBranch}
        deleteBranch={this.deleteBranch}

        saveValidation={this.saveValidation}
        deleteValidation={this.deleteValidation}

        saveCondition={this.saveCondition}
        deleteCondition={this.deleteCondition}

        saveDataValidations={this.saveDataValidations}
        numericDV={this.state.numericDV}
        handleChangeNumericDV={this.handleChangeNumericDV}
        requiredDV={this.state.requiredDV}
        handleChangeRequiredDV={this.handleChangeRequiredDV}
        minValueDV={this.state.minValueDV}
        handleChangeMinValueDV={this.handleChangeMinValueDV}
        maxValueDV={this.state.maxValueDV}
        handleChangeMaxValueDV={this.handleChangeMaxValueDV}
        minLengthDV={this.state.minLengthDV}
        handleChangeMinLengthDV={this.handleChangeMinLengthDV}
        maxLengthDV={this.state.maxLengthDV}
        handleChangeMaxLengthDV={this.handleChangeMaxLengthDV}
        tipGreskaDV={this.state.tipGreskaDV}
        handleChangeTipGreskaDV={this.handleChangeTipGreskaDV}

        cancelAddQuestion={this.cancelAddQuestion}
        handleChangeName={this.handleChangeName}
        handleChangeType={this.handleChangeType}
        handleChangeOrderOnBranch={this.handleChangeOrderOnBranch}
        handleChangeOnBranch={this.handleChangeOnBranch}

        errMsg={this.state.errMsg}

       />
      <ResultsTable tableRows={this.state.questions} deleteRow={this.deleteQuestion} editQuestion={this.editQuestion} />
    </div> );
  };

}

export default App;
