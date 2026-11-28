let selectedVoyage;
const narratives = 'https://www.gutenberg.org/cache/epub/67623/pg67623-images.html';
const source = 'Voyage accounts, ed. George Parker Winship';
const expeditions = [];
const picker = document.querySelector('#voyage-picker');
// Each stop has a Gregorian playback date, position and interpretation.
// Interpolate between consecutive stops; repeated positions represent a stay.
function fleetSize(name, day) {
  if (name === 'Charity and Swan - Weston’s 1622 settlers') return 2;
  if (name === 'Higginson-Skelton supply fleet') return 6;
  if (name.startsWith('William Phips - Quebec expedition')) return day <= '1690-10-24' ? 32 : 1;
  if (name.startsWith('Bonaventure') || name === 'George Popham and Ralegh Gilbert') return 2;
  if (name.startsWith('Charles Leigh') && day < '1597-06-15') return 2;
  if (name === 'Martin Pring' && day <= '1603-07-01') return 2;
  return 1;
}
function leg(name, stops, url = narratives, credit = source, north = false, outward, geographicView, traveler = ShipIcon) {
  const points = stops.flatMap(stop => [stop[1], ...(stop[3] || [])]);
  if (!north && !geographicView && points.every(point => artworkBounds.contains(point))) {
    registerMainLeg(name, stops, url, credit, outward, traveler);
    return;
  }
  // Work in the artwork's projected plane so a crossing can have both endpoints outside.
  const project = point => {
    if (!north && !geographicView) return map.project(point, 5);
    const [lon, lat] = north ? point : [point[1], point[0]];
    return geographicArtworkPixel(lon, lat);
  };
  let run = [];
  function flush() {
    if (run.length) registerMainLeg(name, run, url, credit, false, traveler);
    run = [];
  }
  function append(time, pixel, note) {
    const date = new Date(Math.round(time/86400000)*86400000).toISOString().slice(0,10);
    const ll = map.unproject(pixel, 5);
    const point = [ll.lat, ll.lng];
    if (run.length && run.at(-1)[0] === date) {
      const last = run.at(-1);
      if (run.length > 1) (last[3] ||= []).push(last[1]);
      last[1] = point;
      last[2] = note;
    } else run.push([date, point, note]);
  }
  for (let i = 1; i < stops.length; i++) {
    const [date, end, note, bends = []] = stops[i];
    const vertices = [stops[i-1][1], ...bends, end].map(project);
    const startTime = Date.parse(stops[i-1][0]);
    const duration = (Date.parse(date)-startTime)/(vertices.length-1);
    for (let k = 1; k < vertices.length; k++) {
      const a = vertices[k-1], delta = vertices[k].subtract(a);
      let enter = 0, leave = 1;
      for (const axis of ['x','y']) {
        if (!delta[axis]) {
          if (a[axis] < 0 || a[axis] > 8192) leave = -1;
          continue;
        }
        const t0 = -a[axis]/delta[axis], t1 = (8192-a[axis])/delta[axis];
        enter = Math.max(enter, Math.min(t0,t1));
        leave = Math.min(leave, Math.max(t0,t1));
      }
      if (enter > leave) { flush(); continue; }
      const edgeNote = 'Approximate passage at the edge of the mapped area.';
      if (!run.length) append(startTime+(k-1+enter)*duration, a.add(delta.multiplyBy(enter)), enter || k>1 ? edgeNote : stops[i-1][2]);
      append(startTime+(k-1+leave)*duration, a.add(delta.multiplyBy(leave)), leave===1 && k===vertices.length-1 ? note : edgeNote);
      if (leave < 1) flush();
    }
  }
  flush();
}
function registerMainLeg(name, stops, url, credit, outward, traveler) {
  const days = [];
  const positions = stops.map(stop => stop[1]);
  for (let i = 0; i < stops.length; i++) {
    const [date, , note] = stops[i];
    const time = Date.parse(date);
    const prior = i ? Date.parse(stops[i - 1][0]) : time;
    const count = Math.round((time - prior) / 86400000);
    const legPoints = [positions[Math.max(0, i - 1)],
      ...(stops[i][3] || []), positions[i]];
    const stopOnly = traveler !== PersonIcon && !waterPassage(legPoints, 'main');
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
      if (stopOnly) path = [step === count ? positions[i] : previous];
      days.push({ date: day, path, stopOnly, headline: step === count ? note : false,
        shipCount: fleetSize(name, day), note: (step === count ? note : stops[i - 1][2]) +
        (traveler === PersonIcon ? ' The path and daily dates illustrate the claim; intermediate locations are unverified.' : ' The playback dates between documented stops and the sailing track are illustrative.') });
    }
  }
  const departures = {
    'Giovanni da Verrazzano': [[-58, 44], [-64, 50], [-66, 65]],
    'Bartholomew Gosnold': [[-59, 75], [-64, 80], [-67, 115], [-69, 155]],
    'Martin Pring': [[-7, 131], [5, 128], [7, 146], [7, 166]],
    'De Mons and Champlain': [[-15, 156], [2, 150], [16, 149]],
    'John Smith': [[7, 150], [15, 152]],
    'Thomas Hunt': [[-23, 166], [-24, 179]],
    'Tisquantum and Thomas Dermer': [[-10, 112], [3, 128], [4, 145], [-6, 153], [-30, 160], [-48, 159], [-64, 151], [-70, 113], [-72, 70]],
  };
  const exit = outward === undefined ? departures[name] : outward;
  addTimelineVoyage(name, days, url, credit, () => {
    if (selectedVoyage === name && !map.getBounds().contains(positions[0])) {
      map.setView(positions[0], 3);
    }
    return map;
  }, exit, traveler);
  if (!expeditions.some(entry => entry.name === name)) {
    expeditions.push({ name, date: stops[0][0], point: positions[0] });
  }
}

const monhegan = [-69.33, 43.756];
const penobscotMouth = [-68.88, 44.05];
const gulf = [-69.5, 43.35];
const outerCape = [4, 142];
const patuxet = [-10.5, 103.8];
const nauset = [-23, 157];

const plymouthHarborApproach = [[4,142],[2.5,127],[-9,113]];
const atlanticEdgeOffCape = [-3,180];
const plymouthHarborExit = [...plymouthHarborApproach].reverse();
const plymouthMainePassage = [[-9,112],[18,114],[53,110]];
const maineEdge = [86,110];

leg('Sparrow’s shallop - passengers from the Maine fishing grounds', [
  ['1622-06-05', maineEdge, 'Estimated entry into the mapped waters. The Sparrow dispatched its shallop from the Maine fishing grounds.'],
  ['1622-06-09', patuxet, 'Around the end of May Old Style, the shallop reached Plymouth with seven passengers, including Phineas Pratt. The arrival day is approximate.', [...plymouthMainePassage].reverse()],
], 'https://www.pilgrimhall.org/wp-content/uploads/2024/06/Phineas_Pratt_17th_Century_Documents.pdf', 'Pilgrim Hall Museum, Bradford and Pratt accounts', false, false);

leg('Charity and Swan - Weston’s 1622 settlers', [
  ['1622-07-09', atlanticEdgeOffCape, 'Estimated approach to Cape Cod. The two ships carried settlers for Thomas Weston’s separate colony.'],
  ['1622-07-13', patuxet, 'Winslow places the arrival of both ships in late June or early July Old Style. About fifty or sixty men came to plant for Weston. The playback date is approximate.', plymouthHarborApproach],
], 'https://www.gutenberg.org/ebooks/66332', 'Edward Winslow, Good Newes from New England', false, false);

leg('Jacob - Winslow’s 1625 return', [
  ['1625-04-04', atlanticEdgeOffCape, 'Estimated approach from England under William Peirce.'],
  ['1625-04-08', patuxet, 'The Jacob brought Edward Winslow back to Plymouth in March Old Style. The exact arrival day is uncertain.', plymouthHarborApproach],
], 'https://upload.wikimedia.org/wikipedia/commons/3/39/Our_Plymouth_forefathers_-_the_real_founders_of_our_republic_%28IA_ourplymouthforef00hank%29.pdf', 'Our Plymouth Forefathers', false, false);

leg('Mayflower - 1629 Leiden migration', [
  ['1629-08-11', atlanticEdgeOffCape, 'Estimated final approach. William Peirce commanded this Mayflower, a different vessel from the ship of 1620.'],
  ['1629-08-15', patuxet, 'Bradford dates the arrival to about August. This voyage brought a contingent of thirty-five from Leiden. The playback day is approximate.', plymouthHarborApproach],
], 'https://www.colonialsociety.org/publications/3705/anno-domini-1629', 'William Bradford, Of Plymouth Plantation', false, false);

leg('Fortune - 1621 Plymouth voyage', [
  ['1621-11-16', atlanticEdgeOffCape, 'Estimated entry into the mapped waters off Cape Cod. Thomas Barton commanded the Fortune.'],
  ['1621-11-19', patuxet, 'The Fortune arrived at Plymouth on November 9 Old Style, bringing colonial agent Robert Cushman and about 35 new settlers.', plymouthHarborApproach],
  ['1621-12-23', patuxet, 'On December 13 Old Style the Fortune set out for England with Cushman, clapboards and beaver skins.'],
  ['1621-12-25', atlanticEdgeOffCape, 'Estimated passage out of the mapped waters. A French vessel seized the cargo later in the return voyage.', plymouthHarborExit],
], 'https://www.pilgrimhall.org/the-fortune/', 'Pilgrim Hall Museum', false, []);

leg('Anne - 1623 Plymouth voyage', [
  ['1623-08-02', atlanticEdgeOffCape, 'Estimated approach to Cape Cod. The Anne and Little James became separated during the Atlantic crossing.'],
  ['1623-08-05', patuxet, 'Approximate arrival. William Peirce brought about 60 passengers. Emmanuel Altham recalled the Anne arriving ten days before the Little James.', plymouthHarborApproach],
  ['1623-09-20', patuxet, 'Edward Winslow sailed for London on September 10 Old Style. The Anne carried beaver skins and clapboards.'],
  ['1623-09-22', atlanticEdgeOffCape, 'Estimated passage out of the mapped waters on the voyage to England.', plymouthHarborExit],
], 'https://www.gutenberg.org/ebooks/66332', 'Edward Winslow, Good Newes from New England', false, []);

leg('Little James - 1623 Plymouth voyage', [
  ['1623-08-12', atlanticEdgeOffCape, 'Estimated approach to Cape Cod after a stormy crossing. John Bridges was master and Emmanuel Altham was aboard.'],
  ['1623-08-15', patuxet, 'Altham dated the arrival in New England to August 5 Old Style. The pinnace nearly grounded outside Plymouth Harbor before reaching shelter.', plymouthHarborApproach],
], 'https://www.gutenberg.org/ebooks/66135', 'Emmanuel Altham, letter of September 1623', false, false);

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
  ['1610-08-22', [-69.05, 43.72], 'As the catch declines off Maine, Argall decides to return to Virginia. The fishing position is approximate.'],
  ['1610-09-06', [-75.08, 38.84], 'Argall anchors in Delaware Bay on August 27 Old Style. The offshore track and anchorage position are approximate.',
    [[-69.6,42.25],[-69.65,41.05],[-70.35,40.8],[-72,40.55],[-73.8,40.25],[-74.2,39.35],[-74.82,38.72]]],
  ['1610-09-10', [-75.98, 37.12], 'Argall reaches Cape Charles, Virginia, on August 31 Old Style.',
    [[-74.88,38.74],[-74.95,38.5],[-75.2,37.95],[-75.62,37.38],[-75.94,37.08]]],
], 'https://upload.wikimedia.org/wikipedia/commons/6/6d/History_of_the_Virginia_Company_of_London-_With_Letters_to_and_from_the_First_Colony%2C_Never_..._%28IA_historyvirginia01neilgoog%29.pdf',
  'Edward D. Neill, History of the Virginia Company of London', 'Maine to Virginia', null);

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

function atlanticVoyage(name, stops, url, credit) {
  leg(name, stops, url, credit, false, undefined, true);
}

atlanticVoyage('San Juan Ã‚Â· Basque whaling voyage', [
  ['1565-06-01', [51.82, -54.9], 'Illustrative summer approach to Labrador from the Atlantic. The playback dates are seasonal estimates.'],
  ['1565-06-07', [51.72, -56.40], 'Approaching the Basque whaling station through the Strait of Belle Isle.'],
  ['1565-06-09', [51.726, -56.427], 'Red Bay. The crew prepared whale oil for shipment to Europe.'],
  ['1565-10-31', [51.726, -56.427], 'The loaded San Juan sank in Red Bay in 1565. This date marks the end of the animation; the exact day is uncertain.'],
], 'https://shipwrecksnl.ca/spsnl-shipwreck-timeline/', 'Shipwreck Preservation Society of Newfoundland and Labrador', false);

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
}], 'https://www.cyberlibrary.org/en/books/sailors-narratives-of-voyages-along-the-new-england-coast-1524-4dc6ec98/chapters/14/', 'Thomas Dermer’s 1619 letter', () => map, false);
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
  if (!wreck.main) continue;
  for (const point of points) {
    const name = wreck.alternative ? wreck.name + (point === wreck.point ? ' · Sable Island hypothesis' : ' · Gabarus Bay hypothesis') : wreck.name;
    addTimelineVoyage(name, [{ date: wreck.date, until: wreck.until, path: [point], note: wreck.note }],
      wreck.source, 'Historical account', () => map, false);
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
  ['Katherine', true, '1687-04-22', '1687-06-11'],
  ['Katherine', false, '1687-07-04', '1687-08-22', 'arrival'],
  ['Katherine', true, '1687-11-20', '1688-01-12', 'departure'],
  ['Katherine', false, '1688-02-09', '1688-04-05'],
  ['Katherine', true, '1688-05-30', '1688-07-23'],
  ['Katherine', false, '1688-08-11', '1688-09-24'],
  ['Katherine', true, '1688-11-01', '1688-12-29', 'departure'],
  ['Katherine', false, '1689-02-08', '1689-03-30', 'arrival'],
  ['Mary & Elizabeth', true, '1687-04-15', '1687-06-01'],
  ['Mary & Elizabeth', false, '1687-06-15', '1687-08-01', 'arrival'],
  ['Mary & Elizabeth', true, '1686-05-02', '1686-07-12'],
  ['Mary & Elizabeth', false, '1686-08-07', '1686-09-20'],
]) {
  const bends = [[42.34,-70.85],[42.25,-69.8],[41,-68.9],[35,-69],[22,-70],[21.5,-71.8],[20.2,-73.5],[19.85,-73.9],[19.1,-74.48],[18.3,-74.6],[17.7,-76.5]];
  const direction = outbound ? 'Boston to Jamaica' : 'Jamaica to Boston';
  atlanticVoyage(vessel + ' — ' + direction + ' (' + start + ')', [
    [englishDate(start), outbound ? bostonPort : jamaicaPort, estimate === 'departure' ? 'Departure date estimated for playback.' : 'Shipping-list departure: ' + start + ', treated as Old Style.'],
    [englishDate(end), outbound ? jamaicaPort : bostonPort, estimate === 'arrival' ? 'Arrival date estimated for playback.' : 'Shipping-list arrival: ' + end + ', treated as Old Style.', outbound ? bends : bends.reverse()],
  ], shippingLists, 'Toshikazu Kasai, Naval Office shipping-list itineraries', null);
}
const stLawrenceApproach = [[42.4,-70.6],[43,-65.8],[43.1,-65.3],[44.8,-59.6],[47.2,-59.4],[49.3,-63.8],[49.3,-67],[48.2,-69.4]];
atlanticVoyage('William Phips — Quebec expedition (about 32 vessels)', [
  ['1690-08-19', [42.32,-70.88], 'The fleet sailed from Hull on August 19 or 20.'],
  ['1690-10-16', [46.82,-71.19], 'Fleet off Quebec.', stLawrenceApproach],
  ['1690-10-24', [46.82,-71.19], 'Withdrawal from Quebec in late October.'],
  ['1690-11-29', bostonPort, 'Approximate return. The fleet dispersed and individual vessels returned on different dates.', [...stLawrenceApproach].reverse()],
], 'https://www.biographi.ca/en/bio.php?id_nbr=519', 'Dictionary of Canadian Biography', null);

const harlow = 'Edward Harlow and the abduction of Epenow';
leg(harlow, [
  ['1611-06-01', monhegan, 'Harlow took captives at Monhegan. Only the year is established; the June days space the animation.'],
  ['1611-06-04', [-70.03,42.04], 'Reconstructed offshore passage toward Martha’s Vineyard.'],
], 'https://www.nps.gov/parkhistory/online_books/acad/wabanaki_peoples_vol1.pdf', 'National Park Service', true, []);
leg(harlow, [
  ['1611-06-05', [-29,168], 'Illustrative approach around the outer Cape in 1611.'],
  ['1611-06-09', epenowSite, 'Epenow and Coneconam were kidnapped at Martha’s Vineyard and taken to England. The anchorage and playback days are approximate.',
    [[-48,164],[-64,147],[-66,100],[-59,76]]],
  ['1611-06-12', [-65,160], 'Illustrative departure for England.', [[-59,76],[-67,96]]],
], 'https://www.bia.gov/sites/default/files/media_document/076_pf.pdf', 'Bureau of Indian Affairs', false, [[-66,179]]);

const nassau = 'Isaack de Rasières aboard the Nassau';
const manometLetter = 'https://archive.org/details/pilgrimmemorials00russ';
leg(nassau, [
  ['1627-09-27', battery, 'Estimated departure from Manhattan. The Dutch bark carried trade goods and Isaac de Rasières.'],
  ['1627-10-04', [-70.615,41.735], 'De Rasières dated his letter October 4 aboard the Nassau at Frenchman’s Point. The plotted anchorage is approximate.',
    [[-74.01,40.70],[-73.97,40.72],[-73.94,40.78],[-73.81,40.80],[-73.4,40.99],[-72.3,41.17],[-71.88,41.27],[-71.50,41.28],[-71.0,41.39],[-70.82,41.54],[-70.65,41.70]]],
], manometLetter, 'De Rasières letter and Plymouth account', 'New Amsterdam to Manomet', []);
leg(nassau, [
  ['1627-10-05', [-31,105], 'Illustrative overland transfer from the Manomet trading post across the Cape Cod isthmus.'],
  ['1627-10-06', [-27,114], 'At the Cape Cod Bay side, a Plymouth boat was requested. Transfer dates are estimated.'],
], manometLetter, 'Plymouth correspondence', false, null, undefined, PersonIcon);
leg(nassau, [
  ['1627-10-07', [-26,115], 'A Plymouth boat carried the visitor on the final leg. The Nassau stayed on the Buzzards Bay side.'],
  ['1627-10-08', patuxet, 'Arrival at Plymouth for the trading visit. The day is estimated.', [[-18,116],[-10,112]]],
], manometLetter, 'Plymouth correspondence', false, null);

const gallopSource = 'https://marbleheadmuseum.org/wp-content/uploads/2021/01/pp-187-260-331Winthrop_s_Journal_History_of_New_Englan.pdf';
leg('John Gallop encounters Oldham’s pinnace', [
  ['1636-07-25', [-63,-37], 'Gallop sailed from Connecticut intending to trade on Long Island. The starting point and playback days are approximate.'],
  ['1636-07-26', [-68,-23], 'The wind changed as the bark approached Long Island. Gallop changed course before landing.'],
  ['1636-07-27', [-67,20], 'Off Block Island the crew encountered John Oldham’s pinnace and discovered his death.', [[-68,4]]],
], gallopSource, 'John Winthrop’s journal', false, [[-65,24],[-64,30]]);
addTimelineVoyage('John Oldham’s pinnace', [{ date:'1636-07-27', path:[[-67.2,20.7]],
  note:'Second vessel at the encounter. Day and position are approximate.' }], gallopSource, 'John Winthrop’s journal', () => map, null);

const desire = 'Desire — William Peirce';
const desireSource = 'https://www.nps.gov/articles/000/beginnings-of-ma-slave-trade.htm';
leg(desire, [
  ['1637-07-23', [30,69], 'Winthrop recorded the dispatch of captive Pequots on July 13 Old Style. The embarkation point in Massachusetts Bay is approximate.'],
  ['1637-07-25', [31,176], 'Bound for the West Indies. Bermuda was the intended destination.'],
], desireSource, 'National Park Service', false, [[31,179]]);
const providencia = [13.38,-81.38];
const islandPassage = [[30,-65],[20.8,-68.5],[20.4,-73.3],[19.4,-74.4],[17.6,-75],[15,-80]];
atlanticVoyage(desire, [
  ['1637-07-26', [42,-68], 'Reconstructed offshore track. Dates in the Caribbean are illustrative.'],
  ['1637-09-15', providencia, 'Peirce missed Bermuda and took the captive Pequots to Providence Island in the western Caribbean to be sold into slavery.', islandPassage],
  ['1638-01-15', providencia, 'Estimated start of the return passage. Winthrop also mentions salt from Tertugos; its stop date is unknown.'],
  ['1638-03-06', [42,-68], 'Approaching Massachusetts with enslaved Africans aboard.', [...islandPassage].reverse()],
], desireSource, 'National Park Service', null);
leg(desire, [
  ['1638-03-07', [31,176], 'Illustrative approach to Massachusetts Bay.'],
  ['1638-03-08', [30,69], 'Winthrop recorded the return on February 26 Old Style. Boston’s Town Cove is the probable landing site.'],
], desireSource, 'National Park Service', false, null);

const winslowSupply = 'Edward Winslow — Damariscove provisioning voyage';
const maineHistory = 'https://www.maine.gov/dacf/parks/discover_history_explore_nature/history/colonialpemaquid/research/books/Ten_Years_at_Pemaquid.pdf';
leg(winslowSupply, [
  ['1622-06-01', patuxet, 'Plymouth sent Winslow north in its shallop to obtain food. Only the season is known; these dates space the round trip.'],
  ['1622-06-03', [53,110], 'Illustrative passage northeast across Massachusetts Bay.', [[-9,112],[18,114]]],
], maineHistory, 'Ten Years at Pemaquid', false, null);
const mainePassage = [[-70.4,42.85],[-70.2,43.33],[-69.85,43.64]];
leg('Little James - 1624 fishing voyage', [
  ['1624-03-15', patuxet, 'Bradford records a departure for the eastern fishing grounds in early March Old Style. The sailing day is estimated.'],
  ['1624-03-17', [53,110], 'Estimated northeast passage across Massachusetts Bay toward Damariscove.', [[-9,112],[18,114]]],
  ['1624-03-19', [86,110], 'The pinnace continued toward Damariscove, where it later sank in a storm and was salvaged.'],
], 'https://www.colonialsociety.org/node/3727', 'William Bradford, Of Plymouth Plantation', false, []);

leg('Little James - 1624 return after salvage', [
  ['1624-09-18', maineEdge, 'Illustrative return dates. Fishing crews helped raise and repair the vessel after it sank near Damariscove.'],
  ['1624-09-22', patuxet, 'Bradford records that the repaired pinnace was brought home to Plymouth. The exact return day is uncertain.', [...plymouthMainePassage].reverse()],
], 'https://www.colonialsociety.org/node/3727', 'William Bradford, Of Plymouth Plantation', false, false);

leg('Little James - 1624 return to England', [
  ['1624-10-10', patuxet, 'Illustrative departure date after the salvage and return to Plymouth. The vessel returned to England in 1624, where crew members brought a wage claim.'],
  ['1624-10-14', atlanticEdgeOffCape, 'Estimated eastbound passage out of the mapped waters.', plymouthHarborExit],
], 'https://www.colonialsociety.org/publications/3705/volume-93-plimoth-plantation', 'Colonial Society of Massachusetts, Bradford edition', false, []);

leg(winslowSupply, [
  ['1622-06-04', [-70.48,42.66], 'Estimated passage north from Cape Ann.'],
  ['1622-06-08', [-69.62,43.76], 'At Damariscove, Captain Huddleston and other fishing captains supplied provisions for Plymouth. Arrival day estimated.', mainePassage],
  ['1622-06-12', [-70.48,42.66], 'Returning south with provisions; day estimated.', [...mainePassage].reverse()],
], maineHistory, 'Ten Years at Pemaquid', 'Gulf of Maine', []);
leg(winslowSupply, [
  ['1622-06-13', [53,110], 'Estimated return passage across Massachusetts Bay.'],
  ['1622-06-15', patuxet, 'The shallop brought food back to Plymouth. Return day estimated.', [[18,114],[-9,112]]],
], maineHistory, 'Ten Years at Pemaquid', false, null);

const swanPassage = [[-9,112],[2,130],[5,143],[-5,152]];
leg('Swan — Cape Cod provisions for Plymouth and Wessagusset', [
  ['1622-11-10', patuxet, 'Bradford and Tisquantum sailed to obtain corn and beans. Dates and sailing track illustrate the late-1622 expedition.'],
  ['1622-11-16', nauset, 'At Nauset a storm stranded the expedition’s shallop. Part of the provisions remained in local care for collection. The marker represents the supply expedition.', swanPassage],
  ['1622-11-24', patuxet, 'Return to Plymouth with provisions to share with Wessagusset. Return day estimated.', [...swanPassage].reverse()],
], 'https://www.gutenberg.org/ebooks/66332', 'Edward Winslow, Good Newes from New England', false, null);

const winthropJournal = 'https://salempl.org/wp-content/uploads/2022/06/Original-Narratives-of-Early-American-History-Winthrops-Journal-vol.-1.pdf';
const englishDeparture = [[50.8,-5.2],[50.15,-6.1],[48,-15],[45,-35],[43,-55],[42,-68]];
const bayApproach = [34,178];
const supplyCrossings = [
  { name: 'Higginson–Skelton supply fleet', departure: '1629-04-25', offshore: '1629-06-25', arrival: '1629-06-28',
    origin: [50.32,-4.14], harbor: 'Salem', startNote: 'Six vessels brought settlers, livestock, tools and food. April and June days are illustrative.',
    endNote: 'Salem received the supply fleet in June. The ships’ individual arrival days are not represented.',
    url: 'https://tile.loc.gov/storage-services/public/gdcmassbookdig/fifthhalfcentury02esse/fifthhalfcentury02esse_bw.pdf', credit: 'Essex Institute, Endicott commemorative history' },
  { name: 'Lyon — winter relief from Bristol', departure: '1630-12-11', offshore: '1631-02-12', arrival: '1631-02-15',
    origin: [51.5,-2.72], harbor: 'Nantasket', startNote: 'William Peirce sailed from Bristol on December 1 Old Style with provisions for Massachusetts Bay.',
    endNote: 'Winthrop recorded the arrival at Nantasket on February 5 Old Style, with about twenty passengers and two hundred tons of goods.' },
  { name: 'Friendship — livestock for Boston', departure: '1631-05-25', offshore: '1631-07-21', arrival: '1631-07-24',
    origin: [51.07,-4.19], harbor: 'Boston', startNote: 'Bad weather turned back the first attempt. The successful sailing from Barnstaple began around mid-May Old Style; departure day estimated.',
    endNote: 'On July 14 Old Style the Friendship reached Boston and unloaded eight heifers, one calf and five sheep.' },
];
for (const trip of supplyCrossings) {
  const url = trip.url || winthropJournal;
  const credit = trip.credit || 'John Winthrop’s journal';
  const bends = trip.harbor === 'Salem' ? [[49.9,-5.3], ...englishDeparture.slice(1)] : englishDeparture;
  atlanticVoyage(trip.name, [
    [trip.departure, trip.origin, trip.startNote],
    [trip.offshore, [42,-67.8], 'Illustrative offshore approach to Massachusetts Bay.', bends],
  ], url, credit, null);
  const nextDay = new Date(Date.parse(trip.offshore) + 86400000).toISOString().slice(0,10);
  leg(trip.name, [
    [nextDay, bayApproach, 'Final approach on the illustrated map; offshore positions are estimated.'],
    [trip.arrival, trip.harbor === 'Boston' ? [30,69] : arrivalPorts[trip.harbor], trip.endNote],
  ], url, credit, false, null);
}

const angel = 'White Angel — Saco and Massachusetts Bay';
atlanticVoyage(angel, [
  ['1631-05-20', [51.5,-2.72], 'Estimated departure from Bristol carrying provisions and livestock.'],
  ['1631-07-08', [43.46,-70.36], 'Reported at Saco before entering Massachusetts Bay. Arrival day estimated.', [...englishDeparture,[43,-69.9]]],
  ['1631-07-29', [42.66,-70.48], 'Illustrative southbound passage from Saco.', [[43.35,-70.32],[42.9,-70.5]]],
], winthropJournal, 'John Winthrop’s journal', null);
leg(angel, [
  ['1631-07-30', [53,110], 'Approaching Massachusetts Bay from the Maine coast.'],
  ['1631-08-01', [30,69], 'Winthrop recorded twenty-one heifers landed in the bay on July 22 Old Style. Harbor position approximate; Plymouth was an intended recipient of supplies.'],
], winthropJournal, 'John Winthrop’s journal', false, null);

// These accounts establish the voyages but leave the daily positions unknown.
const bayHarbor = [30, 69];
const journalCredit = 'John Winthrop’s journal';
leg('Myles Standish — recovery of the Nauset corn', [
  ['1623-01-16', patuxet, 'Standish set out to recover the provisions left on the Swan expedition. Winslow tentatively recalled January. All playback days are estimated.'],
  ['1623-01-19', nauset, 'The crew found the corn safe in Nauset care.', swanPassage],
  ['1623-01-23', patuxet, 'Reconstructed return to Plymouth.', [...swanPassage].reverse()],
], 'https://www.gutenberg.org/ebooks/66332', 'Edward Winslow, Good Newes from New England', false, null);

leg('Charity — livestock and supplies for Plymouth', [
  ['1624-03-20', [5,179], 'Final approach from England. The arrival is dated to March; daily positions are illustrative. Edward Winslow returned on the Charity after sailing out on the Anne.'],
  ['1624-03-23', patuxet, 'The Charity brought clothing, three heifers, a bull, a carpenter and a salt maker to Plymouth.', [[7,150],[6,131],[-9,112]]],
], 'https://archive.org/details/historyoftownofp02thac', 'James Thacher, History of the Town of Plymouth', false, null);

const capeBay = [-19,140];
leg('Massachusetts Bay pinnace — Cape Cod corn trade', [
  ['1630-09-12', bayHarbor, 'Approximate Massachusetts Bay departure. Winthrop described this voyage retrospectively. The ports and September days are illustrative.'],
  ['1630-09-15', capeBay, 'The company sent a pinnace to trade for corn around Cape Cod. The account leaves the landing place unspecified.', [[23,91],[3,125]]],
  ['1630-09-18', bayHarbor, 'The pinnace returned with more than eighty bushels of corn.', [[3,125],[23,91]]],
], winthropJournal, journalCredit, false, null);

leg('Salem pinnace — interrupted Cape Cod supply run', [
  ['1631-09-12', arrivalPorts.Salem, 'The pinnace sailed from Salem intending to trade for corn around Cape Cod. Playback days are estimated.'],
  ['1631-09-15', patuxet, 'Contrary winds drove the crew into Plymouth. Colonial officials threatened force if the crew continued trading.', [[34,94],[7,102],[-9,111]]],
  ['1631-09-18', arrivalPorts.Salem, 'The crew returned and reported the dispute. The intended Cape Cod stop was never reached.', [[-9,111],[7,102],[34,94]]],
], winthropJournal, journalCredit, false, null);

leg('Unnamed Dutch ship — Virginia corn delivery', [
  ['1632-04-23', [-42,179], 'Illustrative approach from Virginia. Winthrop records the spring delivery without naming the ship, date or unloading place.'],
  ['1632-04-29', bayHarbor, 'Two thousand bushels of Virginia corn arrived and sold for four shillings and sixpence per bushel. Marker represents Massachusetts Bay.', [[-20,164],[7,150],[19,105]]],
], winthropJournal, journalCredit, false, null);

const rebeckaTrack = [[23,95],[8,147],[-26,164],[-48,161],[-67,151],[-68,100],[-64,60],[-58,44]];
const littleJamesTradeTrack = [...plymouthHarborExit,
  [8,147],[-26,164],[-48,161],[-50.5,160],[-67,151],[-68,100],[-64,60],[-58,44]];
leg('Little James - 1623 Narragansett trading voyage', [
  ['1623-09-18', patuxet, 'Estimated departure for the pinnace’s first trading voyage to Narragansett country.'],
  ['1623-09-23', [-52.1,44.6], 'The trading venture was unsuccessful. This anchorage illustrates the destination region, and the sailing days are estimates.', littleJamesTradeTrack],
  ['1623-09-28', patuxet, 'Estimated return to Plymouth.', [...littleJamesTradeTrack].reverse()],
], 'https://www.gutenberg.org/cache/epub/70625/pg70625-images.html', 'Debts Hopeful and Desperate', false, false);

leg('Rebecka — Narragansett corn voyage', [
  ['1634-10-20', bayHarbor, 'Reconstructed departure for Narragansett Bay. Exact sailing days, anchorages and track are estimated.'],
  ['1634-10-27', [-52,42], 'Narragansett people supplied five hundred bushels of corn for John Oldham.', rebeckaTrack],
  ['1634-11-03', bayHarbor, 'The Rebecka returned with the corn. Winthrop relates Peirce’s observations of the shoals between Cape Cod and Nantucket on both passages.', [...rebeckaTrack].reverse()],
], winthropJournal, journalCredit, false, null);

expeditions.sort((a, b) => a.date.localeCompare(b.date));
for (const entry of expeditions) picker.add(new Option(entry.date.slice(0, 4) + ' Ãƒâ€šÃ‚Â· ' + entry.name, entry.date));
picker.addEventListener('change', () => {
  const entry = expeditions[picker.selectedIndex - 1];
  if (!entry) return;
  selectedVoyage = entry.name;
  pauseTimeline();
  dateField.value = entry.date;
  dateField.dispatchEvent(new Event('input'));
  if (entry.point) {
    map.setView(entry.point, 3);
    // Several fleet members share one harbor and one arrival window.
    map.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.options.title === entry.name) layer.openPopup();
    });
  }
  picker.value = '';
});
