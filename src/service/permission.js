import auth from '@/service/auth';

export default function checkPermission(value) {
  const role = auth.getRole();

  // console.log('permission', value, role);

  return value.indexOf(role) > -1;
}
