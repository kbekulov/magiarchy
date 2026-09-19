(() => {
  let pending;
  const load = () => pending ||= fetch('gallery/panels.json').then(response => {
    if (!response.ok) throw new Error('Panel catalog unavailable');
    return response.json();
  });
  window.MAGIARCHY_PANELS = {
    load,
    url: record => `gallery.html?panels=${encodeURIComponent(record.id)}`,
    forScene: async (kind, slug, version) => (await load()).filter(record => record[kind]?.slug === slug && record[kind].version === (version || 'v1'))
  };
})();
