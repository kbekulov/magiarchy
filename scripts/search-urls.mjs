// Explicit revisions keep a version URL even when only one has been registered.
export function documentSearchUrl(record) {
  if (record.href) return record.href;
  const version = record.versions?.length ? `&version=${encodeURIComponent(record.versionId)}` : '';
  return `docs.html?doc=${encodeURIComponent(record.slug)}${version}`;
}
