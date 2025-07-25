// hash.ts
import * as bcrypt from 'bcrypt';

async function main() {
  const plainPassword = 'admin123'; // shu yerga siz xohlagan parolni yozing
  const hash = await bcrypt.hash(plainPassword, 12);
  console.log('Hashed Password:', hash);
}

main();
