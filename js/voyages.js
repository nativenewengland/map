import { polityPoint } from '../1/polities.js';

// Northern voyages extend beyond the illustrated main sheet. Use the registered
// regional terrain there, with the same date control and ship animation.
let regional;
let inset;
let selectedVoyage;
function regionalMap(region) {
  if (!regional) {
    inset = document.createElement('aside');
    inset.id = 'voyage-region';
    inset.setAttribute('aria-label', 'Regional voyage map');
    const caption = document.createElement('div');
    caption.textContent = 'Gulf of Maine Ã‚Â· Terrain by Xlicer';
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
  inset.firstElementChild.textContent = region + ' Â· Terrain by Xlicer';
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
function leg(name, stops, url = narratives, credit = source, north = false, outward, geographicView, traveler = ShipIcon) {
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
        const bends = [previous, ...(north ? stops[i][3].map(regionalPoint) : stops[i][3]), positions[i]];
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
        (traveler === PersonIcon ? ' The path and daily dates illustrate the claim; intermediate locations are unverified.' : ' The playback dates between documented stops and the sailing track are illustrative.') });
    }
  }
  let bounds;
  if (north) bounds = L.latLngBounds(positions).pad(0.35);
  // Short water corridors lead from the final anchorage into open water.
  // The last segment supplies the heading for the visual exit.
  const departures = north ? {
    'George Waymouth': [[-69.27, 43.75], [-69.0, 43.6]],
    'George Popham and Ralegh Gilbert': [[-69.77, 43.72], [-69.70, 43.66], [-69.48, 43.60]],
    'Henry Hudson': [[-69.05, 43.57], [-69.15, 43.35]],
    'Samuel Argall': [[-69.12, 43.55], [-69.30, 43.35]],
    'De Mons and Champlain': [[-70.52, 42.65], [-70.48, 42.50]],
    'John Smith': [[-70.52, 42.65], [-70.48, 42.50]],
    'Tisquantum and Thomas Dermer': [[-70.52, 42.65], [-70.48, 42.50]],
  } : {
    'Giovanni da Verrazzano': [[-58, 44], [-64, 50], [-66, 65]],
    'Bartholomew Gosnold': [[-59, 75], [-64, 80], [-67, 115], [-69, 155]],
    'Martin Pring': [[-7, 131], [5, 128], [7, 146], [7, 166]],
    'De Mons and Champlain': [[-15, 156], [2, 150], [16, 149]],
    'John Smith': [[7, 150], [15, 152]],
    'Thomas Hunt': [[-23, 166], [-24, 179]],
    'Tisquantum and Thomas Dermer': [[-10, 112], [3, 128], [4, 145], [-6, 153], [-30, 160], [-48, 159], [-64, 151], [-70, 113], [-72, 70]],
  };
  const exit = outward === undefined ? departures[name] : outward;
  addTimelineVoyage(name, days, url, credit, geographicView || (north ? () => {
    const view = regionalMap(typeof north === 'string' ? north : 'Gulf of Maine');
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
  }), north ? exit.map(regionalPoint) : exit, traveler);
  if (!expeditions.some(entry => entry.name === name)) {
    expeditions.push({ name, date: stops[0][0], point: north || geographicView ? null : positions[0] });
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
  ['1605-06-01', [-69.34, 43.89], 'Island anchorage near the Saint George peninsula. WaymouthÃ¢â‚¬â„¢s crew kidnapped five Indigenous people during this expedition.'],
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
  ['1610-08-16', penobscotMouth, 'Penobscot Bay vicinity in the published account of ArgallÃ¢â‚¬â„¢s voyage.'],
  ['1610-08-22', [-69.05, 43.72], 'Offshore fishing grounds.'],
], narratives, source, true);

leg('John Smith', [
  ['1614-04-25', [-69.28, 43.63], 'Spring approach to Monhegan. Dates illustrate the survey season.'],
  ['1614-04-28', monhegan, 'Monhegan was the expeditionÃ¢â‚¬â„¢s base. Smith surveyed the coast in a smaller boat.'],
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

// New York routes use geographic coordinates on the registered terrain sheet.
const lowerBay = [-74.043, 40.512];
const narrows = [-74.041, 40.605];
const battery = [-74.021, 40.697];
const ny = 'New York and adjacent waters';
leg('Verrazzano Â· New York Harbor', [
  ['1524-04-25', [-73.93, 40.37], 'April 1524. Illustrative approach to the Lenape coast.'],
  ['1524-04-26', lowerBay, 'The Dauphine anchored off Staten Island. A smaller boat explored toward the Narrows.'],
  ['1524-04-27', [-73.86, 40.48], 'The expedition continued east along the Atlantic coast. Playback days are approximate.'],
  ['1524-04-28', [-72.08, 40.87], 'Off southern Long Island, heading toward the eastern end of the island.'],
], 'https://www.nps.gov/parkhistory/online_books/gate/battery_weed_clr.pdf', 'National Park Service', ny,
  [[-71.93, 41.01], [-71.75, 41.06]]);

const hudsonLower = [narrows, battery, [-74.015, 40.75], [-73.96, 40.83], [-73.91, 40.94],
  [-73.89, 41.05], [-73.89, 41.15], [-73.96, 41.22], [-73.97, 41.25],
  [-73.95, 41.29], [-73.98, 41.32], [-73.96, 41.38], [-73.99, 41.40]];
const hudsonUpper = [[-74.00, 41.49], [-73.96, 41.58], [-73.94, 41.72],
  [-73.95, 41.82], [-73.96, 41.92], [-73.94, 42.00], [-73.91, 42.08],
  [-73.91, 42.16], [-73.84, 42.23], [-73.78, 42.26], [-73.79, 42.34], [-73.76, 42.40]];
const highlands = [-73.99, 41.44];
leg('Henry Hudson Â· Hudson River', [
  ['1609-09-13', lowerBay, 'The Half Moon entered Lower New York Bay on September 3 in the English journal calendar.'],
  ['1609-09-22', [-74.043, 40.62], 'Through the Narrows toward Manhattan.', [narrows]],
  ['1609-09-25', highlands, 'Sailing upriver through the Hudson Highlands.', hudsonLower.slice(1)],
  ['1609-09-29', [-73.76, 42.57], 'Upper tidal Hudson near present-day Albany. The plotted northern anchorage is approximate.', hudsonUpper],
  ['1609-10-03', [-73.76, 42.57], 'The ship lay in the upper river before returning downstream.'],
  ['1609-10-08', highlands, 'Returning south along the tidal Hudson.', [...hudsonUpper].reverse()],
  ['1609-10-12', battery, 'Back near Manhattan.', hudsonLower.slice(2).reverse()],
  ['1609-10-14', lowerBay, 'Departed the river for the Atlantic on October 4 in the English journal calendar.', [narrows]],
], 'https://extapps.dec.ny.gov/docs/remediation_hudson_pdf/hrlpex1609ts.pdf', 'New York State Department of Environmental Conservation', ny,
  [[-73.98, 40.47], [-73.82, 40.41]]);

leg('Adriaen Block Â· Onrust', [
  ['1614-05-15', [-74.009, 40.701], 'Manhattan, 1614. The month and days are illustrative.'],
  ['1614-05-16', [-73.923, 40.78], 'The Onrust passed through the East River and Hell Gate.', [[-73.978, 40.71], [-73.968, 40.733], [-73.946, 40.76], [-73.939, 40.777]]],
  ['1614-05-17', [-73.77, 40.806], 'East toward Long Island Sound.', [[-73.906, 40.789], [-73.867, 40.795], [-73.828, 40.803], [-73.794, 40.797]]],
  ['1614-05-20', [-73.33, 40.99], 'East through the Sound between Long Island and the mainland.'],
  ['1614-05-24', [-72.39, 41.24], 'Approaching the Connecticut River from Long Island Sound. Block also explored upriver.'],
], 'https://s-media.nyc.gov/agencies/lpc/arch_reports/1428.pdf', 'New York City archaeological survey', ny,
  [[-72.12, 41.23], [-72.07, 41.24], [-71.92, 41.29]]);

// The claimed endpoints lie outside the main artwork. Show the whole journey
// on a geographic locator and identify every intermediate position as illustrative.
let walkingMap;
let walkingPanel;
function geographicLocator(label, bounds) {
  if (!walkingMap) {
    walkingPanel = document.createElement('aside');
    walkingPanel.className = 'walking-journey';
    const caption = document.createElement('div');
    caption.textContent = label;
    const canvas = document.createElement('div');
    walkingPanel.append(caption, canvas);
    document.body.append(walkingPanel);
    walkingMap = L.map(canvas, { zoomControl: false, zoomSnap: 0.25 });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(walkingMap);

    walkingMap.on('layerremove', event => {
      if (event.layer instanceof L.Marker) walkingPanel.hidden = true;
    });
  }
  walkingPanel.hidden = false;
  walkingMap.invalidateSize();
  if (walkingMap.journeyLabel !== label) {
    walkingPanel.firstElementChild.textContent = label;
    walkingMap.fitBounds(bounds, { padding: [14, 14] });
    walkingMap.journeyLabel = label;
  }
  return walkingMap;
}

leg('David Ingram Â· reported overland journey', [
  ['1568-10-18', [22.25, -97.86], 'October 1568: left on the Gulf of Mexico near present-day Tampico.'],
  ['1568-11-28', [26.5, -98.4], 'Illustrative overland passage north from the Gulf coast.'],
  ['1569-01-12', [31.2, -95.0], 'The surviving account does not establish a daily itinerary.'],
  ['1569-03-18', [33.6, -85.4], 'Illustrative passage across the southeastern interior.'],
  ['1569-05-25', [37.8, -78.5], 'Illustrative northeastern course.'],
  ['1569-07-10', [41.1, -74.3], 'Illustrative passage through the Northeast.'],
  ['1569-08-18', [43.25, -70.85], 'The exact route through New England is unknown.'],
  ['1569-09-20', [45.28, -66.08], 'Autumn 1569: a French vessel reportedly took the travelers aboard. The Saint John River on the Bay of Fundy is one proposed endpoint.'],
  ['1569-09-21', [45.28, -66.08], 'End of the reconstructed walk. The travelers reported returning to Europe by ship.'],
], 'https://www.biographi.ca/en/bio/ingram_david_1E.html', 'Dictionary of Canadian Biography', false, [],
  () => geographicLocator('David Ingram Â· reported journey, illustrative route', [[22.2, -98], [45.3, -66]]), PersonIcon);

// These waters lie beyond the regional terrain sheet. Each view frames the
// local voyage segment; long Atlantic crossings are described in the popup.
function atlanticVoyage(name, stops, url, credit, exit) {
  const bounds = L.latLngBounds(stops.map(stop => stop[1]));
  leg(name, stops, url, credit, false, exit, () => geographicLocator(name, bounds));
}

atlanticVoyage('San Juan Â· Basque whaling voyage', [
  ['1565-06-01', [51.82, -54.9], 'Illustrative summer approach to Labrador from the Atlantic. The playback dates are seasonal estimates.'],
  ['1565-06-07', [51.72, -56.40], 'Approaching the Basque whaling station through the Strait of Belle Isle.'],
  ['1565-06-09', [51.726, -56.427], 'Red Bay. The crew prepared whale oil for shipment to Europe.'],
  ['1565-10-31', [51.726, -56.427], 'The loaded San Juan sank in Red Bay in 1565. This date marks the end of the animation; the exact day is uncertain.'],
], 'https://shipwrecksnl.ca/spsnl-shipwreck-timeline/', 'Shipwreck Preservation Society of Newfoundland and Labrador', null);

atlanticVoyage('Bonaventure Â· Breton walrus fishery', [
  ['1591-05-04', [47.17, -59.53], 'Breton vessels approached the Magdalen Islands. Daily positions and timing are illustrative.'],
  ['1591-05-08', [47.32, -61.49], 'Approaching the islands known to the crews as Ramea.'],
  ['1591-05-12', [47.28, -61.75], 'The Bonaventure and a companion vessel took walrus for oil, hides and tusks. La Court de PrÃ©-Ravillon outfitted the expedition.'],
  ['1591-06-20', [47.28, -61.75], 'Illustrative departure. On the return voyage an English privateer captured the Bonaventure near the Isles of Scilly and took it to Bristol.'],
], 'https://www.biographi.ca/en/bio.php?id_nbr=386', 'Dictionary of Canadian Biography', [[47.18,-60.8],[47.15,-59.55],[46.85,-58.7]]);

atlanticVoyage('Henry May Â· Bermuda escape voyage', [
  ['1594-05-21', [32.40,-64.64], 'May and fellow survivors left Bermuda on May 11, Old Style, aboard a bark they had built after a shipwreck.'],
  ['1594-05-25', [38,-62.8], 'Illustrative position on the passage north.'],
  ['1594-05-30', [45.93,-59.73], 'Land sighted near Cape Breton on May 20, Old Style. The plotted landfall is approximate.'],
], 'https://www.biographi.ca/en/bio/461', 'Dictionary of Canadian Biography', [[46.15,-59.5],[46.55,-59.2]]);

atlanticVoyage('Charles Leigh Â· Hopewell', [
  ['1597-05-28', [46.7,-50.9], 'Hopewell and Chancewell reached the Grand Banks on May 18, Old Style.'],
  ['1597-05-30', [47.82,-53.0], 'The ships rendezvoused in Conception Bay.', [[48.04,-52.45],[48.12,-52.72]]],
  ['1597-06-04', [47.02,-52.85], 'Leigh sought small boats at Ferryland and Renews.', [[48.12,-52.72],[48.0,-52.42],[47.5,-52.47]]],
  ['1597-06-15', [46.70,-54.68], 'The vessels lost contact in fog at the entrance to Placentia Bay.', [[46.58,-53.05],[46.54,-53.6],[46.77,-54.22]]],
  ['1597-06-21', [46.12,-59.68], 'Hopewell sighted Cape Breton on June 11, Old Style.'],
  ['1597-06-26', [47.84,-61.14], 'The crew observed seabird colonies at Bird Rocks.', [[47.1,-60.24]]],
  ['1597-06-28', [47.79,-61.47], 'The crew fished off Brion Island before continuing among the Magdalens.'],
], 'https://www.biographi.ca/en/bio/leigh_charles_1E.html', 'Dictionary of Canadian Biography', [[47.61,-61.34],[47.25,-60.8],[47.15,-59.55],[46.7,-58.7]]);

expeditions.push(
  { name: 'Poutrincourt and Champlain', date: '1606-10-02', point: nauset },
  { name: 'Mayflower', date: '1620-11-17', point: [1, 179] }
);
expeditions.sort((a, b) => a.date.localeCompare(b.date));
for (const entry of expeditions) picker.add(new Option(entry.date.slice(0, 4) + ' Ã‚Â· ' + entry.name, entry.date));
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
