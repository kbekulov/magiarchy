import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// Run the same small registry used by the browser, without DOM initialization.
export function loadContentNotices(root) {
  const context = { URL, window: {}, document: { addEventListener() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'content-notices.js'), 'utf8'), context);
  return context.window.MAGIARCHY_CONTENT;
}
