import { arrToMap } from './utils';

export const bizCodeOptions = [
  {
    label: '贷超',
    value: 'dc'
  },
  {
    label: 'leads 分发',
    value: 'bxk'
  }
];

export const bizCodeMap = arrToMap(bizCodeOptions);
