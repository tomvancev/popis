
const ValidationsModel = function( id, type, fieldToCompare, compareWith, comparisonOperator, action, applyToModalities ) {
    this.id = id;
    this.type = type;
    this.fieldToCompare = fieldToCompare;

    this.compareWith = compareWith;
    this.comparisonOperator = comparisonOperator;
    this.action = action;
    this.applyToModalities = applyToModalities;
};

export default ValidationsModel;
