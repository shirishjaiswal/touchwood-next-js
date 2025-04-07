'use server';
import bcrypt from 'bcrypt';

async function hashPassword(password: string) {

  const saltRounds = process.env.SALT_ROUNDS || '$2b$10$abcdefghijklmnopqrstuv';
  return await bcrypt.hash(password, saltRounds);
}

export { hashPassword };