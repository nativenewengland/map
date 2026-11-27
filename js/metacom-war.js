{
  const chronology = 'https://www.colonialwarsct.org/1675.htm';
  const valley = 'https://montague-ma.gov/files/Timeline_of_Events.pdf';
  const annals = 'https://upload.wikimedia.org/wikipedia/commons/1/1f/The_American_date_book_%28IA_americandatebook00simo%29.pdf';
  const nipsachuck = 'https://upload.wikimedia.org/wikipedia/commons/8/82/Harris_papers_%28IA_harrispapers00rhod%29.pdf';
  const eastern = 'https://ellingtree.com/files/research/king-philips-war/Essex_and_the_East/';
  const chelmsford = 'https://chelmhist.org/media/HistoryofChelmsfordMassachusetts_RevWilsonWaters.pdf';
  // English Old Style dates (January-based years). Coordinates indicate the site or vicinity.
  const engagements = [
    ['1675-06-24',41.75,-71.21,'Attack on Swansea','Wampanoag fighters attacked the Plymouth Colony settlement.'],
    ['1675-06-26',41.84,-71.33,'Attack on Rehoboth','Wampanoag forces struck the early settlement during the June 26–29 attacks.'],
    ['1675-06-26',41.90,-71.09,'Attack on Taunton','Wampanoag forces also struck Taunton during June 26–29.'],
    ['1675-07-08',41.89,-70.91,'Attack on Middleborough','Wampanoag fighters attacked Middleborough during July 8–9.'],
    ['1675-07-08',41.60,-70.96,'Attack on Dartmouth','Fighting reached the dispersed Dartmouth settlement during July 8–9.'],
    ['1675-07-14',42.11,-71.55,'Attack on Mendon','Nipmuc fighters attacked the settlement.'],
    ['1675-07-19',41.64,-71.16,'Fighting at Pocasset','Colonial troops pursued Metacom into Pocasset country.'],
    ['1675-08-01',41.96,-71.58,'First battle of Nipsachuck','A pursuing force from Providence and Rehoboth engaged Metacom’s men.',nipsachuck],
    ['1675-08-02',42.35,-72.11,'Wheeler’s ambush','Nipmuc fighters ambushed the Massachusetts party near present-day New Braintree.'],
    ['1675-08-02',42.24,-72.15,'Siege of Brookfield','After the ambush, survivors took refuge in a fortified house. The siege lasted into August 4.',chronology,'battle','1675-08-04'],
    ['1675-08-22',42.46,-71.68,'First Lancaster raid','Seven colonists were killed. The chronology leaves the attackers’ identity open.'],
    ['1675-08-25',42.47,-72.60,'Fight at Hopewell Swamp','Norwottock and Pocumtuck fighters faced the companies of Lathrop and Beers near Sugarloaf.',valley],
    ['1675-09-01',42.55,-72.61,'First attack on Deerfield','Defenders held the settlement during the initial assault.'],
    ['1675-09-04',42.67,-72.44,'Beers ambush','A relief column approaching Squakheag was ambushed. Captain Richard Beers was killed.',valley],
    ['1675-09-12',42.55,-72.61,'Second attack on Deerfield','Pocumtuck fighters attacked again. The English subsequently abandoned the settlement.',valley],
    ['1675-09-18',42.48,-72.61,'Battle of Bloody Brook','A convoy carrying supplies from Deerfield was ambushed. English and Mohegan reinforcements counterattacked.',valley],
    ['1675-10-05',42.10,-72.59,'Burning of Springfield','Pocumtuck fighters attacked Springfield and much of the settlement burned.',chronology,'razed'],
    ['1675-10-19',42.37,-72.60,'First attack on Hatfield','Defenders repelled an attack on the river settlement.',valley],
    ['1675-10-20',42.32,-72.63,'October attack on Northampton','Attackers burned several buildings.',valley],
    ['1675-12-19',41.47,-71.60,'Great Swamp Massacre','A colonial army stormed and burned a fortified Narragansett settlement. Many families sheltering there were killed.','https://www.worldhistory.org/article/1712/timeline--battles-of-king-philips-war/','skull'],
    ['1676-01-27',41.76,-71.39,'Attack on Pawtuxet','Narragansett fighters attacked the settlement on the Pawtuxet River.'],
    ['1676-02-03',42.60,-71.35,'First attack on Chelmsford','Attackers burned several buildings.',chelmsford],
    ['1676-02-10',42.46,-71.68,'Lancaster raid','Attackers took captives, including Mary Rowlandson.'],
    ['1676-02-21',42.19,-71.31,'Burning of Medfield','Nipmuc fighters attacked the town. Many homes burned.',chronology,'razed'],
    ['1676-02-25',42.22,-70.94,'Attack on Weymouth','Fighting reached the Weymouth settlement.',annals],
    ['1676-03-03',42.61,-71.57,'First March attack on Groton','The first of several recorded March attacks.',annals],
    ['1676-03-09',42.61,-71.57,'Second March attack on Groton','Attackers returned to Groton.',annals],
    ['1676-03-13',42.61,-71.57,'Destruction of Groton','Nipmuc fighters attacked Groton. The English abandoned the settlement.',chronology,'razed'],
    ['1676-03-14',42.32,-72.63,'March battle at Northampton','Turner’s garrison repelled an attack.',valley],
    ['1676-03-20',42.60,-71.35,'Second attack on Chelmsford','Another raid struck Chelmsford.',chelmsford],
    ['1676-03-26',41.89,-71.39,'Pierce’s Fight','Captain Michael Pierce’s company was defeated along the Blackstone River near present-day Central Falls.',annals],
    ['1676-03-26',42.35,-71.55,'Burning of Marlborough','The English settlement was attacked and buildings burned.',annals,'razed'],
    ['1676-03-26',42.05,-72.58,'Attack on Longmeadow','A separate engagement took place south of Springfield.'],
    ['1676-03-26',41.88,-72.81,'Attack on Simsbury','Attackers struck the Connecticut settlement.'],
    ['1676-03-27',42.38,-71.48,'March fighting near Sudbury','Nipmuc fighters engaged English forces near Sudbury.'],
    ['1676-03-28',41.84,-71.33,'Burning of Rehoboth','Attackers burned the original Rehoboth settlement near present-day East Providence.',annals,'razed'],
    ['1676-03-29',41.83,-71.41,'Burning of Providence','Much of the English settlement at Providence burned.',chronology,'razed'],
    ['1676-04-21',42.37,-71.42,'Sudbury Fight','Wadsworth’s relief force was ambushed near Green Hill in present-day Sudbury.'],
    ['1676-05-08',42.02,-71.01,'Attack on Bridgewater','Attackers struck the original Bridgewater settlement.',annals],
    ['1676-05-11',41.96,-70.67,'May attack on Plymouth','Fighting reached the Plymouth settlement.',annals],
    ['1676-05-19',42.61,-72.55,'Massacre at Peskeompskut','Turner’s force surprised families camped at the falls during the spring fish runs.',valley,'skull'],
    ['1676-05-19',42.58,-72.59,'Counterattack after the Falls Fight','Native fighters pursued the retreating column. Turner was killed near the Green River crossing.',valley],
    ['1676-05-20',42.20,-70.77,'Attack on Scituate','Attackers struck the coastal settlement.',annals],
    ['1676-05-30',42.37,-72.60,'Second attack on Hatfield','Fighters from Peskeompskut attacked Hatfield.',valley],
    ['1676-06-12',42.34,-72.59,'Battle at Hadley','Connecticut soldiers helped repel the attack on Hadley.'],
    ['1676-06-28',42.60,-72.55,'Attack at Smead Island','A colonial party burned dwellings and damaged a fort near the falls.',valley,'razed'],
    ['1676-07-02',41.96,-71.58,'Second battle of Nipsachuck','Major John Talcott’s force attacked a Native encampment near the swamp.',nipsachuck],
    ['1676-08-11',43.66,-70.25,'Attack on Falmouth in Casco Bay','In the eastern war, attackers killed or captured residents of the settlement in present-day Portland.',eastern],
    ['1676-08-12',41.67,-71.24,'Fight at Mount Hope','Metacom was killed at Mount Hope by John Alderman, fighting with Benjamin Church’s company.',valley],
    ['1676-09-24',43.32,-70.58,'Attack at Wells','James Gooch was shot during fighting around Wells.',eastern],
    ['1677-06-29',43.55,-70.33,'Battle of Black Point','Native fighters defeated a colonial force that included Natick men near present-day Scarborough. June 29 is one reported date.',eastern],
    ['1677-09-19',42.37,-72.60,'Hatfield raid of 1677','Attackers killed residents and took captives during renewed fighting in the valley.','https://ellingtree.com/files/research/king-philips-war/Context_and_Native_Side/'],
    ['1675-07-08',41.56,-71.19,'Fight at Punkateest','Benjamin Church’s party fought in a field in southern Tiverton.','https://www.loc.gov/item/89710792/'],
    ['1675-09-02',42.69,-72.45,'Attack on Squakheag','An attack on the Northfield settlement preceded the ambush of its relief column.','https://www.usdeadlyevents.com/wp-content/uploads/2026/03/chronology-v-67_to.pdf'],
    ['1675-12-15',41.48,-71.51,'Attack on Jireh Bull’s garrison','Attackers burned the fortified house at Pettaquamscutt, where neighboring families had taken shelter.','https://digitalcommons.providence.edu/ri_history/11/','skull'],
    ['1676-02-01',42.29,-71.44,'Fight at Mount Wayte','Eleven Nipmuc men and members of the Eames household fought at the family’s farm.','https://exhibitions.framinghamhistory.org/home/watched-and-worried/'],
    ['1676-03-12',41.92,-70.60,'Attack at Eel River','Members of the Clark household and others sheltering there were killed near Plymouth.','https://www.usdeadlyevents.com/wp-content/uploads/2022/04/Chronology-v44_to.pdf','skull'],
  ];
  function gregorian(date) {
    return new Date(Date.parse(date) + 10 * 86400000).toISOString().slice(0, 10);
  }
  for (const [start, lat, lon, title, detail, source = chronology, icon = 'battle', end = start] of engagements) {
    const point = map.unproject(geographicArtworkPixel(lon, lat), 5);
    if (artworkBounds.contains(point)) {
      addWarEvent('King Philip’s War', gregorian(start), gregorian(end), point, title, detail, source, icon);
    }
  }
}

