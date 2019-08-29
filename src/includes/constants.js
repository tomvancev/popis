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
export const AJAX_URL = 'Service.svc';

export const formsArray = [
  {
    id:1,
    name:'Podatoci Zgrada',
    shortName:'PZ',
    storageObject: 'popisSettingsPz'
  },
  {
    id:2,
    name:'Podatoci Stan',
    shortName:'PS',
    storageObject: 'popisSettingsPs'
  },
  {
    id:3,
    name:'Podatoci Lice',
    shortName:'PL',
    storageObject: 'popisSettingsPl'
  },
  {
    id:4,
    name:'Podatoci Domakinstvo',
    shortName:'PD',
    storageObject: 'popisSettingsPd'
  }
];
