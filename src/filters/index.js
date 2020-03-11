import utils from '@/libs/utils';

export default utils.importAll(
  require.context('./', false, /^(?!.*(?:index.js$)).*\.js$/)
);
