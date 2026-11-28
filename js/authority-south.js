// Master-artwork pixels at zoom 5. Shoreline envelopes are clipped by the land mask.
{
  const ct = 'Connecticut and the Sound';
  const ri = 'Rhode Island and Narragansett Bay';
  const ply = 'Plymouth and Wampanoag country';
  const pequot = 'https://www.mptn-nsn.gov/history/';
  const war = 'https://pequotwar.org/about/';
  const hartford = 'https://pequotwar.org/wp-content/uploads/2014/11/Grade-8-Treaty-of-Hartford-Guiding-Questions-Avery.pdf';
  const mohegan = 'https://www.mohegan.nsn.us/about/our-tribal-history/historical-figures/sachem-uncas';
  const colony = 'https://www.cga.ct.gov/asp/content/constitutions/HistoricDates.htm';
  const towns = 'https://portal.ct.gov/SOTS/Register-Manual/Section-VII/Connecticut-Towns-in-the-Order-of-their-Establishment';
  const hope = 'https://nc-chap.org/resources/colonialFortifications_jacobs.pdf';
  const ctcourt = 'https://www.cga.ct.gov/hco/books/The_Judicial_and_Civil_History_of_CT.pdf';
  const quinnipiac = 'https://peabody.yale.edu/sites/default/files/documents/public-education/08%20indigenous%2003%20indigenous%20atlantic.pdf';
  const pahquioque = 'https://www.bia.gov/sites/default/files/dup/assets/as-ia/ofa/petition/079_schagh_CT/079_fd.pdf';
  const narragansett = 'https://narragansettindiannation.org/history/early/';
  const riSurvey = 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/survey_pdfs/narragansett.pdf';
  const charter = 'https://www.sos.ri.gov/divisions/civics-and-education/for-educators/themed-collections/rhode-island-charter';
  const riCourt = 'https://www.courts.ri.gov/Courts/SupremeCourt/Documents/AboutTheSupremeCourt.pdf';
  const kingPhilip = 'https://www.nps.gov/rowi/learn/historyculture/kingphilip.htm';
  const wampanoag = 'https://wampanoagtribe-nsn.gov/wampanoag-history';
  const localLeaders = 'https://plimoth.org/yath/unit-1/map-of-wampanoag-country-in-the-1600s';
  const plyArchaeology = 'https://plimoth.org/uploaded/uploads/history-in-a-new-light.pdf';
  const mashpee = 'https://mashpeewampanoagtribe-nsn.gov/timeline';
  const nantucket = 'https://nha.org/wp-content/uploads/PUB-Other-Islanders-1aWamp1o2.pdf';
  const islandCourt = 'https://mvmuseum.org/wp-content/uploads/2020/03/1991-C-Aug.pdf';
  const dartmouth = 'https://dartmouthhas.org/wp-content/uploads/history-_dartmouth_ma_libraries.pdf';
  const bristol = 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/national_pdfs/bristol/bris_metacom-avenue_mount-hope-farm_gov-bradford-house.pdf';
  const lowerCape = 'https://irma.nps.gov/DataStore/FileSource/Get/2245755?filename=Historic_Resource_Study-2.pdf';
  const sakonnet = 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/survey_pdfs/little_compton.pdf';
  const province = 'https://www.colonialsociety.org/node/350';
  const records = window.authorityRecords;
  function add(region, from, until, status, name, geometry, detail, url) {
    const record = {region, from, until, status, name, detail, url};
    if (geometry) record[Array.isArray(geometry[0]) ? 'ring' : 'point'] = geometry;
    records.push(record);
  }

  // Land common to both published descriptions. The Thames, Pawcatuck and Sound
  // are registered on the artwork. The northern reach between the rivers is schematic.
  const pequotCore = [[3863,5390],[3970,5280],[4090,5250],[4220,5350],
    [4254,5450],[4280,5560],[4281,5624],[4278,5700],[4296,5788],[4252,5834],
    [4140,5880],[3930,5900],[3846,5870],[3844,5800],[3830,5738],[3833,5660],
    [3836,5571],[3877,5500],[3865,5430]];
  const sowams = [[5097,4634],[5188,4609],[5279,4760],[5348,4865],[5325,5023],
    [5234,5070],[5120,5032],[5074,4920],[5097,4786]];
  const noepe = [[5990,5730],[6125,5698],[6250,5570],[6350,5450],[6460,5410],
    [6540,5435],[6800,5510],[6780,5810],[6220,5830],[6190,5890],[6010,5840]];
  const nantucketIsland = [[7100,5887],[7140,5830],[7400,5590],[7450,5600],
    [7500,5600],[7630,5810],[7650,6010],[7200,6020],[7090,5920]];
  const plymouthCore = [[6321,4353],[6327,4349],[6332,4350],[6331,4355],[6324,4357]];
  // The New Haven Museum's reconstruction identifies the half-mile town plot;
  // the artwork preserves the harbor but omits West Creek and the street grid.
  const nineSquares = [[2376,5848],[2392,5841],[2399,5857],[2383,5864]];
  // The early Providence lots extended east from Towne Street for 1,600–3,000 ft.
  // Fit the inhabited strip between the western river and the Seekonk tidal arm.
  const towneStreet = [[5034,4645],[5049,4644],[5057,4673],[5055,4680],
    [5046,4681],[5039,4669],[5036,4658]];
  const dartmouthBounds = [[5570,4900],[5680,4846],[5940,4810],[6010,4860],
    [6070,5310],[5750,5490],[5520,5420],[5510,5170]];

  add(ct,'1500','1600','unresolved','Sound and river communities before sustained written records',null,
    'Pequot tribal history places an ancestral homeland between the Niantic and Pawcatuck rivers. The evidence does not identify sixteenth-century divisions among villages or the political reach of any one sachem along the Sound or up the valleys.',pequot);
  add(ct,'1600',null,'unresolved','River-valley and Sound boundaries between documented places',null,
    'River villages, colonial town centers and later deeds identify particular local authorities. The Housatonic and Naugatuck transactions involve multiple signers. They leave much of the interior division between Potatuck, Paugussett and neighboring communities open.',pahquioque);
  add(ct,'1600','1636-09','indigenous','Pequot communities between the Thames and Pawcatuck',pequotCore,
    'Early seventeenth-century village country. The museum identifies the Thames, Pawcatuck and Sound as its core. Tribal history reaches west to the Niantic, and some accounts extend east to Weekapaug. The northern edge approximates the inland village zone. The wider tributary network had different limits.',war);
  add(ct,'1620','1636-09','indigenous','Pequot tributary relationships on the Sound',null,
    'Wampum and fur trade, marriage, negotiation and coercion linked otherwise distinct communities. The museum dates expansion to the 1620s and describes dozens of tributaries by 1635. Surviving accounts support no common perimeter for the network.',war);
  add(ct,'1636-09','1637-06-05','contested','Pequot village country during the Pequot War',pequotCore,
    'Colonial raids and the siege at Saybrook disrupted movement. Sassacus and other Pequot leaders still held fortified villages at Mistick and Weinshauks. The core follows the estuaries. Military access changed week by week.',war);
  add(ct,'1636','1683','indigenous','Mohegan sachem Uncas at Shantok',[3824,5483],
    'Mohegan tribal history locates the seat of Uncas at Shantok, on the west side of the Thames, and describes his break with Sassacus and alliance with the English. The point marks the river locality. The alliance carried obligations without conveying the Mohegan homeland.',mohegan);
  add(ct,'1683',null,'indigenous','Mohegan community at Shantok after Uncas',[3824,5483],
    'Uncas died in 1683. Mohegan successors continued to govern and defend land on the Thames. A succession date cannot supply the outer bounds of their land.', 'https://www.mohegan.nsn.us/docs/default-source/educators-project/up---down-the-river-film/up-and-down-the-river-historical-understanding.pdf');
  add(ct,'1637-06-05','1638-10-01','contested','Pequot survivors and allied military forces',null,
    'Mistick burned on May 26 Old Style. Surviving families fled toward other Pequot villages and west to Sasqua. Armed pursuit and displacement make the prewar village footprint untenable as a continuing area of control.',war);
  add(ct,'1638-10-01','1651','contested','Pequot survivors under the Hartford agreement',null,
    'The English, Mohegan and Narragansett signatories divided survivors, imposed tribute and tried to prevent their return. No Pequot leader signed. Its clauses describe coercive claims over people and residence. The signatories did not survey a territorial partition.',hartford);
  add(ct,'1651','1666','indigenous','Cassacinamon’s Pequot community at Noank',[4008,5810],
    'Connecticut recognized a settlement of 500 acres at Morgan’s Point. The tribal account identifies the site, acreage and sachem. A verified contemporary perimeter is missing.',pequot);
  add(ct,'1666',null,'indigenous','Mashantucket Pequot reservation',[3994,5542],
    'The community resettled at Mashantucket on approximately 2,500 acres. Cassacinamon led until 1692. The point marks the inland locality without importing the present-day reservation boundary.',pequot);
  add(ct,'1683',null,'indigenous','Eastern Pequot community at Lantern Hill',[4050,5527],
    'The Eastern Pequot Tribal Nation identifies the land beside Long Pond and Lantern Hill and the 1683 deed for the leader, followers and descendants. Descriptions vary from several hundred to over a thousand acres.', 'https://www.easternpequottribalnation.org/history');
  add(ct,'1633','1653-07-07','dutch','West India Company at the House of Hope',[2872,4677],
    'Fortified trading house at Dutch Point, on the west bank of the Connecticut near the Little River. The site coexisted with English Hartford. The small post and attached land were the Dutch foothold here.',hope);
  add(ct,'1633','1639-01-24','english','Plymouth trading post and Windsor plantation',[2914,4465],
    'The Plymouth traders built a post near the Farmington River mouth. Subsequent settlers established their own town. The location is approximate along the west bank of the Connecticut.',towns);
  add(ct,'1634','1639-01-24','english','Wethersfield plantation at Pyquag',[2845,4840],
    'English settlers occupied river meadows in 1634, in the homeland of the river communities. The settlement acquired the name Wethersfield in 1637.',towns);
  add(ct,'1635','1639-01-24','english','Newtown plantation at Suckiaug',[2867,4650],
    'English settlers established Newtown near Suckiaug before adopting the name Hartford in 1637. The Dutch fort remained nearby.',towns);
  for (const [name,point,until] of [['Hartford',[2867,4650],'1687'],['Windsor',[2914,4465],null],['Wethersfield',[2845,4840],null]]) {
    add(ct,'1639-01-24',until,'english',name + ', a Connecticut River town',point,
      'The residents of Hartford, Windsor and Wethersfield agreed to a common representative government in the Fundamental Orders of January 14, 1638/9 Old Style. Each town remained a local jurisdiction.', 'https://avalon.law.yale.edu/17th_century/order.asp');
  }
  add(ct,'1636','1637','indigenous','Sequassen at Suckiaug',[2902,4646],
    'Later accounts identify Sequassen as the local sachem who negotiated with settlers about Hartford land in 1636. This record identifies the documented transaction year. It leaves the extent of his authority over neighboring Tunxis lands unresolved.', 'https://portal.ct.gov/-/media/csc/3_petitions-medialibrary/petitions_medialibrary/mediapetitionnos1601-1700/pe1696/petitionerssubmissions/appendix-h---shpo-letter-and-phase-1a-report.pdf');
  add(ct,'1643',null,'indigenous','Wangunk land at Mattabesett',null,
    'Sowheage’s heirs and town proprietors later confirmed the earlier agreement at Mattabesett. Wangunk and English residents farmed nearby lands under different arrangements. The sources identify Wangunk retained land on both sides of the Connecticut River.', 'https://events.wesleyan.edu/live/files/9-timelines-for-wangunk-symposiumpdf');
  add(ct,'1665','1672','indigenous','Western Nehantic lands at the Saybrook–Lyme division',null,
    'The agreement dividing the English town acknowledged lands secured to the people at Nehanick under earlier covenants. This record preserves Indigenous tenure between the Connecticut and Niantic rivers. The covenants do not give a recoverable outline.', 'https://portal.ct.gov/lib/csc/pending_petitions/3_petition_1301through1400/pe1385/appendix_a_-_old_lyme_-_environmental_assessment.pdf');
  add(ct,'1672',null,'indigenous','Joshua and the Nehantic community',null,
    'The Connecticut legislature granted Joshua of Niantick and his people land north of Eightmile River. The acreage and bounds in the cited proceeding are unspecified. This grant and the accounts of a coastal reserve identify different tracts.', 'https://portal.ct.gov/lib/csc/pending_petitions/3_petition_1301through1400/pe1385/appendix_a_-_old_lyme_-_environmental_assessment.pdf');
  add(ct,'1653-07-07','1654-04','contested','House of Hope seized by John Underhill',[2872,4677],
    'Underhill posted his seizure on the house on June 27, 1653 Old Style. The claim to dispose of Dutch property remained disputed until the Connecticut court acted.',hope);
  add(ct,'1654-04','1655','english','Connecticut court sequestration at Dutch Point',[2872,4677],
    'The court sequestered the former Dutch holding in April 1654. This entry records the disposition of the property. A continuing fort administration is undocumented.',ctcourt);
  add(ct,'1635','1644-12','english','Saybrook patentees at the river mouth',[3374,5947],
    'English fort and settlement defended the Connecticut River entrance. Its reach was sharply limited during the 1636–37 siege.',war);
  add(ct,'1644-12',null,'english','Saybrook under Connecticut',[3374,5947],
    'The December 1644 agreement transferred Saybrook to Connecticut. The point represents the settlement on the west side of the river mouth. Specific inland claims require separate evidence.',ctcourt);
  add(ct,'1638-04','1641','english','New Haven plantation at Quinnipiac',[2390,5860],
    'The English plantation occupied the head of New Haven Harbor in April 1638. It subsequently governed a confederation of towns. Connecticut’s 1662 patent did not immediately replace its institutions.',towns);
  add(ct,'1641','1665-01-15','english','New Haven jurisdiction: the nine-square town plot',nineSquares,
    'The 1641 reconstruction locates named household lots around the marketplace. This half-mile core stood northwest of the harbor between what became York, Grove, State and George streets. The artwork lacks the filled-in creeks. Position is approximate. Connecticut’s 1662 patent preceded local submission.', 'https://www.newhavenmuseum.org/library/research-guides/brockett-map-of-1641/');
  add(ct,'1665-01-15',null,'english','New Haven town under Connecticut',nineSquares,
    'The New Haven committee submitted on January 5 Old Style (January 15 Gregorian). The union proceeded to a joint General Court in May. The nine-square core persisted under the new government. Quinnipiac reserved land and use rights had separate terms.', 'https://archontology.org/nations/us/new_haven/01_polity.php');
  add(ct,'1638-12-04',null,'indigenous','Quinnipiac retained land and use rights',[2437,5890],
    'Momauguin and his council negotiated with Eaton and Davenport on November 24 Old Style. They retained a planting place and conditional hunting and fishing rights. The point marks the east side of the harbor. The historical shoreline and reserved parcel are incompletely registered.',quinnipiac);
  for (const [name,from,point] of [['Milford at Wepawaug','1639',[2070,5925]],['Stratford at Cupheag','1639',[1943,5950]],['Fairfield near Unquowa','1639',[1673,5978]],['Branford at Totoket','1644',[2572,5876]],['Norwich in Mohegan country','1659',[3800,5283]]]) {
    add(ct,from,null,'english',name + ' town settlement',point,
      'The Connecticut town register records this English settlement. The map marks its locality. Town boundaries and Indigenous reserved land changed through separate local grants and agreements.',towns);
  }
  add(ct,'1646','1647','english','Massachusetts-backed settlement at Nameaug',[3829,5813],
    'John Winthrop Jr. founded the settlement on the west side of the Pequot (Thames) River under Massachusetts auspices. Connecticut obtained jurisdiction in 1647.', 'https://www.cga.ct.gov/hco/books/History_of_Middlesex_County.pdf');
  add(ct,'1647',null,'english','Nameaug / New London under Connecticut',[3829,5813],
    'Connecticut obtained the English plantation at Pequot Harbor. The emerging town was later named New London. The transfer concerned settlers’ government at the harbor.', 'https://www.cga.ct.gov/hco/books/History_of_Middlesex_County.pdf');
  add(ct,'1659',null,'indigenous','Paugussett / Pequanock at Golden Hill',[1778,5980],
    'A reservation recorded in 1659 lay in the Fairfield–Stratford area. The historical tract differed from later Paugussett parcels. The symbol gives the Golden Hill locality.', 'https://www.bia.gov/sites/default/files/dup/assets/as-ia/ofa/petition/081_gldhlp_CT/081_pf.pdf');
  add(ct,'1670',null,'contested','Potatuck and Paugussett at the Derby neck',[2073,5682],
    'The 1670 deed records multiple signers and a sachem’s consent to sell land between the Naugatuck and Housatonic. The surviving account suggests intersecting claims. The survey and riverbanks have not been reconciled for a parcel fill.',pahquioque);
  add(ct,'1687','1689','english','Dominion of New England administration at Hartford',[2867,4650],
    'Andros assumed government of Connecticut in 1687. The colony resumed charter government in 1689. The local town continued under the change of provincial administration.',colony);
  add(ct,'1689',null,'english','Restored Connecticut charter government at Hartford',[2867,4650],
    'Connecticut resumed its charter government after the Dominion collapsed. The point identifies the seat of government.',colony);

  add(ri,'1500','1635','unresolved','Narragansett and Niantic homeland before colonial documentation',null,
    'The Nation relates long occupation, seasonal movement and distinct local communities on the Bay and south coast. The evidence here does not date a specific precontact perimeter or assign each bay island to one sachem.',narragansett);
  add(ri,'1524-04','1524-05','unresolved','Local communities encountered near Aquidneck',null,
    'Verrazzano described inhabited and cultivated land in Narragansett Bay during an April visit. The state historical survey identifies the people he met as possibly Narragansett or Wampanoag. The observation supplies neither a village boundary nor a secure political identification.', 'https://planning.ri.gov/sites/g/files/xkgbur826/files/documents/guide_plan/shpp140.pdf');
  add(ri,'1635','1675','indigenous','Narragansett and Niantic sachems and tributaries',null,
    'Narragansett tribal history distinguishes local sachems and relations of tribute or protection, including with some Niantic, Manissean, Wampanoag and Nipmuc communities. A tribute relationship could overlap local government.',narragansett);
  add(ri,'1636','1638','english','Providence at the head of the Bay',[5037,4649],
    'Canonicus and Miantonomi granted Roger Williams use of land. Providence developed its own local arbitration and town government. The symbol marks the early Moshassuck settlement near the head of tide.',charter);
  add(ri,'1638','1676-04-08','english','Providence proprietors’ house lots on Towne Street',towneStreet,
    'From 1638 long house lots extended eastward from Towne Street to the ridge now followed by Hope Street. Houses stood along the river end of the lots. The narrow strip approximates this occupied nucleus and leaves outlying lands unresolved.', 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/national_pdfs/providence/prov_college-hill-hd-nhl.pdf');
  add(ri,'1676-04-08','1676-08-24','contested','Providence after the burning of the settlement',towneStreet,
    'The town burned on March 29 Old Style. The outline marks the destroyed English settlement. The attack disrupted residence and government. The sources document rebuilding and a subsequent local town meeting.',kingPhilip);
  add(ri,'1676-08-24',null,'english','Providence town government and rebuilding',towneStreet,
    'A town meeting on August 14 Old Style ordered the disposal of Indigenous captives, including enslavement. The town rebuilt on its former plan. The outline identifies the old core and does not date the repair of individual houses.', 'https://www.providenceri.gov/wp-content/uploads/2022/08/Apology_EO.pdf');
  add(ri,'1638',null,'english','Portsmouth on Aquidneck',[5337,5115],
    'The settlers formed a civil body at the north end of Aquidneck. The point identifies the settlement. Newport developed a separate government on the same island.',riCourt);
  add(ri,'1639',null,'english','Newport on Aquidneck',[5210,5410],
    'The English settlement at the southern harbor later joined the other Bay towns in a colonial legislature.',riCourt);
  add(ri,'1643','1647','contested','Shawomet purchase and rival claims',[4940,4921],
    'Miantonomi’s sale to Gorton and associates brought claims from settlers, local sachems and Massachusetts. The later survey occurred in 1692 and western lots remained undivided throughout this timeline.', 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/survey_pdfs/coventry.pdf');
  add(ri,'1647',null,'english','Warwick town at Shawomet',[4940,4921],
    'Warwick joined the Bay towns in common government in 1647. The point identifies the settlement. The jurisdiction over land in the much larger Shawomet purchase remained uneven.',riCourt);
  add(ri,'1647','1651','english','General Assembly of the four Bay towns',null,
    'Providence, Portsmouth, Newport and Warwick began operating a common system in 1647 under the earlier parliamentary patent. The participating towns remained separate municipalities.',riCourt);
  add(ri,'1651','1654-09-10','contested','Coddington’s separate island government',null,
    'Coddington’s commission created a separate administration for Aquidneck and Conanicut. It was proclaimed locally in August or September 1651 and challenged after revocation in England. The commission changed jurisdiction at the English island towns.', 'https://www.archontology.org/nations/us/rhode_island/00_1651_1654.php');
  add(ri,'1654-09-10','1663','english','Reunited government at the Aquidneck towns',null,
    'The separate island government ended at the general election of August 31 Old Style. The four towns resumed common government under the parliamentary patent.', 'https://www.archontology.org/nations/us/rhode_island/00_1651_1654.php');
  add(ri,'1663-07-18','1686','english','Rhode Island charter government at Newport',[5210,5410],
    'Charles II granted the Governor and Company of Rhode Island and Providence Plantations the mainland tract, Rhode Island and Block Island, and empowered a governor, assistants and assembly. The western limit followed the Pawcatuck and the eastern limit extended three miles beyond the bay. These bounds overlapped competing interests. The point marks one seat of government. Royal letters patent, witness clause, 8 July 1663 Old Style.', 'https://avalon.law.yale.edu/17th_century/ri04.asp');
  add(ri,'1686','1689','english','Dominion government in Rhode Island',null,
    'The Dominion replaced the colony’s separate charter government. Locally, East Greenwich was renamed Dedford. The original name was restored in 1689.', 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/survey_pdfs/east_greenwich.pdf');
  add(ri,'1689',null,'english','Restored Rhode Island charter government',null,
    'The fall of the Dominion restored the colonial assembly. The charter remained the basis of governance in the Bay towns.', 'https://www.nps.gov/rowi/learn/historyculture/rowi-timeline.htm');
  add(ri,'1635','1676','indigenous','Ninigret and the eastern Niantic sachemship',null,
    'Ninigret led Niantic and Narragansett people from the mid-1630s to the mid-1670s, exercising power through diplomacy and alliances. His stance during King Philip’s War differed from that of other Narragansett leaders. Years approximate his documented period of leadership.', 'https://www.jstor.org/stable/10.7591/j.ctt5hh17c');
  add(ri,'1658','1665-03-30','claim','Pettaquamscutt and Atherton purchases',null,
    'In 1658 three sachems conveyed land around Pettaquamscutt. In 1659 Kachanaqunt granted two tracts to the Atherton company. Neither company comprised a colonial government. These private claims helped produce competing jurisdictional demands.',riSurvey);
  add(ri,'1663-07-18','1665-03-30','claim','Competing Connecticut and Rhode Island charter claims',null,
    'Connecticut’s 1662 charter used Narragansett River. Rhode Island’s 1663 charter used the Pawcatuck as its western limit. Narragansett sachems, settlers and purchase companies exercised differing rights within the disputed country.',riSurvey);
  add(ri,'1665-03-30',null,'contested','King’s Province in Narragansett Country',null,
    'The royal commissioners authorized Rhode Island magistrates on March 20, 1664/5 Old Style. Their instructions assigned judicial power while rival claims continued. Neither a single surveyed line accepted by all parties nor uniform settler occupation follows.', 'https://upload.wikimedia.org/wikipedia/commons/1/16/Collections_of_the_Massachusetts_Historical_Society_%28IA_collectionsofmas00mass_8%29.pdf');
  add(ri,'1669',null,'english','Westerly in the disputed Narragansett Country',[4269,5843],
    'A private purchase at Misquamicut preceded Rhode Island’s incorporation of Westerly. The settlement held about thirty families. The extent of authority beyond the settled sites remained disputed.', 'https://preservation.ri.gov/sites/g/files/xkgbur406/files/pdfs_zips_downloads/survey_pdfs/charlestown.pdf');
  add(ri,'1675','1675-12-29','contested','Narragansett refuge and neutrality negotiations',null,
    'Narragansett people sheltered Wampanoag refugees. The Nation describes an alliance. The National Park Service records an October neutrality agreement followed by a demand to surrender refugees. The distinction matters for interpreting control before the attack.',kingPhilip);
  add(ri,'1675-12-29',null,'indigenous','Narragansett and Niantic communities after Great Swamp',null,
    'The attack on the winter settlement killed and dispersed families. The Narragansett Nation describes survivors retreating into southern forests and swamps. Neither the attack nor colonial purchases establish the limits of surviving communities.',narragansett);

  add(ply,'1500',null,'unresolved','Mainland Wampanoag, Cape and islands beyond documented places',null,
    'Wampanoag tribal history identifies numerous communities in southeastern Massachusetts and eastern Rhode Island. Local leaders exercised different powers. Neither the earliest divisions nor all inland and inter-island limits can be reconstructed for each generation.',wampanoag);
  add(ply,'1500','1642','indigenous','Wampanoag communities of Noepe',noepe,
    'The Aquinnah Tribe identifies sustained Wampanoag occupation of Noepe and thousands of island inhabitants in the 1500s. The shoreline encloses several communities. Divisions among island sachems are unresolved. A separate settlement point appears with the Mayhews.',wampanoag);
  add(ply,'1642',null,'indigenous','Aquinnah Wampanoag at the western end of Noepe',[6103,5784],
    'The Tribe identifies the Aquinnah cliffs and continuing tribal lands. Colonization and missionization changed landholding in different parts of Noepe. The evidence supports this community and offshore resource use without a surveyed seventeenth-century perimeter.',wampanoag);
  add(ply,'1643','1650','indigenous','Chappaquiddick sachem Pahkehpunnassoo',[6700,5680],
    'The tribal history names a Chappaquiddick sachem who challenged the influence of Hiacoome, a Wampanoag convert, in the early mission years. This evidence window identifies a local political authority. His full tenure is undated.', 'https://wampanoagtribe-nsn.gov/ancientways');
  add(ply,'1500','1659','indigenous','Wampanoag sachemships of Nantucket',nantucketIsland,
    'The island contained multiple Wampanoag communities under local sachems. The shoreline gives their shared island setting. The historical account identifies later leaders but supplies no internal sixteenth-century district lines.',nantucket);
  const forrett = 'https://www.seekingmyroots.com/members/files/H003424.pdf';
  const gayHead = 'https://www.bia.gov/sites/default/files/dup/assets/as-ia/ofa/petition/076_wmpghd_MA/076_pf.pdf';
  const aquinnah = [6103,5784];
  add(ply,'1662',null,'contested','Brenton claim at Aquinnah (Gay Head)',aquinnah,
    'William Brenton obtained a deed from Wamsutta, a mainland sachem. Local sachem Nohtoaksset resisted the claim. Brenton did not establish residence. The point marks the existing Aquinnah settlement. Bureau of Indian Affairs, Gay Head petition historical report, pp. 16–17.',gayHead);
  add(ply,'1675',null,'indigenous','Aquinnah • Ompohhannut’s quarter share',aquinnah,
    'A twelve-member jury called by Mittark, his council and people at Gay Head heard testimony and upheld Ompohhannut’s right to a quarter share. The decision was deposited in the Dukes County deed records. The undivided share has no registered parcel boundary. Gay Head petition historical report, p. 16.',gayHead);
  add(ply,'1684-10-30',null,'claim','Nashowaquidsae • Joseph Mittark deed',aquinnah,
    'Joseph Mittark conveyed the neck east of Gay Head to John Mayhew. The point marks nearby Aquinnah. The older settlement name and the deed locate the vicinity, but the neck boundary remains unresolved. Gay Head petition historical report, pp. 16–17, citing Massachusetts House report of 1856, pp. 6–7. Deed dated 20 October 1684 Old Style.',gayHead);
  add(ply,'1685-05-05','1685-05-22','claim','Manor of Martin’s Vineyard • Dongan patent',noepe,
    'New York governor Thomas Dongan patented Martha’s Vineyard, the Elizabeth Islands and Noman’s Land as a manor to Matthew Mayhew. The polygon represents the Vineyard component on the existing shore mask. This instrument overlapped earlier titles. New York Land Patents V, pp. 56–60 (English Manuscripts XXXII:60), 25 April 1685 Old Style.', 'https://www.newyorkfamilyhistory.org/knowledgebase/manors-new-york-part-one');
  add(ply,'1685-05-22',null,'claim','Vineyard manor reconveyance • retained holdings',aquinnah,
    'Matthew Mayhew conveyed the manor to Governor Dongan with exceptions for lands previously conveyed and interests retained by Mayhew. The point marks Gay Head, where Dongan asserted a proprietary interest. A full island polygon would include the excepted holdings. Banks, History of Martha’s Vineyard I, pp. 175–177, deed of 12 May 1685 Old Style.', 'https://www.newyorkfamilyhistory.org/knowledgebase/manors-new-york-part-one');
  add(ply,'1687-05-16',null,'contested','Aquinnah • contested Mittark–Mayhew conveyance',aquinnah,
    'Joseph Mittark conveyed an interest at Gay Head to Matthew Mayhew, Dongan’s agent, for £30. Residents protested that the transfer violated a 1681 covenant against alienation. A later inquiry disputed the covenant’s authenticity, and residents continued contesting the decision. The point locates Aquinnah. Gay Head petition historical report, p. 17, deed of 6 May 1687 Old Style.',gayHead);
  add(ply,'1641-10-23','1659','claim','Mayhew’s proprietary claim to Nantucket',nantucketIsland,
    'James Forrett, agent for the Earl of Stirling, granted Thomas Mayhew, his son Thomas and their associates settlement rights on Nantucket and two adjacent small islands. Annual acknowledgment was due to Stirling. The polygon uses the existing Nantucket shore envelope for the named island. The two small islands are unnamed in the text. Wampanoag sachems continued to negotiate individual land transactions. Indenture of 13 October 1641 Old Style, Wightman, The Mayhew Manor, pp. 7–8.',forrett);
  add(ply,'1641-11-02',null,'claim','Forrett enlargement • Martin’s Vineyard and Elizabeth Islands',noepe,
    'Forrett extended the Nantucket terms to Thomas Mayhew, his son and associates for planting on Martha’s Vineyard and the Elizabeth Islands. He recited that Nantucket had yet to be wholly surrendered. The polygon marks the Vineyard component only. Wampanoag communities continued on the islands. Edgartown Records I, p. 11, 23 October 1641 Old Style. Wightman, pp. 8–9.',forrett);
  add(ply,'1641-11-04',null,'claim','Capawok • competing Gorges grant of Martha’s Vineyard',noepe,
    'Richard Vines, acting for Ferdinando Gorges, granted Thomas Mayhew and associates rights to settle Capawok (Martha’s Vineyard, Noepe), subject to an annual acknowledgment. This claim overlapped the Stirling grant issued by Forrett. The polygon uses the existing shore envelope. The grant supplies no internal boundaries or acreage. Edgartown Records I, p. 9, 25 October 1641 Old Style. Wightman, pp. 9–10.',forrett);
  add(ply,'1659',null,'indigenous','Nantucket Wampanoag sachems and retained lands',null,
    'Sachems Wanackmamack and Nickanoose negotiated with the proprietors. Wampanoag-written legal instruments also document the authority of Askammapoo and her delegation to Daniel Spotso. Purchases accumulated in parcels and left Indigenous land elsewhere on the island.',nantucket);
  add(ply,'1659','1673','english','English proprietors at Capaum, Nantucket',[7310,5867],
    'The colonists acquired rights from Mayhew and negotiated separately with island sachems. The early settlement stood near Capaum. Its footprint and the succession of deed parcels are unresolved.',nantucket);
  add(ply,'1673','1692-05-26','english','Sherburne, Nantucket, under New York',[7395,5883],
    'Sherburne had local justices and paid taxes to New York. The point identifies the settlement near the harbor. Wampanoag residents also exercised authority through their own leaders and transactions.', 'https://nha.org/wp-content/uploads/PUB-Other-Islanders-1aWamp2o2.pdf');
  add(ply,'1642','1671','english','Mayhew settlement on eastern Noepe',[6614,5648],
    'The Mayhews established their settlement near the harbor opposite Chappaquiddick. The grant authorized settlement and purchases. The sachems retained substantial local powers.',islandCourt);
  add(ply,'1671','1692-05-26','english','Mayhew government on Martha’s Vineyard under New York',[6614,5648],
    'The New York appointment conferred new government powers. Thomas Mayhew asserted these powers to the sachems in 1671. The island’s Indigenous communities persisted.',islandCourt);
  add(ply,'1602-06-04','1602-06-28','english','Gosnold expedition at Cuttyhunk',[5851,5608],
    'Temporary fortified post in the vicinity of Westend Pond on Cuttyhunk. The artwork omits the tiny islet. The point marks the adjacent shore. Expedition member John Brereton dates departure to June 18 Old Style.', 'https://www.ancientlights.org/gosnold.html');
  add(ply,'1600','1616','indigenous','Patuxet community at Town Brook',[6331,4352],
    'Early accounts and archaeology place a Native village at the harbor and planting grounds inland. The bounds of its sachemship have not been surveyed.', 'https://npgallery.nps.gov/GetAsset/25464586-79c7-423d-8048-307ee7d26223/');
  add(ply,'1616','1621-01-04','unresolved','Patuxet during and after the epidemic',[6331,4352],
    'Between 1616 and 1619 epidemic disease devastated the coast. Samoset’s later account identifies Patuxet. It does not establish a transfer of jurisdiction to settlers.', 'https://plimoth.org/yath/unit-1/arrival-of-samoset-excerpt-from-mourts-relation');
  add(ply,'1621-01-04','1622-03','english','First Plymouth building site at Patuxet',[6326,4352],
    'First construction began on December 25, 1620 Old Style. The town site lay beside Town Brook in Patuxet country.',plyArchaeology);
  add(ply,'1622-03','1692-05-26','english','Plymouth town at Patuxet',plymouthCore,
    'The footprint represents the original occupied core between Burial Hill and the harbor. The palisade helps locate it early in the period. The town expanded beyond this core and the enclosure changed.',plyArchaeology);
  add(ply,'1621-04-01','1653','indigenous','Ousamequin and the Pokanoket–Plymouth alliance',sowams,
    'Ousamequin negotiated reciprocal obligations at Plymouth on March 22 Old Style. Sowams around the Warren and Bristol peninsulas was his political center. The inland margin is approximate. Other Wampanoag sachems negotiated for themselves.', 'https://plimoth.org/yath/unit-2/plymouth-pokanoket-alliance');
  add(ply,'1653','1661','indigenous','Ousamequin’s retained Mount Hope lands',[5296,4970],
    'The Sowams purchase excluded ancestral lands at Mount Hope. The earlier regional footprint is withdrawn because individual purchases and retained land had different limits.',bristol);
  add(ply,'1661','1662','indigenous','Wamsutta, sachem of Pokanoket',[5296,4970],
    'Wamsutta succeeded his father Ousamequin. The Mount Hope point marks the community’s seat. It does not imply political control of every Wampanoag town.',localLeaders);
  add(ply,'1662','1675-07-04','indigenous','Metacom, sachem of Pokanoket',[5296,4970],
    'Metacom succeeded his brother Wamsutta. His political seat was at Mount Hope. Local leadership also continued at Pocasset, Sakonnet and other Wampanoag communities.',localLeaders);
  add(ply,'1675-07-04','1676-08-22','contested','Pokanoket and Plymouth forces around Mount Hope',[5296,4970],
    'Fighting spread from Swansea and forced Metacom from his seat. The point marks the contested home country, not his whereabouts on each day. He died near Mount Hope on August 12 Old Style.',bristol);
  add(ply,'1676-08-22','1680','claim','Competing colonial claims to Mount Hope',[5296,4970],
    'After Metacom’s death, Massachusetts Bay, Plymouth, Rhode Island and Connecticut claimed Mount Hope. Plymouth later prevailed. The claims date from conquest and describe no agreed division among Wampanoag survivors.',bristol);
  const southeastSurvey = 'https://www.sec.state.ma.us/divisions/mhc/preservation/survey/regional-reports/archives/SoutheasternMA.pdf';
  const bridgewaterRecords = 'https://plymouthcolony.net/magenweb/plymouthcounty/cdates.html';
  add(ply,'1630-01-23','1691-10-17','claim','Plymouth Colony land and trading patent',null,
    'The Council for New England granted land and trading rights east of Narragansett Bay and south of a line from the Pawtucket River to the mouth of the Cohasset River. The patent records an English claim. Town governments and continuing Indigenous authority have their own records. January 13, 1629/30 Old Style corresponds to January 23, 1630 Gregorian.',
    'https://publications.newberry.org/ahcb/documents/RI_Consolidated_Chronology.htm');
  add(ply,'1636',null,'english','Scituate town on the North River',[6167,3821],
    'Settlement spread north from Plymouth Bay. The historical survey dates Scituate as a town to 1636. The point marks the town vicinity.',southeastSurvey);
  add(ply,'1637',null,'english','Duxbury town on Plymouth Bay',[6381,4219],
    'Plymouth families established farms around Duxbury Bay before Duxbury became a town in 1637.',southeastSurvey);
  add(ply,'1640',null,'english','Marshfield town at Green Harbor',[6258,4028],
    'Farms around Green Harbor formed part of the northern expansion from Plymouth. The regional survey dates the founding of Marshfield to 1640.',southeastSurvey);
  add(ply,'1649','1656','claim','Bridgewater purchase from Ousamequin',null,
    'Myles Standish, Samuel Nash and Constant Southworth purchased land from Ousamequin. The record describes a land transaction preceding the township.',bridgewaterRecords);
  add(ply,'1656','1662','english','Bridgewater township',[5766,4307],
    'Plymouth established a separate township from part of Duxbury. The point marks its vicinity.',bridgewaterRecords);
  add(ply,'1662',null,'english','Bridgewater township after additional grant',[5766,4307],
    'The colony granted additional lands to Bridgewater. The point identifies the township. The added tract boundaries are unresolved here.',bridgewaterRecords);
  add(ply,'1680',null,'english','Bristol settlement at Mount Hope',[5265,4990],
    'Plymouth sold the Mount Hope lands to four purchasers in 1680. The point marks the new Bristol settlement, distinct from the Wampanoag seat farther east.',bristol);
  add(ply,'1621-06','1622','indigenous','Aspinet, sachem of Nauset',[7548,4563],
    'Mourt’s Relation describes Plymouth’s delegation to Aspinet to recover John Billington. The episode documents Nauset’s own political authority near present Eastham. The record dates this encounter more closely than Aspinet’s tenure.', 'https://plimoth.org/yath/unit-2/excerpt-from-a-voyage-made-by-ten-of-our-men-to-the-kingdom-of-nauset');
  add(ply,'1605','1644-04','indigenous','Lower Cape villages and sachemships',null,
    'Champlain visited Nauset Harbor in 1605 and Stage Harbor in 1606. The early sources distinguish Nauset and Monomoy communities. Pamet, Meeshawn, Punonakanit and Potanumaquut were other village localities. The villages’ affiliations varied along the Cape.',lowerCape);
  add(ply,'1644-04','1646','english','Plymouth settlers at Nauset',[7555,4561],
    'Plymouth families began settlement at Nauset in April 1644 and cultivated separate house and field lots. Fort Hill was an early center. Nauset communities continued in the area.',lowerCape);
  add(ply,'1646','1651','english','Town of Nauset',[7555,4561],
    'The town heritage inventory dates incorporation as Nauset to 1646 and the name change to 1651.',
    'https://www.eastham-ma.gov/DocumentCenter/View/1055/Eastham-Heritage-Landscape-Inventory-Report-2010-PDF');
  add(ply,'1651',null,'english','Eastham town at Nauset',[7555,4561],
    'The existing town of Nauset took the name Eastham in 1651. The point marks the early agricultural town in the vicinity of Fort Hill. Its house lots, fields and commons occupied different parcels.',lowerCape);
  add(ply,'1644-04',null,'unresolved','Lower Cape sachemships and expanding English settlements',null,
    'English settlements spread among the Nauset, Pamet, Monomoy and other communities. Archaeological occupation and colonial place-names document coexistence. This inventory lacks a continuous series of dated village, mission and town bounds across the outer Cape.',lowerCape);
  add(ply,'1620','1665','indigenous','Wampanoag sachems on Nantucket Sound',[6667,5043],
    'Evidence summarized by the federal acknowledgement research identifies local hereditary sachems at one or more villages in a loose alliance. The point identifies the Mashpee locality on the south Cape.', 'https://mashpeewampanoagtribe-nsn.gov/s/IA11147-Mashpee-Wampanoag-Tribe-Land-into-Trust-Decision-FINAL-ASIA-122221.pdf');
  add(ply,'1665','1685','indigenous','Mashpee community on communally deeded land',[6667,5043],
    'Tribal leaders reserved about 25 square miles by deed. Mashpee maintained its own government within a praying town. The acreage and place are documented, but the deed lines are not registered on this artwork.',mashpee);
  add(ply,'1685',null,'indigenous','Mashpee lands confirmed by Plymouth court',[6667,5043],
    'Plymouth confirmed the earlier deed in 1685. The land remained in Wampanoag hands under local governance.',mashpee);
  add(ply,'1652','1664-06-18','claim','Dartmouth proprietors’ purchase',null,
    'Wampanoag leaders conveyed land at Buzzards Bay to Plymouth purchasers. The 1652 deed preceded the establishment of town government.',dartmouth);
  add(ply,'1664-06-18','1675-07','english','Old Dartmouth under Plymouth Colony',dartmouthBounds,
    'The Plymouth court recognized Dartmouth as a town on June 8 Old Style. The envelope covers the named Acushnet, Sconticut, Ponagansett and Coaksett areas. Its inland lines are schematic. Wampanoag people continued to live here.',dartmouth);
  add(ply,'1675-07','1678-06-30','contested','Dartmouth during war and rebuilding',dartmouthBounds,
    'Most houses were destroyed in 1675. Plymouth ordered residents to rebuild in compact villages that October. The old municipal outline shows where claims continued while occupation and defense contracted. The next surviving town meeting record is from June 1678.', 'https://firearmslaw.duke.edu/assets/1856%2C-ma%2C-records-of-the-colony-of-new-plymouth-in-new-england%2C-vol.-5-%281668-1678%29%2C-act-of-oct.-4%2C-1675%2C-mass.-gen.-laws.pdf');
  add(ply,'1678-06-30',null,'english','Old Dartmouth after wartime destruction',dartmouthBounds,
    'The first recorded post-attack town meeting, June 20 Old Style, elected tax raters. The municipal outline does not locate Wampanoag survivors’ parcels or imply resettlement of every destroyed farm.', 'https://www.whalingmuseum.org/old-dartmouth-historical-society-sketches/old-dartmouth-historical-sketch-no-30/');
  add(ply,'1675','1676-08','indigenous','Weetamoo and the Pocasset Wampanoag',[5500,5100],
    'Weetamoo exercised authority at Pocasset and joined the resistance during the war. Local allegiance differed across the Bay. The limits of the wartime seat are uncertain.',localLeaders);
  add(ply,'1675','1676-06','indigenous','Awashonks and the Sakonnet Wampanoag',[5455,5460],
    'Awashonks headed the Sakonnet community east of the Sakonnet River. Her decisions during the war were distinct from those of Weetamoo and Metacom.',localLeaders);
  add(ply,'1676-06','1677','indigenous','Sakonnet under Awashonks in alliance with the English',[5455,5460],
    'In June Awashonks made peace on terms that promised continued landholding. Sakonnet warriors joined the English. The evidence concerns an alliance and a promise about land.', 'https://www.nps.gov/parkhistory/online_books/acad/wabanaki_peoples_vol1.pdf');
  add(ply,'1677','1681-07-16','contested','Sakonnet common and Awashonks’s river parcel',null,
    'The town proprietors laid out a civic common and house lots in 1677. A separate parcel of roughly three quarters of a square mile beside the Sakonnet River had been allocated to Awashonks in 1675. Separate bounds for these places have not been registered.',sakonnet);
  add(ply,'1681-07-16',null,'claim','Proprietors’ divisions at Sakonnet',null,
    'The July 6 Old Style drawing included land previously given to Awashonks and land at Sakonnet Point. A further division occurred in 1694. These recorded property allocations do not establish when residents left each tract.',sakonnet);
  add(ply,'1692-05-26',null,'english','Plymouth town in the Province of Massachusetts Bay',plymouthCore,
    'The provincial government took effect in Boston in May 1692 under the 1691 charter. Plymouth’s municipal core remained occupied under the new government.',province);
  for (const [name,point] of [['Sherburne on Nantucket',[7395,5883]],['Edgartown on Noepe',[6614,5648]]]) {
    add(ply,'1692-05-26',null,'english',name + ' under Massachusetts Bay',point,
      'The new province incorporated the islands. This change of colonial administration concerned the local English town government. Wampanoag communities continued alongside it.', 'https://avalon.law.yale.edu/17th_century/mass07.asp');
  }
}
