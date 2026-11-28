// Lower Hudson and its western approaches. The main sheet locates the west
// bank of the harbor, but lacks parcel corners and most inland Jersey surveys.
{
  const region = 'Hudson Valley and Manhattan';
  const bergen = [341,7194];
  const records = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Calendar_of_records_in_the_office_of_the_secretary_of_state_%28IA_calendarofrecord02nels%29.pdf';
  const guide = 'https://www.nj.gov/state/archives/pdf/proprietors.pdf';
  function add(from, name, detail, url, point, until = null) {
    window.authorityRecords.push({region, from, until, name, status:'claim', detail: detail + (point ? ' The point marks the west bank of the harbor. Individual property lines are unresolved.' : ' The inland or intercolonial bounds cannot be registered on this sheet.'), url, point});
  }
  add('1664-07-04','New Jersey (Nova Caesarea) • Berkeley and Carteret release','James, Duke of York, released to John Berkeley and George Carteret the country between the Hudson and Delaware. The grant ran from Cape May to the Delaware at 41°40′ and across to the Hudson at 41°. No acreage is stated. Lease and release of 23–24 June 1664 Old Style.','https://avalon.law.yale.edu/17th_century/nj01.asp',null,'1676-07-11');
  add('1664-11-07','Achter Koll • Raritan to Newark Bay deed','Mattano, Manamowaone and Cowescomen conveyed land to John Bayly, Daniel Denton and Luke Watson. The calls run from the Raritan along the water separating Staten Island from the mainland to the first river running west from the bay. The 1665 wampum receipt and the later Nicolls patent are distinct. East Jersey Patents I, p. 1, 28 October 1664 Old Style.',records+'#page=21',null);
  add('1664-12-11','Elizabeth-Town (Arthur Cull, Emboyle) • Nicolls patent','Governor Richard Nicolls granted John Baker, John Ogden, John Bayly and Luke Watson a patent in the tract between the Raritan and Passaic. It followed the October deed. The State Archives estimates 500,000 acres for the tract. Klett, East and West Jersey Proprietors, Elizabeth-Town entry, 1 December 1664 Old Style.',guide,null);
  add('1665-04-18','Monmouth patent • Navesink, Middletown and Shrewsbury','Governor Nicolls granted twelve associates a tract from Sandy Hook to the Raritan, upstream and southwest toward Barnegat Bay. Individual settler allocations depended on family and servants. Klett, East and West Jersey Proprietors, Monmouth entry, 8 April 1665 Old Style.',guide,null);
  add('1666','Woodbridge • Elizabeth-Town subdivision','Philip Carteret, John Ogden and Luke Watson conveyed the southern part of their patent to Daniel Pierce, John Pike and Abraham Tappan of Newbury. The transfer lay between the Rahway and Raritan. The receiving towns were set aside on 21 May Old Style. Klett, Woodbridge entry.',guide,null);
  add('1666-12-28','Piscataway • Woodbridge subdivision','Daniel Pierce conveyed a third of his rights to the New Hampshire purchasers. A later partition agreement names John Martin, Hugh Donn, Charles Gilman, Hopewell Hull and Robert Dennis. A marginal protest by Woodbridge parties dates to 1669. East Jersey Patents I, p. 20, recital of purchase, 18 December 1666 Old Style.',records+'#page=24',null);
  add('1668-10-02','Bergen • Carteret township charter','Governor Philip Carteret chartered the town and freeholders of Bergen, incorporating earlier settlements and existing farms. The locality point marks the west side of New York Harbor. East Jersey Patents I, p. 37, 22 September 1668 Old Style.',records+'#page=27',bergen);
  add('1669-06-11','Woodbridge township • Carteret charter','Governor Carteret chartered the Woodbridge settlers. Each purchaser was entitled to 60 acres of upland and six of meadow. The proprietors reserved 1,000 acres at Ambo Point in place of their usual seventh. Klett, pp. 8–9, 1 June 1669 Old Style.',guide,null);
  add('1674-08-08','East Jersey • Carteret regrant','After the Dutch restoration, the Duke of York issued a new patent to George Carteret for the territory north of the line from Barnegat Bay to Pennsauken Creek on the Delaware. The later five-party deed established a different division. Klett, chronology, 28–29 July 1674 Old Style.',guide,null,'1676-07-11');
  add('1676-07-11','East and West Jersey • quintipartite division','George Carteret and the western proprietors William Penn, Gawen Lawrie and Nicholas Lucas, with Edward Byllynge, partitioned their interests. The projected boundary ran from Little Egg Harbor to the upper Delaware. Earlier undivided interests and trusts are recited in the deed. Quintipartite deed, 1 July 1676 Old Style.','https://avalon.law.yale.edu/17th_century/nj06.asp',null);
  add('1682-02-12','East Jersey • twelve proprietors’ purchase','The trustees of George Carteret’s estate sold East Jersey to twelve proprietors including William Penn. The purchasers subsequently shared their interests with twelve additional partners. Klett, East Jersey proprietary chronology, lease and release of 1–2 February 1681/82 Old Style.',guide,null);
  add('1683-03-24','East New Jersey • confirmation to the twenty-four proprietors','James, Duke of York, confirmed East Jersey to the Earl of Perth and the other proprietors. The coastal calls extend from Little Egg Harbor along the Hudson to 41° north. Earlier Carteret and partition instruments are recited in the royal account. Indenture of 14 March 1682/83 Old Style, recited in the Crown’s letter to the proprietors.','https://avalon.law.yale.edu/17th_century/nj11.asp',null);
  const confirmations = [
    [16,'Derrick Classen','Communipaw creeks','141 acres between Stratemaker’s Creek and Jan Eversen’s Creek.'],
    [16,'Derrick Classen','Minkacque tract','59 acres and four perches in Bergen jurisdiction.'],
    [17,'Fytie Hartmans','Pavonia holding','64½ acres adjoining the holding of her deceased husband Michiel Jansen and land of Nicolas Jansen Baker.'],
    [17,'Fytie Hartmans','Bout plantation','107 acres formerly sold by Jan Eversen Bout to Michiel Jansen.'],
    [17,'Nicolas Jansen Baker','Pavonia and Swan’s Point','40 morgen behind Claes Pietersen Cos and seven behind Swan’s Point.'],
    [18,'Nicolas Jansen Baker','Bout–Hartmans tract','Land beside Hendrick Jansen Spiers. Fytie Hartmans had conveyed this part of the former Bout holding to Baker in 1667.'],
    [22,'Casper Steynmitts','Andriessen holding','Land around Bergen formerly held by Lawrence Andriessen.'],
    [23,'Dirck Siecken','Pembrepock tracts','Two 25-morgen parcels on the Hudson, totaling 125 English acres. Earlier transfers through Claes Jansen are recited.'],
    [23,'Dirck Siecken','Minkackque tracts','125 acres adjoining Lawrence Andrissen, the Hudson and the creek beside Derrick Claessen.'],
    [24,'Severin Lawrence','Minkackque bay tract','Land west of the bay entering the Hudson.'],
    [24,'Pieter Jansen Slott','Pembrepook bay tract','25 morgen on the southwest shore of the bay.'],
    [25,'Hendrick Jansen Spiers','Bay shore tract','25 morgen west of the bay.'],
    [25,'Douwe Harmensen','Bergen holdings','Land behind Christian Pietersen, a second parcel, lot 15, a tenement and a garden.'],
    [26,'Adrian Post','Northwest gate holding','55 acres in lands adjoining Geurt Courten, a meadow, a gate-corner town lot and a garden.'],
    [26,'Hans Diederick','Kill van Koll holdings','44 acres in land extending toward the Kill, a second tract and a garden.'],
    [27,'Hendrick Teunissen','New Maisland holdings','48 acres including upland, meadow, a town lot and garden.'],
    [27,'Paulus Pietersen','Bergen common-field holdings','37 acres including woodland, meadow no. 4, two town lots and a garden.'],
    [28,'Jan Lubertsen','Schoolhouse and meadow lots','Lots 4 and 6, a woodlot, meadow lot 3, a town lot beside the schoolhouse and a garden.'],
    [28,'Harman Eduard','Old Maisland holdings','69 acres including lot 28, woodland, meadow, town lot and outgarden.'],
    [29,'Frederick Phillipsen','Maisland and Snake Hill holdings','Several arable, woodland and meadow parcels, housesites and gardens on both sides of the creek toward Snake Hill.'],
    [30,'Nicolas VerLett','Hoboocken tract','Upland and meadow between the Hudson, Harsimus creek, Weehawken creek, bay and highlands. The patent required free passage.'],
    [30,'Derrick Gerritsen','Old Maisland and town lot','A 22-acre holding, meadow behind VerLett’s woods and a town lot beside Paulus Pietersen.'],
    [31,'Gerret Garretsen','Bergen field and outgarden','Two field parcels, a town lot between Samuel Edsall and Adrian Post, and an outgarden.'],
    [31,'Geurt Coerten','Bergen town lot and outgarden','A field parcel, a town lot adjoining Pieter Rudolphus and an outgarden, totaling 22 acres.'],
    [32,'Geurt Coerten','Additional Maisland and woodland','Seven holdings including old Maisland, woodland, gardens and a town lot adjoining Douwe Harmensen and Steynmits.'],
    [32,'Casper Steynmits','New Maisland holding','100 acres in six holdings, including meadow lot 5, housesites and a garden.'],
    [36,'Abraham Isaacsen Planck','Paulus Hook (Aressechhonk)','The neck west of Ahasimus previously granted by Director Kieft.']
  ];
  for (const [folio, grantee, tract, bounds] of confirmations) {
    add('1668-05-22',tract + ' • ' + grantee, 'Governor Philip Carteret confirmed the holding of ' + grantee + '. ' + bounds + ' East Jersey Patents I, p. ' + folio + ', 12 May 1668 Old Style. Nelson, Calendar of Records, printed pp. 3–7.',records+'#page='+ (folio<19?23:folio<26?24:folio<30?25:folio<36?26:27),bergen);
  }
  const lowerHudson = [
    ['1650-08-05',6,'North River Bay • Remmatap conveyance','Govert Loockermans and skipper William Thomas recorded a purchase from Remmatap for Lubertus van Dincklagen. The deed names ten waters and lands on the south side of the bay, including Kaonmoes and Manoppek. Their individual positions remain uncertain.',null],
    ['1666-11-26',6,'Kehachkanick Wackonaheck • settlement permission','Governor Carteret permitted Augustine Herrman to settle and cultivate his holding south of the Raritan. The earlier Dutch-period deeds describe the land.',null],
    ['1669-06-22',48,'North River Bay • Loockermans and Thomas patent','Carteret granted Govert Loockermans and William Thomas the land referred to in the earlier Remmatap purchase. The register cross-reference leads to the translated deed at folio 6.',null],
    ['1651-03-28',7,'Raritan • southern shore deed','Mattano, Neckaoch and Encheim conveyed land to Augustine Herrman from Kehachkanick to the Raritan and west to Wakonabeck. The register preserves a translated Dutch deed.',null],
    ['1657-12-26',9,'Raritan • Great Marsh deed','Mattano and Appamankaogh conveyed Herrman the tract west of the river mouth to the creek by Mankachkewachky marsh. Interpreters are named in the Dutch deed.',null],
    ['1658-01-10',3,'Bergen • west Hudson shore deed','Therinques, Wappappen and six other named signatories conveyed a tract to the New Netherland director-general and council. The calls link the cliff above Weehawken, Sikakes, Kill van Kull and Constable’s Hook.',bergen],
    ['1665-09-18',2,'Arthur Cull • Baylis assignment','John Baylis transferred his interest to Philip Carteret under the 1664 deed and Nicolls confirmation.',null],
    ['1667-04-05',10,'Minkacque • Andriessen confirmation and enlargement','Berkeley and Carteret confirmed Lawrence Andriessen in the earlier 50-morgen holding and added 18 morgen adjoining. The tract lay between Gilbertsen and Straetmaker on the Hudson.',bergen],
    ['1667-11-09',11,'Sickakus • Verlett and Bayard confirmation','Governor Carteret confirmed Nicolas Verlett and Nicolas Bayard at Sickakus on the Kill van Kull. The entry recites a purchase of 30 January 1658.',bergen],
    ['1668-04-10',12,'Harsimus • Purmerent confirmation','Carteret confirmed Claes Jansen van Purmerent in upland beside the Hudson meadow, nine morgen toward Hoboken, and a house lot.',bergen],
    ['1668-04-10',13,'Harsimus • Van Vorst confirmation','Carteret confirmed 100 acres on the Hudson to Ide Cornelissen van Vorst, between Harsimus and Jan de Lacker’s Neck.',bergen],
    ['1668-04-10',14,'Communipaw • Katherin’s confirmation','Carteret confirmed Katherin, widow of Jacob Stoffelsen and formerly of Jacob Wallingen van Hoorn, in 25 morgen between Communipaw and Kill van Kull.',bergen],
    ['1668-04-10',15,'Hoboken Creek • Vingne confirmation','Carteret confirmed Jan Vingne in nine morgen of meadow west-southwest of the creek and north of Purmerent’s land.',bergen],
    ['1668-04-10',15,'Weehawken • two meadows confirmation','Carteret confirmed Cornelis van Ruyven, Paulus Leendertsen, Allard Anthony and Johannes van Brugge in Jacob Stangh’s meadow and Moortien Davidts Valley, north of Weehawken.',bergen],
    ['1668-07-14',33,'New Barbados • Sandford patent','Carteret patented 5,308 acres of upland and 10,000 acres of meadow between the Hackensack and Passaic to William Sandford.',null],
    ['1668-07-30',42,'Meghgectecock • Sandford deed','Hanyaham, Kenarenawack, Gosque, Anaren, Tamack and Tantaqua conveyed the tract between the Hackensack and Passaic to Sandford. The boundary ran about seven miles inland from the mouths to Sandford’s Spring.',null],
    ['1669-06-20',46,'Pesawack Neck • John Berry patent','Carteret granted Berry land between the two rivers, extending six miles inland from Sandford’s Spring.',null],
    ['1669-06-20',47,'Overpeck Creek • Berry patent','Carteret granted Berry a separate 1,500 acres between the Hudson and Overpeck, north of Verlett and Edsall.',null],
    ['1669-06-22',49,'Tapan • Carteret and associates’ void patent','Carteret, James Bollen, Robert Vauquellin and Claude Valot received the Tapan patent. A marginal note records assignments, and another marks the patent void. The cancellation date is uncertain.',null],
    ['1669-06-30',57,'Overpeck • Carteret’s void patent','Carteret patented 6,720 acres to himself between the Hudson and Overpeck, three miles north from Berry’s bounds. A marginal note voids the claim without giving its date.',null],
    ['1669-07-04',58,'Hackensack neck • Sarah Kierstede patent','Carteret granted Sarah Kierstede 2,260 acres between the Hackensack and Overpeck, reciting an earlier gift to her by Oratam, sachem of Hackensack.',null],
    ['1669-07-07',59,'Hudson–Overpeck • Isaac Bedloe patent','Carteret patented 2,120 acres between his own holding and Baltazar de Haert’s land to Isaac Bedloe.',null],
    ['1669-07-30',44,'Bergen • Noble and Moore confirmation','Carteret confirmed Mark Noble and Samuel Moore in a town lot, gardens, woodlots, meadows and two adjoining lots purchased from Edsall on 15 July Old Style.',bergen],
    ['1669-07-30',45,'Bergen • Berry confirmation','Carteret confirmed John Berry in holdings purchased from Edsall, including two plantations east of Bergen and six meadows reaching the Hackensack.',bergen],
    ['1669-08-09',60,'Hackensack–Overpeck • Vauquellin patent','Carteret granted Robert Vauquellin 2,000 acres between the river and creek with Bollen north and Kierstede south.',null],
    ['1669-08-09',61,'Hackensack–Overpeck • Bollen patent, later void','Carteret granted James Bollen 2,000 acres between Vauquellin and the woods or Nicolls’s land. The register marks it void without a cancellation date.',null],
    ['1669-08-09',62,'Hackensack–Overpeck • Nicolls patent, later void','Carteret granted Mathias Nicolls 2,000 acres between Bollen and Pardon. The marginal cancellation cites missing Indigenous purchase, settlement and rent.',null],
    ['1669-08-09',63,'Hackensack–Overpeck • Pardon patent, later void','Carteret granted William Pardon the land north of Nicolls. The register marks it void for failure to settle by the deadline.',null],
    ['1669-08-09',64,'Hackensack–Overpeck • Berry patent, later void','Carteret granted John Berry 2,000 acres north of Pardon’s holding. The register marks it void for failure to settle within the term.',null],
    ['1669-08-10',65,'Hudson–Overpeck • De Haert patent','Carteret granted Baltazar de Haert 2,120 acres between the Hudson and Overpeck, north of Isaac Bedloe.',null]
  ];
  for (const [from, folio, name, terms, point] of lowerHudson) {
    add(from,name,terms + ' East Jersey Patents I, p. ' + folio + ', calendared by Nelson.',records+'#page='+(folio<=3?21:folio<=12?22:folio<=15?23:folio===33?26:folio<=47?27:28),point);
  }
  add('1667-07-21','Newark • Hackensack deed','Wapamuck, Harish, Captamin, Sessom and fellow Hackensack signatories conveyed the Newark tract to the settlers represented by Obadiah Bruen, Michael Tompkins, Samuel Kitchel, John Brown and Robert Denison. Robert Treat and Samuel Edsall had negotiated earlier. The deed reached the foot of the mountain. Newark town deed of 11 July 1667 Old Style.','https://geography.rutgers.edu/images/NJ_Historical_Maps/ESSEX_COUNTY/NEWARK/NewarkMountainText.pdf',null);
  const laterPatents = [
    ['1670-04-28',93,'Weehawken • Maryn Adriaensen confirmation','50 morgen at Hoboken Creek granted to the elder Maryn Adriaensen in 1647.',bergen],
    ['1670-08-01',95,'Bergen • Geurt Gerritsen confirmation','100 acres including an Old Maisland field between Harman Edward and Thomas de Cuyper, woodland, meadow and a house lot.',bergen],
    ['1670-08-01',96,'Bergen • Engelbert Steenhuis confirmation','Several parcels in the New Maisland beside Phillipsen and Van Vleeck, including 21 acres of upland and a further tract southwest of Samuel Edsall.',bergen],
    ['1670-10-20',97,'Bergen • Arent Lawrensen confirmation','26 acres southwest of Geurt Gerritsen, 16 behind Geurt Coerten, several gardens and a house lot adjoining Adrian Post and Nicolas Verlett.',bergen],
    ['1671-01-09',112,'Bergen • Van Voorst confirmation','22 acres between Steenhuis, Jacob Lubek, the walking path and Van Voorst’s meadow, with nine more acres of adjacent meadow.',bergen],
    ['1671-04-05',130,'Passaic–Hackensack neck • Kingsland trust patent','William Sandford took the patent in trust for Nathaniel Kingsland. The neck extended from opposite Newark to the brook opposite Espartine.',null],
    ['1671-04-20',113,'Haverstraw • Baltazar de Harte patent','400 acres in separate Hudson shore parcels called Newa-Sink, Yandakah, Coquaney and Menisacongue.',null],
    ['1671-04-26',114,'Haverstraw • Du Puys and Van Bommel patent','Nicholas du Puys and Henrick van Bommel received 480 acres along Menisakoungue Creek and 210 acres at Ahiqueroney to the north.',null],
    ['1671-04-26',114,'Northern Tappan • Purmarent patent','240 acres at the northern end of Tappan granted to Claes Jansen van Purmarent.',null],
    ['1671-06-13',114,'Communipaw • Claes Comptah patent','182 acres to Claes Comptah (Claes Pietersen Cos), between the Bergen road, Nicolas Baker, the Harsimus creek and the Hudson.',bergen],
    ['1671-08-15',120,'Bergen • Peter Jacob housesites','Three house lots and gardens in the corporation, aggregating two acres.',bergen],
    ['1671-08-20',119,'Bergen • Varlett and Bayard holdings','Nicholas Varlett and Baltazar Bayard received 144 acres including woodland, a double house lot and two outgardens beside Steenhuisen and Van Vleeck.',bergen],
    ['1672-05-04',121,'Bergen • Tilleman van Vleeck patent','44 acres on the Hackensack between John Lubertsen and Frederick Philipps.',bergen],
    ['1673-05-31',133,'Kingsland neck • Berry confirmation','Deputy Governor John Berry confirmed Nathaniel Kingsland’s interest under the earlier trust patent. The register also records a separate 1671 Kingsland conveyance to Sandford.',null],
    ['1675-04-09',134,'Pembrepock • Hessel Wigersel patent','20 morgen between Cornelis Abramsen and Joas van der Lynden, to Hessel Wigersel (Vrygerse). Nelson’s note cites Winfield for 30 March 1675 Old Style.',bergen],
    ['1677-11-20',174,'Bergen • Hendrick van Ostrum patent','22 acres south of Purmerent and 15 acres of meadow along the creek that divided it from Harsimus.',bergen],
    ['1677-11-20',175,'Weehawken • John Luby patent','23 acres of the former Adriaensen holding, three along the Hudson, four between hills and sixteen in river meadow.',bergen],
    ['1677-11-20',175,'Bergen • Coerten meadow patent','40 acres of meadow beside Engelbert Steenhuis granted to Geurt Coerten.',bergen],
    ['1677-11-20',176,'Bergen • Thomas Fredrick patent','Separate holdings along the highway, Hackensack River and the creek below Snake Hill, with Paulus Pieters and Hendrick van Ostrum among the neighbors.',bergen]
  ];
  for (const [from, folio, name, bounds, point] of laterPatents) {
    add(from,name,'East Jersey proprietary government. ' + bounds + ' East Jersey Patents I, p. ' + folio + ', calendared by Nelson.',records,point);
  }
  add('1671-05-29','Tappan • Assowakon and associates’ deed','Assowakon, sachem of Tappan, Seweggkamin, Saghtew and other named signatories conveyed land to Baltazar de Harte and associates from Clawson’s holding to Tedious Hook, reaching inland to Metassin Creek and the Hackensack. East Jersey Patents I, p. 115, deed of 19 May 1671 Old Style.',records+'#page=37',null);
  add('1671-06-11','Kingsland neck • assignment to Sandford','Nathaniel and Mary Kingsland conveyed William Sandford the neck between the Passaic and Hackensack described in Sandford’s trust patent. East Jersey Patents I, p. 132, 1 June 1671 Old Style.',records+'#page=39',null);
}
