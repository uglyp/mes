// 整数千位符
const formatInteger = num => num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',');

export default formatInteger;
