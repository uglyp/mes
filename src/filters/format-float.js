// 浮点数千位符
const formatFloat = num => {
  return num && num.toString().replace(/^\d +/, m => m.replace(/(?= (?! ^)(\d {3}) + $)/g, ','));
};

export default formatFloat;
