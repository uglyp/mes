 import Storage from 'mars-storage';

const storage = new Storage({
  type: 'localStorage',
  prefix: '__ems_manage__'
});


export default storage;
