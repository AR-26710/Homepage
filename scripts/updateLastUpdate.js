import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basicPath = path.join(__dirname, '../src/data/modules/basic.ts');
const today = new Date();
const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

try {
  let content = fs.readFileSync(basicPath, 'utf-8');

  const lastUpdateRegex = /lastUpdate:\s*["'][^"']*["']/;
  if (lastUpdateRegex.test(content)) {
    const updated = content.replace(lastUpdateRegex, `lastUpdate: "${currentDate}"`);
    if (updated === content) {
      console.log(`lastUpdate already up to date: ${currentDate}`);
    } else {
      fs.writeFileSync(basicPath, updated, 'utf-8');
      console.log(`Updated lastUpdate to ${currentDate}`);
    }
  } else {
    content = content.replace(
      /(location:\s*["'][^"']*["'],?)/,
      `$1\n  lastUpdate: "${currentDate}",`
    );
    fs.writeFileSync(basicPath, content, 'utf-8');
    console.log(`Added lastUpdate: ${currentDate}`);
  }
} catch (error) {
  console.error('更新失败:', error.message);
  process.exit(1);
}
