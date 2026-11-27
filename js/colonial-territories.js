{
  // Rings use master-artwork pixels at zoom 5. Fort footprints are schematic at this scale.
  const sources = {
    cuttyhunk: 'https://www.whalingmuseum.org/old-dartmouth-historical-society-sketches/old-dartmouth-historical-sketch-no-4/',
    plymouth: 'https://www.fiskecenter.umb.edu/Pdfs/75a_PLYBH%202015%20public%20summary%20final.pdf',
    orange: 'https://nysm.nysed.gov/exhibitions/ongoing/fort-orange',
    manhattan: 'https://www.nps.gov/afbg/planyourvisit/african-american-freedom-trail.htm',
    wall: 'https://home.nps.gov/afbg/learn/historyculture/african-burial-ground-in-history.htm',
    common: 'https://content.boston.gov/departments/archaeology/boston-common-archaeology',
    dartmouth: 'https://dartmouthhas.org/wp-content/uploads/history-_dartmouth_ma_libraries.pdf',
    transfer: 'https://www.nysenate.gov/timeline',
    restoration: 'https://www.archontology.org/nations/us/new_york/01_polity_1673_74.php',
  };
  const city = [[246,6928],[247,6915],[260,6910],[271,6917],[259,6928],[250,6933]];
  const plymouth = [[6321,4353],[6327,4349],[6332,4350],[6331,4355],[6324,4357]];
  const beverwyck = [[998,2690],[1003,2681],[1011,2682],[1010,2693],[1009,2704],[1005,2705],[1000,2698]];
  const albany = 'https://www.thelakotagroup.com/wp-content/uploads/2019/05/September-2019-DRAFT_Albany-Historic-Preservation-Plan-Reduced-Size.pdf';
  const entries = [
    ['1614','1618','Dutch','Fort Nassau',[[994,2754],[998,2754],[998,2758],[994,2758]],'Stockaded trading house on Castle Island, abandoned in 1618. Both dates are known here to the year.','https://museum.dmna.ny.gov/forts/nassau'],
    ['1660','1664','Dutch','Beverwyck and Fort Orange',beverwyck,'The town and fort were enclosed in a wooden stockade by 1660. Schematic town core on the Hudson.',albany],
    ['1664','1673','English','Albany',beverwyck,'The English received the Dutch town and renamed it Albany. The transition is shown at year precision.',albany],
    ['1673','1674','Dutch','Willemstadt',beverwyck,'The former Beverwyck town core during the Dutch restoration. The change is shown at year precision.',sources.restoration],
    ['1674',null,'English','Albany',beverwyck,'The town core returned to English administration. The change is shown at year precision.',sources.restoration],
    ['1602-06-04','1602-06-28','English','Cuttyhunk trading post',[[5845,5610],[5848,5608],[5851,5611],[5848,5614]],'Temporary fortified post on the islet in Westend Pond, in Wampanoag country. The expedition abandoned it in June.',sources.cuttyhunk],
    ['1621-01-04','1622-03','English','Plymouth at Patuxet',[[6325,4352],[6328,4351],[6328,4354],[6325,4354]],'The first building site in the Wampanoag homeland of Patuxet.',sources.plymouth],
    ['1622-03',null,'English','Plymouth at Patuxet',plymouth,'Approximate enclosed settlement between Burial Hill and the harbor, north of Town Brook. The palisade was in place by March 1622. Its exact alignment is uncertain.',sources.plymouth],
    ['1624','1660','Dutch','Fort Orange',[[1005,2700],[1009,2700],[1009,2704],[1005,2704]],'West India Company trading fort on the upper Hudson. The enclosure represents the Dutch foothold in Mahican country.',sources.orange],
    ['1625','1653','Dutch','Fort Amsterdam',[[248,6927],[252,6926],[254,6929],[250,6931]],'Fort at the southern tip of Manhattan. This footprint represents the fortified settlement in Lenape country.',sources.manhattan],
    ['1634',null,'English','Boston Common at Shawmut',[[5616,3422],[5624,3418],[5628,3424],[5622,3430],[5615,3428]],'Common grazing land acquired by the town of Boston from William Blackstone in 1634. The polygon shows the vicinity of the Common.',sources.common],
    ['1653','1664-09-08','Dutch','New Amsterdam',city,'Fortified town south of the wall between the Hudson and East rivers. The wall gives a documented northern limit for the urban core.',sources.wall],
    ['1664-06-18',null,'English','Old Dartmouth',[[5420,4840],[5590,4846],[5940,4810],[6010,4860],[6070,5310],[5750,5490],[5420,5420],[5360,5170]],'Approximate municipal jurisdiction of Plymouth Colony on Buzzards Bay. The 1652 deed and the bounds recognized in 1664 describe the Acushnet, Sconticut, Ponagansett and Coaksett areas. Wampanoag people continued to live here.',sources.dartmouth],
    ['1664-09-08','1673-08-09','English','New York',city,'The English took possession of the former Dutch town. Shading follows its established urban footprint.',sources.transfer],
    ['1673-08-09','1674-11-10','Dutch','New Orange',city,'Dutch forces retook the city in August 1673.',sources.restoration],
    ['1674-11-10',null,'English','New York',city,'The Dutch administration returned the city to English control in November 1674.',sources.restoration],
  ];
  const group = L.layerGroup().addTo(territoriesOverlay);
  const patches = entries.map(([from, until, power, name, ring, detail, url]) => {
    const color = power === 'English' ? '#cb7772' : '#dfa056';
    const polygon = L.polygon(ring.map(p => map.unproject(p, 5)), {
      renderer: territoryRenderer, color, fillColor: color, weight: 1, fillOpacity: 1,
      smoothFactor: 0, className: 'colonial-territory',
    }).bindTooltip(power + ' · ' + name).bindPopup('<strong>' + name + '</strong><br>' +
      power + ' control · ' + from + (until ? ' to ' + until : ' onward') +
      '<p>' + detail + '</p>Reconstructed extent. <a href="' + url + '">Historical source</a>');
    return {from, until, polygon};
  });
  function refresh(date) {
    for (const {from, until, polygon} of patches) {
      if (date >= from && (!until || date < until)) {
        if (!group.hasLayer(polygon)) group.addLayer(polygon);
      } else if (group.hasLayer(polygon)) group.removeLayer(polygon);
    }
  }
  // Territory records load asynchronously and can be re-added with the layer control.
  function raiseColonialTerritories() {
    group.eachLayer(polygon => polygon.bringToFront());
  }
  territoryMarkersLayer.on('layeradd', raiseColonialTerritories);
  territoriesLayer.on('layeradd', raiseColonialTerritories);
  group.on('add', raiseColonialTerritories);
  document.addEventListener('mapdatechange', event => refresh(event.detail));
  refresh(document.getElementById('map-date').value);
}
