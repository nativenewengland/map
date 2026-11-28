// Southern grant instruments and allotments. Points are existing artwork localities.
{
  const ply = 'Plymouth and Wampanoag country';
  const bay = 'Massachusetts Bay and interior';
  const ct = 'Connecticut and the Sound';
  const ri = 'Rhode Island and Narragansett Bay';
  const plymouth = [6326,4352];
  const bridgewater = [5766,4307];
  const pcr = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Records_of_the_colony_of_New_Plymouth%2C_in_New_England_-_printed_by_order_of_the_legislature_of_the_Commonwealth_of_Massachusetts_%28IA_cu31924082451455%29.pdf';
  const mitchell = 'https://plymouthcolony.net/magenweb/plymouthcounty/bridgewater/mitchell/';
  const bayRecords = 'https://hamptonnh.gov/Archive/ViewFile/Item/702';
  function add(region, from, name, point, detail, url, until = null) {
    const record = { region, from, until, name, status: 'claim', detail, url };
    if (point) record.point = point;
    window.authorityRecords.push(record);
  }

  const rock = [4946,5528];
  const purchase = 'https://plymouthcolony.net/rigenweb/washingtoncounty/SK/kingstown4.html';
  add(ri,'1658-01-30','Pettaquamscutt Hill and Coojoot mineral rights',rock,'Quassuchquansh, Kachanaquant and Quequaquenuet are named as grantors to Samuel Wilbor, John Hull, John Porter, Samuel Wilson and Thomas Mumford. The two recorded versions differ in signatures. The hill tract extended two miles north of the rock between watercourses and adjoined Ninigret’s land. A separate clause covered graphite at Coojoot. The point identifies the rock. English civil date January 20, 1657/58. Ancient Land Evidences II:147, transcribed in Cole, pp. 484–485.',purchase);
  add(ri,'1660-07-04','Monassachuet enlargement of the Pettaquamscutt purchase',rock,'Kachanaquant confirmed the original deed to the Pettaquamscutt purchasers and granted a further tract past the head of the river toward Monassachuet. The account records ten-mile and twelve-mile dimensions and an allowance for deficiency. The point locates the named rock. English civil date June 24, 1660. Ancient Land Evidences II:147 ff., Cole pp. 484–485.',purchase);
  add(ri,'1658-03-30','Ninigret’s claimed coastal conveyance at Pettaquamscutt',rock,'The proprietors claimed seven miles square and lands from the rock to the sea under a March 20, 1657/58 English civil deed attributed to Ninigret. The September 1662 sachems’ protest explicitly denied a sale of Point Judith. The point marks the rock. Cole p. 485, Ancient Land Evidences II:150 and Hazard II:443.',purchase);
  add(ri,'1654-07-23','Potawomett (Potowomut) meadow purchase',[4956,5050],'Taccomanan conveyed meadow and mowable land to Randall Holden and Ezekiel Holliman for the Warwick inhabitants, retaining an annual payment of cloth. The instrument describes a four-mile shore reach between the Potowomut River and Cowesett Bay. It restricts future meadow conveyances to the purchasers. The point marks the Potowomut district. English civil date July 13, 1654. Fuller, History of Warwick, transcription headed Deed of Potowomut.','https://warwickhistory.com/pdfs/The_history_of_Warwick_Rhode_Island_from.pdf');
  add(ri,'1659-07-03','Warwick deed to Robert Weskot (Westcott)',[4940,4921],'The Rhode Island Historical Society catalogs an Indigenous deed of Warwick land to Robert Weskot dated June 23, 1659 Old Style. The catalog leaves the grantor and bounds unspecified. The point locates Warwick. Warwick Town Records, MSS 221, series 1, early records.','https://www.rihs.org/mssinv/Mss221.htm');
  const potter = 'https://tile.loc.gov/storage-services/public/gdcmassbookdig/earlyhistoryofna00pott/earlyhistoryofna00pott_bw.pdf';
  const smith = [4955,5252];
  const narragansett = [
    ['1659-06-06','Nannaguokset and Azoiquonset (Fox Island)',smith,'Cachauquant, also called Jassarono, gave Randal Holden and Samuel Gorton the neck by Wickford and the island opposite. Pessicus confirmed it. Cachauquant distinguished this gift from the adjoining Atherton purchases. The point marks nearby Cocumcosuck.','May 27, 1659','57–58, Land Evidence I:164–165'],
    ['1659-06-21','Aquitawoset (Quidnessett) northern purchase',smith,'Coquinaquand granted Humphrey Atherton and partners a tract between Mascacowage and Cocomcussuc brooks, the bay and a path. Earlier Smith land was excepted. Rhode Island disputed the purchase. The point marks Cocumcosuck at its southern end.','June 11, 1659','58'],
    ['1659-07-14','Namocock (Nancook or Boston Neck) southern purchase',smith,'Coquinaquand granted the Atherton partners Boston Neck. Its northern boundary passed Cocomcussut Brook and Annaquatucket to Pausacaco Pond. Smith and Holden interests were excepted. Rhode Island disputed the purchase. The point marks Cocumcosuck at the northern boundary.','July 4, 1659','58'],
    ['1660-06-24','Confirmation of Quidnessett and Boston Neck',smith,'Quissucquansh, Scultop and Queaquonnet confirmed both coastal claims to the Atherton proprietors. The point marks Cocumcosuck between the two tracts. Rhode Island challenged the company’s purchases.','June 14, 1660','58, Records of King’s Province'],
    ['1660-09-07','Coheassuck deed to Rhode Island',[4956,5050],'Tacommanan, Wasewkit and Namowish granted Rhode Island the tract from Potowomut River to Cocumsquisset or Stony Brook and east to the bay. The point marks the Potowomut vicinity.','August 28, 1660','60, Foster papers'],
    ['1660-10-09','Narragansett mortgage to the United Colonies',null,'Under military pressure Quisquous, Pesicus, Ninigret and Scuttup pledged Narragansett country to the Commissioners against their demand for wampum. The agreement set four months for payment. Its claimed scope lacks a recoverable perimeter.','September 29, 1660','60–61'],
    ['1660-11-09','Atherton mortgage of unsold Narragansett lands',null,'Quissquansh, Ninigret, Scuttup and Wequaquenut pledged unsold lands to the Atherton company in exchange for payment of the Commissioners’ fine. The company claimed a veto on further sales. Rhode Island rejected the mortgage. Prior conveyances make its area uncertain.','October 30, 1660','61, Land Evidence II:189–192'],
    ['1668-05-28','Cachauquant’s acknowledgment of the Holden and Gorton gift',smith,'Cachauquant confirmed before John Greene that Nannaguokset had been a gift, excluded it from the Atherton sale and limited the Smith lease to three years. The point marks nearby Cocumcosuck.','May 18, 1668','58, Land Evidence I:164–165'],
    ['1677-12-07','Gorton’s Nannaguokset share to his daughters',smith,'Samuel Gorton conveyed his share in the Holden and Gorton tract to his daughters on condition that they defend title against Smith. The point marks nearby Cocumcosuck.','November 27, 1677','58, Land Evidence I:190']
  ];
  for (const [date,name,point,detail,civil,page] of narragansett) {
    add(ri,date,name,point,detail+' English civil date '+civil+'. Potter, Early History of Narragansett, pp. '+page+'.',potter);
  }
  // Each row represents a distinct allotment in the published court record.
  // The original sketch and the later divisions have different dates and terms.
  const householders = ['Peter Brown','John Goodman','William Brewster','John Billington',
    'Isaac Allerton','Francis Cooke','Edward Winslow'];
  for (const person of householders) {
    add(ply,'1620',person + ' — Plymouth garden plot',plymouth,
      'Plymouth plantation house and garden allotment to ' + person + '. The surviving 1620 plan names this holding on the south side of the street. No acreage or scale survives in the diagram. The point marks the Plymouth settlement. Plymouth Colony Records XII, p. 3, manuscript p. 1.',pcr);
  }
  const divisions = [
    ['Mayflower',4,'South of the brook toward the bay',[
      ['Robert Cushman',1],['William Brewster',6],['William Bradford',3],['Richard Gardener',1],
      ['Francis Cooke',2],['George Soule',1],['Isaac Allerton',7],['John Billington',3],
      ['Peter Brown',1],['Samuel Fuller',2],['Joseph Rogers',2]]],
    ['Mayflower',4,'South of the brook toward the woods. The division excluded Hobomok’s ground between Howland and Hopkins',[
      ['John Howland',4],['Stephen Hopkins',6],['Edward (first damaged surname)',1],
      ['Edward (second damaged surname)',1],['Gilbert Winslow',1],['Samuel Fuller Jr.',3]]],
    ['Mayflower',4,'Behind the fort toward the little pond',[['William White',5]]],
    ['Mayflower',4,'North of town beside the Fortune gardens',[
      ['Edward Winslow',4],['Richard Warren','2 (editorial reading)'],['John Goodman',null],
      ['John Crackston',null],['John Alden',null],['Mary Chilton',null],['Myles Standish',2],
      ['Francis Eaton','uncertain (transcriptions differ)'],['Henry Sampson',1],['Humility Cooper',1]]],
    ['Fortune',5,'East toward the sea',[
      ['William Hilton',1],['John Winslow',1],['William Conner',1],['John Adams',1],['William Tench and John Cannon',2]]],
    ['Fortune',5,'Beyond the second brook',[
      ['Hugh Stacey',1],['William Beale and Thomas Cushman',2],['Austin Nicholas',1],['Widow Ford',4]]],
    ['Fortune',5,'West toward the woods beyond the first brook',[
      ['William Wright and William Pitt',2],['Robert Hicks',1],['Thomas Prence',1],['Stephen Deane',1],
      ['Moses Simonson and Philip Delano',2],['Edward Bumpass',1],['Clement Briggs',1],
      ['James Steward',1],['William Palmer',2],['Jonathan Brewster',1],['Bennett Morgan',1],
      ['Thomas Flavell and son',2],['Thomas Morton',1],['William Bassett',2]]],
    ['Anne',5,'East toward the sea',[['James Rande',1],['Francis Sprague',3]]],
    ['Anne',5,'Beyond the brook toward Strawberry Hill',[
      ['Edmond Flood',1],['Christopher Connant',1],['Francis Cooke',4],['Edward Burcher',2],
      ['John Jenney',5],['Goodwife Flavell',1],['Manasseh and John Faunce',2]]],
    ['Anne',6,'Adjoining the swamp and reed pond',[
      ['George Morton and Experience Mitchell',8],['Christian Penn',1],['Thomas Morton Jr.',1],['William Hilton’s wife and two children',3]]],
    ['Anne',6,'At the corner by the pond',[
      ['Alice Bradford',1],['Robert Hicks’s wife and children',4],['Bridget Fuller',1],['Ellen Newton',1],
      ['Patience and Fear Brewster with Robert Long',3],['William Heard',1],['Mrs. Standish',1]]],
    ['Anne',6,'On the side of town toward Eel River; Buckett adjoined Joseph Rogers',[
      ['Mary Buckett',1],['John Oldham and associates',10],['Godbert Godbertson',6],['Anthony Annable',4],
      ['Thomas Tilden',3],['Richard Warren',5],['Bangs',4]]],
    ['Anne',6,'Beyond the swamp and stony ground toward Eel River',[['Robert Ratcliffe','2 (editorial reading)']]],
    ['Anne',6,'Abutting Hobb’s Hole',[
      ['Nicholas Snow',null],['Anthony Dixe',null],['Mr. Peirce’s two servants',null],['Ralph Wallen',null]]],
    ['Anne',6,'South side in the concluding list',[['Stephen Tracy',3],['Thomas Clarke',1],['Robert Bartlett',1]]],
    ['Anne',6,'North side in the concluding list',[
      ['Edward Holman',1],['Frances Palmer',1],['Joshua Pratt and Phineas Pratt',2]]]
  ];
  for (const [ship,page,bounds,lots] of divisions) {
    for (const [person, acres] of lots) {
      const size = acres === null ? 'Acreage illegible.' : 'Acreage: ' + acres + '.';
      add(ply,'1623',person + ' — ' + ship + ' division',plymouth,
        'Plymouth plantation allotted this planting ground to ' + person + ' in the 1623 division. ' +
        bounds + '. ' + size + ' The shared point marks Plymouth. Individual sidelines are unlocated. Plymouth Colony Records XII, p. ' + page + '.',pcr);
    }
  }

  add(ct,'1632-03-29','Warwick conveyance (Old Patent of Connecticut)',[3374,5947],
    'Robert Rich, Earl of Warwick, purported to convey land to Lord Saye and Sele, Lord Brooke and their associates on March 19, 1631/32 Old Style. The copied deed projects a tract from the Narragansett River toward the Pacific. Warwick’s underlying title and execution are disputed. The point marks Saybrook, where the grantees exercised the claim in 1635. The 1662 charter supplied a separate title. Connecticut State Library, Winthrop copy, 1662.',
    'https://libguides.ctstatelibrary.org/hg/colonialresearch/warwickpatent');
  add(bay,'1635-09-12','Musketaquid plantation (Concord)',[5063,3166],
    'Massachusetts General Court granted Peter Bulkeley, Simon Willard and their fellow planters a tract six miles square on September 2 Old Style. Keyes records a distinct agreement with Squaw Sachem, Tahattawan and Nimrod. The point locates Concord. The corner stones have not been registered on this artwork. Keyes, History of Concord, section on settlement.',
    'https://concordlibrary.org/special-collections/keyess-concord-history');
  add(bay,'1636-03-13','Watertown inland bounds',[5325,3380],
    'Massachusetts General Court bounded Watertown eight miles inland from its meetinghouse along previously assigned lines on March 3, 1635/36 Old Style. No acreage appears. The point locates the town. The existing lines are needed to reconstruct its extent. Massachusetts Bay Records I, March 3 session, order preceding manuscript folio 170.',bayRecords);
  add(bay,'1636-03-13','Richard Saltonstall’s Watertown meadow',[5325,3380],
    'In the Watertown bounds order, Massachusetts General Court allotted Sir Richard Saltonstall 100 acres of meadow. John Pratt and William Rescue were to lay it out. The order gives no completed survey. The point marks the Watertown locality. Massachusetts Bay Records I, March 3, 1635/36 Old Style, Watertown order before manuscript folio 170.',bayRecords);
  add(bay,'1636-09','Dedham confirmation (Contentment petition)',[5348,3583],
    'Massachusetts General Court ratified the planters’ grant above the Charles falls. It included previously ungranted ground east and south of the river and five miles square across it. Previous grants to towns and individuals were excluded. The town copy dates the vote September 10 Old Style and the colonial court account dates the order September 8. Month precision preserves the discrepancy. The point locates Dedham. Dedham Town Records III, pp. 1–2.',
    'https://ldsgenealogy.com/MA/books/The-early-records-of-the-town-of-Dedham-Massachusetts-1636-1659-Volume-3-part-2.htm');
  add(bay,'1637-11-12','Watertown’s meadow at the new river plantation',null,
    'Massachusetts General Court conditionally granted Watertown 1,500 acres of meadow at the new plantation on the river serving Concord on November 2 Old Style. The order does not name the meadow or fix its position along the river. Massachusetts Bay Records I, p. 206.',bayRecords);
  add(ply,'1645','Duxbury’s Satucket grant (Old Four Mile Grant)',bridgewater,
    'New Plymouth General Court granted Duxbury inhabitants a plantation at Saughtuchquett, later Bridgewater. The grant extended four miles each way from a center yet to be chosen. It excluded Plymouth’s Winnetuxet lands. Six trustees were to divide it. Ousamequin’s subsequent deed is a separate record. The point locates the plantation. Mitchell, History of Bridgewater, p. 10.',mitchell+'010.html');
  add(ply,'1668','Bridgewater six-mile enlargement (Two Miles Additional Grant)',bridgewater,
    'New Plymouth General Court enlarged Bridgewater to six miles each way subject to the colony line, Taunton bounds, the Titicut River, earlier grants and protection of Indigenous residents. The town was to provide land for its minister. The 1685/86 confirmation recites 1668, despite the 1688 heading in Mitchell. The point locates Bridgewater. Mitchell, pp. 16–17, and Hinckley confirmation.',
    mitchell+'016.html');
  add(ply,'1672-11-30','Pomponoho’s Titicut deed to Bridgewater',bridgewater,
    'Pomponoho (Peter) conveyed his family interests north of the Titicut River to Nicholas Byram, Samuel Edson and William Brett for the Bridgewater purchasers, November 20 Old Style. He excepted 100 acres belonging to his brother-in-law Charles and up to ten acres by the weir and landing. The shared point marks Bridgewater, whose grant overlapped the Titicut settlement. Mitchell, pp. 18–19.',mitchell+'018.html');
  add(ply,'1686-03','Hinckley confirmation of Bridgewater lands',bridgewater,
    'Governor Thomas Hinckley and the Plymouth court confirmed the proprietors’ earlier grants after adjoining towns agreed on the bounds. The confirmation recites the four-mile Duxbury grant and subsequent six-mile enlargement. Heaps of stones, the colony line and Unketest Pond were among the bounds. The point locates the township. Mitchell, History of Bridgewater, pp. 19 ff., court of March 1685/86.',mitchell+'019.html');

  const lambert = 'https://www.cga.ct.gov/hco/books/History_of_the_Colony_of_New_Haven.pdf';
  const milford = [2070,5925];
  add(ct,'1685-06-04','Milford town confirmation patent',milford,'Connecticut confirmed Robert Treat, Richard Bryan, Samuel Eells, John Beard, George and Thomas Clark, Samuel Burwell and the rest of the Milford inhabitants in the township. Dated May 25 Old Style. Subsequent purchases prompted a replacement after 1700. The point locates Milford. Lambert, History of the Colony of New Haven, Milford chapter, town-patent passage.',lambert);
  add(ct,'1693','Milford enlargement north of Bladen’s Brook',milford,'Connecticut Governor and Company added land north of Bladen’s Brook to Milford in 1693. The later Milford patent recites this enlargement and describes a contested boundary with Derby. The point marks the parent town. Lambert, Milford chapter, text of the replacement patent.',lambert);
  add(ct,'1650-05','Alexander Bryan’s Milford warehouse ground',milford,'Milford granted Alexander Bryan a warehouse site at the west corner of Broad Street and Dock Lane, 60 feet by 20 feet. Only the month is recorded. The point locates the town. Lambert, History of the Colony of New Haven, p. 120.',lambert);
  add(ct,'1655-12-23','Richard Bryan’s Milford warehouse privilege',milford,'Milford licensed Richard Bryan to build across the highway from his father’s warehouse on a footprint 30 by 18 feet. December 13 Old Style. The point locates the town. Lambert p. 120, quoting the town vote.',lambert);
  add(ct,'1686-12-07','Nicholas Camp’s West End warehouse ground',milford,'Milford granted Nicholas Camp the ground under his warehouse at the West End after he acknowledged building without town permission. November 27 Old Style. The point locates Milford. Lambert p. 120, quoting the town vote.',lambert);
  add(ct,'1685-06-05','Fairfield town confirmation patent',[1673,5978],'Connecticut confirmed Fairfield’s proprietors, including Richard Hubbell, in a tract about five miles broad by twelve inland. Stratford and Norwalk bounded it. An additional strip toward the Saugatuck was subject to a two-mile limit. The point locates the town. Sealed May 26 Old Style. Fairfield Land Records, transcribed in Todd, General History of the Burr Family, Fairfield patent.','https://upload.wikimedia.org/wikipedia/commons/c/cd/A_general_history_of_the_Burr_family_%28IA_generalhistoryof00todd%29.pdf');
  add(ct,'1686-05-24','Stratford town confirmation patent',[1943,5950],'Connecticut Governor and Company confirmed William Curtiss, Joseph Hawley and ten other named proprietors with their fellow inhabitants. From the Sound the grant extended twelve miles inland, between Fairfield and the middle of Stratford River. A postscript names five islands. Sealed May 14 Old Style and registered May 19. The point locates Stratford. Colonial public records P:158–159, Stratford 2:489, Fairfield County Historical Society pp. 95–97.','https://ldsgenealogy.com/CT/books/Reports-and-papers-Fairfield-County-Historical-Society-Bridgeport-Conn-1882-1896-97-part-24.htm');
  add(ct,'1685-06-05','Stamford town confirmation patent',[1302,6418],'Connecticut Governor and Company confirmed John Bishop, Jonathan Law, Jonathan Selleck, Francis and Jonathan Bell, John Bates, Abraham Ambler, Peter Ferrys and Joshua Hoyte in the township. The tract ran twelve miles inland, between Tulomah Brook and Greenwich on the west and Norwalk on the east. The point locates Stamford. May 26 Old Style. Lambert p. 178.',lambert);
  add(ct,'1686-07-18','Norwalk town confirmation patent',[1535,6310],'Connecticut Governor and Company granted the proprietors, including Thomas Seamore, their agreed shares within the township. The tract extended twelve miles inland from the sea between Stamford and Fairfield and included adjoining islands. The point locates Norwalk. Sealed July 8 Old Style, after the May 1685 application. Hall, Ancient Historical Records of Norwalk, pp. 38–40, copy compared with original.','https://static1.squarespace.com/static/590be125ff7c502a07752a5b/t/5b80c9c0575d1f3286bee5f5/1535166924652/Hall%2C%2BSr.%2C%2BEdwin%2C%2BThe%2BAncient%2BHistorical%2BRecords%2Bof%2BNorwalk%2C%2BConnecticut.pdf');
  add(ct,'1686-02-26','Branford town confirmation patent',[2572,5876],'Governor Robert Treat confirmed William Roswell, Edward Barker, Thomas Harrison, William Maltby, William Hoadley, Elizur Stint, Samuel Pond, John Frizby and John Tayntor. The point locates Totoket or Branford. Lambert prints February 16, 1685 Old Style, after the 1685 authorization. Lambert p. 174.',lambert);
  add(ct,'1686-03-21','Middletown confirmation on both banks',[2914,5217],'Connecticut confirmed Giles Hamlin, Nathaniel White, Daniel Harris and fellow proprietors. The tract ran five miles on the west and six miles on the east side of the river, from Wethersfield toward Haddam. The point locates Middletown. March 11, 1685/86 Old Style. History of Middlesex County, transcription of the Middletown patent.','https://cga.ct.gov/hco/books/History_of_Middlesex_County.pdf');
  add(ct,'1640','Totoket conditional plantation grant',[2572,5876],'New Haven General Court granted Totoket to Samuel Eaton on condition that he bring settlers from England. The later Branford settlement and Connecticut confirmation are separate events. The point identifies the plantation site. Lambert p. 172.',lambert);
  add(ct,'1685-06-27','Scucurra tract to the Milford agents',milford,'Conquepotana and Ahuntaway conveyed a tract a mile and 120 rods wide to Robert Treat, Samuel Eells, Benjamin Fenn, Thomas Clark and Sylvanus Baldwin. It lay near the New Haven–Derby path and Bladen’s Brook. The grantors reserved hunting. The point locates the parent town. June 17 Old Style. Lambert pp. 87–88.',lambert);
  add(ct,'1700-03-11','Bladen’s Brook to Lebanon Brook (Two Bit Purchase)',milford,'Conquepotana, Ahantaway and seven fellow signers conveyed this strip north of Bladen’s Brook to Robert Treat and four Milford agents. Derby and New Haven bounded its sides. It measured a mile and 120 rods across. The colonial date February 29, 1700 identifies a Julian leap day. The point locates the parent town. Lambert p. 88.',lambert);
  add(ct,'1685-06-05','Hartford confirmation patent to the proprietors',[2867,4650],'Connecticut confirmed John Talcott, Samuel Wyllys, John Allyn, Richard Lord, John Haynes, Thomas Richards, Cyprian Nichols, Joseph Wadsworth, Nathaniel Stanley, Stephen Hosmer and fellow proprietors in the lands within Hartford bounds. May 26 Old Style. The point locates Hartford. Love, Colonial History of Hartford, Proprietors chapter, quoting the issued patent.','https://occgs.com/projects/rescue/compiled/Richard%20Porter%20Research/Connecticut_1.pdf');
  add(ct,'1687-02-18','Waterbury (Mattatuck) proprietors’ patent',[2279,5131],'Connecticut confirmed Thomas Judd, John Stanley, Robert Porter, Edmund Scott, Isaac Brunson, John Wilton and fellow proprietors in agreed shares of the township. The patent names Farmington and common lands as neighbors. It follows town naming in 1686. Feb. 8, 1686/87 Old Style. The point locates the town. Bronson, History of Waterbury, pp. 67–69, patent transcription.','https://webbgenealogy.com/wc_src/sm10/s10_148a.pdf');
  const wet = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Centennial_celebration_-_historical_address_by_Roger_Welles%2C_Esq._and_poem_by_Miss_Mary_K._Atwood%2C_delivered_in_the_Congregational_Church%2C_Newington%2C_Conn.%2C_July_4%2C_1876_%28IA_centennialcelebr00well%29.pdf';
  add(ct,'1672-10-25','Wethersfield five-mile eastern enlargement',[2845,4840],'Connecticut General Court extended the town’s east bounds by five miles, October 15 Old Style. The point locates the parent township. Welles, Newington Centennial, discussion of Wethersfield bounds.',wet);
  add(ct,'1673-10-20','Deed for Wethersfield’s five-mile enlargement',[2845,4840],'Turramuggas, Massecuppee, Wesumshye, One Peny, Nesaheeg, Seocket and Pewompskin deeded the five-mile addition to the town, October 10 Old Style, following the colonial grant. The point locates the parent township. Welles, Newington Centennial, discussion of Wethersfield bounds.',wet);
  add(ct,'1686-02-27','Wethersfield town confirmation patent',[2845,4840],'Connecticut Governor and Secretary confirmed Wethersfield’s proprietors in the enlarged township, including the five-mile addition east of the river. Welles prints the instrument date as February 17, 1685 Old Style. The point locates Wethersfield. Welles, Newington Centennial, discussion of township bounds.',wet);
  const courtOne = 'https://files.accessgenealogy.com/Massachusetts-Bay-volume-1.pdf';
  const bostonHarbor = [5640,3420];
  const earlyCourt = [
    ['1633-04-11','Noddle’s Island grant to Samuel Maverick',bostonHarbor,'The court granted Samuel Maverick and his heirs the island with an annual rent payable in livestock or money. The point identifies Boston Harbor.','April 1, 1633','104'],
    ['1634-09-13','Peddocks Island lease to Charlestown',bostonHarbor,'The Charlestown inhabitants received the island for twenty-one years. The lease could end earlier if the court settled a plantation at Nantasket. The court reduced the rent the next March and assigned the island conditionally to Nantasket in June 1641. The point identifies Boston Harbor.','September 3, 1634','126–127','1655-09-13'],
    ['1635-03-14','Deer, Hog, Long and Spectacle islands',bostonHarbor,'A single court order granted the four islands to Boston’s inhabitants and their successors for an annual rent of four shillings. The point identifies Boston Harbor.','March 4, 1634/35','139'],
    ['1635-03-14','Thompson’s Island grant to Dorchester',bostonHarbor,'The court granted the island to the present and future inhabitants of Dorchester for an annual rent of twelve pence. The point identifies Boston Harbor.','March 4, 1634/35','139'],
    ['1635-03-14','Matthew Cradock’s Mystic River upland and meadow',[5507,3272],'The court awarded Cradock the tract bounded by the Mystic River, rocks, Mystic bounds and lands of Nowell and Wilson. The point identifies the Medford district.','March 4, 1634/35','141'],
    ['1635-07-18','Taylor’s Island to William Hutchinson',null,'The court granted the island to Hutchinson and his heirs. The order supplies only its historical name and its position on the artwork remains unresolved.','July 8, 1635','149'],
    ['1636-11-06','Lovells Island fishing grant',bostonHarbor,'The court granted Lovells Island to Charlestown provided its townspeople used it for fishing or allowed others to fish. The point identifies Boston Harbor.','October 27, 1636','183'],
    ['1637-03-19','Round and Grape islands to Weymouth',[5842,3769],'A single court grant assigned the two islands to Weymouth. The point identifies the adjacent township.','March 9, 1636/37','191'],
    ['1638-05-12','William Spencer’s Alewife River tract',[5063,3166],'The court granted William Spencer three hundred acres along the Alewife River beyond Concord. The point locates Concord, the nearest district identified in the order.','May 2, 1638','228'],
    ['1639-06-16','John Wilson’s Pequot-country land claim',[3829,5813],'The Massachusetts court granted the Boston minister a thousand acres at Pequot, conditional on keeping it clear of any plantation. The point locates the harbor district. The order selects no individual parcel.','June 6, 1639','263'],
    ['1639-06-16','Edward Rawson’s conditional Pequot-country grant',[3829,5813],'The court granted Rawson five hundred acres at Pequot if he pursued the powder business upon obtaining saltpeter. The point locates the harbor district. The court selected no survey lines.','June 6, 1639','263'],
    ['1639-09-19','Four-mile village grant at the head of Lynn bounds',[5576,2977],'The court granted the Lynn petitioners a tract four miles square where available, conditional on substantial settlement within two years. The point identifies the inland Reading district.','September 9, 1639','272']
  ];
  for (const [date,name,point,terms,civil,page,until] of earlyCourt) {
    add(name.includes('Pequot-country') ? ct : bay,date,name,point,terms+' English civil date '+civil+'. Massachusetts Bay Records I, p. '+page+'.',courtOne,until);
  }
  const courtFarms = [
    ["1632", "Newtown neck at Graves’s residence", [5439,3406], "The court assigned the neck adjoining the settlement to Newtown, using the pale and marked tree to separate Charlestown.", "94"],
    ["1632", "Thomas Dudley’s west-bank Charles River grant", [5439,3406], "Thomas Dudley received two hundred acres across the Charles from Newtown.", "96"],
    ["1632-07-13", "Wahquainesehcok (Birchwood) neck", [5939,2979], "John Endecott received about 300 acres on the neck bounded by the Cow House, Duck and connecting rivers.", "97"],
    ["1632-07-13", "Wahquack neck to Samuel Skelton", [5939,2979], "Samuel Skelton received about 200 acres between Conamabsqnooncant and Pouomeneuhcant, about three miles from Salem.", "97"],
    ["1632-07-13", "Skelton’s Salem house and neck ground", [5939,2979], "A separate clause grants the acre under Skelton’s house and ten acres on a neck between the South and harbor rivers adjoining Allen and Higginson.", "97"],
    ["1632-07-13", "Skelton’s two-acre South River lot", [5939,2979], "Two further acres at Salem adjoined Captain Endecott and John Sweet, between South River and the mainland.", "97"],
    ["1634-04-11", "Long, Deer and Hog islands originally granted to Boston", [5640,3420], "The court granted the three islands to Boston for annual rent. A March 1634/35 instrument added Spectacle Island and changed the rent.", "115"],
    ["1634-10-05", "Muddy River lands assigned to Newtown", [5439,3406], "Boston retained the timber. If Hooker and his congregation removed from Newtown, the ground was to revert to Boston.", "129–130"],
    ["1635-03-14", "Bradstreet’s Charles River farm confirmed", [5325,3380], "The court confirmed Bradstreet’s five hundred acres northwest of John Haynes’s land following his conditional May 1634 award.", "140"],
    ["1635-07-18", "Dummer and Spencer mill and weir at Newbury", [6030,2397], "The court authorized Dummer and Spencer to build a mill and fish weir at the falls, with the ground and timber privileges in their agreement with the inhabitants.", "149"],
    ["1636", "Nixes Island grant to John Gallop", [5640,3420], "John Gallop received twelve acres on Nixes Island, limited to the actual island acreage.", "179"],
    ["1637-03-19", "Thacher Island at Cape Ann", [6303,2706], "Anthony Thacher received the small island off Cape Ann where he had survived a shipwreck.", "191"],
    ["1638-05-12", "James Pemberton’s Nantasket planting ground", [5866,3473], "Pemberton received ten acres incorporating his former planting ground and adjoining land.", "229"],
    ["1639-11-15", "Salem’s village by Ipswich River (Wenham)", [5985,2848], "Land by Salem bounds between the town and river was granted to the village. Prior town and private awards were excepted.", "279"],
    ["1640-05-23", "Sudbury one-mile enlargement", [4983,3300], "Sudbury received an additional mile along the southeast and southwest sides, subject to limits in the order.", "289"],
    ["1640-05-23", "Charlestown two-mile addition at the head line", [5575,3353], "Charlestown received two miles at its head line outside the Lynn village bounds, conditional on building within two years.", "290"],
    ["1640-05-23", "Noddle’s Island flats confirmed", [5640,3420], "The court adjudged the flats surrounding the island to belong to it. This concerns the tidal flats distinct from Maverick’s earlier island grant.", "291"],
    ["1640-05-23", "Conant’s Island or Governor’s Garden confirmation", [5640,3420], "John Winthrop and heirs received a confirmation in fee farm on payment of two bushels of apples yearly. This replaced the hogshead-of-wine rent.", "293"],
    ["1640-10-17", "Ipswich farm occupied by Whittingham", [6158,2666], "The court confirmed as far as its jurisdiction extended the Ipswich grant to Governor Thomas Dudley of the farm occupied by Whittingham. The point marks the vicinity of Ipswich.", "304"],
    ["1640-10-17", "Rowley land in exchange for Endecott’s farm", [6043,2451], "If the Ipswich River farm previously granted Endecott fell within Rowley, the court allowed him to keep it and promised equal replacement land near the end of Rowley bounds.", "305"],
    ["1640-10-17", "Charlestown village four-mile tract (Woburn)", [5575,3353], "The order allowed four miles square including Charlestown’s preceding grant for a village. The point marks the parent settlement.", "306"],
    ["1640-10-17", "Thomas Coytemore’s Charlestown village grant", [5575,3353], "Five hundred acres of the four-mile village tract were reserved for Coytemore, to be laid out with court involvement if required.", "306"],
    ["1640-10-17", "John Greenland’s Mystic-side lot", [5507,3272], "The court allowed Greenland to plant a five-acre lot on the Mystic side of Charlestown bounds.", "309"],
    ["1641-06-12", "Nantasket fishermen’s grants and island commons", [5866,3473], "The court allotted land on Nantasket Neck to settlers engaging in fishing and allowed other fishermen ground for stages and drying fish. Peddocks and otherwise ungranted islands were assigned for inhabitants and fishermen upon settlement.", "326–327"],
    ["1641", "Shawshin village grant to Cambridge", [5439,3406], "Cambridge received Shawshin on condition that ten families settle within three years, following the 1640 opportunity to consider the tract. The point locates the parent township.", "306, 330"],
    ["1641-12-20", "Margaret Winthrop’s Concord–Merrimack tract", [5138,2799], "The court assigned Margaret Winthrop’s previous grant of 3,000 acres to the lower Concord River near the Merrimack. Flint, Willard and a third surveyor were to lay it out.", "295, 346"],
    ["1633-03-16", "Ludlow’s Musquantum tract", [5575,3558], "Roger Ludlow received 100 acres between Musquantum Chapel and the mouth of the Neponset.", "102"],
    ["1633-03-16", "Winthrop meadow by Wanottymies River", [5640,3420], "John Winthrop received about 50 acres of meadow between Cobbett’s house and the river.", "102"],
    ["1633-03-16", "Phillips’s Charles River tract", [5325,3380], "Phillips received thirty acres on the south bank of the Charles, from the creek above the first pines toward the weir.", "102"],
    ["1633", "Blackstone’s Boston house tract", [5640,3420], "William Blackstone received fifty acres adjoining his house in Boston.", "104"],
    ["1634-04-11", "Haynes farm above Charles River falls", [5325,3380], "John Haynes received a thousand acres and a named pond in the grant covering four grantees east of the river above the falls.", "114"],
    ["1634-04-11", "Thomas Dudley’s Charles River grant", [5325,3380], "Thomas Dudley received five hundred acres east of the river above the falls.", "114"],
    ["1634-04-11", "Samuel Dudley’s Charles River grant", [5325,3380], "Samuel Dudley received land on the east side of the Charles above the falls. The acreage in the printed copy is uncertain.", "114"],
    ["1634-04-11", "Daniel Dennison’s Charles River grant", [5325,3380], "Daniel Dennison received two hundred acres east of the Charles above the falls.", "114"],
    ["1634-04-11", "Increase Nowell’s Three Mile Brook tract", [5507,3272], "Increase Nowell received two hundred acres west of the North River, also called Three Mile Brook.", "114"],
    ["1634-04-11", "John Oldham’s Mount Feake tract", [5325,3380], "John Oldham received five hundred acres northwest of the Charles near Mount Feake.", "114"],
    ["1634-04-11", "John Wilson’s tract by Medford", [5507,3272], "Boston minister John Wilson received two hundred acres between Increase Nowell and Medford.", "114"],
    ["1634-05-24", "Bradstreet grant above the Charles weir", [5325,3380], "Simon Bradstreet received five hundred acres northwest of John Haynes’s land, subject to objections.", "120"],
    ["1634-10-05", "Newtown meadow by Watertown weir", [5325,3380], "The court assigned about thirty acres used by Newtown to that community, with reversion to Watertown if Thomas Hooker and his congregation removed.", "129–130"],
    ["1634-10-05", "Stoughton’s Neponset River meadow", [5575,3558], "Israel Stoughton received 150 acres of meadow eight or nine miles up the river.", "130"],
    ["1635-03-14", "Thomas Newberry’s Neponset farm", [5575,3558], "Thomas Newberry received one hundred acres each of upland and meadow north of the river adjoining Israel Stoughton.", "141"],
    ["1635-05-16", "Humfrey’s pond and island above Saugus", [5848,3083], "John Humfrey received 500 acres with a freshwater pond and an island of about two acres north and west of Saugus. The grant required a five-mile clearance from existing towns.", "147"],
    ["1637-11-12", "Stoughton’s Neponset meadow on both banks", [5575,3558], "The court authorized Israel Stoughton to take his previously granted 150 acres on both banks of the Neponset.", "207"],
    ["1638-05-12", "Winthrop’s Two Brothers tract", [5063,3166], "The court set off 1,200 acres for John Winthrop, south of two rocks called the Two Brothers on the river about six miles north of Concord. One thousand acres came from an earlier grant.", "229"],
    ["1638-05-12", "Dudley’s Two Brothers tract", [5063,3166], "The court laid out Thomas Dudley’s earlier thousand-acre grant north of two rocks adjoining Winthrop’s tract, across the boundary running east from the river.", "229"],
    ["1639-11-15", "Endecott farm by Ipswich River", [6043,2451], "John Endecott received 550 acres on the Ipswich River north of Salem, subject to the bounds of Rowley and an alternate location.", "277, 305"],
    ["1639-11-15", "Richard Browne’s Watertown–Dedham farm", [5325,3380], "The court ordered layout of Browne’s earlier 200 acres near Dedham at the far end of Watertown.", "240, 278"],
    ["1639-11-15", "William Jennison’s Watertown–Dedham farm", [5325,3380], "The court ordered layout of Captain Jennison’s earlier grant of two hundred acres near Browne and Johnson.", "240, 278"],
    ["1639-11-15", "John Johnson’s Watertown–Dedham farm", [5325,3380], "The court ordered layout of Johnson’s 250 acres granted earlier near Browne and Jennison.", "240, 278"],
    ["1639-11-15", "Bulkeley’s farm toward Cambridge", [5063,3166], "Peter Bulkeley received his 300 acres at the eastern bounds of Concord toward Cambridge.", "278"],
    ["1639-11-15", "Nowell’s farm across from Winthrop", [5063,3166], "Increase Nowell received his 500 acres on the north side of Concord’s bounds across the river from Winthrop’s 1,200 acres.", "278"],
    ["1639-11-15", "Palgrave’s farm near the Watertown–Dedham bounds", [5325,3380], "The court placed Palgrave’s 200 acres with the allotments to Jennison, Browne and Johnson.", "273, 282"],
    ["1640-05-23", "William Paine’s Rowley bounds tract", [6043,2451], "The court authorized layout of 300 acres acquired from Captain Patrick beside Rowley without obstructing earlier grants or a plantation.", "289"],
    ["1640-10-17", "Thomas Welde’s tract beyond Concord River", [5063,3166], "Welde received 533 acres adjoining Thomas Allen, combining 200 acres from the colony and 333 from Roxbury’s grant.", "303"],
    ["1640-10-17", "Glover’s farm shifted across Sudbury River", [4983,3300], "The court moved the earlier 600-acre Glover tract from the west bank to the east bank of Sudbury River.", "305"],
    ["1641", "Mayhew’s land at the Watertown weir", [5325,3380], "Thomas Mayhew received 150 acres on the south side of the Charles by the weir.", "330"],
    ["1641", "Cradock layout near Mount Feake", [5325,3380], "The court ordered Thomas Mayhew and Joseph Cooke to lay out 500 acres of Oldham’s land for Matthew Cradock near Mount Feake.", "330"],
    ["1641", "Saltonstall’s conditional Springfield grant", [2963,3995], "Richard Saltonstall received 500 acres downriver of Springfield, subject to its falling within Massachusetts jurisdiction. Pynchon and Smith were to set it out.", "331"]
  ];
  for (const [date,name,point,terms,page] of courtFarms) {
    add(bay,date,name,point,terms+' The point identifies the surrounding district. Massachusetts Bay Records I, p. '+page+'.',courtOne);
  }

  const courtTwo = 'https://files.accessgenealogy.com/Massachusetts-Bay-volume-2.pdf';
  for (const name of ['Jeremiah Bellamy','John Collier','Nathaniel Baker','Edmond Bosworth','John Prince','Nathaniel Bosworth','Edward Bunn','Thomas Collier','Richard Stubbs','Thomas Chaffey','William Kerly','John Stodder']) {
    add(bay,'1642-04-19',name+' — Nantasket allotment',[5866,3473],'Nantasket commissioners allotted '+name+' a two-acre house lot between two hills and rights to four planting acres on Peddocks Island when divided. Existing improvements were compensable on redistribution. The point identifies the plantation. Commissioners signed April 9 Old Style. Massachusetts Bay Records II, pp. 5–6.',courtTwo);
  }
  const laterCourt = [
    ["1642-06-24", "Margaret Winthrop’s Merrimack meadow enlargement", [5138,2799], "After surveying the 3,000-acre grant between the Concord and Merrimack, commissioners reported several parcels occupied by Indigenous people. The court confirmed the layout and added about thirty acres of meadow west of the Concord.", "12"],
    ["1643-05-20", "Nathaniel Ward’s Pentucket farm", [5761,2296], "The court assigned Ward’s earlier 600-acre grant near Pentucket and appointed surveyors from Ipswich, Rowley and Salisbury.", "38"],
    ["1643", "Haverhill meadow west of the settlement", [5761,2296], "Haverhill received about 120 acres of meadow six miles west of the settlement.", "47"],
    ["1643", "Bradstreet’s Ipswich River relocation", [5985,2848], "The prior location of Simon Bradstreet’s five hundred acres adjoining Endecott threatened the Salem village grant. The court allowed him to take it elsewhere outside existing grants. The point identifies the abandoned location.", "48"],
    ["1644-06-08", "Mayhew’s tract near Nashaway and Sudbury", [4983,3300], "Following certifications from Nashaway and Sudbury the court allowed Mayhew’s request for 300 acres and appointed Peter Noyes and Edmond Goodenow to lay them out.", "76"],
    ["1645", "Glover farm survey by Sudbury line", [4983,3300], "Peter Noyes and fellow surveyors returned the layout under the earlier Glover grant. The lines followed the Sudbury bounds and creek opposite the ford at the great pond. The return included up to 56 acres of meadow.", "114"],
    ["1646-06-01", "Cutshamache’s Cochichawick deed acknowledgment", [5534,2670], "Cutshamache acknowledged selling his rights to John Woodbridge for the Andover inhabitants, extending to Rowley and Merrimack. Roger retained four planted acres and his people retained a conditional alewife fishery.", "159–160"],
    ["1646-06-01", "Andover colonial confirmation and reserved southern bounds", [5534,2670], "The General Court approved the Cochichawick purchase and confirmed it to the plantation but reserved authority to give two miles square in its southern limits to a future settlement.", "159–160"],
    ["1647", "Cochituate thousand-acre neck to Adam and Dean Winthrop", [4983,3300], "The court identified the thousand acres they bought from Robert Saltonstall as the neck between pond, brook and the Dunster farm. Dean Winthrop could claim a limited surplus only under stated conditions.", "189"],
    ["1647", "Weymouth swamp subdivision authorization", [5842,3769], "The court authorized Weymouth to divide a swamp estimated at over one hundred acres among its inhabitants. The point identifies the township.", "195"],
    ["1648-05-20", "John Winthrop Jr.’s Pawcatuck saltworks grant", [4269,5843], "Massachusetts awarded 3,000 acres conditional upon its share of Pequot country and production of 100 tons of salt a year between the Massachusetts capes within three years. The court repealed a previous arrangement.", "241–242"],
    ["1648-05-20", "Wilson and Rawson’s Pawcatuck location order", [4269,5843], "Massachusetts assigned the 1,500 acres previously granted to John Wilson and Edward Rawson alongside Winthrop’s conditional 3,000 acres. If he failed the saltworks condition their acreage could come from his tract.", "241–242"],
    ["1648-05-20", "Samuel Symonds’s Pawcatuck tract", [4269,5843], "The court granted 500 acres adjoining Wilson and Rawson, conditional on the land falling to Massachusetts in the claimed Pequot lands.", "242"],
    ["1649", "Ann Harvye investment tract beyond Sudbury", [4983,3300], "The court allowed William Browne 200 acres outside the west line of Sudbury for a joint-stock investment by his aunt Ann Harvye, conditional on proof of his authorization to act for her.", "266"],
    ["1649", "Sudbury western two-mile enlargement", [4983,3300], "The town received two miles westward adjoining its lands. William Browne’s two hundred acre grant was explicitly protected.", "273"],
    ["1649", "Robert Keayne farm near Dedham village", [5348,3583], "The court granted Captain Keayne 1,074 acres to be laid out near the village granted to Dedham.", "283"],
    ["1649", "Richard Browne farm near Dedham village", [5348,3583], "The court placed Browne’s 200 acres next to the village granted to Dedham. The earlier order assigned him lands at the Watertown–Dedham bounds. Their eventual surveys require comparison.", "283"],
    ["1649", "Richard Parker farm near Dedham village", [5348,3583], "The court granted Richard Parker 436 acres next to the village granted to Dedham, in the same vote as the Keayne and Browne farms.", "283"]
  ];
  for (const [date,name,point,terms,page] of laterCourt) {
    add(name.includes('Pawcatuck') ? ri : bay,date,name,point,terms+' The point identifies the locality. Massachusetts Bay Records II, pp. '+page+'.',courtTwo);
  }

  const courtThree = 'https://files.accessgenealogy.com/Massachusetts-Bay-volume-3.pdf';
  const deputies = [
    ["1646", "Robert Saltonstall’s Connecticut Falls allocation", null, "The court allowed 2,120 acres about Connecticut Falls against the investment entitlement of Richard Saltonstall. The precise falls intended are unresolved.", "66"],
    ["1648", "John Thompson’s confirmation of Thompson Island", [5640,3420], "After a claim based on his father’s rights during his minority, the court awarded the island to John Thompson and heirs. This followed the earlier grant to Dorchester.", "129–130"],
    ["1649", "Rawson’s surrender of the Pequot grant", [3829,5813], "Edward Rawson surrendered his 500-acre award for losses on saltpeter and accepted monetary satisfaction. The point identifies the earlier Pequot harbor claim.", "178"],
    ["1650-06-02", "John Wilson’s Dedham-area alternative to Pequot grant", [5348,3583], "The court allowed Wilson to take his previous thousand acres next to Bradstreet’s 800 near the Dedham village farms, or elsewhere if unobtainable. Wilson described the Pequot award as of little benefit.", "193–194"],
    ["1650-06-29", "Samuel Haugh’s grant northwest of Concord", [5063,3166], "The court confirmed Atherton Haugh’s earlier 400 acres to his son Samuel and sent Willard and Blood to lay it out northwest of Concord.", "200"],
    ["1650-10-26", "Slatt (Slate) Island to William Torrey", [5640,3420], "The court granted the island in the bay to Torrey for entering missing court orders, subject to an earlier grant if one existed.", "218"],
    ["1651", "Watertown’s Assabet River grant", [4983,3300], "Watertown received 2,000 acres near the Assabet adjoining Sudbury to make good a deficiency in its township grant. Willard and Goodenow were to lay it out.", "235"],
    ["1651", "Emanuel Downing’s Hampton–Piscataqua farm", null, "The court located Downing’s 600 acres between Hampton and the mouth of Piscataqua. The coastal district extends beyond the illustrated sheet.", "230–231"],
    ["1651", "Wiggin and Bradstreet’s Newichawannock sawmill tract", null, "Thomas Wiggin and Simon Bradstreet received 1,000 acres across the river near Dover, with permission to use timber on common land for their sawmill. The district extends beyond the sheet.", "247"],
    ["1651", "Blind Hole copperworks woodland", [5939,2979], "John Endecott received 300 acres of woodland near his farm at Blind Hole for his proposed copper works, subject to prior grants.", "256"],
    ["1653", "Rowley grant at Andover bounds", [5534,2670], "The court appointed Hewlett and Gage to lay out the 500 acres previously granted Rowley near Andover.", "307"],
    ["1655", "Shawshin river grant and naming of Billerica", [5138,2799], "The court granted the Shawshin inhabitants the strip on Concord River to the Indigenous plantation at Pawtucket subject to prior grants, naming the place Billerica.", "387"],
    ["1656", "Sudbury proprietors’ six-mile plantation grant", [4983,3300], "A group from Sudbury received six miles square or its equivalent, conditional on twenty households settling in three years and respecting earlier grants. The point marks the parent town.", "403"],
    ["1656", "John Stone’s Sudbury purchase and fifty-acre addition", [4983,3300], "The court confirmed Stone’s purchase of eleven acres from Indigenous holders and granted fifty adjoining acres subject to prior rights, with Noyes and Rice to lay them out.", "404"],
    ["1656", "Billerica eight-thousand-acre grant", null, "The court granted Billerica 8,000 acres to be taken together where the lands were free and unsuitable for a town. The order identifies the grantee and amount but leaves the tract for subsequent location.", "405"],
    ["1656", "Simon Bradstreet’s Dedham-area layout", [5348,3583], "The court authorized Jackson, Danforth and Fisher to lay out Bradstreet’s 800 acres beyond Dedham near Keayne’s farm, in up to three parcels corresponding to the distinct debts.", "413"],
    ["1657-05-16", "Denison’s North Wootuck enlargement", [2870,3338], "The court added 300 acres to Daniel Denison’s earlier 200-acre grant for eastern service and authorized location at North Wootuck or another ungranted place.", "430"],
    ["1657-05-16", "Edward Rawson’s Dover river survey", null, "The court confirmed the return of 200 acres near a trail three miles above Peter Coffin’s house. Marked trees defined opposite banks, with southern bounds awaiting Dover’s survey. The return dates May 4 Old Style.", "434"],
    ["1657-05-16", "Parnell Nowell’s Cochecho River layout", null, "Commissioners returned 1,000 acres on both banks northwest of Dover near Shohomogomocke Hill, where they recorded earlier Indigenous planting. The underlying grant dates October 14, 1656 Old Style.", "434–435"]
  ];
  for (const [date,name,point,terms,page] of deputies) {
    const northern = /Hampton–Piscataqua|Newichawannock|Dover river|Cochecho River/.test(name);
    const district = northern ? 'New Hampshire' : name.includes('surrender of the Pequot') ? ct : bay;
    add(district,date,name,point,terms+(point ? ' The point identifies the district.' : '')+' Massachusetts Bay Records III, pp. '+page+'.',courtThree);
  }

  const laterMassachusetts = [
    ["1659", "Hathorne and associates’ western plantation claim", null, "The court allowed William Hathorne, Thomas Savage, John Pynchon and fellow petitioners ten miles square forty to fifty miles west of Springfield on the road toward Fort Orange. No definite surveyed site is identified.", "IV part 1, p. 373", "cu31924091024590"],
    ["1659-11-22", "Natick survey accepted with Dedham exceptions", [5064,3698], "The court accepted the Indigenous plantation survey with the stated exclusion of prior awards and Dedham lands. The point locates the wider upper Charles district.", "IV part 1, pp. 409–410", "cu31924091024590"],
    ["1660", "Misery islands and Bakers Island grant to Salem", [5939,2979], "The court assigned the islands at the harbor entrance to Salem. Fishermen retained seasonal use for curing, stages, buildings, fuel and flakes. The point marks Salem Harbor.", "IV part 1, 1660 Salem islands order", "cu31924091024590"],
    ["1660", "Denison farm above Old William’s planting ground", [5761,2296], "Daniel Denison received six hundred acres beyond the Merrimack in exchange for his earlier Rowley-area grant. The tract had to be at least seven miles from the Haverhill meetinghouse. The point identifies Haverhill.", "IV part 1, order following the Salem islands grant", "cu31924091024590"],
    ["1662", "Rawson farm between Natick and Winthrop’s farm", [5180,3811], "The court recorded Rawson’s survey of 250 acres four or five miles beyond Medfield at the west end of Lynd’s farm. The point marks Medfield.", "IV part 2, survey after the Milton naming order", "recordsofgoverno42mass"],
    ["1685-06-14", "Millers River mineral tract", [2982,2986], "John Pynchon, William Avery and Hezekiah Usher received a thousand acres within two miles of the mineral hill, east of the Connecticut and above Deerfield, subject to settlement in twelve years. The point identifies the Deerfield district.", "V, pp. 481–482", "recordsofgoverno05mass"],
    ["1685", "Joshua Scottow’s Maine grant confirmed", null, "The court confirmed an unrecorded 1684 grant of five hundred acres to Scottow for wartime expenses. Edward Tyng and Dominicus Jordan were to lay it out on free land in Maine.", "V, pp. 489–490", "recordsofgoverno05mass"]
  ];
  for (const [date,name,point,terms,reference,id] of laterMassachusetts) {
    add(name.includes('Maine') ? 'Maine' : bay,date,name,point,terms+' Massachusetts Bay Records '+reference+'.','https://archive.org/details/'+id);
  }

  const townDeeds = 'https://www.ctgenweb.org/county/conewlondon/deeds/NorwichRecords.html';
  const caulkins = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/History_of_Norwich%2C_Connecticut%3B_from_its_possession_by_the_Indians%2C_to_the_year_1866._An_appendix_containing_notes_and_sketches%2C_continuing_the_history_to_the_close_of_the_year_1873_%28IA_cu31924028843055%29.pdf';
  add(ct,'1663','Major Mason’s Pomakuck grant (Pomacook)',[3575,5056],
    'Connecticut General Court granted John Mason 500 acres. The 1665 New London County Court survey placed his upland and meadow by Deep River Brook near Lebanon and Franklin. Uncas acknowledged it November 14 Old Style. The point locates the Lebanon vicinity. Caulkins, History of Norwich, p. 151, transcribing the county court return.',caulkins);
  add(ct,'1666-10','Fitch’s Pomakook tract',[3575,5056],
    'Connecticut General Court granted Rev. James Fitch 120 acres adjacent to Mason’s Pomakook land near Lebanon. The neighboring grant supplies no complete perimeter. The point marks the Lebanon vicinity. Connecticut Colonial Records II, p. 49, identified by Caulkins, p. 151.',caulkins);
  add(ct,'1685-05-24','Peagscomsuck (Pigscomsit) grant',null,
    'Connecticut General Court authorized James Fitch, John Tracy, John Miller, Richard Bushnell, Solomon Tracy and Daniel Tracy to take up about 600 acres of a separate Mohegan sachems’ grant. The colonial grant is dated May 14 Old Style. The layout begins at the Momogegwetuck brook mouth on Peagscomsuck River. Its location on the artwork remains uncertain. Norwich deed 2A:61, public records B:163–164, recorded August 1686 and entered locally in 1695.',townDeeds);
  add(ct,'1685-05-31','Norwich town patent',[3800,5283],
    'Governor Robert Treat and the Connecticut company confirmed the interests of James Fitch Sr., Captain James Fitch, Benjamin Brewster and fellow Norwich proprietors. The seal clause dates May 21 Old Style. Trading Cove Brook, marked oaks, New London’s bounds and the Mohegan River delimit the described nine-mile square. The trees remain unlocated. The point locates Norwich. Caulkins, pp. 133–135, copy of the town patent.',caulkins);
  add(ct,'1685-12-17','Guilford patent to the town proprietors',[2856,5940],
    'Connecticut Governor and Company granted Andrew Leete, Josiah Rossiter, William Seward and nine other trustees the township on behalf of the inhabitants, December 7 Old Style. The Hammonasset River and Sound bound two sides. Inland and Branford lines require period surveys. This confirmation followed the Menunkatuck deed. The point locates Guilford. Lambert, History of the Colony of New Haven, Guilford chapter.',
    'https://cga.ct.gov/hco/books/History_of_the_Colony_of_New_Haven.pdf');
  add(ct,'1685','Windsor proprietors’ confirmation patent',[2914,4465],
    'Connecticut Governor and Company confirmed Captain Benjamin Newberry and the other Windsor proprietors in the land they claimed through purchases and earlier grants. The point locates Windsor on the Connecticut. The later Massachusetts line survey affected its northern limit. Stiles, History and Genealogies of Ancient Windsor I, text of the patent after the town vote of June 23, 1685.',
    'https://ldsgenealogy.com/CT/books/The-history-and-genealogies-of-ancient-Windsor-Connecticut-Vol-I-part-29.htm');
  add(ct,'1692-02-26','Mispaugsit cedar swamp conveyance',null,
    'Owaneco granted Richard Bushnell, John Tracy, Solomon Tracy and Daniel Tracy the cedar swamp east of the Quinebaug, with room to remove timber and a cartway to their land at Pigscomsit. No acreage is recorded. The swamp has not been identified on the artwork. The deed dated February 16, 1691/92 Old Style was acknowledged in March and registered in December. Norwich deed 2A:103–104.',townDeeds);
  add(ct,'1692-09-16','Poquechanneeg (Lebanon Five Mile Purchase)',[3575,5056],
    'Owaneco sold Samuel Mason, John Stanton, Benjamin Brewster and John Birchard a five-mile-square tract adjoining Fitch’s Mile, September 6 Old Style. Acknowledged January 1698/99 and confirmed by Connecticut in 1705. The point marks the Lebanon locality. The four survey corners are unresolved. Lebanon Book 1, article 1, summarized in Caulkins, p. 151.',caulkins);
  add(ri,'1677-11-10','East Greenwich grant (later Dedford)',[4892,4975],
    'Rhode Island General Assembly granted 5,000 acres in Narragansett country to John Spencer and fellow named proprietors, October 31 Old Style. The plan assigned 500 acres near the sea to house lots, with inland divisions for farms. Each recipient had one year to build. Early sales were restricted for 21 years. Connecticut also claimed jurisdiction. The point marks East Greenwich. Greene, History of East Greenwich, opening chapter, transcription of the Assembly vote.',
    'https://www.usgenwebsites.org/RIKent/EGHistory1.html');

  const nantucketDeeds = 'https://nantucketalgonquianstudies.weebly.com/uploads/4/6/1/9/46195279/nan_alg_stud_07_indian_documents.pdf';
  const islandHistory = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Nantucket%3B_a_history_%28IA_nantuckethistory01doug%29.pdf';
  const tuckernuck = [7060,5850], westEnd = [7255,5937], wesco = [7338,5881];
  const polpis = [7483,5819], pocomo = [7487,5807], sesachacha = [7547,5850];
  const island = [7338,5908], shimmo = [7438,5872];
  const westDeed = 'https://www.gutenberg.org/files/70447/70447-h/70447-h.htm';
  add(ply,'1659-06-30','Nickanoose and Nanahuma’s West End plains deed',westEnd,
    'Nickanoose and Nanahuma conveyed an interest in Nantucket’s western plain to Thomas Mayhew, June 20 Old Style. Their drawing shows Long Pond, fields and an inlet subsequently altered by erosion. Identifications differ over how much land west of Hummock Pond the deed covered. The point marks Acamy. Nantucket County Deeds 4:93 and 6:6.',westDeed);
  add(ply,'1659-07-12','Mayhew’s Nantucket patent rights to nine purchasers',[7310,5867],
    'Thomas Mayhew transferred his English patent interest to Tristram Coffin and eight co-purchasers on July 2 Old Style. He retained a twentieth share and a choice of Masquetuck or Nashayte neck. Their agreements with Wampanoag landholders followed separately. The point marks the early proprietors’ settlement. Nantucket deed to the Nine Purchasers, transcribed in Douglas-Lithgow, Nantucket, pp. 70–72.',islandHistory);
  window.authorityRecords.push({region:ply,from:'1659-10-20',until:null,status:'claim',
    name:'Tuckernuck patent interest (Tuckannuckett)',
    ring:[[6942,5800],[6970,5800],[7005,5826],[7046,5817],[7103,5823],[7110,5857],[7094,5887],[7076,5887],[7042,5868],[6980,5843],[6940,5812]],
    detail:'Thomas Mayhew conveyed his patent interest in the island to Tristram Coffin Sr., Peter, Tristram Jr. and James Coffin, October 10 Old Style. The claim follows the island shoreline clipped to the artwork’s land mask. Wampanoag owners asserted separate interests. The subsequent half-island deed left ownership disputed. Mayhew deed of October 10, 1659.',
    url:'https://upload.wikimedia.org/wikipedia/commons/4/4d/The_life_of_Admiral_Sir_Isaac_Coffin%2C_baronet%2C_his_English_and_American_ancestors%3B_%28IA_lifeadmiralsiris00amor%29.pdf'});
  add(ply,'1660-05-20','Wanachmamak and Nickanoose’s Nantucket West End deed',westEnd,
    'The sachems granted Mayhew and his co-proprietors their interests west of a pond-to-pond line toward Monomoy Harbor. Residents of the woodlands required compensation before removal. The deed separately conveyed shares in marshes, wood rights and grazing between harvest and planting. The point locates the west end. Nantucket County Deeds 1:3 and 2:7, dated May 10 Old Style.',westDeed);
  add(ply,'1662-03-02','Wanackmamack’s undivided Tuckernuck interest',tuckernuck,
    'Wanackmamack conveyed half of Tuckernuck to the four Coffins. A second payment depended on Mayhew’s determination of ownership. The point identifies the island. The deed supplied no line dividing it. Hough, Nantucket Papers, cited in Douglas-Lithgow, pp. 39–40. The transcribed date is February 20, 1661 Old Style.',islandHistory);
  add(ply,'1672-06-30','Ahkeiman’s Tuckernuck claim and Nantucket land order',tuckernuck,
    'The court rejected Ahkeiman’s claim to part of Tuckernuck and directed the Nantucket sachems to provide him land on Nantucket and a share of whales. The point marks the disputed island. The order left the replacement tract unspecified. Nantucket Registry of Deeds, June 20 Old Style, quoted in Douglas-Lithgow, p. 39.',islandHistory);
  add(ply,'1678-12-13','Tristram Coffin’s Tuckernuck planting allotments',tuckernuck,
    'Tristram Coffin granted ten planting acres apiece to his grandchildren, with lifetime grazing for four sheep per acre put into English hay. The deed supplies no individual survey. The point marks the island. Coffin deed dated third day, tenth month, 1678 Old Style. Nantucket Records, second book, p. 17, transcribed by Amory.',
    'https://upload.wikimedia.org/wikipedia/commons/4/4d/The_life_of_Admiral_Sir_Isaac_Coffin%2C_baronet%2C_his_English_and_American_ancestors%3B_%28IA_lifeadmiralsiris00amor%29.pdf');
  add(ply,'1682-03-16','Akeamong and Jacob’s Tuckernuck settlement',tuckernuck,
    'Akeamong and Jacob, sons of Pottacohannet, released their claim to half the island to the Coffins in exchange for 40 arable acres on Nantucket and £5. They retained the right to recover their whales on the shore. The point marks the disputed island. Nantucket Town Records, p. 211, March 6, 1681 Old Style, cited by Douglas-Lithgow, pp. 39–40.',islandHistory);
  // Elizabeth Little collated repeated recordings at three repositories.
  // Each citation identifies a transaction, including any later copies.
  const islandEntries = [
    ['1659','Masquetuck (Quaise Neck)',polpis,'Wanachmamak and Nickanoose granted the neck to Thomas Mayhew.','NCD 1:7, 2:28 and 2:35'],
    ['1660','Coatue and Great Point, first deed',island,'Wanachmamak signed a deed naming himself, Nickanoose and Neodotant as grantors to Edward Starbuck.','NCD 1:7'],
    ['1660','Coatue and Great Point, second deed',island,'Nickanoose executed a separate deed to Edward Starbuck two days after Wanachmamak’s signature.','NCD 1:7'],
    ['1662-07-02','Pocomo Neck (Pakummohquoh)',pocomo,'Wanachmamak conveyed Pocomo to the proprietors represented by Tristram Coffin and Thomas Macy on June 22 Old Style.','NCD 1:7 and 4:89'],
    ['1664-07-17','Old Fields on Nanahuma’s Neck (Ram Pasture)',westEnd,'Pakapenessa, Harry (son of Wapscowet) and Jonas Kimmo conveyed the fields to the Nantucket proprietors on July 7 Old Style.','NCD 1:5 and 6:1'],
    ['1664','Cultivated land at Wesco',wesco,'Tequamomemy and Mekowakin conveyed their fields to the proprietors with advice from Francis, sachem at Nauset.','NCD 1:5'],
    ['1667','Quaquachwinet’s Squam tract',sesachacha,'Nickanoose granted Quaquachwinet 100 acres at Squam.','NCD 2:6, 2:9, 2:70, 3:24, 3:39 and 3:81'],
    ['1668','Spotso’s first winter feed grant',shimmo,'Spotso granted the proprietors seasonal grass and fodder rights in the Hummock Pond–Shimmo district.','NPRC 1&2:18'],
    ['1668','Nickanoose’s land for four sons',island,'Nickanoose devised land to James, Watt, Paul and Puttumpantanum Noose. Registration took place in 1745.','MVD 7:44'],
    ['1670','Waquakonooit’s grant from Nickanoose',island,'Nickanoose granted Waquakonooit 100 acres. The grantee name and acreage resemble the Squam instrument of 1667. Little separately lists the later record. Its parcel identity requires examination of both originals.','NCD 3:39'],
    ['1671','Wanachmamak’s recorded West End deed',westEnd,'A separate undated deed in Wanachmamak’s name conveys West End and seasonal resource rights to the proprietors. The year marks recording. Its language overlaps the joint 1660 deed.','New York Deeds 3:54'],
    ['1674','Shawkemo land and meadow',shimmo,'Waquakesuh (Wanachmamak) conveyed land and meadow to Richard and John Gardner. Proprietary rules prompted surrender of privately bought interests in 1678.','NCD 2:6 and 3:67'],
    ['1674','Obadiah’s court-ordered share',shimmo,'The court directed Spotso to give Obadiah a share in the northern part of Attapeat’s lands.','NPRC 1&2:171'],
    ['1674','Obadiah’s conveyance of his share',shimmo,'Obadiah transferred his share to the Gardners, Thomas Macy, Edward Starbuck and associates. The proprietors subsequently took over privately acquired interests.','NCD 2:8'],
    ['1674','Meadow south of Coatue',island,'Wawinet conveyed four acres of meadow to William Worth.','NCD 4:90'],
    ['1674','Nathaniel Starbuck’s West Polpis grass lease',polpis,'Nickanoose and Watt Noose leased West Polpis creek grass to Nathaniel Starbuck for 99 years. The nominal term extends beyond 1700.','NCD 3:65'],
    ['1674','Stephen Hussey’s West Polpis grass lease',polpis,'Wawinet leased West Polpis creek grass to Stephen Hussey for 99 years. The nominal term extends beyond 1700.','NCD 3:77'],
    ['1675','Jutte’s cattle rights',island,'Nickanoose granted Jutte rights for six cattle in his territory.','NCD 3:41'],
    ['1676','Jutte’s land grant',island,'Nickanoose conveyed twenty acres to Jutte, separately from the livestock rights in 1675.','NCD 3:41'],
    ['1677','Watt’s Neck (John Swain’s claim)',polpis,'Watt Noose conveyed the neck to John Swain by 1677, when Swain occupied a house there. The deed was lost. The year marks evidence of possession. Swain obtained a replacement patent in 1687.','NCD 2:64 and NPRC 1&2:176'],
    ['1677','Use of Nickanoose’s lands',island,'Nickanoose granted land use to his brothers Keattohquen and Wohwaninwat.','MVD 1:38'],
    ['1678-07-04','George Nanahuma’s West End interests',westEnd,'Conpokenet (George Nanahuma) conveyed his interests in the Plains and Nanahuma’s Neck to the proprietors on June 24 Old Style.','NCD 3:66'],
    ['1678','Private island purchases assigned to the proprietors',island,'The Folgers, Gardners, Joseph Coleman, William Worth, Thomas Macy and John Swain assigned interests acquired contrary to the proprietors’ rules. Identified holdings included Shawkemo and West Polpis grass rights.','NCD 6:3 and 1:49'],
    ['1679','Wawinet’s stewardship',island,'Nickanoose transferred control of his lands to his son Wawinet.','MVD 1:355'],
    ['1679','Quidnet tract for Jacob Washamon',sesachacha,'Nickanoose and Wawinet conveyed land at Quidnet to Jacob Washamon.','NCD 1:53 and 1:55'],
    ['1681','John Swain’s land near Quaise',polpis,'Wawinet conveyed land near Masquetuck to John Swain.','NCD 3:45'],
    ['1682','Richard Gardner’s Sisackochar stage',sesachacha,'Nickanoose granted one acre at Richard Gardner’s fishing stage, near Swain’s. His son Wawinet signed.','NCD 2:10'],
    ['1682','Spotso’s later winter feed grant',shimmo,'Spotso renewed seasonal grass and fodder rights to the proprietors within his lands.','NCD 2:48'],
    ['1682','Jeptha’s winter feed grant',island,'Jeptha, son of Wanachmamak, granted seasonal grass and fodder rights to the proprietors.','NCD 2:48'],
    ['1682','Nickanoose’s postharvest grazing grant',island,'Nickanoose let the proprietors take grass and herbage after harvest until May 1.','NCD 2:48 and NPRC 1&2:134'],
    ['1683','Musaquat’s Monomoy grass and meadows',island,'Musaquat conveyed interests in the grass and meadows at Nantucket’s Monomoy to the proprietors.','NCD 3:54'],
    ['1684','Wannaquin’s land and meadow',island,'Wannaquin (John Hoyt) transferred land and meadow to the proprietors. Little tentatively locates the holding on the north shore.','NCD 3:68'],
    ['1684','Jeptha and Wawinet’s confirmation',island,'Jeptha and Wawinet confirmed their fathers’ grants to the proprietors, reserving drift whales and half the outstanding meadows. Wawinet also agreed with members of his community to end further English land purchases.','NCD 3:73 and Massachusetts Archives 32:385'],
    ['1687','New York replacement patent for Watt’s Neck',polpis,'New York issued John Swain a patent replacing the lost Watt Noose conveyance at Polpis.','NPRC 1&2:143']
  ];
  for (const [from,name,point,terms,reference] of islandEntries) {
    add(ply,from,name,point,terms+' The point locates '+(point === island ? 'Nantucket' : 'the vicinity on Nantucket')+
      '. Individual lot lines remain unresolved. '+reference+'. E. Little, Nantucket Indian Deeds, pp. 42–46.',nantucketDeeds);
  }
  // Envelope for the named barrier peninsula. The land mask supplies the shoreline.
  // The cut across the eastern attachment is schematic.
  const coatue = [[7425,5620],[7470,5620],[7532,5690],[7563,5740],[7568,5775],
    [7527,5775],[7500,5741],[7478,5763],[7474,5795],[7440,5826],[7400,5863],
    [7376,5876],[7374,5849],[7418,5810],[7444,5780],[7465,5740],[7465,5680]];
  for (const record of window.authorityRecords.filter(r => r.name.startsWith('Coatue and Great Point,'))) {
    delete record.point;
    record.ring = coatue;
    record.detail = record.detail.replace(/ The point locates .*? Individual lot lines remain unresolved\./,
      ' The shaded envelope follows the mapped barrier peninsula through Great Point. The deed names the peninsula but supplies no surveyed line across its eastern attachment.');
  }
  const madaket = 'https://www.nantucket-ma.gov/DocumentCenter/View/29055/Report-of-the-Committee-on-Long-Pond-and-Madaket-Ditch/';
  add(ply,'1671-07-08','Lovelace confirmation to Nantucket freeholders',[7310,5867],
    'Governor Francis Lovelace confirmed the land already purchased to Tristram Coffin Sr. and Thomas Macy on behalf of the freeholders, June 28 Old Style. The point locates the early settlement. The deeds then in force determine the actual extent. Nantucket committee report, p. 4.',madaket,'1684-06-15');
  add(ply,'1684-06-15','Dongan’s first Nantucket confirmation',[7395,5883],
    'Governor Thomas Dongan confirmed previous purchases to John Gardner and James Coffin for the other freeholders on June 5 Old Style. The point locates Sherburne. The patent incorporated prior purchases without surveying each parcel. Nantucket committee report, p. 4.',madaket,'1687-07-07');
  window.authorityRecords.push({region:ply,from:'1687-07-07',until:null,status:'claim',
    name:'Dongan patent to the trustees of Sherburne (Nantucket)',
    ring:[[7100,5887],[7140,5830],[7400,5590],[7450,5600],[7500,5600],[7630,5810],[7650,6010],[7200,6020],[7090,5920]],
    detail:'Governor Thomas Dongan granted the trustees John Gardner, James Coffin, William Geyer, Nathaniel Barnard, Stephen Hussey and John Macy corporate rights on June 27 Old Style. Silver and gold mines were excepted. The outline follows the island covered by the English claim. On land still held by Indigenous proprietors, the trustees held an exclusive right to purchase. Nantucket committee report, pp. 4–5, quoting the parchment.',url:madaket});
  add(ply,'1679','East Polpis deeds to Edward Cartwright',polpis,
    'Watt, Wawinet and Sesapana Will conveyed land near Watt’s Run to Edward Cartwright in instruments dated between 1676 and 1679. The entry appears at the end of the documented interval. The point locates the Polpis vicinity. The individual dates and lot lines need the register images. Nantucket County Deeds 2:29–30.',nantucketDeeds);
  add(ply,'1677','Nickanoose’s undated grant of Watt’s Neck',polpis,
    'Nickanoose gave his son Watt the neck subsequently claimed by John Swain. The deed lacks an execution date. The entry uses 1677, the latest evidenced year for Watt’s subsequent conveyance. The point locates the Polpis vicinity. Nantucket County Deeds 2:4 and 2:64.',nantucketDeeds);
  add(bay,'1663-06','Dedham’s replacement grant for Natick lands',null,
    'Massachusetts General Court authorized Dedham to select 8,000 acres clear of earlier grants in up to two locations. The selection later fell at Pocumtuck. This entry represents the original unlocated award. Sheldon, History of Deerfield I, The Eight Thousand Acre Grant.',
    'https://deerfieldraid1704.org/scenes/nsscenes/founding/foundDeerfield.html','1665-10-21');
  add(bay,'1665-10-21','Dedham’s Eight Thousand Acre Grant at Pocumtuck',[2982,2986],
    'Massachusetts General Court ratified Dedham proprietors’ location of their 8,000-acre grant on October 11 Old Style. The settlers’ claim overlapped Pocumtuck land. Negotiations with individual right holders continued. The point locates the Deerfield River settlement. Historic Towns of New England, Deerfield chapter.',
    'https://www.gutenberg.org/cache/epub/49067/pg49067-images.html');
  const wright = 'https://www.loc.gov/item/05036823/';
  const mine = [3774,4102], westfield = [2577,3832], hatfield = [2798,3264], hadley = [2870,3338];
  const springfield = [2963,3995], northampton = [2920,3477], deerfield = [2982,2986];
  const northfield = [3236,2604], sunderland = [2954,3084], agawam = [2781,4004];
  // The English dates below use January-year numbering for January–March.
  // Conversion lists the Gregorian day on the map and preserves the civil day in the text.
  const valley = [
    ['1664-10-28','Cooper’s Worronoco assignment to Henry Glover',westfield,'Thomas Cooper assigned the tract between Tomhomock Brook, the river and Wausapskatuck Hill to Henry Glover, his brother, for Glover and the other proprietors.','A:49'],
    ['1671','Squakheag deed to Joseph Parsons',northfield,'Massemet, Panoot and four other right holders conveyed a tract six miles inland on both banks to Parsons for Northfield. The 1686 confirmation recites a deed and a mortgage, both dated only to 1671. Some grantors disputed full payment.','Northfield town records, Wright p. 105'],
    ['1671','Squakheag mortgage',northfield,'The 1686 confirmation identifies a separate 1671 mortgage alongside the deed to Joseph Parsons. It describes the tract between Coasock, Quanatock and Masapetot’s land. The later recital leaves the mortgage terms unspecified.','Northfield town records, Wright p. 105'],
    ['1695-06-15','Nallahamcongon assignment to the Squakheag inhabitants',northfield,'William Clarke’s signature survives on a damaged assignment of the west-bank 1673 deed to the inhabitants of Squakheag. The 1673 recipients were Clarke and Joseph Parsons.','Northfield town records, Wright p. 81'],
    ['1644-10-08','Tantiusques graphite mine (Black Lead Hill)',mine,'Webomscom and Nodowahunt conveyed a mining tract extending ten miles around the hills to John Winthrop Jr.','W:54'],
    ['1644-11-11','Nodowahunt’s Tantiusques confirmation',mine,'Nodowahunt confirmed the earlier transfer to John Winthrop Jr. and described his interest for ten miles at Black Lead Hill.','W:54'],
    ['1645-01-20','Webucksham’s Tantiusques conveyance',mine,'Webucksham claimed a ten-mile reach in each direction from the mine. His grant to Winthrop reserved fishing, hunting and planting to his people.','W:52'],
    ['1652-04-14','Coe’s Freshwater meadow at Sickcompsqu',[2928,4044],'Coe (Coa) granted John Pynchon the wet meadow at the head of the Asnuntuk or Freshwater River east of the Connecticut. The deed names the meadow Quillicksqu and grants candlewood gathering and cattle grazing from spring to winter.','A–B:20'],
    ['1653-09-24','Nanotuck west-bank deed (Northampton)',northampton,'Chickwallop, Nenessahalant, Nassicohee, Awonunsk and fellow right holders conveyed land on the west bank to John Pynchon. The tract ran nine miles inland. Pynchon owed sixteen plowed acres east of the river and the deed permitted another spring of planting on the west.','A:15'],
    ['1657-07-20','Lampancho’s Pewongenug tract',hatfield,'Lampancho, also known as Umpanchela, conveyed Pewongenug to Northampton. He later disputed whether the price was paid.','Northampton Town Records, Wright pp. 31–32'],
    ['1658-09-28','Capawonke meadow settlement',hatfield,'Umpanchela released the meadow and woodland south of the separating brook to Northampton after receiving an additional payment following his complaint.','Northampton Town Records, Wright pp. 31–32'],
    ['1658-11-16','Wasecums’s Tantiusques release',mine,'Wasecums, son of Webuckshum, transferred his interest to Winthrop through William Dennies. The elder sachem’s deed reserved hunting, fishing and planting.','W:55'],
    ['1658-12-25','Nolwotogg east-bank deed',hadley,'Chickwallop, Umpanchella and Quonquont conveyed to John Pynchon an east-bank tract from Towunucksett to Nepassooenegg and nine to ten miles inland. They retained a cornfield estimated at 12–20 acres, fishing, hunting and trapping. They secured permission for camps and firewood.','A:11'],
    ['1659-03-01','Washcomos’s Tantiusques confirmation',mine,'Washcomos (Wasecums) confirmed his father’s earlier deed to Winthrop, specifically including mining rights. He also acknowledged the November 1658 writing.','W:53'],
    ['1660-07-10','Cappowoungonuck to Mincomonk',hatfield,'Umpanchala granted John Pynchon land west of the Connecticut, from the Northampton boundary north to Mincomonk and nine miles west. He retained planting ground, hunting, fishing, camping and wood rights.','A:6'],
    ['1660-09-19','Amoakussen’s Worronoco mortgage',westfield,'Amoakussen pledged land between Tomhaummucke Brook, Worronoco River and Wasapskotock Hill to Thomas Cooper as security for debt. The 1664 deed converted the conditional interest.','A:17'],
    ['1661-04-02','Springfield collateral to Samuel Marshfield',springfield,'Cuttonis, Coo, Mattaquallanant, Menis, Wallny and Tagnalloush pledged their interests within Springfield’s bounds to Samuel Marshfield. Repayment could be made in produce, wampum or skins. This was a mortgage.','A:20'],
    ['1662-01-17','Weequetaiogg planting-ground agreement',hatfield,'Umpanchala with Etoomp conveyed reserved Chickons or Cattones Akees land to Bacon, Lewis, Werner and Smith for Hadley. They agreed to set off and fence five acres for him.','A:12'],
    ['1662-05-20','Hockanome meadow mortgage',hadley,'Weackwockwen, his wife and their son Squompe pledged meadow and upland to Joseph Parsons against a beaver debt due in September. The subsequent South Hadley deed explicitly excepted this parcel.','A:24'],
    ['1662-08-08','Hoccanum and South Hadley conveyance',hadley,'Wequagon, Awonunsk and Squomp conveyed John Pynchon the tract from Towonunkset south to Chusuck and east to three ponds. The roughly fifty or sixty acres pledged to Parsons were reserved. Indigenous hunting, fishing, camping and wood cutting on the common lands continued.','A:8'],
    ['1662-09-12','Cuttonis’s Agawam planting parcel',agawam,'Cuttonis acknowledged his earlier conveyance to Thomas Cooper of planting land west of the Connecticut adjoining the west end of Cooper’s swamp. The date marks the acknowledgment.','A:24'],
    ['1663-01-16','Pynchon assignment to Northampton',northampton,'John Pynchon assigned to the Northampton inhabitants his 1653 deed for the Nanotuck west-bank tract. The assignment follows the earlier instrument and its conditions.','A:15'],
    ['1663-10-28','Pynchon assignment to Hadley',hadley,'John Pynchon assigned the Nolwotogg deed of December 1658 to the inhabitants of Hadley. The reserved cornfield and use rights belong to the underlying deed.','A:11'],
    ['1664-10-20','Worronoco mortgage release to Cooper',westfield,'Amoakussen, also called Nacogewallant, relinquished his interest to Thomas Cooper between the river, Tomhomock Brook and Wausapskatuck Hill. Cooper subsequently assigned the deed to Henry Glover.','A:49'],
    ['1665-09-29','Spanesa and Poxonock’s Warranoco meadow',westfield,'Spanesa and Poxonock sold Daniel Clark and Samuel Marshall forty acres of partly cultivated meadow south of the river. The deed purported to give Marshall control of their daughter if the title failed.','A:54'],
    ['1665-11-10','Quabaug (Brookfield) deed',[3737,3755],'Shattoockquis granted Thomas Cooper land for the English planters at Quabaug between Wecobauge and Podunk. Cooper later assigned his interest to the inhabitants.','Wright pp. 55–59'],
    ['1666-06-20','Higher Meadow and uplands across Agawam River',agawam,'Neesahegan and Kepaquomp acted for themselves and Potucksisq in conveying the higher meadows and southern uplands to representatives of Springfield. The bounds run to Wequanshausicke and Pauhunganuck.','A–B:21'],
    ['1667-02-24','Chauk’s northern Pocumtuck parcel',deerfield,'Chauk acted for himself and his brother Wapahoale in conveying land north of Pocumtuck River to John Pynchon for Lusher, Fisher and Dedham associates. Chauk reserved fishing, hunting and nut gathering. Wider community consent is disputed.','PVMA original, Wright pp. 61–62'],
    ['1667-06-13','Masseamet’s Pojassick lands',deerfield,'Milkeanaway (Masseamet) granted the Dedham associates land southeast of the Pocumtuck River adjoining Wuttawoluncksin’s land. He retained fishing rights.','PVMA original, Wright pp. 65–66'],
    ['1667-07-22','Tomholisick and Weshatchowmesit',deerfield,'Ahimunquat (Mequinnichall) conveyed his and his brother Kunckkeasacod’s interests on both sides of Pocumtuck River to Eleazer Lusher and Daniel Fisher for the Dedham associates. Masseamet’s purchase adjoined.','PVMA original, Wright pp. 67–68'],
    ['1669-06-30','Woronoake (Westfield) town purchase',westfield,'Alquat conveyed to Aron Cooke, James Cornish, Joseph Whiting and other residents land between the main and Fort rivers. Reserved meadow at the hook by the little river was the subject of the following year’s agreement.','A–B:50'],
    ['1670-04-25','Alquat and Wollump’s Fort River meadow exchange',westfield,'Alquat and Wollump released seven or eight reserved acres to John Pynchon and Joseph Whiting in exchange for three acres already broken for planting the first year, then five each year on demand.','Springfield City Library original, Wright pp. 72–73'],
    ['1672-02-06','Pynchon’s South Hadley assignment',hadley,'John Pynchon assigned the 1662 Wequagon, Awonunsk and Squomp purchase to the inhabitants of Hadley. The Hoccanum mortgage exception remained in the original deed.','A:8'],
    ['1672-08-26','Mashalisk’s Sugarloaf tract',deerfield,'Mashalisk granted John Pynchon land between Pocumtuck River and the Connecticut extending to Wequomps (Sugarloaf Hill). Consideration included debts owed by her son Wuttawoluncksin.','PVMA original, Wright pp. 74–75'],
    ['1672-10-19','Quanquan’s family lands in Hatfield',hatfield,'Sarah, Pocunohouse, Mattabauge, Majessett and Momecouse conveyed to Hatfield Quanquan’s lands up to Sugarloaf Brook. They excluded the Bradstreet and Dennison farms and a parcel purchased from Benjamin Waite.','A:133'],
    ['1673-09-09','Nallahamcongon (Natanas) at Squakheag',northfield,'Sowanaett’s daughter and other right holders granted Joseph Parsons and William Clarke land west of the Connecticut, bounded by hills six miles inland, a brook and Massemett’s lands. The recipients assigned this deed to the inhabitants in June 1695.','Northfield town records, Wright pp. 79–80'],
    ['1673-11-24','Pochaset two-mile tract',westfield,'Walump conveyed a tract two miles long and one mile wide to Hope Atherton, Preserved Clap and Medad Pomeroy, reserving his meadow opposite the old fort on the south bank.','O:447'],
    ['1673-12-19','Cooper’s assignment of Quabaug',[3737,3755],'Thomas Cooper assigned the November 1665 deed from Shattoockquis to the inhabitants of Brookfield.','Wright pp. 55–59'],
    ['1674-04-10','Mashalisk’s tract above Hadley',sunderland,'Mashalisk granted Robert Boltwood, John Hubbard, Joseph Kellogg, Thomas Dickinson and associates land between Neposoaneag and Sawwatapskechuwas extending six miles east. Her son’s debt formed part of the consideration.','Sunderland Town Records, Wright pp. 84–85'],
    ['1674-04-10','Mettawompe’s east-bank tract',sunderland,'Mettawompe (Nattawassawet) conveyed interests for himself, Wadanummin, Squiskheag and Sunkkmachue to the same four Hadley agents, from Sawwatapeskechuwas north to Papacontuckquash opposite the Deerfield River.','Sunderland Town Records, Wright pp. 86–88'],
    ['1674-04-17','Squiskheag’s confirmation',sunderland,'Squiskheag confirmed Mettawompe’s preceding east-bank conveyance for himself and his brothers following receipt of part of the price.','Sunderland Town Records, Wright pp. 87–88'],
    ['1679-02-04','Freshwater and Chicopee purchases attested',springfield,'John Pynchon attested earlier purchases from Wequagan, Wawapaw and Wequompo for Springfield. The tracts extended from the meadows of Freshwater toward Five Mile Pond and Chicopee River. Hunting and fishing were reserved. The men were driven away in the war before signing. The date locates the attestation.','A–B:22'],
    ['1681-03-16','Freshwater (Enfield) plantation deed',[2993,4189],'Tawtaps (Notattuck) conveyed land to John Pynchon for Thomas Stebbins and fellow settlers, from Freshwater to Saltonstall Brook and eight miles east from the Connecticut. He retained shared fishing and hunting on common woodland.','A–B:39'],
    ['1685-02-11','South Westfield proprietors’ assignment',westfield,'John Pynchon assigned the south-bank purchase from Paupsunnick, wife of Panesan, to the inhabitants of Westfield. He stated the earlier instrument could not be found.','A–B:53'],
    ['1685-04-30','Suffield town purchase assignment',[2784,4144],'John Pynchon conveyed the town purchases to the Suffield settlers. Pampunckshats conveyed the northern land and Mishnoasqus (Margery) the tract past Stony Brook including Pipestave Swamp.','A–B:57'],
    ['1685-08','Totoe’s Two Mile Brook tract',westfield,'Totoe gave John Williams of Windsor a tract one mile square at Two Mile Brook, with timber and stone rights from adjoining land. The point marks the Westfield and Southwick vicinity.','B:83'],
    ['1686-05-24','Squakheag purchase confirmation',northfield,'Mequenichon, Mannusquis, Masemet and other right holders confirmed land on both banks to Micah Mudge, Cornelius Merry and John Lyman for Northfield after a dispute about full payment on earlier instruments.','Northfield Town Records, Wright pp. 105–107'],
    ['1686-06-10','Toto’s mountain tract for James Cornish',westfield,'Toto conveyed to James Cornish a roughly six-mile-square tract between the Leet and Williams lands, reaching toward the mountains and the highway near Westfield.','A:111'],
    ['1686-12-27','Wombemesscock tract (Lamb and associates)',[3737,3755],'John Magus and Lawrence Nascowanno acted for Annogomok. James and Simon, heirs of Black James, joined the deed to Joshua Lamb and seven Roxbury associates. The tract ran toward Quabaug bounds and the Menamesick River. The point locates the adjacent Quabaug district.','D:237'],
    ['1687-08-13','Cowas–Wanascatok deed to Northfield',northfield,'Nawelet, Gongequa, Aspiambemett and other signers granted William Clarke and John King, acting for the proprietors, a tract six miles on either side of the Connecticut between Cowas and Wanascatok.','Northfield Town Records, Wright pp. 114–115']
  ];
  for (const [civil,name,point,terms,recordId] of valley) {
    let from = civil;
    if (civil.length === 10) {
      const day = new Date(civil + 'T00:00:00Z');
      day.setUTCDate(day.getUTCDate() + 10);
      from = day.toISOString().slice(0, 10);
    }
    const area = name.includes('Suffield') || name.includes('Enfield') ? ct : bay;
    add(area,from,name,point,terms+' The point locates the district. The document uses local landmarks whose full circuit remains uncertain. English civil date '+civil+' (year beginning January). H. A. Wright, Indian Deeds of Hampden County, '+recordId+'.',wright);
  }
}
















