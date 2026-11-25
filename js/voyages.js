import { polityPoint } from '../1/polities.js';

// Northern voyages extend beyond the illustrated main sheet. Use the registered
// regional terrain there, with the same date control and ship animation.
let regional;
let inset;
let selectedVoyage;
function regionalMap() {
  if (!regional) {
    inset = document.createElement('aside');
    inset.id = 'voyage-region';
    inset.setAttribute('aria-label', 'Regional voyage map');
    const caption = document.createElement('div');
    caption.textContent = 'Gulf of Maine Â· Terrain by Xlicer';
    const canvas = document.createElement('div');
    inset.append(caption, canvas);
    document.body.append(inset);
    regional = L.map(canvas, { crs: L.CRS.Simple, zoomControl: false,
      attributionControl: false, zoomSnap: 0, minZoom: -4, maxZoom: 2 });
    L.imageOverlay('1/terrain.png', [[0, 0], [3688, 2994]]).addTo(regional);
    regional.on('layerremove', event => {
      if (event.layer instanceof L.Marker) {
        let active = false;
        regional.eachLayer(layer => { if (layer instanceof L.Marker) active = true; });
        inset.hidden = !active;
      }
    });
  }
  inset.hidden = false;
  regional.invalidateSize();
  return regional;
}

const narratives = 'https://www.gutenberg.org/cache/epub/67623/pg67623-images.html';
const source = 'Voyage accounts, ed. George Parker Winship';
const expeditions = [];
const picker = document.querySelector('#voyage-picker');
function regionalPoint(location) {
  const [x, y] = polityPoint(location);
  return [3688 - y, x];
}

// Each stop has a Gregorian playback date, position and interpretation.
// Interpolate between consecutive stops; repeated positions represent a stay.
function leg(name, stops, url = narratives, credit = source, north = false) {
  const days = [];
  const positions = stops.map(stop => north ? regionalPoint(stop[1]) : stop[1]);
  for (let i = 0; i < stops.length; i++) {
    const [date, , note] = stops[i];
    const time = Date.parse(date);
    const prior = i ? Date.parse(stops[i - 1][0]) : time;
    const count = Math.round((time - prior) / 86400000);
    for (let step = i ? 1 : 0; step <= count; step++) {
      const fraction = count ? step / count : 1;
      const previous = positions[Math.max(0, i - 1)];
      const point = positions[i].map((v, axis) => previous[axis] + (v - previous[axis]) * fraction);
      const day = new Date(prior + step * 86400000).toISOString().slice(0, 10);
      // Round the outer Cape offshore on both eastbound expeditions.
      let path = [point];
      if (stops[i][3] && count > 0) {
        const bends = [previous, ...stops[i][3], positions[i]];
        const sample = t => {
          const scaled = t * (bends.length - 1);
          const k = Math.min(bends.length - 2, Math.floor(scaled));
          return bends[k].map((v, axis) => v + (bends[k + 1][axis] - v) * (scaled - k));
        };
        const start = (step - 1) / count;
        path = bends.filter((_, k) => k / (bends.length - 1) > start && k / (bends.length - 1) < fraction);
        path.push(sample(fraction));
      }
      days.push({ date: day, path, note: (step === count ? note : stops[i - 1][2]) +
        ' The playback dates between documented stops and the sailing track are illustrative.' });
    }
  }
  let bounds;
  if (north) bounds = L.latLngBounds(positions).pad(0.35);
  addTimelineVoyage(name, days, url, credit, north ? () => {
    const view = regionalMap();
    if (view._voyageBounds !== bounds) {
      view.fitBounds(bounds, { padding: [25, 25], maxZoom: 1, animate: false });
      view._voyageBounds = bounds;
    }
    return view;
  } : () => {
    if (selectedVoyage === name && !map.getBounds().contains(positions[0])) {
      map.setView(positions[0], 3);
    }
    return map;
  });
  if (!expeditions.some(entry => entry.name === name)) {
    expeditions.push({ name, date: stops[0][0], point: north ? null : positions[0] });
  }
}

const monhegan = [-69.33, 43.756];
const penobscotMouth = [-68.88, 44.05];
const gulf = [-69.5, 43.35];
const outerCape = [4, 142];
const patuxet = [-10.5, 103.8];
const nauset = [-23, 157];

leg('Giovanni da Verrazzano', [
  ['1524-04-29', [-63, 29], 'Approaching Narragansett Bay in the Dauphine.'],
  ['1524-04-30', [-58, 44], 'Approach to the bay from Rhode Island Sound.'],
  ['1524-05-01', [-52.1, 44.6], 'Visit to lower Narragansett Bay near Aquidneck.'],
  ['1524-05-15', [-52.1, 44.6], 'The expedition spent about two weeks in the bay.'],
]);

leg('Bartholomew Gosnold', [
  ['1602-05-25', outerCape, 'The Concord reached Cape Cod on May 15, Old Style.'],
  ['1602-05-26', [-4, 151], 'Sailing along the outer Cape.'],
  ['1602-05-27', [-26, 159], 'Southbound off the Atlantic shore.'],
  ['1602-05-28', [-46.5, 154], 'Rounding the shoals toward Nantucket Sound.'],
  ['1602-05-31', [-51, 115], 'Approaching Cape Pogue and the Vineyard.'],
  ['1602-06-01', [-49.5, 106], 'Along the Vineyard Sound side of the island.'],
  ['1602-06-03', [-54, 88], 'Approaching the Elizabeth Islands.'],
  ['1602-06-04', [-55.8, 77], 'Cuttyhunk vicinity. The party established a temporary settlement.'],
  ['1602-06-28', [-55.8, 77], 'The party abandoned the settlement and returned to England.'],
], 'https://www.woodsholemuseum.org/oldpages/sprtsl/v16n2-Gosnold.pdf', 'Woods Hole Historical Museum');

leg('Martin Pring', [
  ['1603-06-25', [24, 143], 'Summer approach from the north. The day shown is approximate.'],
  ['1603-06-27', [5, 128], 'Entering Cape Cod Bay.'],
  ['1603-06-29', [-7, 131], 'Sailing toward the probable Pamet anchorage.'],
  ['1603-07-01', [-5, 141], 'Probable Pamet Harbor, Truro. The identification is disputed. The crew collected sassafras.'],
  ['1603-08-17', [-5, 141], 'Near the end of the summer stay.'],
], 'https://www.westfield.ma.edu/historical-journal/wp-content/uploads/2018/07/Whalen-combined.pdf', 'Historical Journal of Massachusetts');

leg('George Waymouth', [
  ['1605-05-27', [-69.22, 43.57], 'Approach of the Archangel to the midcoast islands.'],
  ['1605-05-28', monhegan, 'Monhegan vicinity.'],
  ['1605-06-01', [-69.34, 43.89], 'Island anchorage near the Saint George peninsula. Waymouthâ€™s crew kidnapped five Indigenous people during this expedition.'],
  ['1605-06-21', [-69.27, 43.97], 'River exploration. The precise river identification has been debated.'],
  ['1605-06-26', [-69.29, 43.85], 'Departure from the Maine coast.'],
], narratives, source, true);

leg('De Mons and Champlain', [
  ['1605-07-01', [-69.56, 43.78], 'Coastal survey in the Gulf of Maine. Early July positions are approximate.'],
  ['1605-07-06', [-70.30, 43.45], 'The expedition followed the coast southwest past Saco Bay.'],
  ['1605-07-10', [-70.54, 42.80], 'Approaching Cape Ann.'],
], narratives, source, true);
leg('De Mons and Champlain', [
  ['1605-07-11', [55, 108], 'Cape Ann vicinity.'],
  ['1605-07-15', [22, 110], 'South across Massachusetts Bay.'],
  ['1605-07-18', patuxet, 'Plymouth Bay, charted as Port Saint-Louis.'],
  ['1605-07-19', [1.8, 123], 'Crossing Cape Cod Bay.'],
  ['1605-07-20', outerCape, 'Rounding the tip of the Cape.'],
  ['1605-07-21', nauset, 'Nauset Harbor, charted as Mallebarre.', [[2, 147], [-7, 153]]],
]);

leg('George Popham and Ralegh Gilbert', [
  ['1607-08-15', monhegan, 'The expedition reached Monhegan before sailing to Pemaquid.'],
  ['1607-08-20', [-69.52, 43.84], 'Pemaquid coast.'],
  ['1607-08-22', [-69.64, 43.73], 'West along the coast toward Sagadahoc.'],
  ['1607-08-28', [-69.78, 43.75], 'At the mouth of the Kennebec, where the expedition established Fort St. George.'],
], 'https://www.mainememory.net/sitebuilder/site/895/page/1306/display?page=2', 'Maine Historical Society', true);

leg('Henry Hudson', [
  ['1609-07-24', [-68.70, 43.70], 'The Half Moon approached the Maine coast. Timing and identification of the landfall are approximate.'],
  ['1609-07-28', penobscotMouth, 'Maine anchorage traditionally identified with Penobscot Bay.'],
  ['1609-08-03', penobscotMouth, 'The crew stopped for repairs and supplies.'],
  ['1609-08-05', [-69.03, 43.73], 'Putting back to sea.'],
], narratives, source, true);

leg('Samuel Argall', [
  ['1610-08-06', gulf, 'Summer fishing voyage from Virginia. Dates shown approximate the regional visit.'],
  ['1610-08-11', [-69.02, 43.75], 'Approach to the coastal fishing grounds.'],
  ['1610-08-16', penobscotMouth, 'Penobscot Bay vicinity in the published account of Argallâ€™s voyage.'],
  ['1610-08-22', [-69.05, 43.72], 'Offshore fishing grounds.'],
], narratives, source, true);

leg('John Smith', [
  ['1614-04-25', [-69.28, 43.63], 'Spring approach to Monhegan. Dates illustrate the survey season.'],
  ['1614-04-28', monhegan, 'Monhegan was the expeditionâ€™s base. Smith surveyed the coast in a smaller boat.'],
  ['1614-06-01', monhegan, 'Starting the illustrated southward coastal survey.'],
  ['1614-06-07', [-70.22, 43.46], 'Survey off the southern Maine coast.'],
  ['1614-06-12', [-70.55, 42.74], 'Approaching Cape Ann.'],
], narratives, source, true);
leg('John Smith', [
  ['1614-06-13', [52, 108], 'Survey of the Massachusetts coast.'],
  ['1614-06-18', [21, 113], 'Crossing Massachusetts Bay.'],
  ['1614-06-24', outerCape, 'Cape Cod, southern end of the illustrated survey.'],
]);

leg('Thomas Hunt', [
  ['1614-07-25', patuxet, 'At Patuxet, Hunt kidnapped Tisquantum and other men to sell in Spain. The summer playback dates are estimates.'],
  ['1614-07-26', [2.5, 127], 'Reconstructed passage across Cape Cod Bay.'],
  ['1614-07-27', outerCape, 'Rounding the outer Cape toward Nauset.'],
  ['1614-07-29', nauset, 'Hunt also kidnapped men from Nauset.', [[2, 147], [-7, 153]]],
], 'https://plimoth.org/for-teachers/teacher-tools/educational-resources', 'Plimoth Patuxet Museums');

leg('Tisquantum and Thomas Dermer', [
  ['1619-05-29', monhegan, 'Dermer recorded leaving Monhegan on May 19, Old Style, in an open pinnace. Tisquantum was returning home.'],
  ['1619-06-01', [-70.16, 43.42], 'South along the coast. The intermediate days are estimated.'],
  ['1619-06-04', [-70.56, 42.75], 'Approach to Massachusetts Bay.'],
], narratives, source, true);
leg('Tisquantum and Thomas Dermer', [
  ['1619-06-05', [52, 108], 'South from Cape Ann toward Patuxet.'],
  ['1619-06-07', [22, 110], 'Passage across Massachusetts Bay.'],
  ['1619-06-10', patuxet, 'Tisquantum returned to Patuxet after an epidemic had devastated his community. The arrival day is approximate.'],
], 'https://www.biographi.ca/en/bio/dermer_thomas_1E.html', 'Dictionary of Canadian Biography');

expeditions.push(
  { name: 'Poutrincourt and Champlain', date: '1606-10-02', point: nauset },
  { name: 'Mayflower', date: '1620-11-17', point: [1, 179] }
);
expeditions.sort((a, b) => a.date.localeCompare(b.date));
for (const entry of expeditions) picker.add(new Option(entry.date.slice(0, 4) + ' Â· ' + entry.name, entry.date));
picker.addEventListener('change', () => {
  const entry = expeditions.find(item => item.date === picker.value);
  if (!entry) return;
  selectedVoyage = entry.name;
  pauseTimeline();
  dateField.value = entry.date;
  dateField.dispatchEvent(new Event('input'));
  if (entry.point) map.setView(entry.point, 3);
  picker.value = '';
});
