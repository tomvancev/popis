const QuestionModel =
function QuestionModel( id, name, type, onBranch, orderOnBranch, branches, conditions, validations, requiredDV, tipGreskaDV, numericDV, minValueDV, maxValueDV, minLengthDV, maxLengthDV ) {
    return {
      id,
      name,
      type,
      onBranch,
      orderOnBranch,
      branches,

      conditions,
      validations,

      requiredDV,
      tipGreskaDV,
      numericDV,
      minValueDV,
      maxValueDV,
      minLengthDV,
      maxLengthDV,

      isUpdating:false
    };
  };

export default QuestionModel;
