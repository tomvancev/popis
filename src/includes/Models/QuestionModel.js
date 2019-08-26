const QuestionModel = function QuestionModel( id, name, type, onBranch, orderOnBranch, branches, conditions, validations ) {
    return {
      id,
      name,
      type,
      onBranch,
      orderOnBranch,
      branches,

      // FromDb,
      conditions,
      validations,

      isUpdating:0
    };
  };

export default QuestionModel;
