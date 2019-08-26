
const ConditionsModel = function( id, type, fieldToCompare, compareWith, comparisonOperator, action, applyToModalities ) {
    this.id = id;
    this.type = type;
    this.fieldToCompare = fieldToCompare;

    this.compareWith = compareWith;
    this.comparisonOperator = comparisonOperator;
};

export default ConditionsModel;
