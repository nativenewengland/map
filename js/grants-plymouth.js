// Shurtleff, Plymouth Court Orders I. Dates are Gregorian.
{
  const region = 'Plymouth and Wampanoag country';
  const plymouth = [6326,4352], greenHarbor = [6258,4028];
  // Use the registered Kingston locality for the Jones River district.
  const jonesRiver = [6194,4282];
  const eelRiverPixel = geographicArtworkPixel(-70.60, 41.92);
  const eelRiver = [eelRiverPixel.x, eelRiverPixel.y];
  const url = 'https://archive.org/details/recordsofcolonyo0102newp';
  function order(from, until, name, detail, page, point) {
    window.authorityRecords.push({region, from, until, name, status:'claim', point, url,
      detail:'Plymouth court. ' + detail + (point ? ' The point locates the community. Individual parcel boundaries remain unregistered.' : ' The tract has no secure control point on the artwork.') + ' Court Orders I, p. ' + page + '.'});
  }
  order('1635-07-15',null,'North Hill • William Collier','The court granted Collier the wooded North Hill parcel with nearby tussock marsh.',35,null);
  order('1636-11-17',null,'George More • conditional adjoining acreage','Bradford was to inspect land adjoining Abraham Peirce. More was to receive five acres if Bradford found it suitable.',46,null);
  order('1636-11-17',null,'Tristram Clarke • former Coombe parcel','Eight acres lay between Phineas Pratt and widow Billington. A marginal note says the award was remitted because Clarke obtained land elsewhere. Its cancellation date is unknown.',46,plymouth);
  order('1636-11-17',null,'William Bradford • Tracy–Holmes interval','The court granted Bradford the intervening ground between Stephen Tracy’s and Lieutenant William Holmes’s lots.',46,null);
  for (const name of ['Thomas Pope','Richard Clough','Richard Wright']) {
    order('1636-11-17',null,'Fishing Point share • '+name,'The court divided the fishing point by Slowly Field equally among Pope, Clough and Wright after inspection found less than five acres apiece. Clough took the middle lot. A way remained beside Hopkins’s land.',46,plymouth);
  }
  for (const [name,acres] of [['John Dunham junior',6],['John Wood',6],['Richard Sparrow',6],['Samuel Eedy',3],['Web Addy',3],['Josiah Cooke',6],['Thomas Atkinson',6],['Josuah Pratt',6]]) {
    order('1636-11-17',null,'Dunham tract • '+name,acres+' acres next to John Dunham senior’s land were allotted to '+name+'. The allotment was attached to the recipient’s Plymouth dwelling and could not be sold separately.',46,plymouth);
  }
  order('1637-01-09',null,'Plain Dealing • Atwood purchase','John Atwood bought out his partner John Done’s interest in the dwelling, outbuildings, inclosures and land near Plain Dealing for £60.',47,plymouth);
  for (const name of ['Josias Winslow','Kenelm Winslow']) {
    order('1637-01-16',null,'Eel River • '+name,'The court granted '+name+' sixty acres south of the river above the great swamp. A marginal note voided this grant on receipt of land at Greens Harbor. The date of replacement is uncertain. The point marks the river vicinity.',47,eelRiver);
  }
  order('1637-01-16',null,'William Tubbs • nook beyond Mitchell','The court granted the point beyond Experience Mitchell’s land. Acreage was unspecified.',47,null);
  order('1637-01-24',null,'James Skiffe • service allotment','Ten acres beside Tristram Clarke between Pratt and widow Billington. Five were due for Skiffe’s service to Isaac Allerton and five under Peter Talbott’s service to Edward Doty.',47,plymouth);
  order('1637-01-24',null,'Black Brook • Shaw enlargement','John Shaw could enlarge the end of his existing Black Brook lot.',48,null);
  order('1637-01-24',null,'Willingsley • Jenkins enlargement','John Jenkins could extend his ground along the ends of Ralph Wallen’s lands.',48,null);
  const hay = [
    ['Reynor and Browne','the upper Jones River, formerly cut by the Winslows',jonesRiver],
    ['Atwood and Kenelm Winslow','the beach points opposite Great Wood Island',greenHarbor],
    ['John and Josias Winslow','Great Wood Island at Greens Harbor',greenHarbor],
    ['William Collier','his former ground and another nook near Bowman’s',null],
    ['Christopher Waddesworth','his previous ground and additional grass before his house',null],
    ['Standish and Washburn','their previous mowing ground',null],
    ['Francis Sprague and William Basset','their former ground, with the previously uncut grass reserved to Brewster',null],
    ['Thomas Cushman','marsh outside Fuller’s use and the wading place across Jones River',jonesRiver],
    ['Thomas Prence and Joseph Rogers','their former hay in proportion to their cattle, with extra supply for Prence at High Pines',null],
    ['John Done','High Pines',null], ['John Barnes and Edward Holman','Gurnet’s Nose',null],
    ['John Banges and Edward Dotey','Saggaquash',null],
    ['Stephen Tracy and Lieutenant Holmes','their previous ground, with a share for one cow for Joseph Biddle',null],
    ['John Dunham','his previous hay for the sheep and any spare grass at Goose Point',null],
    ['John Jenney','his old mowing ground and an extension toward the sedge, reserving hay for the town team',null],
    ['Widow Fuller','her former hay ground',null],['Howland','Island Creek Pond',null],
    ['Hicks, George Watson and Richard Higgins','their former one-cow mowing ground',null],
    ['William Paddy','the strip between the island and glade at Ponder Point',null],
    ['Alden','his previous hay ground',null],['Hurst','his previous hay ground',null],['Smyth','his previous hay ground',null],
    ['Holmes','his previous hay ground',null],['Phineas Pratt and Coomes','their previous hay ground',null],
    ['John Faunce','the place Bradford had mowed the previous year',null],
    ['Church, Bartlett and Little','their previous mowing, with unallocated ground available and a swamp at the head of Bradford’s land for Bartlett',null],
    ['Manasseth Kempton','part of the Jones River meadow used by Bradford and Constance Southerne',jonesRiver],
    ['George Soule','his former mowing ground',null],['Hopkins and Thomas Clark','their former mowing ground',null],
    ['Edward Winslow','his former mowing ground',null],['Nicholas Snow','his former ground at Wellingsley',null],
    ['Ralph Wallen','his former mowing ground',null],['John Cooke','ground about Mitchell’s and Henry Howland’s holdings',null],
    ['Richard Bourne','the place Reynor mowed the previous year',null],
    ['Vincent','between Moyses Symons’s field and Edmond Chandler’s newly granted lands',null],
    ['Josiah Cooke','grass beside Barnes’s creek, between the weir and mill, and at Fresh Lake',null]
  ];
  for (const [name, bounds, point] of hay) {
    order('1637-03-30','1638','Seasonal hay ground • '+name,'The court assigned '+bounds+' to '+name+' for the 1637 hay season. The year-end display cutoff reflects the one-season term. Acreage was unspecified.','55–57',point);
  }
  order('1637-04-13',null,'Bradford • Strawberry Hill acreage','The court authorized William Bradford to take up his acres at Strawberry Hill.',57,null);
  order('1637-04-13',null,'George Cleare • Wellingsley garden','The court granted a housesite beside George Watson’s and one or two acres near Hill’s lot at Wellingsley.',57,plymouth);
  order('1637-04-13',null,'Josias Winslow • swamp enlargement','Winslow could take about half an acre of swamp at the end of his new ground.',57,null);
  order('1637-04-13',null,'George Russell • Plymouth housesite','The court entered a house plot in Plymouth for Russell with further land to be laid out. The entry is struck through in the printed record. The date of withdrawal is uncertain.',57,plymouth);
}
