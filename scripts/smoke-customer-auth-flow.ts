import {
  authenticateWithPassword,
  createPasswordResetToken,
  registerUser,
  resetPasswordWithToken,
} from '../src/lib/user-auth/service';

async function main() {
  const email = `trekker+${Date.now()}@example.com`;
  const reg = await registerUser({
    firstName: 'Test',
    lastName: 'Trekker',
    email,
    phone: '9876543210',
    phoneCountryCode: '+91',
    dateOfBirth: '15/08/1995',
    gender: 'male',
    nationality: 'Indian',
    password: 'Trekker1!',
  });
  if ('error' in reg) throw new Error(reg.error);

  const login = await authenticateWithPassword(email, 'Trekker1!');
  if ('error' in login) throw new Error(login.error);

  const reset = await createPasswordResetToken(email);
  if (!reset) throw new Error('no reset token');

  const done = await resetPasswordWithToken(reset.rawToken, 'Trekker2!');
  if ('error' in done) throw new Error(done.error);

  const login2 = await authenticateWithPassword(email, 'Trekker2!');
  if ('error' in login2) throw new Error(login2.error);

  console.log('customer-auth flow ok', login2.user.email, login2.user.firstName, login2.user.nationality);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
