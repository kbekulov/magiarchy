import { isRecentUpdate, updateExpiry } from '../home-updates.js';

const START = '<!-- Home updates: start -->';
const END = '<!-- Home updates: end -->';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function readHomeUpdates(html) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error('Home update boundaries are missing');
  const source = html.slice(start + START.length, end);
  const articles = [...source.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)];
  return articles.map(([article]) => {
    const id = article.match(/\bid="([^"]+)"/)?.[1];
    const date = article.match(/class="dispatch-author"[^>]*>[\s\S]*?<span>(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})\b/);
    if (!id || !date || !months.includes(date[2])) throw new Error(`Home update needs a publication date: ${id || article.slice(0, 80)}`);
    const published = `${date[3]}-${String(months.indexOf(date[2]) + 1).padStart(2, '0')}-${date[1].padStart(2, '0')}`;
    const explicit = article.match(/\bdata-published="([^"]+)"/)?.[1];
    if (explicit && explicit !== published) throw new Error(`Home update date mismatch: ${id}`);
    if (!Number.isFinite(updateExpiry(published))) throw new Error(`Invalid Home publication date: ${id}`);
    return { id, published, article: explicit ? article : article.replace('>', ` data-published="${published}">`) };
  });
}

export function pruneHomeUpdates(html, now = new Date()) {
  html = html.replace(/\r\n/g, '\n');
  const records = readHomeUpdates(html);
  const retained = records.filter(record => isRecentUpdate(record.published, now))
    .sort((a, b) => b.published.localeCompare(a.published));
  const blocks = [];
  let previous;
  for (const record of retained) {
    if (record.published !== previous) {
      const label = dateLabel.format(new Date(`${record.published}T00:00:00Z`));
      blocks.push(`<div class="date-divider" data-published="${record.published}"><span>${label}</span></div>`);
      previous = record.published;
    }
    blocks.push(record.article);
  }
  const content = blocks.map(block => `            ${block}`).join('\n');
  const body = `${START}\n${content}${content ? '\n' : ''}            ${END}`;
  let output = html.slice(0, html.indexOf(START)) + body + html.slice(html.indexOf(END) + END.length);
  output = output.replace(/id="home-updates"(?: data-updates-as-of="[^"]+")?/, `id="home-updates" data-updates-as-of="${new Date(now).toISOString().slice(0, 10)}"`)
    .replace(/<p class="home-updates-empty"(?: hidden)?>/, `<p class="home-updates-empty"${retained.length ? ' hidden' : ''}>`);
  return { html: output, removed: records.length - retained.length, retained };
}
