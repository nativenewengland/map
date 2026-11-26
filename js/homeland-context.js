/* Regional evidence is shown only when a more specific territory is unavailable.
   Region selection organizes sources. It does not draw political divisions. */
function showHomelandContext(map, position, heading, account, sources, nearby) {
  const section = document.createElement('section');
  const title = document.createElement('strong');
  title.textContent = heading;
  section.append(title);
  const note = document.createElement('p');
  note.textContent = account;
  section.append(note);
  for (const [label, url] of sources) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = label;
    section.append(link, document.createElement('br'));
  }
  if (nearby.length) {
    const text = document.createElement('p');
    text.textContent = 'Nearby mapped communities';
    section.append(text);
    const list = document.createElement('ul');
    for (const record of nearby) {
      const item = document.createElement('li');
      if (record.url) {
        const link = document.createElement('a');
        link.href = record.url;
        link.textContent = record.name;
        item.append(link);
      } else {
        item.textContent = record.name;
      }
      if (record.evidence) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'Evidence';
        details.append(summary, record.evidence);
        item.append(details);
      }
      list.append(item);
    }
    section.append(list);
  }
  const confidence = document.createElement('small');
  confidence.textContent = 'Regional evidence only. The community exercising authority at this location circa 1600 is unresolved.';
  section.append(confidence);
  L.popup({maxHeight: 300}).setLatLng(position).setContent(section).openOn(map);
}
