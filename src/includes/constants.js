export const typeOfValidations = [{ value:'static', text:'Static' },
                                  { value:'dynamic', text:'Dynamic' }];
export const typeOfValidationActions = [{ value:'lock', text:'Lock' },
                              { value:'block', text:'Block' }];
export const comparisonOperators = [{ value:'>', text:'>' },
                                    { value:'<', text:'<' },
                                    { value:'=', text:'=' },
                                    { value:'!=', text:'!=' },
                                     { value:'[=]', text:'[=]' }];
export const typeOfQuestions = [{ value:'normalno', text:'Normalno' },
                       { value:'kontrolno', text:'Kontrolno' },
                       { value:'terminate', text:'Terminate' },
                       { value:'prevzemeno', text:'Prevzemeno' }];

export const typeOfConditions = [{ value:'static', text:'Static' },
                                               { value:'dynamic', text:'Dynamic' }];
export const formsArray = [
  {
    id:1,
    name:'Podatoci Zgrada',
    shortName:'PZ',
    localStorageObject: localStorage.popisSettingsPz
  },
  {
    id:2,
    name:'Podatoci Stan',
    shortName:'PS',
    localStorageObject: localStorage.popisSettingsPs
  },
  {
    id:3,
    name:'Podatoci Lice',
    shortName:'PL',
    localStorageObject: localStorage.popisSettingsPl
  },
  {
    id:4,
    name:'Podatoci Domakinstvo',
    shortName:'PD',
    localStorageObject: localStorage.popisSettingsPd
  }
];
