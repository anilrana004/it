/**
 * Smoke-test customer auth helpers (password hash + session roundtrip).
 * Usage: npx tsx scripts/smoke-customer-auth.ts
 */
import { hashPassword, verifyPassword } from '../src/lib/user-auth/password';
import { createUserSessionToken, verifyUserSessionToken } from '../src/lib/user-auth/session';
import { validateLoginBody, validateRegisterBody } from '../src/lib/user-auth/validation';

async function main() {
  const password = 'Trekker1!';
  const hash = await hashPassword(password);
  if (!(await verifyPassword(password, hash))) throw new Error('password verify failed');
  if (await verifyPassword('wrong-pass1', hash)) throw new Error('password reject failed');

  const token = await createUserSessionToken('user-1', 'trekker@example.com');
  const session = await verifyUserSessionToken(token);
  if (!session || session.userId !== 'user-1' || session.email !== 'trekker@example.com') {
    throw new Error('session roundtrip failed');
  }
  if (await verifyUserSessionToken('invalid')) throw new Error('invalid session accepted');

  const badLogin = validateLoginBody({ email: 'bad', password: '' });
  if (!badLogin.fieldErrors) throw new Error('login validation failed');

  const goodRegister = validateRegisterBody({
    firstName: 'Ada',
    lastName: 'Trek',
    email: 'ada@example.com',
    phone: '9876543210',
    phoneCountryCode: '+91',
    dateOfBirth: '12031994',
    gender: 'female',
    nationality: 'Indian',
    password: 'AdaTrek9',
    confirmPassword: 'AdaTrek9',
  });
  if (!goodRegister.data) throw new Error('register validation failed');
  if (goodRegister.data.dateOfBirth !== '12/03/1994') {
    throw new Error('dob normalize failed');
  }

  console.log('customer-auth smoke tests passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
