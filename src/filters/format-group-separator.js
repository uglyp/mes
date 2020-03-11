/**
 * 实现千位分隔符
 * @param {*} value
 */
const formatGroupSeperator = value => {
  if (!value) {
    return value;
  }

  return (
    value &&
    value.toString().replace(/\d+/, s => s.replace(/(\d)(?=(\d{3})+$)/g, '$1, '))
  );
};

export default formatGroupSeperator;
