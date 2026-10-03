import fs from 'node:fs';

// Avoid touching identical previews and tolerate short cloud-sync file locks.
export async function writeImagePreview(pipeline, destination) {
  const bytes = await pipeline.toBuffer();
  if (fs.existsSync(destination) && fs.readFileSync(destination).equals(bytes)) return;
  for (let attempt = 0; ; attempt++) {
    try { fs.writeFileSync(destination, bytes); return; }
    catch (error) {
      if (attempt >= 9 || !['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES', 'EINVAL'].includes(error.code)) throw error;
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
}
