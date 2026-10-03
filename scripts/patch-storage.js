import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('apps/web/src');
let changedCount = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('localStorage.getItem')) {
    const original = content;
    // Replace raw calls to safe checks:
    content = content.replace(/localStorage\.getItem\(([^)]+)\)/g, '(typeof window !== "undefined" ? localStorage.getItem($1) : null)');
    // Avoid double-wrapping
    content = content.replace(/\(typeof window !== "undefined" \? \(typeof window !== "undefined" \? localStorage\.getItem\(([^)]+)\) : null\) : null\)/g, '(typeof window !== "undefined" ? localStorage.getItem($1) : null)');
    
    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      console.log('Patched:', f);
      changedCount++;
    }
  }
}

console.log(`Finished patching ${changedCount} files.`);
