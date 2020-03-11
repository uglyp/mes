// 千位符（整数或小数）
const formatPrice = num => num && num.toString().replace(/(^|\s)\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));

export default formatPrice;
