/**
 * Сборка для GitHub Pages: временно убирает API-роуты (они требуют сервер),
 * собирает статику, затем восстанавливает.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const apiPath = path.join(cwd, 'src', 'pages', 'api');
const backupPath = path.join(cwd, 'src', 'pages', '_api_backup');

try {
  if (fs.existsSync(apiPath)) {
    fs.renameSync(apiPath, backupPath);
    console.log('API routes temporarily moved for static build');
  }
  execSync('npx astro build --config astro.gh-pages.config.mjs', { stdio: 'inherit' });
} finally {
  if (fs.existsSync(backupPath)) {
    fs.renameSync(backupPath, apiPath);
    console.log('API routes restored');
  }
}
