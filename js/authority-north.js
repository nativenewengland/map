/* Historical records for the northern part of the illustrated sheet.
   Locations are master-artwork pixels. A missing location is intentional:
   the northeastern coastline runs underneath the artwork's inset and blank sea. */
{
  const bay = 'Massachusetts Bay and interior';
  const nh = 'New Hampshire';
  const me = 'Maine';
  const edge = 'Northern edge';
  const source = {
    mass: 'https://massachusetttribe.org/chronological-listing-of-massachusett-sachems',
    ponkapoag: 'https://massachusetttribe.org/life-of-the-indigenous-massachusett-at-ponkapoag-plantation',
    nipmuc: 'https://nipmucnation.org/history',
    natick: 'https://www.natickhistoricalsociety.org/naticks-beginnings',
    hassan: 'https://s3.amazonaws.com/NARAprodstorage/opastorage/live/44/7975/63797544/content/electronic-records/rg-079/NPS_MA/11000615.pdf',
    ipswich: 'https://www.sec.state.ma.us/divisions/mhc/preservation/survey/town-reports/archives/ips.pdf',
    deed: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/The_ancient_records_of_the_town_of_Ipswich-_vol._1-_from_1634_to_1650_%28IA_ancientrecordsof00ipsw%29.pdf',
    boston: 'https://content.boston.gov/departments/archaeology/boston-common-archaeology',
    plans: 'https://www.gutenberg.org/ebooks/71790',
    salem: 'https://npgallery.nps.gov/NRHP/GetAsset/NRHP/64000277_text',
    archives: 'https://www.sec.state.ma.us/divisions/archives/collections/mass-archives-collection.htm',
    deerfield: 'https://www.historic-deerfield.org/wp-content/uploads/2025/03/HD-Magazine-350-issue.pdf',
    reoccupation: 'https://deerfieldraid1704.org/scenes/nsscenes/founding/foundDeerfield.html',
    falls: 'https://tile.loc.gov/storage-services/master/gdc/gdcebookspublic/20/23/69/24/69/2023692469/2023692469.pdf',
    nhHistory: 'https://sos.nh.gov/media/xisfh04s/a-history-of-new-hampshire-with-towns-cities.pdf',
    dover: 'https://www.dover.nh.gov/indigenous/',
    doverTown: 'https://www.dover.nh.gov/government/city-operations/library/research-learn/history/dover-historical-dates/',
    hampton: 'https://history.lanememoriallibrary.org/hampton/documents/foundingdocumenttranscriptions',
    exeter: 'https://www.exeternh.gov/community/about-exeter',
    maineRecords: 'https://loyalist.lib.unb.ca/sites/default/files/Finding-Aid_Colonial-Records-Maine_America-Public-Records.pdf',
    maineGov: 'https://lldc.mainelegislature.org/Open/Rpts/js451_m25c68_1982.pdf',
    york: 'https://www.yorkmaine.org/DocumentCenter/View/10984/Chronology-of-Maine-History',
    saco: 'https://www.mainememory.net/record/33847',
    sacoWar: 'https://www.nae.usace.army.mil/Portals/74/docs/Topics/CampEllis/AppendixHDRAFT.pdf',
    treaty: 'https://data2.archives.ca/rcap/pdf/rcap-182.pdf',
    wabanaki: 'https://oshermaps.org/exhibitions/maine-bicentennial/section-1/',
    upland: 'https://www.nhdfl.dncr.nh.gov/sites/g/files/ehbemt866/files/documents/nash-stream-management-plan-2017.pdf',
    north: 'https://outside.vermont.gov/agency/ACCD/ACCD_Web_Docs/HP/Resources_Rules/Digging_Into_Archaeology/Seasons_of_Prehistory_4000_Years_at_the_Winooski_Site.pdf',
    missisquoi: 'https://abenakination.com/missisquoi-history'
  };
  const records = [];
  function add(region, from, until, name, status, detail, url, position) {
    const record = { region, from, until, name, status, detail, url };
    if (position) {
      if (Array.isArray(position[0])) record.ring = position;
      else record.point = position;
    }
    records.push(record);
  }
  const ipswich = [6158,2666];
  const wamesit = [5268,2789];
  const pocumtuck = [2966,2972];
  const deerfield = [2982,2986];
  const natick = [5131,3602];
  const hassan = [4600,3850];
  const ponkapoag = [5565,3810];
  const neponset = [5689,3655];
  const salem = [5939,2979];
  const boston = [5640,3420];
  // Four geographical anchors in the MHC contact/plantation survey. The southern
  // end is the North River, the northern edge the Merrimack, the west Cochichawick.
  const agawam = [[5962,3010],[6121,3010],[6258,2914],[6463,2848],[6485,2630],[6235,2510],
    [6076,2379],[5689,2337],[5598,2446],[5550,2724],[5666,2848]];
  // Base-map coast at Shawmut: Charles estuary, Mill Cove, Town Cove, Neck.
  // The bounding path passes through water only where the land mask supplies the shore.
  const shawmut = [[5626,3401],[5636,3397],[5643,3407],[5648,3396],[5662,3397],
    [5663,3407],[5653,3413],[5653,3419],[5664,3421],[5659,3431],[5643,3439],
    [5639,3448],[5634,3448],[5631,3436],[5626,3424]];

  add(bay,'1500','1600','Massachusett coast and Nipmuc interior','unresolved','The coastal and inland communities had distinct territories. The available tribal histories locate ancestral populations, but do not identify the political allegiance of every shore, pond or field for individual years in the sixteenth century.',source.nipmuc);
  add(bay,'1600','1675','Nipmuc communities of the central uplands','indigenous','Nashaway, Quaboag and other local communities occupied the river and lake country. The tribal history maps several communities. The extent of any one leader’s authority between their villages remains unresolved.',source.nipmuc);
  add(bay,'1600','1619','Pawtucket network of Nanapashamet','indigenous','The Massachusett history associates the corridor between the Charles and Piscataqua with Nanapashamet. His wider leadership overlapped local sachems. Winnisimmet is a locality in this network.',source.mass,[5665,3344]);
  add(bay,'1619','1634','Squaw Sachem and Nanapashamet’s family','indigenous','The family continued to govern northern Massachusett communities after Nanapashamet’s death. Squaw Sachem and her sons exercised authority at different places. The source does not delimit their respective lands.',source.mass,[5665,3344]);
  add(bay,'1600','1638-07-08','Agawam sachemship on Ipswich Bay','indigenous','Approximate reach in the early seventeenth century. The Massachusetts Historical Commission identifies the Merrimack, the North River at Salem, Cochichawick and the Atlantic as outer landmarks. The connecting segments are estimates. Masconomet is documented during the English settlement period.',source.ipswich,agawam);
  add(bay,'1633','1634','English settlement at Agawam','english','Winthrop’s party settled beside the river landing. The symbol locates that settlement within the Agawam sachemship.',source.ipswich,ipswich);
  add(bay,'1634',null,'Town of Ipswich','english','The General Court incorporated Ipswich in 1634. The settlement beside the landing anchors the town. Grants, subdivisions and town boundaries changed separately.',source.ipswich,ipswich);
  add(bay,'1638-07-08','1659','Masconomet of Agawam','indigenous','The deed dated 28 June 1638 in the English calendar describes his rights in the Bay of Agawam, including Chebacco. It records a transaction by the sachem. The surviving description does not delimit later Agawam governing authority.',source.deed,ipswich);
  add(bay,'1620','1633','Chickataubut of the Massachusett','indigenous','The tribal account identifies Chickataubut as principal sachem during early English settlement, with a seat near the Massachusett Fields in the Quincy area. The marker identifies the locality.',source.mass,neponset);
  add(bay,'1633','1657','Neponset Massachusett under Kutshamakin and Wampatuck','indigenous','Kutshamakin succeeded his brother during Wampatuck’s minority. The chronology does not give the day of Wampatuck’s accession or a fixed boundary after settlement expanded.',source.mass,neponset);
  add(bay,'1657','1669','Ponkapoag under Wampatuck and local sachems','indigenous','Dorchester assigned six thousand acres for the plantation in 1657. Ahauton and Wampatuck continued to act as sachems. Wampatuck sought a deed in 1667. The marker is near Ponkapoag Pond, within the locality of the plantation.',source.ponkapoag,ponkapoag);
  add(bay,'1669','1695','Massachusett succession at Ponkapoag','indigenous','Daniel Chickataubut succeeded his brother. The Massachusett account records an agreement with Metacom over their boundary in 1670. Its route is unresolved here. Charles later succeeded Daniel.',source.mass,ponkapoag);
  add(bay,'1695',null,'Ponkapoag under Charles Chickataubut','indigenous','Charles signed a deed concerning Boston and the harbor islands in 1695, evidence of an ongoing hereditary sachemship alongside English town government. The deed supplies no closed territorial survey here.',source.mass,ponkapoag);
  add(bay,'1626','1635','English settlement at Naumkeag','english','Conant’s party from Cape Ann settled at the Danvers River mouth. Endicott arrived in 1628. Naumkeag remained the Indigenous place-name.',source.salem,salem);
  add(bay,'1635',null,'Salem court and town','english','Salem was a regional court seat by 1635 and an Essex shire town from 1643. Its local seat can be placed. The court district had a wider reach than the settlement.',source.salem,salem);
  add(bay,'1630','1645','Boston at Shawmut','english','The town took shape on Shawmut in 1630. Common pasture dates from 1634. The surviving property reconstructions show expansion across the peninsula over the following fifteen years.',source.boston,boston);
  add(bay,'1645',null,'Town of Boston on Shawmut','english','Reconstructed allotments and streets by 1645 establish a town on the old peninsula. The shaded core follows the artwork’s pre-fill coast to the narrow Neck. Town holdings elsewhere and changes to individual lots are outside this footprint.',source.plans,shawmut);
  add(bay,'1651','1675-10','Christian Indian town of Natick','indigenous','Residents governed a mission town on the Charles under colonial supervision and held land collectively. The village location is supported, while the perimeter changed.',source.natick,natick);
  add(bay,'1675-10','1676','Natick under colonial removal orders','contested','The General Court ordered residents confined on Deer Island. Wartime forced absence interrupted local government and use of fields.',source.natick,natick);
  add(bay,'1676',null,'Natick survivors and common lands','indigenous','Survivors returned to a damaged town. Indigenous families held common lands and exercised local leadership into the eighteenth century.',source.natick,natick);
  add(bay,'1654','1675','Hassanamesit Nipmuc mission community','indigenous','A mission settlement was established in 1654. A church is recorded in 1671 in eastern Grafton. The tribal plantation and the later reservation had different extents.',source.hassan,hassan);
  add(bay,'1675','1698','Hassanamesit displacement','contested','War displaced the community. The Nipmuc account places the return of surviving families in the 1690s. The exact year and distribution of occupied lands during that decade remain unresolved.',source.nipmuc,hassan);
  add(bay,'1698',null,'Hassanamesit Nipmuc families','indigenous','The archaeological site history documents families returning by 1698, including James the Printer?s family. The extent of their holdings within the plantation is unresolved.', 'https://www.fiskecenter.umb.edu/Hassamenesit%20Web/Site%20History%20for%20Webpage.pdf',hassan);
  add(bay,'1675',null,'Nipmuc communities after the outbreak of war','indigenous','The sachem Muttawmp led resistance at Quaboag. Other Nipmuc people pursued neutrality or served as intermediaries. Displacement and return affected individual communities differently.',source.nipmuc);
  add(bay,'1600','1665-02','Pocumtuck at the Deerfield River','indigenous','Pocumtuck settlements, planting grounds and a fortified place are documented along the river. The symbol denotes the artwork’s Pocumtuck locality. No surveyed outer edge or exact fort site is established.',source.deerfield,pocumtuck);
  add(bay,'1665-02','1667','Pocumtuck after the attack on their fort','contested','Historic Deerfield?s narrative dates the attack to early February 1665. Its timeline labels the attack 1664. Survivors moved among neighboring communities and continued using the valley.',source.deerfield,pocumtuck);
  add(bay,'1667','1675','Pocumtuck retained use at Deerfield','indigenous','The first land agreement expressly retained hunting, fishing and gathering rights. English surveys and town incorporation followed. The retained rights had no surveyed boundary in the evidence used here.',source.deerfield,pocumtuck);
  add(bay,'1673','1675-09','Town of Deerfield','english','The 1673 charter established a town where English households had begun settling in 1669. The site is approximate along the Deerfield River.',source.deerfield,deerfield);
  add(bay,'1675-09','1682','Pocumtuck reoccupation at Deerfield','contested','Allied Native forces drove the English from the town in September 1675. Pocumtuck people planted the fields again in 1676. Wartime violence and dispersal leave the distribution of authority unresolved.',source.reoccupation,pocumtuck);
  add(bay,'1682',null,'Resettled town of Deerfield','english','English settlers reoccupied the town site in 1682. Its persistence establishes local administration. The source describes continuing Indigenous ties and conflict in the wider valley.',source.reoccupation,deerfield);
  add(bay,'1686','1689-04-28','Dominion government in Boston','english','The Crown replaced the charter government with royal officials. The seat of the administration was Boston. Local territorial changes need town-level evidence.',source.archives,boston);
  add(bay,'1689-04-28','1692-05-26','Provisional Massachusetts government','english','The overthrow of Andros in Boston restored a provisional government. It operated until the new charter arrived.',source.archives,boston);
  add(bay,'1692-05-26',null,'Province of Massachusetts Bay','english','William Phips took the oath and the charter was read publicly in Boston on May 16 Old Style, May 26 Gregorian.', 'https://www.colonialsociety.org/node/350',boston);

  add(nh,'1500','1600','Merrimack and upper Connecticut valley communities','unresolved','Late Woodland settlement evidence identifies river villages, agricultural land and seasonal travel. It does not identify an exclusive named polity for each valley in 1500.',source.upland);
  add(nh,'1600','1675','Pennacook and other Abenaki river communities','indigenous','Pennacook, Winnipesaukee, Pigwacket, Sokoki, Cowasuck and Ossipee are associated with distinct river and lake communities. Seasonal mobility and kinship linked them. Their political divisions at any given date remain uncertain.',source.dover);
  add(nh,'1600','1675','Pennacook communities at Pawtucket and Wamesit','indigenous','The lower Merrimack falls and the Concord River confluence linked two Pennacook settlements with seasonal fishing grounds. In the mission period, English observers distinguished Christian Wamesit residents from other Pennacook people.',source.falls,wamesit);
  add(nh,'1675',null,'Pennacook diaspora in the Merrimack valley','contested','Wartime expulsions broke up the lower river settlements. Some residents traveled upriver or joined allied communities. A single replacement boundary would obscure these movements.',source.falls,wamesit);
  add(nh,'1623','1641','Dover and lower Piscataqua settlements','english','Dover’s chronology places the founding in 1623. The upper and lower plantations developed their own governments. The coastline at these locations is missing from the illustrated sheet.',source.doverTown);
  add(nh,'1638','1643','Exeter at Squamscott','english','Wheelwright’s settlers organized at the falls on the Squamscott and governed by a local agreement before entering Massachusetts jurisdiction.',source.exeter);
  add(nh,'1638','1641','Winnacunnet and Hampton','english','Massachusetts granted the plantation in 1638. Its 1639 order authorized residents to elect officers and send a deputy. This jurisdiction applied to the town.',source.hampton);
  add(nh,'1641','1680','Piscataqua towns under Massachusetts Bay','english','Dover and Strawberry Banke accepted Massachusetts jurisdiction in 1641. Hampton already answered to Massachusetts. Exeter joined in 1643. The 1679 royal commission preceded the new council’s work in 1680.',source.nhHistory);
  add(nh,'1679','1680','Commission for a separate New Hampshire government','claim','The Crown authorized a separate provincial government in 1679. President John Cutt began governing from Portsmouth in 1680.',source.nhHistory);
  add(nh,'1680','1686','First Province of New Hampshire','english','The president and council governed the settled seacoast towns from Portsmouth. The provincial commission does not document effective administration up the Merrimack.',source.nhHistory);
  add(nh,'1686','1689','New Hampshire under the Dominion','english','The royal government incorporated the New Hampshire towns into the Dominion of New England.',source.nhHistory);
  add(nh,'1689','1690','New Hampshire town governments','english','After the Dominion fell, the towns administered their affairs without a provincial executive. At Cochecho the destruction of garrisons in 1689 disrupted the English settlement.',source.doverTown);
  add(nh,'1690','1692','New Hampshire towns under Massachusetts','english','The towns temporarily returned to government under Massachusetts. The state manual distinguishes this interval from the preceding town governments.',source.nhHistory);
  add(nh,'1692',null,'Restored Province of New Hampshire','english','Royal provincial administration resumed. Its governing institutions operated in seacoast settlements. Interior Abenaki authority continued.',source.nhHistory);
  add(nh,'1693',null,'New Castle on Great Island','english','The 1693 charter separated Great Island and adjacent mainland lands from Portsmouth. Neither the island shore nor the charter’s creek and mainland bounds can be located securely on this sheet.', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Bi-centennial_souvenir_%28IA_bicentennialsouv00curt%29.pdf');

  const maineGrantChronology = 'https://www.yorkmaine.org/DocumentCenter/View/10984/Chronology-of-Maine-History';
  const maineGrantReport = 'https://lldc.mainelegislature.org/Open/Rpts/PubDocs/PubDocs1909v2/PD1909v2_17.pdf';
  const nhGrantChronology = 'https://publications.newberry.org/ahcb/documents/NH_Consolidated_Chronology.htm';
  // These instruments establish claims. The inland survey lines are unresolved on the artwork.
  add(nh,'1622-08-20','1629-11-17','Gorges and Mason grant','claim','The Council for New England granted Ferdinando Gorges and John Mason the Province of Maine between the Merrimack and Sagadahoc. The instrument carried the claim to the river heads and sixty miles from the entrances. Later grants changed the proprietors’ claims. No acreage is stated. Indenture of 10 August 1622 Old Style, territorial clause.','https://avalon.law.yale.edu/17th_century/me01.asp');
  add(nh,'1629-11-17',null,'Mason’s New Hampshire patent','claim','After division of the joint Gorges–Mason grant, the Council for New England granted John Mason the tract between the Merrimack and Piscataqua, extending up to sixty miles inland. Indenture of 7 November 1629 Old Style. Mason’s proprietary claim continued to be asserted under later governments.',nhGrantChronology);
  add(nh,'1629-11-27',null,'Laconia patent','claim','The Council for New England granted Gorges and Mason a claim around the Iroquois lakes and rivers, with a ten-mile reach on the south or east sides. They could select 1,000 acres at a port on previously ungranted land for transport inland. The speculative lake geography cannot be traced here. Indenture of 17 November 1629 Old Style, territorial and port clauses.','https://avalon.law.yale.edu/17th_century/charter_003.asp');
  add(me,'1630-01-23',null,'Plymouth’s Kennebec patent','claim','The Council for New England granted William Bradford and associates both the Plymouth territory and a separate trading tract between Cobbiseconte (Comasee-Conte) and the falls at Mequamkike, fifteen miles on either side of the Kennebec. The instrument excepted Admiralty jurisdiction. The Cushnoc post predated the grant. Source: Bradford patent, Kennebec clause, 13 January 1629/30 Old Style.','https://avalon.law.yale.edu/17th_century/mass02.asp');
  add(me,'1630',null,'Oldham and Vines grant at Saco','claim','The instrument described a tract four miles along the coast and eight miles inland. Its survey corners remain unregistered.',maineGrantChronology);
  add(me,'1630',null,'Lygonia or Plough patent','claim','The Company of Husbandmen received a patent later used to assert proprietary jurisdiction on the Maine coast.',maineGrantChronology);
  add(me,'1630',null,'Beauchamp and Leverett’s Muscongus patent','claim','The Muscongus tract became known as the Waldo Patent. The patent identifies a proprietary tract in Wabanaki country.',maineGrantReport);
  add(me,'1631-11-11',null,'Cammock’s Black Point patent','claim','The Council for New England granted Thomas Cammock and associates 1,500 acres on the east side of Black Point River, now in Scarborough. Alienation required consent. The inland bounds are unregistered. The indenture is dated 1 November 1631 Old Style. Council minutes record sealing on 4 November. Baxter, Trelawny Papers, pp. 10–13.','https://upload.wikimedia.org/wikipedia/commons/f/f7/...Trelawny_papers_%28IA_trelawnypapers01baxt%29.pdf');
  add(me,'1631-12-17',null,'Trelawney and Goodyear patent','claim','The Council granted a tract at Cape Elizabeth to Robert Trelawney and Moses Goodyear. John Winter managed the fishing enterprise at Richmond Island. Baxter, Trelawny Papers, pp. 1–9, indenture of 7 December 1631 Old Style.','https://upload.wikimedia.org/wikipedia/commons/f/f7/...Trelawny_papers_%28IA_trelawnypapers01baxt%29.pdf');
  add(me,'1631',null,'Agamenticus grant to Gorges and Norton','claim','Ferdinando Gorges the younger, Walter Norton and associates received a grant at the Agamenticus River, now the York River.',maineGrantReport);
  add(me,'1631-11',null,'Bradshaw grant at Pejepscot','claim','The Council for New England recorded the sealing of a 1,500-acre patent to Richard Bradshaw above the head of Pashippscot on the north side, excluding previous grants. It required consent to alienation and reserved mineral shares. The sealing minute of 4 November 1631 Old Style does not give the date on the engrossed grant. Records of the Council for New England, pp. 49–51.','https://upload.wikimedia.org/wikipedia/commons/e/ea/Records_of_the_Council_for_New_England_%28IA_recordsofcouncil00coun%29.pdf');
  add(me,'1631',null,'Stratton’s Cape Porpoise grant','claim','John Stratton received two thousand acres at Cape Porpoise. The source gives the locality and acreage.',maineGrantReport);
  add(me,'1632',null,'Aldsworth and Elbridge’s Pemaquid patent','claim','The patent for 12,000 acres names Muscongus and Damariscotta as coastal limits. The instrument’s February 1631 Old Style date falls in 1632 using a January-based year.', 'https://www.maine.gov/dacf/parks/discover_history_explore_nature/history/colonialpemaquid/research/books/Ten_Years_at_Pemaquid.pdf');
  add(me,'1632',null,'Way and Purchase patent at Pejepscot','claim','George Way and Thomas Purchase received a grant on the Pejepscot, now the Androscoggin. The inland interpretation remains uncertain.',maineGrantReport);
  add(me,'1500','1605','Wabanaki communities of the Maine coast','unresolved','Villages and seasonal sites occupied the tidal rivers before Champlain’s survey. The consulted sources supply no sixteenth-century boundary between the Saco, Androscoggin and Kennebec communities.',source.wabanaki);
  add(me,'1605','1608','Chouacoit on the lower Saco','indigenous','Champlain’s 1605 plan locates houses and planted fields beside the Saco estuary. A 1607 attack disrupted the settlement. Registration stops short of this coast on the main artwork.',source.saco);
  add(me,'1608','1675','Wabanaki communities on the coastal rivers','indigenous','The Saco and Kennebec records locate communities around river mouths. The 1610s epidemics disrupted coastal settlements. Sources leave the changing inland limits and allegiance of individual villages unresolved.',source.wabanaki);
  add(me,'1639-04-13','1649','Gorges’s charter for Maine','claim','The Crown granted Gorges a province in April 1639. Documentary History gives April 3 Julian and April 13 Gregorian. Local courts at Agamenticus establish a narrower working jurisdiction.',source.maineRecords);
  add(me,'1640','1649','Gorges government at Agamenticus','english','Officials governed from the lower York River. Local settlements formed a new compact following Gorges’s death. The charter’s reach exceeded the documented settlements.', 'https://www.yorkmaine.org/685/17th-Century');
  add(me,'1649','1652','Compact of Wells, Gorgeana and Piscataqua','english','These three settlements organized a government under Edward Godfrey. Their July 1649 compact identifies the participating communities.',source.maineRecords);
  add(me,'1652','1665-07-03','York and Kittery under Massachusetts','english','York and Kittery submitted in 1652. Massachusetts administered Yorkshire. Gorges’s heirs disputed the jurisdiction, and in 1662 officials from both sides sat in court.',source.york);
  add(me,'1653-07','1665-07-03','Wells, Cape Porpoise and Saco under Massachusetts','english','Local acts of submission in July 1653 extended Massachusetts administration to these coastal settlements. Black Point, Blue Point, Spurwink and Casco followed in 1658.',source.york);
  add(me,'1665-07-03','1668-07','Royal commissioners at York','english','On June 23 Julian, July 3 Gregorian, royal commissioners received the province and appointed local justices. Massachusetts protested. This transfer concerned English civil jurisdiction.',source.maineRecords);
  add(me,'1668-07','1680','Massachusetts court restored at York','english','Massachusetts ordered submission in May and its commissioners enforced the change at York in July 1668. The purchase of the Gorges title in 1678 changed proprietorship.',source.york);
  add(me,'1675','1678','Wabanaki resistance on the southern Maine rivers','contested','War disrupted English settlement at the Saco and other coastal rivers. Surviving garrisons and local Wabanaki authority make a continuous colonial belt untenable.',source.sacoWar);
  add(me,'1678','1688','Wabanaki and English settlement under the Casco peace','indigenous','Negotiators at Casco agreed that returning English settlers would provide corn annually. Wabanaki leaders retained a role in setting conditions for settlement. The original treaty is lost and accounts differ on the obligations.',source.treaty);
  add(me,'1680','1686','Province of Maine under Thomas Danforth','english','Massachusetts organized a provincial government with Danforth as president. Authority on the ground remained concentrated in settlements and courts.',source.maineGov);
  add(me,'1686','1689','Maine under Dominion administration','english','The Dominion absorbed the provincial government. English officials continued to govern the surviving southern settlements.',source.maineGov);
  add(me,'1689','1692-05-26','Danforth administration restored','english','After the fall of the Dominion, Maine returned to the provincial administration under Massachusetts. War disrupted its effective reach at coastal settlements.',source.maineGov);
  add(me,'1688','1699','Wabanaki and English conflict on the coast','contested','Renewed warfare forced settlers away from Saco Falls. By 1690 the inland houses and mills had been abandoned. Further negotiations and truces did not immediately restore settlement.',source.sacoWar);
  add(me,'1692-05-26',null,'Massachusetts provincial government in southern Maine','english','The new provincial charter brought Maine into Massachusetts. The York and Wells settlements experienced attacks in 1692. Survival of local garrisons gives no measure of control farther inland.', 'https://www.me.ng.mil/About/Our-History/Settlement-of-the-Province-of-Maine/');
  add(me,'1699',null,'Wabanaki diplomacy after the Casco negotiations','indigenous','Wabanaki representatives and Massachusetts renewed a peace at Casco in 1699. The terms and the authority of particular signatories were debated. The agreement supplies no line enclosing English occupation.',source.treaty);

  add(edge,'1500','1600','Upper Connecticut and Champlain basin communities','unresolved','Archaeological evidence records long use of river floodplains. The Winooski site study describes successive seasonal occupations. It gives no dated jurisdictional perimeter in 1500.',source.north);
  add(edge,'1600','1650','Western Abenaki river communities','indigenous','Sokoki and Cowasuck communities are associated with the middle and upper Connecticut River. Communities west of the divide used the Champlain drainage. Political limits between those places remain uncertain.',source.north);
  add(edge,'1650','1675','Sokoki and allies in the upper valley','contested','During the 1650s and 1660s, alliances with other Indigenous communities and the French in conflicts with Haudenosaunee affected settlement. The starting year marks a decade of activity.',source.missisquoi);
  add(edge,'1675','1688','Western Abenaki refuge and alliance networks','indigenous','Families displaced from the Merrimack and Connecticut valleys found refuge among related communities, including at Missisquoi. Some moved to Sillery or Schaghticoke. These alliances crossed river basins.',source.missisquoi);
  add(edge,'1688',null,'Western Abenaki alliances in the northern valleys','indigenous','Communities in the Champlain and Connecticut basins allied with the French during the 1688–1697 war and retained their own political authority. The sources do not establish a new perimeter at the peace.',source.missisquoi);
  const lancasterRecords = 'https://brittlebooks.library.illinois.edu/brittlebooks_open/Books2009-08/lancas0001earrec/lancas0001earrec.pdf';
  const lancasterSurvey = 'https://www.sec.state.ma.us/divisions/mhc/preservation/survey/town-reports/archives/lan.pdf';
  const lancasterBounds = [[4547,3003],[4815,3108],[4651,3288],[4633,3424],[4416,3338]];
  const northampton = 'https://historicnorthampton.org/timeline/';
  const squakheag = 'https://www.northfieldma.gov/DocumentCenter/View/499/Appendix-B---Inventory-PDF';
  const springfield = 'https://www.sec.state.ma.us/divisions/mhc/archaeology/download/Indian_Crossing_Site_REPORT.pdf';
  add(bay,'1600','1675','Nashaway at Waushacum','indigenous','East and West Waushacum ponds anchored the Nashaway settlement and the seat of Sholan. Nashaway people also used the valley at the confluence farther east. Farm and fishing rights had local dimensions within the wider Nipmuc network.', 'https://www.sec.state.ma.us/divisions/mhc/preservation/survey/town-reports/archives/ste.pdf',[4431,3282]);
  add(bay,'1643','1653-05-28','Nashaway plantation proprietors','claim','Sholan’s agreement around 1643 preceded the trading post at George Hill and the organization of a town. The deed and private enterprise alone did not establish township government.',lancasterSurvey,[4575,3216]);
  add(bay,'1653-05-28','1659','Court-authorized Lancaster township','english','The 18 May 1653 Old Style order defined the township from the Nashua ford, five miles each north, south and east and three miles west. This approximates its intended limits before a field survey.',lancasterRecords,[[4474,3030],[4762,3030],[4762,3390],[4474,3390]]);
  add(bay,'1659','1672-10-28','Lancaster under the Court’s committee','english','Thomas Noyes measured the township in 1659. The mapped traverse starts near the river confluence and follows his directions, distances and bend at Whipsuffrage. Original monuments and the exact ford remain uncertain. The Court had yet to approve the return.',lancasterRecords,lancasterBounds);
  add(bay,'1672-10-28','1676-02','Lancaster under confirmed bounds','english','The deputies gave final consent on 18 October 1672 Old Style, reserving a 640-acre farm for public use. The location of that reservation is uncertain. This is the measured township with an estimated ford and orientation.',lancasterRecords,lancasterBounds);
  add(bay,'1676-02','1679','Lancaster during wartime abandonment','contested','The February attack and evacuation interrupted town government here. The previous township was still claimed. Nashaway parties and their allies acted independently during the war.',lancasterSurvey,lancasterBounds);
  add(bay,'1679','1681','Rebuilding Lancaster','english','The county committee authorized rebuilding in 1679. Accounts place actual return between then and 1681. The historic house lots by the Nashua were reoccupied before the surrounding farms.',lancasterSurvey,[4575,3216]);
  add(bay,'1681',null,'Reoccupied township of Lancaster','english','Families again governed and occupied the township. Its former grant remained in force, as the 1701 confirmation by Sholan’s nephew George Tahanto attests. The extra lands obtained in 1701 lie outside this reconstruction.',lancasterRecords,lancasterBounds);
  add(bay,'1600','1653','Nonotuck communities on the middle Connecticut','indigenous','Nonotuck people cultivated the floodplain and lived around the great bend of the Connecticut River. The local sachems’ relations to the river and meadows are documented more securely than the limits of any single district.',northampton,[2960,3498]);
  add(bay,'1653','1675','Nonotuck after the Northampton deed','indigenous','Several Nonotuck sachems negotiated the September 1653 agreement. Northampton’s museum distinguishes continuing Native uses of the valley from the settlers’ understanding of title.',northampton,[2960,3498]);
  add(bay,'1654',null,'Town of Northampton','english','The first English families settled near the meadows on the west side of the Connecticut in 1654, after the deed and court permission the previous year. The point locates the settlement approximately.',northampton,[2920,3477]);
  add(bay,'1636',null,'Springfield plantation on the Connecticut','english','William Pynchon’s party established the east-bank settlement in 1636. The agreement covered meadows from Longmeadow toward Chicopee and preserved planted ground separately. Only a settlement locality is drawn because the deed resolves few transverse bounds.',springfield,[2963,3995]);
  add(bay,'1636','1675','Agawam rights retained in planting ground','indigenous','Commuck and Metaneham acted for several rights holders in the 1636 bargain, which excluded already planted land. The record distinguishes holdings on each bank and underlines the limits of the English purchase. The individual fields remain unlocated.', 'https://tile.loc.gov/storage-services/service/gdc/gdclccn/84/24/25/19/84242519/84242519.pdf');
  add(bay,'1600','1675','Squakheag community on the Connecticut','indigenous','Squakheag people occupied the intervales near the river crossing. English town records describe land dealings in the 1670s. They leave the bounds of the earlier polity unresolved.',squakheag,[3236,2604]);
  add(bay,'1673','1675-09','English plantation at Squakheag','english','Settlers established a plantation in 1673 and fled in September 1675. This locality is on the east bank of the Connecticut.',squakheag,[3224,2593]);
  add(bay,'1675-09','1683','Squakheag and allied river peoples','contested','After the settlers withdrew, Squakheag, Pocumtuck, Nonotuck and Agawam people gathered near Bennett’s Meadow in 1676. The dates of return and control of individual fields remain uncertain.',squakheag,[3236,2604]);
  add(bay,'1683','1688','Second English settlement at Squakheag','english','Households again occupied the crossing by 1683. Their settlement clustered near the river and Mill Brook. The records disagree about the final evacuation.',squakheag,[3224,2593]);
  add(bay,'1688',null,'Contested upper river crossing at Squakheag','contested','Accounts date the settlers’ withdrawal to the 1688 attack or to 1690. Local authority at the crossing during the following years is unresolved. Permanent English resettlement followed after this timeline.', 'https://americancenturies.org/collection/l02-006/',[3236,2604]);
  const penobscot = 'https://www.penobscotnation.org/services/cultural_historic_preservation/historic_preservation/tribal_timeline/index.php';
  add(me,'1568','1615','Bessabez and the Penobscot River','indigenous','The Penobscot Nation dates an account naming the chief Bessabez to 1568 and his death to 1615. The documentary interval is long. The tribal chronology connects these accounts without specifying a continuous perimeter. The river lies beyond the registered artwork.',penobscot);
  add(me,'1607','1608','Popham colony at the Kennebec mouth','english','The English operated Fort St George at the river mouth. Its brief occupation took place within Wabanaki country. The fort is outside the registered main sheet.',penobscot);
  add(me,'1615',null,'Penobscot River communities','indigenous','Penobscot accounts describe the death of Bessabez, epidemics, trade and changing alliances. French trading and military activity at Pentagoet from 1635 concerned a particular coastal post. The watershed’s settlements and political boundaries cannot be traced on this artwork.',penobscot);
  add(bay,'1639','1650','Squaw Sachem’s reserved lands at the Mystic Lakes','indigenous','In their Charlestown deed, Squaw Sachem and Webcowit reserved ground on the west side of the Mystic Lakes during her lifetime. The surviving terms distinguish the reserved land and uses from the grant. The western perimeter is unresolved.', 'https://sandbox.arlingtonhistorical.org/wp-content/uploads/2021/05/truemeaningofmenotomy.pdf');
  add(bay,'1684','1687','Wenepoykin’s heirs on the Essex coast','indigenous','The Essex registry identifies the family of Wenepoykin as parties to the Marblehead and Salem deeds. The 1686 Salem deed and witness depositions concern Naumkeag. This is evidence for specific retained rights recognized in transactions.', 'https://salemdeeds.com/NAD/indiandeedsummary_9-20-06.pdf',salem);
  add(bay,'1676',null,'Nonotuck, Pocumtuck and Woronoco after dispersal','indigenous','After the invitation to Schaghticoke in 1676, families continued moving between the Connecticut and Hoosic valleys and communities farther north. Individual tenures after the war cannot be enclosed from these records.', 'https://historicnorthampton.org/topic/native-histories/nonotuck-to-northampton-recovering-indigenous-stories/');
  window.authorityRecords.push(...records);
}

// The Penobscot and Pemaquid estuaries have no registerable coastline on the
// main sheet. The regional index preserves their governments and separate dates.
{
  const region = 'Maine';
  const castine = 'https://www.walkwhere.org/archives/fort-pentagoet-contested-territory';
  const pemaquid = 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/colonialpemaquidbrochure.pdf';
  const papers = 'https://www.maine.gov/dacf/parks/discover_history_explore_nature/history/colonialpemaquid/research/books/Papers_Relating_to_Pemaquid_and_Parts_Ad.pdf';
  for (const [from, until, name, status, detail, url] of [
    ['1629','1635','Plymouth trading house on the Bagaduce','english','Plymouth traders operated on the Penobscot estuary. The excavated post provides a locality within Penobscot country.', 'https://www.maine.gov/dacf/municipalplanning/comp_plans/Castine_2024.pdf'],
    ['1635','1654','French trading fort at Pentagoet','french','Archaeology identifies a fortified commercial post where the Bagaduce meets the Penobscot. Its garrison governed the post. Penobscot people continued to control access and exchange in the wider river country.',castine],
    ['1654','1670','English possession of Pentagoet','english','English forces captured the French post in 1654. Local occupation was intermittent. The return provided for at Breda in 1667 took place in 1670.',castine],
    ['1670','1674','Acadian government at Pentagoet','french','Grandfontaine reoccupied the fort and maintained a small garrison. Chambly succeeded him. The defensible extent is the post on the estuary.','https://www.biographi.ca/en/bio/22?revision_id=13'],
    ['1674','1675','Dutch seizure of Pentagoet','contested','Aernoutsz’s privateers captured the fort and removed the French governor. Its destruction and the failure to maintain a garrison leave no evidence of sustained Dutch administration on the Penobscot.','https://www.atlasofmutualheritage.nl/page/9563/pentagouet-fort'],
    ['1675','1699','Madockawando, Saint-Castin and the Penobscot','indigenous','Kinship, trade and diplomacy at the estuary linked Saint-Castin with Madockawando. Both led Penobscot forces in 1690. English and French claims did not settle which government could dispose of Penobscot land.','https://www.biographi.ca/en/bio/594?revision_id=31736'],
    ['1500','1676','Wawenock communities of the Damariscotta estuary','indigenous','Long occupation and the oyster middens locate Indigenous communities at the river. French and English fisheries appeared along the coast. The earlier distributions of authority between neighboring estuaries are unresolved.','https://www.damariscotta.maine.gov/277/Town-History'],
    ['1664','1677','Duke of York’s Pemaquid claim','claim','The grant included Pemaquid. Massachusetts asserted a competing jurisdiction during the Dutch restoration at New York. An English garrison under New York authority followed only after wartime abandonment.',papers],
    ['1676','1677','Wabanaki attacks and evacuation at Pemaquid','contested','Warfare forced the colonists to leave the river settlement. No survey distinguishes control of particular houses, fields or fishing stations after the evacuation.',pemaquid],
    ['1677','1687','Fort Charles and Pemaquid under New York','english','A garrison protected a resettled local community. The 1683 county act provided for representation from Cornwall. The royal transfer to the Dominion came later.',papers],
    ['1687','1689','Pemaquid under Dominion officials','english','The royal order transferring the fort and country from New York to the Dominion was implemented by 1687. The fortified settlement marks the extent securely occupied.','https://publications.newberry.org/ahcb/documents/ME_Consolidated_Chronology.htm'],
    ['1689','1692','Wabanaki capture of Fort Charles','contested','Wabanaki forces took the fort and the English abandoned the settlement for three years. This military outcome leaves inland boundaries unresolved.','https://www.maine.gov/dacf/parks/discover_history_explore_nature/history/colonialpemaquid/fort_charles.shtml'],
    ['1692','1696','Massachusetts garrison at Fort William Henry','english','Massachusetts built a new fort on the Pemaquid River. Its garrison held the site until 1696.',pemaquid],
    ['1696',null,'Wabanaki and French victory at Pemaquid','contested','French and Wabanaki forces took Fort William Henry. English garrison occupation ended, and the settlement remained abandoned through 1700. The victory supplies no division of the surrounding coast.',pemaquid],
  ]) window.authorityRecords.push({region, from, until, name, status, detail, url});
}

{
  const region = 'Northern edge';
  for (const [from, until, name, status, detail, url] of [
    ['1609','1610','Champlain and Indigenous allies at Bitawbagw','claim','Champlain traveled with Indigenous allies and claimed the region for France. A military encounter near the lake documents an alliance and conflict. There was no resident French garrison on the lake at this date.','https://vermonthistory.org/new-frontier-the-french-in-vermont'],
    ['1666-07','1669','French garrison at Fort Sainte Anne','french','The Carignan-Salières regiment built this post on Isle La Motte. Excavation and records locate the garrison on one island in a lake used by Western Abenaki and Mohawk communities. The island cannot be registered on this sheet.','https://vtarchaeology.org/wp-content/uploads/VAS_Vol15_Jamison.pdf'],
    ['1669','1690','Isle La Motte after the last documented occupation','unresolved','Evidence of garrison occupation ends around 1668. Accounts differ on the year of abandonment. By 1690 the fort was in ruins. No continuous French occupation is inferred from the earlier garrison.','https://www.vtarchaeology.org/wp-content/uploads/v7_ch3_reduced.pdf'],
  ]) window.authorityRecords.push({region, name, from, until, status, detail, url});
}
