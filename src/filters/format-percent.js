import clac from 'calculatorjs'

const formatPercent = value => {
  if(isNaN(value)){
    return '--';
  }
  return `${clac.mul(value,100)}%`;
};

export default formatPercent;
