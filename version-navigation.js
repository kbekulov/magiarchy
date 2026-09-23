// Shared, bounded-width version navigation for all archive readers.
window.renderVersionNavigation = function (container, versions, selected, urlFor, defaultId) {
  const index = versions.findIndex(version => version.id === selected);
  const latest = versions.at(-1);
  container.classList.add('version-navigation');
  function link(label, target, disabled) {
    const control = document.createElement(disabled ? 'span' : 'a');
    control.textContent = label;
    if (disabled) control.setAttribute('aria-disabled', 'true');
    else control.href = urlFor(target.id);
    return control;
  }
  const select = document.createElement('select');
  select.setAttribute('aria-label', 'Choose version');
  versions.forEach(version => {
    const option = document.createElement('option');
    option.value = version.id;
    option.textContent = `${version.id}${version.id === defaultId ? ' · Current' : ''}${version.id === latest.id ? ' · Latest' : ''}`;
    option.selected = version.id === selected;
    select.append(option);
  });
  select.addEventListener('change', () => {
    const url = urlFor(select.value);
    if (window.archiveNavigate) window.archiveNavigate(url);
    else window.location.href = url;
  });
  container.replaceChildren(
    link('Previous', versions[index - 1], index <= 0), select,
    link('Next', versions[index + 1], index >= versions.length - 1),
    link('Latest', latest, selected === latest.id)
  );
};
