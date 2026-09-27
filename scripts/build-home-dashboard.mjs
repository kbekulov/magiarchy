import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildDashboard } from './home-dashboard.mjs';
import { dashboardHTML } from '../home-dashboard-view.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const data = buildDashboard(root);
const file = new URL('../index.html', import.meta.url);
const original = fs.readFileSync(file, 'utf8');
const html = original.replace(/<!-- Writer dashboard: start -->[\s\S]*?<!-- Writer dashboard: end -->/, `<!-- Writer dashboard: start -->\n${dashboardHTML(data).replace(/[ \t]+$/gm, '')}\n            <!-- Writer dashboard: end -->`);
if (!original.includes('<!-- Writer dashboard: start -->')) throw new Error('Missing dashboard build markers');
const json = `${JSON.stringify(data, null, 2)}\n`;
const dataFile = new URL('../home-dashboard.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (original.replace(/\r\n/g, '\n') !== html.replace(/\r\n/g, '\n') || !fs.existsSync(dataFile) || fs.readFileSync(dataFile, 'utf8').replace(/\r\n/g, '\n') !== json) throw new Error('Home dashboard is stale. Run npm run build.');
} else {
  fs.writeFileSync(file, html);
  fs.writeFileSync(dataFile, json);
}
console.log(`Home dashboard: ${data.questions.length} open questions, ${data.cast.length} characters, ${data.moments.length} Moments.`);
