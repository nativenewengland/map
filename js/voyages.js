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
    caption.textContent = 'Gulf of Maine Ãƒâ€šÃ‚Â· Terrain by Xlicer';
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
  inset.firstElementChild.textContent = region + ' Ã‚Â· Terrain by Xlicer';
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
  ['1605-06-01', [-69.34, 43.89], 'Island anchorage near the Saint George peninsula. WaymouthÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s crew kidnapped five Indigenous people during this expedition.'],
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

leg('Nahanada · probable return with Thomas Hanham', [
  ['1606-08-15', [-68.85, 43.48], 'Illustrative approach to Maine. The exact arrival date and track are unknown.'],
  ['1606-08-19', [-69.17, 43.69], 'Nahanada had been kidnapped by George Waymouth in 1605. Hanham’s expedition likely brought him home in 1606.'],
  ['1606-08-22', [-69.51, 43.82], 'Approximate landfall near Pemaquid. Nahanada was in Maine to meet the Popham expedition in 1607.'],
], 'https://www.americanindianmagazine.org/sites/default/files/2018-01/NMAI-FALL-2015-reduced.pdf', 'Smithsonian National Museum of the American Indian', true,
  [[-69.43, 43.72], [-69.25, 43.56]]);

leg('George Popham and Ralegh Gilbert', [
  ['1607-08-15', monhegan, 'The expedition reached Monhegan before sailing to Pemaquid. Skidwarres, kidnapped by Waymouth in 1605, returned aboard the Mary and John and interpreted. Nahanada met the expedition in Maine.'],
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
  ['1610-08-16', penobscotMouth, 'Penobscot Bay vicinity in the published account of ArgallÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s voyage.'],
  ['1610-08-22', [-69.05, 43.72], 'Offshore fishing grounds.'],
], narratives, source, true);

leg('John Smith', [
  ['1614-04-25', [-69.28, 43.63], 'Spring approach to Monhegan. Dates illustrate the survey season.'],
  ['1614-04-28', monhegan, 'Monhegan was the expeditionÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s base. Smith surveyed the coast in a smaller boat.'],
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
  ['1619-05-29', monhegan, 'Dermer recorded leaving Monhegan on May 19, Old Style, in an open pinnace. Tisquantum was returning home after Thomas Hunt kidnapped him in 1614.'],
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
leg('Verrazzano Ã‚Â· New York Harbor', [
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
leg('Henry Hudson Ã‚Â· Hudson River', [
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

// The contemporary account establishes the season and destination. These
// calendar days space the animation along the river, including the return.
const fortOrange = [-73.75, 42.644];
const upperApproach = [...hudsonUpper, [-73.77, 42.47], [-73.76, 42.54], [-73.76, 42.59]];
leg('Nieu Nederlandt · Fort Orange', [
  ['1624-06-01', lowerBay, 'The Nieu Nederlandt arrived in May or June carrying colonists for the Dutch West India Company. All days shown for this voyage are illustrative.'],
  ['1624-06-03', battery, 'Passing Manhattan into the Hudson.', [narrows]],
  ['1624-06-06', highlands, 'Following the tidal river north.', hudsonLower.slice(2)],
  ['1624-06-10', fortOrange, 'Fort Orange, in Mahican country at present-day Albany. Colonists established the post in 1624.', upperApproach],
  ['1624-09-20', fortOrange, 'The marker represents the Fort Orange phase. The length of this anchorage is an estimate.'],
  ['1624-09-24', highlands, 'Illustrative downstream passage. The ship returned to the Netherlands with a cargo of furs.', [...upperApproach].reverse()],
  ['1624-09-28', battery, 'Returning past Manhattan.', hudsonLower.slice(2).reverse()],
  ['1624-09-30', lowerBay, 'Outbound through New York Harbor. The ship was back in the Netherlands in November.', [narrows]],
], 'https://encyclopedia.nahc-mapping.org/shipjourney/1624-new-netherland', 'Mapping Early New York', ny,
  [[-73.98, 40.47], [-73.82, 40.41]]);

leg('Adriaen Block Ã‚Â· Onrust', [
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

leg('David Ingram Ã‚Â· reported overland journey', [
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
  () => geographicLocator('David Ingram Ã‚Â· reported journey, illustrative route', [[22.2, -98], [45.3, -66]]), PersonIcon);

// These waters lie beyond the regional terrain sheet. Each view frames the
// local voyage segment; long Atlantic crossings are described in the popup.
function atlanticVoyage(name, stops, url, credit, exit) {
  const bounds = L.latLngBounds(stops.map(stop => stop[1]));
  leg(name, stops, url, credit, false, exit, () => geographicLocator(name, bounds));
}

atlanticVoyage('San Juan Ã‚Â· Basque whaling voyage', [
  ['1565-06-01', [51.82, -54.9], 'Illustrative summer approach to Labrador from the Atlantic. The playback dates are seasonal estimates.'],
  ['1565-06-07', [51.72, -56.40], 'Approaching the Basque whaling station through the Strait of Belle Isle.'],
  ['1565-06-09', [51.726, -56.427], 'Red Bay. The crew prepared whale oil for shipment to Europe.'],
  ['1565-10-31', [51.726, -56.427], 'The loaded San Juan sank in Red Bay in 1565. This date marks the end of the animation; the exact day is uncertain.'],
], 'https://shipwrecksnl.ca/spsnl-shipwreck-timeline/', 'Shipwreck Preservation Society of Newfoundland and Labrador', null);

atlanticVoyage('Bonaventure Ã‚Â· Breton walrus fishery', [
  ['1591-05-04', [47.17, -59.53], 'Breton vessels approached the Magdalen Islands. Daily positions and timing are illustrative.'],
  ['1591-05-08', [47.32, -61.49], 'Approaching the islands known to the crews as Ramea.'],
  ['1591-05-12', [47.28, -61.75], 'The Bonaventure and a companion vessel took walrus for oil, hides and tusks. La Court de PrÃƒÂ©-Ravillon outfitted the expedition.'],
  ['1591-06-20', [47.28, -61.75], 'Illustrative departure. On the return voyage an English privateer captured the Bonaventure near the Isles of Scilly and took it to Bristol.'],
], 'https://www.biographi.ca/en/bio.php?id_nbr=386', 'Dictionary of Canadian Biography', [[47.18,-60.8],[47.15,-59.55],[46.85,-58.7]]);

atlanticVoyage('Henry May Ã‚Â· Bermuda escape voyage', [
  ['1594-05-21', [32.40,-64.64], 'May and fellow survivors left Bermuda on May 11, Old Style, aboard a bark they had built after a shipwreck.'],
  ['1594-05-25', [38,-62.8], 'Illustrative position on the passage north.'],
  ['1594-05-30', [45.93,-59.73], 'Land sighted near Cape Breton on May 20, Old Style. The plotted landfall is approximate.'],
], 'https://www.biographi.ca/en/bio/461', 'Dictionary of Canadian Biography', [[46.15,-59.5],[46.55,-59.2]]);

atlanticVoyage('Charles Leigh Ã‚Â· Hopewell', [
  ['1597-05-28', [46.7,-50.9], 'Hopewell and Chancewell reached the Grand Banks on May 18, Old Style.'],
  ['1597-05-30', [47.82,-53.0], 'The ships rendezvoused in Conception Bay.', [[48.04,-52.45],[48.12,-52.72]]],
  ['1597-06-04', [47.02,-52.85], 'Leigh sought small boats at Ferryland and Renews.', [[48.12,-52.72],[48.0,-52.42],[47.5,-52.47]]],
  ['1597-06-15', [46.70,-54.68], 'The vessels lost contact in fog at the entrance to Placentia Bay.', [[46.58,-53.05],[46.54,-53.6],[46.77,-54.22]]],
  ['1597-06-21', [46.12,-59.68], 'Hopewell sighted Cape Breton on June 11, Old Style.'],
  ['1597-06-26', [47.84,-61.14], 'The crew observed seabird colonies at Bird Rocks.', [[47.1,-60.24]]],
  ['1597-06-28', [47.79,-61.47], 'The crew fished off Brion Island before continuing among the Magdalens.'],
], 'https://www.biographi.ca/en/bio/leigh_charles_1E.html', 'Dictionary of Canadian Biography', [[47.61,-61.34],[47.25,-60.8],[47.15,-59.55],[46.7,-58.7]]);

// The month and day of Epenow's escape are uncertain.
const epenow = 'Epenow’s return to Noepe (1614)';
const epenowSite = [-53.5, 85];
addTimelineVoyage(epenow, [{
  date: '1614-01-01',
  until: '1614-12-31',
  path: [epenowSite],
  note: 'Shown throughout 1614 at an approximate location off Martha’s Vineyard. Epenow, a Wampanoag man kidnapped in 1611, persuaded Ferdinando Gorges to send him back as a guide by telling him about gold. Gorges also assigned Assacomet, one of Waymouth\'s former captives, as a guide on this expedition. When people from the island approached in canoes, he jumped from Nicholas Hobson’s ship and escaped.',
}], 'https://www.bia.gov/sites/default/files/media_document/076_pf.pdf', 'Bureau of Indian Affairs historical account', () => map, null);
expeditions.push({ name: epenow, date: '1614-01-01', point: epenowSite });

// Dermer dated the wreck retrospectively. Show it at year precision.
const frenchWreck = 'Unnamed French shipwreck (c. 1616)';
addTimelineVoyage(frenchWreck, [{
  date: '1616-01-01',
  until: '1616-12-31',
  path: [outerCape],
  note: 'Shown throughout 1616 because the wreck date is approximate. In 1619 Thomas Dermer reported meeting two French survivors of a wreck off northeastern Cape Cod about three years earlier. The ship’s name is unknown.',
}], 'https://www.cyberlibrary.org/en/books/sailors-narratives-of-voyages-along-the-new-england-coast-1524-4dc6ec98/chapters/14/', 'Thomas Dermer’s 1619 letter', () => map, null);
expeditions.push({ name: frenchWreck, date: '1616-01-01', point: outerCape });

const frenchSurvivors = 'French shipwreck survivors (1619)';
const nemasket = [-17.3087, 81.4087];
for (const [location, point] of [
  ['Nummastaquyt (present-day Middleborough)', nemasket],
  ['Mastachusit (greater Boston area)', [28.42, 66.64]],
]) {
  addTimelineVoyage('French survivor at ' + location, [{
    date: '1619-01-01',
    until: '1619-12-31',
    path: [point],
    note: 'While traveling with Tisquantum in 1619, Thomas Dermer reported securing the release of a French shipwreck survivor here. The date within 1619 and exact location are uncertain.',
  }], 'https://www.cyberlibrary.org/en/books/sailors-narratives-of-voyages-along-the-new-england-coast-1524-4dc6ec98/chapters/14/', 'Thomas Dermer, 1619 letter', () => map, null, PersonIcon);
}
expeditions.push({ name: frenchSurvivors, date: '1619-01-01', point: [5, 74] });

expeditions.push(
  { name: 'Poutrincourt and Champlain', date: '1606-10-02', point: nauset },
  { name: 'Mayflower', date: '1620-11-17', point: [1, 179] }
);
const shipwrecks = [
  {
    name: 'Delight wreck', date: '1583-08-01', until: '1583-09-30',
    point: [43.93, -60.0], alternative: [45.85, -60.1],
    note: 'Gilbert’s flagship ran aground after leaving Newfoundland in August 1583. Richard Clarke survived. Sable Island and Gabarus Bay are competing identifications. The timeline displays the wreck at approximate seasonal precision.',
    source: 'https://www.biographi.ca/en/bio/307',
  },
  {
    name: 'Chancewell wreck', date: '1597-06-01', until: '1597-08-31',
    point: [46.31, -60.53],
    note: 'The Hopewell’s companion struck rocks off Cape Breton. St. Ann’s Bay is a proposed location. The crew beached the vessel, which Basque fishermen then stripped. The display window represents summer 1597.',
    source: 'https://www.biographi.ca/en/bio/johnson_george_1F.html',
  },
  {
    name: 'Sparrow-Hawk wreck', date: '1626-12-01', until: '1627-02-28',
    point: nauset, main: true,
    note: 'A Virginia-bound English vessel went aground off Nauset in winter 1626–27. Nauset people alerted Plymouth, and William Bradford brought supplies. The marker shows the approximate wreck area throughout the winter.',
    source: 'https://mass.cultureelerfgoed.nl/sparrow-hawk',
  },
  {
    name: 'Angel Gabriel wreck', date: '1635-08-01', until: '1635-08-31',
    point: [43.875, -69.525],
    note: 'The ship wrecked during a hurricane at Pemaquid in August 1635. The marker shows the harbor at month precision. The wreck remains have not been located.',
    source: 'https://www.maine.gov/dacf/parks/discover_history_explore_nature/history/colonialpemaquid/gabriel.shtml',
  },
];
for (const wreck of shipwrecks) {
  const points = wreck.alternative ? [wreck.point, wreck.alternative] : [wreck.point];
  const harborView = wreck.main ? () => map : () => geographicLocator(wreck.name,
    wreck.alternative ? L.latLngBounds(points).pad(0.25) : L.latLng(wreck.point).toBounds(50000));
  for (const point of points) {
    const name = wreck.alternative ? wreck.name + (point === wreck.point ? ' · Sable Island hypothesis' : ' · Gabarus Bay hypothesis') : wreck.name;
    addTimelineVoyage(name, [{ date: wreck.date, until: wreck.until, path: [point], note: wreck.note }],
      wreck.source, 'Historical account', harborView, null);
  }
  expeditions.push({ name: wreck.name, date: wreck.date, point: wreck.main ? wreck.point : null });
}

function englishDate(date) {
  return new Date(Date.parse(date) + 10 * 86400000).toISOString().slice(0, 10);
}
const arrivals1630 = 'https://www.colonialsociety.org/node/519';
const arrivalPorts = {
  Salem: [43.8, 83], Nantasket: [26.4, 79], Charlestown: [30, 67],
  Plymouth: patuxet, 'Massachusetts Bay': [35, 93],
};
for (const [vessel, harbor, first, last] of [
  ['Lyon', 'Salem', '05-01', '05-31'], ['Mary and John', 'Nantasket', '05-30'],
  ['Arbella', 'Salem', '06-12'], ['Jewell', 'Salem', '06-13'],
  ['Ambrose', 'Salem', '06-18'], ['Talbot', 'Salem', '07-02'],
  ['Mayflower (1630)', 'Charlestown', '07-01', '07-31'],
  ...['Whale', 'Hopewell', 'William and Francis', 'Tryal', 'Charles'].map(
    vessel => [vessel, 'Massachusetts Bay', '07-01', '07-31']),
  ['Success', 'Salem', '07-06'], ['Gift', 'Charlestown', '08-20'],
  ['Handmaid', 'Plymouth', '10-29'],
]) {
  const date = englishDate('1630-' + first);
  const point = arrivalPorts[harbor];
  const name = vessel + ' — ' + harbor;
  if (last) {
    addTimelineVoyage(name, [{ date, until: englishDate('1630-' + last), path: [point],
      note: 'Approximate receiving area. The display window represents the arrival month, not the length of the stay.' }],
      arrivals1630, 'Colonial Society of Massachusetts, 1630 shipping table', () => map, null);
    expeditions.push({ name, date, point });
  } else {
    const previous = new Date(Date.parse(date) - 86400000).toISOString().slice(0, 10);
    leg(name, [[previous, [point[0] + 1, point[1] + 4], 'Illustrative final approach.'],
      [date, point, 'Recorded arrival at ' + harbor + '. English date converted to Gregorian.']],
      arrivals1630, 'Colonial Society of Massachusetts, 1630 shipping table', false, null);
  }
}

const shippingLists = 'https://www.gcoe.lit.nagoya-u.ac.jp/result/pdf/3-1_%E7%AC%A0%E4%BA%95%28E%29.pdf';
const bostonPort = [42.36,-71.045], jamaicaPort = [17.94,-76.84];
for (const [vessel, outbound, start, end, estimate] of [
  ['Katherine', true, '1686-03-01', '1686-04-19', 'departure'],
  ['Katherine', false, '1686-06-15', '1686-08-09'],
  ['Katherine', true, '1686-10-01', '1686-11-24', 'departure'],
  ['Katherine', false, '1686-12-23', '1687-02-01', 'arrival'],
  ['Mary & Elizabeth', true, '1687-04-15', '1687-06-01'],
  ['Mary & Elizabeth', true, '1686-05-02', '1686-07-12'],
  ['Mary & Elizabeth', false, '1686-08-07', '1686-09-20'],
]) {
  const bends = [[42.34,-70.85],[42.25,-69.8],[41,-68.9],[35,-69],[22,-70],[18,-74.1],[17.7,-76.5]];
  const direction = outbound ? 'Boston to Jamaica' : 'Jamaica to Boston';
  atlanticVoyage(vessel + ' — ' + direction + ' (' + start + ')', [
    [start, outbound ? bostonPort : jamaicaPort, estimate === 'departure' ? 'Departure date estimated for playback.' : 'Departure as dated in the shipping-list chart.'],
    [end, outbound ? jamaicaPort : bostonPort, estimate === 'arrival' ? 'Arrival date estimated for playback.' : 'Arrival as dated in the shipping-list chart.', outbound ? bends : bends.reverse()],
  ], shippingLists, 'Toshikazu Kasai, Naval Office shipping-list itineraries', null);
}
const stLawrenceApproach = [[42.4,-70.6],[43,-65.8],[43.1,-65.3],[44.8,-59.6],[47.2,-59.4],[49.3,-63.8],[49.3,-67],[48.2,-69.4]];
atlanticVoyage('William Phips — Quebec expedition (about 32 vessels)', [
  ['1690-08-19', [42.32,-70.88], 'The fleet sailed from Hull on August 19 or 20. One marker represents the expedition.'],
  ['1690-10-16', [46.82,-71.19], 'Fleet off Quebec.', stLawrenceApproach],
  ['1690-10-24', [46.82,-71.19], 'Withdrawal from Quebec in late October.'],
  ['1690-11-29', bostonPort, 'Approximate return. The fleet dispersed and individual vessels returned on different dates.', [...stLawrenceApproach].reverse()],
], 'https://www.biographi.ca/en/bio.php?id_nbr=519', 'Dictionary of Canadian Biography', null);

expeditions.sort((a, b) => a.date.localeCompare(b.date));
for (const entry of expeditions) picker.add(new Option(entry.date.slice(0, 4) + ' Ãƒâ€šÃ‚Â· ' + entry.name, entry.date));
picker.addEventListener('change', () => {
  const entry = expeditions[picker.selectedIndex - 1];
  if (!entry) return;
  selectedVoyage = entry.name;
  pauseTimeline();
  dateField.value = entry.date;
  dateField.dispatchEvent(new Event('input'));
  if (entry.point) map.setView(entry.point, 3);
  picker.value = '';
});
