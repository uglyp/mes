import calc from 'calculatorjs';

const formatExpression = expression => {
  const result = calc(expression);

  if (isNaN(result)) {
    return '--';
  }

  return result.toFixed(2);
};

export default formatExpression;
