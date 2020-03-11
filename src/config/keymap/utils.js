export function arrToMap(arr, valueKey = 'value', labelKey = 'label') {
  const map = {};
  arr.forEach(item => {
    map[item[valueKey]] = item[labelKey];
  });

  return map;
}
