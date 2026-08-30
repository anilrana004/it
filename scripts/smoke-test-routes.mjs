import { treks } from '../src/lib/data.ts';

const base = process.env.BASE_URL || 'http://localhost:3001';
let ok = 0;
const fail = [];

for (const t of treks) {
  const path = `${t.type === 'yatra' ? '/yatra/' : '/treks/'}${t.id}`;
  try {
    const res = await fetch(`${base}${path}`);
    if (res.status === 200) ok++;
    else fail.push(`${path} -> ${res.status}`);
  } catch {
    fail.push(`${path} -> ERROR`);
  }
}

console.log(`ALL ${treks.length} pages: ${ok} ok, ${fail.length} fail`);
fail.forEach((line) => console.log(line));
process.exit(fail.length ? 1 : 0);
