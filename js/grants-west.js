// Dates in the Dutch record books use the Gregorian calendar. Point coordinates
// identify localities on the illustrated sheet. The grant text supplies the bounds.
{
  const hudson = 'Hudson Valley and Manhattan';
  const island = 'Long Island';
  const places = {
    manhattan: [hudson, 'Manhattan', [520,7050]],
    upper: [hudson, 'northeastern Manhattan', [575,6930]],
    town: [hudson, 'New Amsterdam', [441,7191]],
    brooklyn: [island, 'western Long Island, Brooklyn vicinity', [478,7215]],
    newtown: [island, 'Maspeth / Newtown Creek vicinity', [549,7154]],
    gowanus: [island, 'Gowanus vicinity', [478,7215]],
    gravesend: [island, 'Gravesend and Coney Island vicinity', [506,7388]],
    midwout: [island, 'Midwout (Flatbush)', [552,7274]],
    flatlands: [island, 'Amesfoort (Flatlands)', [570,7324]],
    utrecht: [island, 'New Utrecht', [463,7346]],
    hellgate: [island, 'Queens shore of Hell Gate', [573,7001]],
    oyster: [island, 'Oyster Bay vicinity', [1237,6856]],
    islandUnclear: [island, 'unlocated Long Island tract', null],
    bronx: [hudson, 'Bronx shore of Long Island Sound', [666,6872]],
    jersey: [hudson, 'west bank of New York Harbor', [341,7194]],
    albany: [hudson, 'Beverwyck (Albany)', [1007,2701]],
    catskill: [hudson, 'Catskill, west bank of the Hudson', [615,3670]],
    esopus: [hudson, 'Esopus (Kingston) vicinity', [446,4263]],
    bethlehem: [hudson, 'tidal Hudson south of Albany', [993,2870]],
    staten: [hudson, 'Staten Island', [294,7445]],
    pagganck: [hudson, 'Pagganck', [429,7232]],
    yonkers: [hudson, 'lower Hudson near Yonkers', [660,6580]],
    greenwich: [hudson, 'Byram and Mianus river vicinity', [1050,6470]],
    unclear: [hudson, 'New Netherland', null]
  };
  const pagganckShore = [[421,7229],[428,7225],[432,7226],[435,7229],[435,7234],[432,7238],[426,7239],[424,7237],[425,7231],[422,7233]];
  const fishersShore = [[3930,6001],[3934,5995],[3938,5994],[3938,5992],[3944,5988],[3944,5984],[3950,5975],[3952,5984],[3955,5984],[3960,5979],[3961,5961],[3955,5957],[3955,5953],[3959,5947],[3962,5947],[3971,5953],[3984,5955],[3985,5960],[3978,5971],[3978,5975],[3981,5976],[3985,5985],[3992,5985],[3990,5979],[3993,5976],[3993,5971],[4004,5965],[4010,5953],[4011,5940],[4015,5936],[4028,5936],[4032,5939],[4037,5939],[4041,5937],[4049,5937],[4054,5931],[4071,5932],[4075,5927],[4080,5928],[4085,5932],[4088,5932],[4089,5930],[4101,5931],[4102,5925],[4097,5920],[4101,5910],[4106,5910],[4112,5915],[4123,5915],[4124,5913],[4129,5913],[4125,5919],[4124,5925],[4118,5929],[4114,5936],[4106,5938],[4096,5936],[4093,5941],[4085,5938],[4085,5940],[4079,5945],[4079,5950],[4077,5951],[4060,5946],[4051,5954],[4047,5961],[4028,5965],[4018,5978],[4010,5984],[4005,5993],[3998,5998],[3988,5998],[3983,6000],[3974,5993],[3965,5992],[3955,6002],[3946,6006],[3931,6008]];
  const landPapers = 'https://nc-chap.org/resources/CTGehring_Land_Papers.pdf';
  function dutch(id, page, from, grantee, tract, place, extent, boundary, kind = 'patent', authority = (from >= '1647-05-11' ? 'Petrus Stuyvesant and the New Netherland council' : 'Willem Kieft and the New Netherland council'), until = null) {
    const [region, location, point] = places[place];
    const citation = 'NYSA A1880, ' + id + '. C. T. Gehring, Land Papers, p. ' + page + '.';
    const detail = authority + ' • ' + kind + ' to ' + grantee + '. ' + boundary +
      (extent ? ' Recorded extent: ' + extent + '.' : '') +
      (place === 'pagganck' ? '' : point ? ' The point marks ' + location + ' at locality scale. Parcel corners are unresolved.' : ' The record does not securely place the tract on this sheet.') + ' ' + citation;
    const record = {region, from, until, name:tract + ' • ' + grantee, status:'claim',
      detail, url:landPapers + '#page=' + (page + 12), authority, grantee, tract,
      location, acreage:extent, boundary, instrument:kind, citation};
    if (place === 'pagganck') record.ring = pagganckShore;
    else if (point) record.point = point;
    window.authorityRecords.push(record);
  }
  dutch('GG 20',7,'1637-06-16','George Rapalje','Rinnegachonck (Rumegaconck)','brooklyn',null,'Kakapetteyno and Pewichaas appeared with the community’s consent. The deed runs from the creek to woods and a thicket by running water. The area was left blank. See the subsequent patent at GG 64.','Indigenous deed recorded before the council','Kakapetteyno and Pewichaas');
  dutch('GG 21',7,'1638-07-20','Andries Hudde','Land behind Corler’s plantation','upper','100 morgens','The grant locates the tract inland of Corler at the northeastern end of the island. Its conditions include a produce tithe after ten years.');
  dutch('GG 32',11,'1639-11-15','George Homs and Tomas Hal','Deutel Bay tobacco plantation','manhattan',null,'From Deutel Bay to Schepmoes’s creek along the East River, with equal depth inland. The stated distance was 100 rods of 13 feet.');
  dutch('GG 33',11,'1639-11-28','Thomas Bescher','Saphorakan tobacco plantation','brooklyn',null,'The reed marsh on the North River Bay shore anchors a tract measuring 300 paces alongshore and the same distance inland.');
  dutch('GG 34',11,'1640-05-22','Philip de Truy','Smit’s marsh shore tract','manhattan',null,'Van Tienhoven and Davidt Provoost occupied adjoining land. The beach frontage reached Provoost’s fence.');
  dutch('GG 36',12,'1640-08-02','Pieter van der Linden','Old Wreck creek plantation','manhattan',null,'The instrument follows the East River beach for 300 paces from the creek known as the Old Wreck, beside Tonis Cray and Claes Sybrantsen.');
  dutch('GG 37',12,'1640-08-08','Abraham Ryken','Rinnegaconck creek land and hay marsh','brooklyn',null,'Kieft recited a 1638 grant with 500 paces along the creek and added one third of the hay marsh behind the Rapalje and Ryken properties.','confirmation and enlargement');
  dutch('GG 37 (recital)',12,'1638','Abraham Ryken','Rinnegaconck original allotment','brooklyn',null,'The 1640 instrument dates the original creek tract to 1638. The hay-marsh share was added in 1640.','grant recited in later patent');
  dutch('GG 39',12,'1641-05-29','Pieter Montfoort','Montfoort creek-side tract','brooklyn',null,'Between Jan Montfoort and Peter Italiaens, 300 paces wide and extending inland to the woods. Compare the surveyed tobacco tract in GG 63.');
  dutch('GG 40',12,'1641-05-29','Jan Montfoort','Renegakonck tract','brooklyn',null,'The creek-side tract bordered Pieter Montfoort and extended 350 paces toward the woods. Compare GG 87.');
  dutch('GG 41',13,'1641-08-29','George Bacxter and Walter Harfoortsz','Two-creek plantation','manhattan',null,'The bounds run between two creeks identified by exposed rocks and a fallen tree. The record does not identify modern creek names.');
  dutch('GG 42',13,'1641-09-07','Lambert Huybertsen Mol','Rinnegaconck plantation','brooklyn','25 morgens','Formerly occupied by Cornelis Jacobsz Stillen. The East River, Hans Hansen’s tract and a company-marked tree define the land.');
  dutch('GG 43',13,'1641-09-07','Laurens Cornelisz','Smit’s marsh roadside tract','manhattan',null,'Between Van Tienhoven and the highway by Hendrick Snyder’s palisades. The grant imposed road repair on Cornelisz, then shared maintenance with Van Tienhoven.');
  dutch('GG 46',13,'1642-04-05','Cornelis Lambertsz Cool','Gouwanes (Gowanus) plantation and hay marsh','gowanus','28 morgens (marsh addition)','The plantation lay between the wagon road, Jan Pietersen and Willem Adriaensen. Paths across it remained open. A second parcel adjoined Antony van Salee’s marsh.');
  dutch('GG 48',14,'1642','Tymon Jansen','Mespachtis Kil marsh tract','newtown',null,'East of the creek behind Dominee’s Hook, beside Burger Jorisz and Richard Brudnell. Marked trees and marsh channels defined the parcel and included marsh use.');
  dutch('GG 49',15,'1642-03-28','Francis Doughty and companions','Mespath (Maspeth) town patent','newtown','about 6,666 Holland acres','The four stated sides each measure 2,000 Dutch perches. The description invokes Hans Hansen’s meadow, Richard Brudnall’s plantation and Henry Agricola’s creek. It grants village and court privileges.');
  dutch('GG 54',17,'1642-11-14','Claes Cornelisz van Schouw','Ferry-side East River tract','brooklyn',null,'The tract lay opposite Manhattan, along the river between the ferry and Andries Hudden’s holding.');
  dutch('GG 57',18,'1643-04-28','Hendrick Hendricksz Kip','Fort Amsterdam east-side lot','town',null,'Measured beside Willem Heyl on the east side of the fort.');
  dutch('GG 58; duplicate GG 88',18,'1643-04-28','Burger Jorisz','Fort Amsterdam East River shore lot','town',null,'East of the fort, with sides of 11 and 10 rods. GG 88 records the same grantee, measurements, location and execution date.');
  dutch('GG 59',18,'1643-05-18','Jan Jansz Schepmoes','Fort Amsterdam southeast lot','town',null,'The survey measures the sides of the house lot southeast of the fort.');
  dutch('GG 60',18,'1643-05-18','Marten Crugier','Fort Amsterdam north-side house and garden','town',null,'Measured from the house westward, then toward the fort. The description gives the irregular lot’s individual sides. Returned to the company for the replacement lot in HH 135b.','patent','Willem Kieft and the New Netherland council','1664-01-26');
  dutch('GG 61 (recital)',18,'1639-08-01','Antony Jansen van Salee','Plantation opposite Conynen Island','gravesend','100 morgens','The 1643 instrument explicitly dates the original grant to 1 August 1639 and identifies shore and marsh parcels opposite Coney Island.','grant recited in later patent');
  dutch('GG 61',18,'1643-05-27','Antony Jansen van Salee','Conynen Island shore plantation survey','gravesend','100 morgens','Kieft restated the 1639 grant. A shore tract and a point bounded on three sides by marsh together made up the grant.','confirmation');
  dutch('GG 62',19,'1643-06-02','Isack Allerton and Govert Loockermans','Two lots on the great highway','town',null,'The lots ran from the east side of the highway to the marsh behind them.');
  dutch('GG 63',19,'1643-08-17','Pieter Monfoort','Meyrechkawick tobacco plantation','brooklyn','25 morgens 8 rods','The survey places Jan Monfoort on the east and Pieter Itiliaen on the west. Compare GG 39 and the 1647 enlargement.');
  dutch('GG 63 (endorsement)',19,'1647-05-01','Pieter Monfoort','Meyrechkawick plantation enlargement','brooklyn','220 rods adjoining the earlier tract','The signed endorsement follows the existing direction and breadth and protects other Breuckelen plantations.','enlargement');
  dutch('GG 64',19,'1643-06-17','George Rapaelje','Rumegaconck (Rinnegachonck) patent','brooklyn','167 morgens 406 rods','The surveyed parcel follows a stream and marsh east of Jan Monfoort, then enters the woods. The patent cites the preceding Indigenous conveyance at GG 20.');
  dutch('GG 65',20,'1643-06-17','Pieter Cesar Italiaen','Merechkawick tobacco plantation','brooklyn','24 morgens 450 rods','The marsh and the respective properties of Pieter Monfoort and Michael Picet fix the sides. Also known as Peter Ceser Alberto.');
  dutch('GG 65 (endorsement)',20,'1647-05-01','Pieter Cesar Italiaen','Merechkawick plantation enlargement','brooklyn','220 rods adjoining the earlier tract','The addition retained the previous dimensions and was conditional on protecting neighboring holdings.','enlargement');
  dutch('GG 80',24,'1643-07-13','Domingo Antony','Farm No. 5 rear tract','manhattan','5 morgens 505 rods','The wagon road, freshwater thicket and Tomas Sandersz’s land define the tract.');
  dutch('GG 81',24,'1643-07-13','Catelina, widow of Jochem Antony','Wagon-road tract adjoining Domingo Antony','manhattan','4 morgens 91 rods','The grant reserved a common wagon road between Catelina and Domingo Antony. Tomas Sandersz Smit held the adjoining tract.');
  dutch('GG 95',28,'1644-05-24','Gysbert op Dyck','Conynen (Coney) Island and mainland tract','gravesend','43 morgens 551 rods together','The grant includes the island and marshes plus land at Conynen Hook, with mainland survey courses. The company reserved the right to establish fisheries.');
  dutch("GG 53", 16, "1640-05-27", "Frerick Lubbersz", "Werpos / Gouwanes to Red Hook", "gowanus", null, "From the Gouwanes marsh toward Red Hook. Lubbersz could enter the Indigenous cornlands only if their occupants voluntarily relinquished them.");
  dutch("GG 55", 17, "1642-11-20", "Tomas Hael", "Former Fiscock plantation", "manhattan", null, "Van Twiller and Barent Dircksz held the plantations to its north.");
  dutch("GG 66", 20, "1643-06-22", "Wouter van Twiller", "Red Hook", "brooklyn", null, "The patent identifies this hook on the North River.");
  dutch("GG 69", 21, "1643-07-03", "Christoffel Lourens", "North River Bay shore tract", "unclear", "20 morgens and 400 rods", "The shore tract bordered Indigenous maize land, then ran into the woods. The text does not identify which bay shore.");
  dutch("GG 70", 21, "1643-07-03", "Jan Stevensz", "House and garden north of the fort", "town", null, "The survey starts north of Fort Amsterdam.");
  dutch("GG 71", 22, "1643-07-03", "Tymen Jansen", "Hendrick Jansen boundary tract", "manhattan", null, "Hendrick Jansen’s land lay to its west.");
  dutch("GG 72", 22, "1643-07-03", "Burger Jorisz", "Mespachtes Kil east-bank tract", "newtown", "29 morgens 566 rods", "The survey follows Tymen Jansz and a marsh point.");
  dutch("GG 73", 22, "1643-07-03", "Jacob Wolphertsz", "Ferryman’s East River tract", "brooklyn", "10 morgens and 48 rods", "Cornelis Dircksz held the adjoining ferry lands to the west.");
  dutch("GG 74", 22, "1643-07-06", "Andries Hudden", "Great highway house and garden", "town", null, "The lot had five rods of frontage on the highway.");
  dutch("GG 75", 23, "1643-07-06", "Roelof Jansen Haes", "Company marsh house and garden", "town", null, "The tract lay at the south end of the marsh, northeast of the fort.");
  dutch("GG 76", 23, "1643-07-06", "George Bacxter", "Dirck de Noorman’s creek plantation", "brooklyn", "25 morgens", "The marsh and holdings of Dirck de Noorman and Jan de Sweet marked its limits.");
  dutch("GG 77", 23, "1643-07-06", "Touchyn Briel", "Great thicket tract", "manhattan", "11 morgens, 330 rods", "Between land held by Black residents and Tomas de Smit.");
  dutch("GG 78", 23, "1643-07-06", "Jan Trockmorten", "Vrelant (Throggs Neck)", "bronx", null, "Two tidal channels enclosed a point with half a mile of East River frontage. Also known as John Throckmorton.");
  dutch("GG 79", 24, "1643-07-13", "Rutger Arentsen van Seyl", "Public highway house and garden", "town", null, "Cornelis Volckertsz held the northern parcel.");
  dutch("GG 82", 24, "1643-07-13", "Tymen Jansz", "Burger Jorissen plantation tract", "newtown", "22 morgens 324 rods", "Jan Platneus’s point and Burger Jorissen’s land appear in its bounds.");
  dutch("GG 83", 25, "1643-07-13", "Cornelis Volckertsz", "Two highway houses and gardens", "town", null, "The road and marsh form opposite edges.");
  dutch("GG 84", 25, "1643-07-13", "Tomas Sandersz", "Lot north of Hudden", "town", null, "The house fronted the common highway beside Andries Hudden.");
  dutch("GG 85", 25, "1643-07-28", "Richard Brutnel", "Doughty boundary tract", "newtown", "49 morgens 131 rods", "The tract lies along Doughty’s bounds and the adjoining creek.");
  dutch("GG 86", 25, "1643-08-07", "Adam Roelantsz", "Arent de Smit roadside tract", "town", null, "A house and garden east of Arent de Smit’s lot.");
  dutch("GG 87", 26, "1643-12-01", "Jan Monfoort", "Merechkawich bay plantation", "brooklyn", "28 morgens", "The survey records the land between Joris Rapalye and Pieter Monfoort. Compare GG 40.");
  dutch("GG 89", 26, "1644-01-20", "Hendrick Jansen Snyder", "Double house lot", "town", null, "The survey describes two Manhattan houses and their street frontage.");
  dutch("GG 90", 26, "1644-02", "Tryntien Jonas", "Jacob Constapel boundary lot", "town", null, "West of Constapel and south of the fort. The day is blank in the instrument.");
  dutch("GG 91", 27, "1644-04-25", "Jan Jansen Damen", "Jan Damen’s consolidated tract", "manhattan", null, "The road and Maryn’s adjoining property appear in the survey.");
  dutch("GG 92", 27, "1644-04-28", "Cornelis Melyn", "East River double house lot", "town", null, "Abel Reddenhaes lay immediately east of the houses and garden.");
  dutch("GG 93", 27, "1644-05-24", "Philip Geraerdy", "Common highway double house lot", "town", null, "North of Cornelis Volkertsz on the highway.");
  dutch("GG 96", 28, "1644-05", "Michiel Marschan", "Common canal house and garden", "town", null, "Beside Pieter Itiliaender north of the lot, near the fort.");
  dutch("GG 97", 29, "1644-05", "Claes Jansen van Naerden", "Two house lots south of the fort", "town", null, "Between Rem Jansen and Willem Cornelissen Coster.");
  dutch("GG 98", 29, "1644-06-13", "Hendrick Jansen Smitt", "Allerton and Loockmans boundary lot", "town", null, "East of the lots of Gerrit Douman and Boye Jansen.");
  dutch("GG 99", 29, "1644-09-08", "Pieter Jansen van Gorcum", "Gerrit Douman’s former house lot", "town", null, "On the public highway north of Boy Jansz.");
  dutch("GG 100", 29, "1645-07", "Cornelis van Tienhoven", "Otterspoor farm", "manhattan", "100 morgens", "Van Twiller’s original grantee was Jacob van Curler. The record traces transfer to Tienhoven and his cession to Coenraet van Ceulen.");
  dutch("GG 101", 30, "1645-07", "Jan Snediker", "Two house and garden lots south of the fort", "town", null, "Hans Hansen held the land east of these lots.");
  dutch("GG 102", 30, "1645-09-14", "Tomas Sandersz", "Canal-end house lot", "town", null, "The lot of the late Marten Ael forms its southern boundary.");
  dutch("GG 103", 30, "1645-09-22", "Leendert Aerden", "Highway garden and house", "town", null, "South of the lot of Aert Teunisz.");
  dutch("GG 104", 30, "1645-09-05", "Olof Stevensz", "Op Dyck and Meyndertsz roadside tract", "town", null, "The lot stood on the road between their lands.");
  dutch("GG 105", 31, "1645-09-07", "Ariaen Pietersz van Alkmaer", "North fort house and garden", "town", null, "Marten Krugier held the next lot north.");
  dutch("GG 106", 31, "1645-07-04", "Ritchert Smidt", "Tomas Willet waterfront tract", "town", null, "The lot adjoined Willet on the East River.");
  dutch("GG 107", 31, "1645-07-04", "Teunis Tomasz van Naerden", "Northeast fort house and garden", "town", null, "Isaack de Foreest held land along the southern edge.");
  dutch("GG 108", 31, "1645-07-06", "Jan Eversz Bout", "Gouwanes maize land and woods", "gowanus", "28 morgens, 271 rods", "The former maize fields and woodland adjoined Huych Aertsz by the creek.");
  dutch("GG 109", 32, "1645-09-30", "Claes Jansen van Naerden", "Shore tract opposite the fort", "brooklyn", "21 morgens 200 rods", "The description names Frerick Lubbersz and Jan Manje as neighbors.");
  dutch("GG 110", 32, "1645-09-30", "Herry Peers", "Metselaer roadside lot", "town", null, "Tomas de Metselaer lay west of the tract.");
  dutch("GG 111", 32, "1645-09-30", "Jochim Calder", "House and garden beside Pieter Schoorsteen", "town", null, "The recorded neighbors are Schoorsteen and Michiel.");
  dutch("GG 112", 33, "1645-09-04", "Herry Breser", "Ferryman’s maize-land tract", "brooklyn", "16 morgens 468 rods", "The East River and Cornelis Dircksz’s land anchor the survey.");
  dutch("GG 113", 33, "1645-09-05", "Claes Carstensz", "Jan de Sweet plantation tract", "brooklyn", "29 morgens 553 rods", "The patent places the land behind Jan de Sweet on Long Island.");
  dutch("GG 114", 33, "1645-09-04", "Frerick Lubbertsz", "East River plantation survey", "brooklyn", "15 morgens and 52 rods", "Between Herry Breser and Edwaert Fiscock along the river.");
  dutch("GG 115", 33, "1645-09-05", "Jan Snediger", "Bredenbent garden lot", "town", null, "Between Willem Bredenbent and the northern point at Hendrick Jansz.");
  dutch("GG 116", 34, "1645-09-05", "Juryaen Fradel", "Three Brothers shore tract", "hellgate", "69 morgens 183 rods, including 8 morgens of marsh", "West of the great bay, east of Hell Gate, opposite the Three Brothers islands.");
  dutch("GG 117", 34, "1645-09-05", "Antony Portugies", "Manuel Trompetter boundary tract", "manhattan", "6 morgens, 425 rods", "The tract ran from Trompetter’s land to a thicket and neighboring landholders.");
  dutch("GG 118", 34, "1645-09-12", "Andries Hudden", "Tract opposite Fort Amsterdam", "brooklyn", "27 morgens 256 rods", "Jan Manje and Frerick Lubbersz’s maize field bounded the tract.");
  dutch("GG 119", 34, "1645-09-05", "Isaack D'Foreest", "Philip Gerard boundary lot", "town", null, "The house and garden included an alley between neighboring properties.");
  dutch("GG 120", 35, "1645-10-19", "Leendert Aerden", "Bylevelt’s Bouwery", "manhattan", "39 morgens", "Situated behind Corlaer’s plantation at the marsh.");
  dutch("GG 121", 35, "1645-10-19", "Pieter Andersz", "Public tavern house lot", "town", null, "Between Jacob Wolphertsz and Jochim Calder behind the inn.");
  dutch("GG 122", 36, "1645-10-19", "Pieter Andriesz", "Domine’s Point waterfront", "newtown", "74 morgens, 327 rods", "Across from Hogs’ Island, east of the point and reaching Jochom Pietersz’s marsh.");
  dutch("GG 123", 36, "1645-10-22", "Eduaert Marrel", "Corlaer plantation boundary tract", "manhattan", "11 morgens 200 rods", "Extended from the shore across a marsh between Cornelis Jacobsz and Corlaer.");
  dutch("GG 124", 36, "1645-10-19", "Toechyn Briel", "Freshwater thicket tract", "manhattan", "11 morgens, 330 rods", "Between Tomas Sandersz and Black landholders. Compare Briel’s GG 77.");
  dutch("GG 125", 36, "1645-10-19", "Groot Manuel", "Touchyn Briel boundary tract", "manhattan", "4 morgens, 386 rods", "Touches Briel and Anna, two recorded neighbors.");
  dutch("GG 126", 37, "1645-11-03", "Edwaert Marrel", "Thicket house and garden", "town", null, "East of Isaac Allerton and Govert Loockermans.");
  dutch("GG 127", 37, "1645-11-03", "Hans Loodewyck", "Michiel Picet boundary tract", "unclear", "14 morgens, 494 rods", "The description relies on the survey and Picet’s adjoining land.");
  dutch("GG 128", 37, "1645-12-12", "Cornelis Dircksz", "Ferryman’s additional maize and woodland", "brooklyn", "12 morgens and 157 rods", "The land lay behind Dircksz’s existing patent and beside Herry Breser.", "additional grant");
  dutch("GG 129", 37, "1645-12-13", "Cornelis Claesz Swits", "Bowery No. 5", "manhattan", "25 morgens, 296 rods", "North of Cornelis Jacobsz’s land, also identified as Bowery No. 6.");
  dutch("GG 130", 38, "1645-12-12", "Jacob Wolphertsz", "Brewery behind the public inn", "town", null, "Between Wessel Evertsz and Pieter Schoorsteenveger.");
  dutch("GG 131", 38, "1646-02-01", "Roelof Jansz Haes", "House opposite Hudden and Crugier", "town", null, "The road northeast of the fort forms the frontage.");
  dutch("GG 132", 38, "1646-02-14", "Abraham Rycken", "Former Pieter Italiaen canal house", "town", null, "The house and garden fronted the canal.");
  dutch("GG 133", 38, "1646-02-08", "Peter Cornelisz", "Marechkawick maize and woodland", "brooklyn", "27 morgens 319 rods", "A tract between Cornelis Dircksz and Joris Dircksz.");
  dutch("GG 134", 39, "1646-02-17", "Gerrit Jansz van Oldenborch", "Pannebacker’s / Bouwery No. 5", "manhattan", "45½ morgens 125 rods", "The wagon road, Swits and Kiersteeden identify the bounds.");
  dutch("GG 135", 39, "1646-02-19", "Willem Cornelisz", "Marechkawick bay marsh and land", "brooklyn", "25 morgens", "The adjoining marsh extended across the width of the land.");
  dutch("GG 136", 39, "1646-02-22", "Huych Aertsen van Rossum", "Gouwanus creek maize and woodland", "gowanus", "19 morgens 105 rods; about 29 morgens with the additional parcel", "Jan Eversz lay southeast by the marsh. The record also describes additional land.");
  dutch("GG 137a", 39, "1646-03-15", "Jan Jansz Damen", "Calckhoeck", "manhattan", "20 morgens, 386 rods", "Damen had farmed this parcel ten years earlier.");
  dutch("GG 137b", 40, "1646-03-17", "Pieter Wolphersz", "House and garden beside Olof Stevensz", "town", null, "The tract lay beside the grantee’s other property.");
  dutch("GG 138", 40, "1646-03-23", "Joris Dircksz", "Marechkawick maize and woodland", "brooklyn", "18 morgens 501 rods", "Northwest of Pieter Cornelisz and extending along his tract into the woods.");
  dutch("GG 139", 40, "1646-03-23", "Pieter van Linden", "House by the fiscal’s kitchen", "town", null, "The minister’s quarters bounded it on the west.");
  dutch("GG 140", 40, "1646-03-23", "Reyer Lambertsz", "Marechkawick bay point", "brooklyn", "57 morgens 339 rods", "The tract follows the East River bank at the bay’s eastern point.");
  dutch("GG 141", 41, "1646", "Jacob Jacobsz Roey", "Constapel’s Hoeck (Constable Hook)", "jersey", "115 morgens", "The mainland point faces Staten Island across the Kill van Kull.");
  dutch("GG 142", 41, "1646-03-27", "Cornelis van Tienhoven", "Great highway frontage", "manhattan", null, "The lot adjoined Tienhoven’s existing land.");
  dutch("GG 143", 41, "1646-04-23", "Joris Homs", "Brick houses near the fort", "town", null, "Between the company houses and the fort, south of Jan Haes.");
  dutch("GG 144", 41, "1646-05-11", "Roelof Jansz", "Pieter Cornelisz boundary lot", "town", null, "The buildings of Pieter Cornelisz identify the adjoining land.");
  dutch("GG 145", 41, "1646-05-12", "Paulus van der Beeke", "Canal-front house and garden", "town", null, "Between Willem Bredenbent and Ensign de Leeuw.");
  dutch("GG 146", 42, "1646-05-14", "Jan Onderhil", "Meutelaer’s Island", "islandUnclear", "50 morgens", "Two channels separated the island and its associated marshes from Long Island.");
  dutch("GG 147", 42, "1645-11-29", "Robbert Pinoyer", "Long Island beach plantation", "gravesend", "89 morgens 442 rods", "Between Antony Jansz and Lady Moody, beside the marsh.");
  dutch("GG 148", 42, "1646-06-05", "Sybolt Claesz", "Jan Damen’s garden frontage", "town", null, "The house and garden followed the public highway.");
  dutch("GG 149", 42, "1646-06-05", "Sybolt Claesz", "Hellegatt point", "upper", "50 morgens", "At the channel separating Manhattan from Hogs’ Island.");
  dutch("GG 150", 43, "1646-06-26", "Tomas Coornel", "East River plantation at Bronckx’ river", "bronx", null, "The tract reached a creek behind the marsh about half a mile inland.");
  dutch("GG 151", 43, "1646-07-02", "Wessel Evertsz", "House between Wolpertsz and Jorisz", "town", null, "Jacob Wolpertsz lay east and Burger Jorisz west.");
  dutch("GG 154", 44, "1646-08-18", "Matys Jansz", "Papperimemin", "upper", "50 morgens", "The patent identifies land at the end of Manhattan.");
  dutch("GG 155", 44, "1646-08-22", "Isaack de Foreest", "Lot opposite the five brick houses", "town", null, "Sybolt Claesz and Domine Bogardus bounded it east of the fort.");
  dutch("GG 156", 44, "1646-08-23", "Adam Matt", "Mespachtes woodland point", "newtown", "25 morgens", "The west-bank point faced Ritchert Bridnil’s plantation.");
  dutch("GG 157", 44, "1646-08-22", "Cornelis Antonisz and Partners", "Katskil (Catskill) colony tract", "catskill", null, "The charter concerns settlement on the Mauritius River under the patroonship exemptions.", "proprietary settlement grant");
  dutch("GG 159", 45, "1646-10-24", "Pieter Cornelisz Timmerman", "Kip boundary house and garden", "town", null, "The lot lay south of the holdings of Hendrick Kip and adjoining householders.");
  dutch("GG 160", 45, "1646-11-29", "Gerrit Douman", "Manhattan canal house and garden", "town", null, "The east side fronted the canal.");
  dutch("GG 161", 46, "1646-12-06", "Gerrit Hendricksz", "Schout’s Farm", "unclear", "25 morgens", "The original grant lent the marsh during the company’s pleasure. A separate 1664 endorsement made the marsh hereditary.");
  dutch("GG 162", 46, "1647-01-21", "George Bacxter", "Canarise (Canarsie)", "brooklyn", null, "The grant included the adjoining marshes on the south shore of Long Island.");
  dutch("GG 163", 46, "1647-01-21", "Michiel Paulisz", "House lot east of Antony", "town", null, "The southern edge ran along the front of the lot.");
  dutch("GG 164", 47, "1647-01-21", "Cors Pietersz", "Gillis Pietersz boundary lot", "town", null, "A common four-foot alley served both holdings south of the fort.");
  dutch("GG 165", 47, "1653-07-18", "Hans Kiersteede", "Company warehouse shore lot", "town", null, "Between the company warehouse and Roelof Jansz.");
  dutch("GG 166", 47, "1647-02-03", "Paulus Heymansz", "Southwest fort waterfront", "town", null, "The tract fronted the strand southwest of the fort.");
  dutch("GG 167", 48, "1647-02-07", "Adam Brouwer", "Hendrick Jansz house-lot subdivision", "town", null, "The smaller house and garden were surveyed from the earlier holding.", "subdivision");
  dutch("GG 168", 48, "1647-02-08", "Evert Jansz", "Claes van Elslant canal lot", "town", null, "The road separates this lot from Van Elslant to the west.");
  dutch("GG 170", 48, "1647-02-09", "Jan Evertsz Bout", "Barent Jansz boundary lot", "town", null, "Located south of the fort beside Barent Jansz.");
  dutch("GG 171", 49, "1647-03-11", "Pieter Jansz and Huych Aertsen", "Montange marsh plantation", "manhattan", "74 morgens, 106 rods", "Between Montange’s hay marsh and Tobias’s farm.");
  dutch("GG 172", 49, "1647-03-11", "Gerritt Wolphertsz", "Rechkeweck marsh plantation", "gowanus", "19 morgens 341 rods", "Beside the Gouwanisse creek marsh between Stoffelsz and Lubbersz.");
  dutch("GG 173", 49, "1647-03-11", "Volckert Eversz", "Jacus Bentyn rear plantation", "brooklyn", "49 morgens 155 rods overall", "The plantation lay behind Bentyn’s holding and extended inland from the marsh.");
  dutch("GG 174", 49, "1647-03-12", "Olof Stevensz", "Lassie plantation riverfront", "manhattan", "30 morgens", "North of Lassie’s land along the shore.");
  dutch("GG 175", 50, "1647-03-12", "Lourens Pietersz Noorman", "Duyckingh house lot", "town", null, "Between Pieter Itilyaender and Evert Duyckingh.");
  dutch("GG 176", 50, "1647-03-12", "Robbert Bottelaer", "Bogardus boundary lot", "manhattan", null, "Joris Homs lay south and Everhardus Bogardus north.");
  dutch("GG 178", 50, "1647-03-12", "Cornelis Willemsz", "Mespachtes Kil hook", "newtown", "22 morgens 146 rods", "The tract lay opposite Ritchert Bridnil and extended to woods.");
  dutch("GG 179", 50, "1647-03-12", "Olof Stevensz", "Commissary’s East River garden", "town", null, "Beside the company house and Tomas Hael. An addendum changes the frontage.");
  dutch("GG 180", 51, "1647-03-12", "Tomas Bacxter", "House east of company waterfront buildings", "town", null, "Along the East River opposite Hendrick’s house.");
  dutch("GG 181", 51, "1647-03-12", "Pieter van der Linden", "Canal-front house and garden", "town", null, "North side of the canal at the road.");
  dutch("GG 182", 51, "1647-03-13", "Claes van Elslant", "Cornelis Claesz boundary farm", "manhattan", "12 morgens, 152 rods", "The patent places the farm east of Cornelis Claesz and beside Cornelis Jacobsz.");
  dutch("GG 183", 52, "1647-03-13", "Claes van Elslant", "Roelof Jansz rear house lot", "town", null, "In the rear of Jansz’s lot.");
  dutch("GG 184", 52, "1647-03-12", "Hans Hansen", "Fort-side house and garden", "town", null, "Between Jan Snediker and Joorsy Rapalye.");
  dutch("GG 185", 52, "1647-03-13", "Cosyn Gerritsz", "Van Twiller plantation boundary", "manhattan", "34 morgens", "Along the cultivated ground to woodland, southeast of Van Twiller’s plantation.");
  dutch("GG 186", 52, "1647-03-13", "Cosyn Gerritsz", "Public highway house and garden", "town", null, "Between Rutgert Aertsz and Tonis Nysen.");
  dutch("GG 187", 53, "1647-03-14", "Abraham Planck", "House between Kip and Van der Linden", "town", null, "Kip lay east and Van der Linden west.");
  dutch("GG 188", 53, "1647-03-15", "Cornelis van Tienhoven", "Breukelen (Marechkawick) allotment", "brooklyn", null, "The patent refers to the surveyor’s earlier layout.");
  dutch("GG 189", 53, "1647-03-16", "Jan Monfoort", "Northeast canal house and garden", "town", null, "Behind Evert Duyckingh’s lot.");
  dutch("GG 190", 53, "1647-03-16", "Harmen Meyndertsz van Bogaert", "Five company houses tract", "town", null, "The grant lay east of these buildings and fronted the street.");
  dutch("GG 191", 54, "1647-03-16", "Pieter Monfoort", "Northeast canal garden", "town", null, "Jan Monfoort bounded its west side.");
  dutch("GG 192", 54, "1647-03-16", "Lammert van Valckenborch", "House south of the fort", "town", null, "Jan Evertsz held the land to the east.");
  dutch("GG 193", 54, "1647-03-18", "Claes Jansen Backer", "Manhattan street lot", "town", null, "The southern frontage measured one rod and part of another.");
  dutch("GG 194", 54, "1647-03-18", "Jorse Rapalye", "Manhattan street-front house lot", "town", null, "Two rods of street frontage on the south.");
  dutch("GG 195", 54, "1647-03-18", "Cornelis Jacobsz Stille", "Farm No. 6", "manhattan", null, "Earlier occupied by Wolphert Gerritsz.");
  dutch("GG 196", 55, "1647-03-23", "Jan Jansen van Ditmersz", "Tract south of Pieter de Schoorsteenveger", "manhattan", "29 morgens, 362 rods", "A thicket and the adjoining sweep’s property marked the surveyed land.");
  dutch("GG 197", 55, "1647-03-25", "Claes Carstensz Noorman", "Former Barent Jansz farm", "jersey", "50 morgens", "West bank of the North River next to Dirck Stratemaker.");
  dutch("GG 198", 55, "1647-03-25", "Gilliam Cornelse", "Public canal tract", "town", null, "Across the road from Gerrit Douman’s lot.");
  dutch("GG 199a", 55, "1647-03-25", "Francisco Negro", "Wagon-road land beside Antony Congo", "manhattan", null, "Bounded by Gerrit Hendricksz on the north and Antony Congo on the south.");
  dutch("GG 199b", 56, "1647-03-26", "Antony Congo", "Antony Congo’s wagon-road tract", "manhattan", null, "Two hundred paces along the road and 335 paces across.");
  dutch("GG 200", 56, "1647-03-26", "Bastiaen Negro", "Bastiaen’s wagon-road tract", "manhattan", null, "Two hundred paces of road frontage and 300 paces in breadth.");
  dutch("GG 201", 56, "1647-03-26", "Jan Negro", "Jan’s wagon-road tract", "manhattan", null, "Two hundred paces of road frontage and 325 paces in breadth.");
  dutch("GG 202", 56, "1647-03-28", "Pieter Lourensz", "Highway tract opposite Hendrick Kip", "town", null, "The frontage faced Kip on the public road.");
  dutch("GG 203", 56, "1647-03-28", "Tonis Nysen", "Tall Tryn’s former land", "manhattan", null, "Extending west from the public wagon road.");
  dutch("GG 204a", 57, "1647-03-29", "Rem Jansz", "Company bakery street lot", "town", null, "Between the bakery and Claes d’Ruyter.");
  dutch("GG 204b", 57, "1647-03-29", "Jan Pietersz van Amsterdam", "Riverfront between Lambertsz and De Noorman", "brooklyn", "4 morgens", "The instrument cites the survey of this Long Island tract.");
  dutch("GG 205", 57, "1647-03-30", "Hans Hansz", "Jorse Rapalye’s creek plantation", "brooklyn", "200 morgens", "The tract reached Lambert Huybertsz’s farm from Hans Hansz’s house.");
  dutch("GG 206", 57, "1647-04-02", "Jan Haes", "Rechkewick west point", "brooklyn", "38 morgens 485 rods", "River frontage and the lands of Frerick Lubbertsz appear in the survey.");
  dutch("GG 207", 57, "1647-04-02", "Harmen Smeman", "East River farm", "manhattan", "23 morgens, 486 rods", "The large company farm formed the northern boundary.");
  dutch("GG 208", 58, "1647-04-03", "Tonis Nysen", "Jan Celes’s former plantation", "manhattan", null, "The earlier cultivator and adjoining marsh identify the tract.");
  dutch("GG 209", 58, "1647-04-08", "Pieter van Campen", "Tosyn Briel rear tract", "manhattan", "3 morgens, 225 rods", "The tract stood behind Briel’s property.");
  dutch("GG 210", 58, "1647-04-10", "Jochim Pietersz", "House next to Cors Pietersz", "town", null, "Cors Pietersz’s lot bordered the eastern side.");
  dutch("GG 211", 59, "1647-04-12", "Jochim Kiersteede", "East River strand lot", "town", null, "South of Jan Pietersz and beside the East River strand.");
  dutch("GG 212", 59, "1647-04-13", "Aryaen Pietersz van Alckmaer", "Sapokanikan tract", "manhattan", null, "Between Jan Virginyes’s plantation and the property on its northern side.");
  dutch("GG 213", 59, "1647-04-15", "Jeuryaen Blanck", "Fort Amsterdam regrant", "town", null, "Between Jan Jansz Schepmoes and Gillis Pietersz; Tonis Jansz’s earlier patent was annulled because the lot had remained unimproved for over three years.", "replacement patent");
  dutch("GG 214a", 59, "1647-04-15", "Herry Piers", "Gregorius’s plantation", "manhattan", null, "The grant locates the plantation beside Pieter Linde’s land.");
  dutch("GG 214b", 60, "1647-04-15", "Tonis Kray", "Common canal house and garden", "town", null, "North of Michiel Picet’s lot. A later endorsement concerns land after the grantee sold the lot.");
  dutch("GG 215", 60, "1647-04-15", "Cornelis Teunisz", "Schepmoes and Ruyter house lot", "town", null, "Between Jan Jansz Schepmoes and Claes Jansz Ruyter.");
  dutch("GG 216a", 60, "1647-05-10", "Egbert Woutersz", "Apopcalyck", "jersey", null, "West of Manhattan across the Hudson, along the river.");
  dutch("GG 216b", 60, "1647-05-19", "Johannes La Montangie", "Flatland tract", "manhattan", "100 morgens", "The record translates the local name as flatland.");
  dutch("GG 217a", 61, "1647-05-11", "Maryn Adriaensz", "Awiehaken (Weehawken)", "jersey", "50 morgens", "Beginning at Hoboken Creek on the west bank and running north.");
  dutch("GG 217b", 61, "1647-05-15", "Jan Forbus", "Dirck de Noorman’s creek plantation", "brooklyn", "65 morgens", "The record names Claes Carstensz, George Bacxter and Davit Andriessen as predecessors.");
  dutch("GG 218", 61, "1647-05-15", "Augustyn Herman", "Fort Amsterdam land beside Dirck Cornelisz", "town", null, "Dirck Cornelisz’s land formed the eastern limit.");
  dutch("GG 219a", 61, "1647-05-15", "Isack D'Foreest", "Jochem Pietersz boundary plantation", "manhattan", "50 morgens", "Jochem Pietersz held the neighboring land north of the tract.");
  dutch("GG 219b", 62, "1647-05-15", "Tomas Hal", "Augustyn and Hardenberech house lot", "town", null, "Mr. Augustyn held the neighboring parcel west and Mr. Hardenberech east.");
  dutch("GG 220a", 62, "1647-05-15", "Daniel", "East River carpenter’s yard", "manhattan", null, "The yard, house and garden occupied marsh beyond Wolphert Gerritsz’s marsh.");
  dutch("GG 220b", 62, "1647-05-15", "Sybolt Claesz", "Public highway house and garden", "town", null, "Cornelis Groesen held the adjoining southern property.");
  dutch("GG 221", 62, "1647-05-19", "Sargant Huybertsz", "House south of Fort Amsterdam", "town", null, "West of Jan Evertsz’s lot.");
  dutch("GG 223", 64, "1649-07-20", "Baltasar Stuyvesant", "New Amsterdam house and garden", "town", null, "Nicolaes Willem Stuyvesant’s tract bordered it to the south.");
  dutch("GG 224", 64, "1649-07-20", "Nicolaes Willem Stuyvesant", "Great highway house and garden", "town", null, "West of the highway, beside Hendrick van Dyck.");
  dutch("GG 225", 64, "1651-09-20", "Cornelis van Tienhoven", "City East River frontage", "town", null, "Govert Loockmans held the neighboring property to the east.");
  dutch("HH 1", 67, "1654-02-26", "Lieven Jansen", "Long Island land beyond Hell Gate", "hellgate", null, "Between Symon Joosten and Juriaen Fradel.");
  dutch("HH 4", 67, "1654-03", "Annetje Bogardus", "Hell Gate creek farm", "hellgate", "42 morgens and 45 rods", "North of William Hallet, between the East River and the creek.");
  dutch("HH 5", 67, "1654-04-16", "Cornelis van Ruyven", "Sheep Pasture lot", "town", null, "Albert Pietersz Trompeter occupied the adjoining parcel.");
  dutch("HH 6", 68, "1654-05-22", "Carel van Brugge", "Sheep Pasture lot", "town", null, "The survey begins at Cornelis van Tienhoven’s neighboring lot.");
  dutch("HH 7", 68, "1654-05-22", "Cornelis van Tienhoven", "Sheep Pasture lot", "town", null, "South-side neighbor Nicasius de Sille identifies the holding.");
  dutch("HH 8", 68, "1654-05-22", "Nicasius de Sille", "Sheep Pasture lot", "town", null, "Bounded by the plots of Lamontagne, Nuton and others.");
  dutch("HH 9", 69, "1654-06-04", "Arent van Hattem", "Midwout (Flatbush) highway farm", "midwout", null, "East of the public highway, alongside Davidt’s land.");
  dutch("HH 10", 69, "1654-06-16", "Dirck Ziecken", "Gemoenepaen (Communipaw) tract", "jersey", null, "Starts where Claes de Noorman’s line intersects a creek.");
  dutch("HH 11", 69, "1654-06-19", "Adriaen Dircksen Coen", "Duyckingh and Vincent lot", "town", null, "Between Evert Duyckingh and Adriaen Vincent, with street frontage.");
  dutch("HH 12", 69, "1654-06-22", "Jan Jacobsen Carpenel", "Land beyond Hell Gate", "hellgate", "25 morgens", "Between Adriaen Coen and the company’s property.");
  dutch("HH 13", 70, "1654-06-22", "Adriaen Dircksen Coen", "Coen’s Hell Gate tract", "hellgate", "25 morgens", "Between Fradel and Carpenel. A separate marginal grant concerns additional land.");
  dutch("HH 15", 70, "1654-06-28", "Pieter Monfert", "Sheep Pasture lot", "town", null, "The patent measures four sides of a lot in the city pasture.");
  dutch("HH 16", 71, "1654-07-02", "Harck Syboutsen", "Hell Gate farm", "hellgate", "21 morgens", "Between the company and Abraham Rycken. A subsequent endorsement adds marshland.");
  dutch("HH 17", 71, "1654-07-02", "Samuel Drisius", "Burying-ground rear tract", "town", null, "West of the wagon road behind the burial ground.");
  dutch("HH 18", 71, "1654-08-28", "the Heirs of Jan Monfort", "Sheep Pasture lot of Monfort’s heirs", "town", null, "The description gives four side lengths in the pasture.");
  dutch("HH 19", 72, "1654-08-28", "Egbert van Borsum", "Long Island ferry property", "brooklyn", null, "Starts at the oak marking Cornelis Potter’s line near the shore.");
  dutch("HH 20", 72, "1654-10-23", "Jan Swaen", "Dirck Nes rear lot", "town", null, "Behind Dirck Nes and Frederick Jansz.");
  dutch("HH 21", 72, "1654-10-23", "Jacob Walingen van Hoorn", "Communipaw and Kill van Kull tract", "jersey", "25 morgens", "Between the creek and the Kill van Kull near Hendrick Jansen’s plantation.");
  dutch("HH 22", 72, "1654-11-14", "Adriaen Huybertsen", "Mespat watermill tract", "newtown", null, "Near Borger Jorissen’s mill alongside Joris Juwel.");
  dutch("HH 23", 73, "1654-11-21", "Luycas Dircksen", "Mespat marsh tract", "newtown", "16 morgens and 300 rods", "Thirty rods of frontage on the marsh or road, opposite woodland.");
  dutch("HH 24", 73, "1654-11-27", "Peter Terragon", "Mespat plantation", "newtown", "25 morgens", "Between Pieter Jansz Winkel and Ritchert Smit.");
  dutch("HH 25", 73, "1654-11-27", "Michiel Jansen", "Pavonia rear woodland", "jersey", "3 morgens", "Behind the grantee’s own land, extending 200 rods toward the woods.");
  dutch("HH 26", 73, "1654-11-27", "Claes Jansen Backer", "Pavonia woodland", "jersey", "40 morgens", "Behind Claes Pietersen Cos and reaching inland into woods.");
  dutch("HH 27", 74, "1654-11-30", "Jacob Luby", "Mespat marsh-road tract", "newtown", "25 morgens", "Begins at the boundary of Claes van Elslant.");
  dutch("HH 28", 74, "1654-12-01", "Willem Bredenbent", "Bredenbent house and garden confirmation", "town", null, "The previous Kieft grant lay behind Claes van Elslant.", "confirmation");
  dutch("HH 29", 74, "1654-12-04", "Jan Cornelissen Buys", "Communipaw bayfront", "jersey", "25 morgens", "Sixty rods along the river or bay toward the Kill van Kull.");
  dutch("HH 30", 74, "1654-12-05", "Jan Lubbertsen", "Communipaw bayfront", "jersey", "25 morgens", "Eighty rods of frontage between Gemoenepaen and Kill van Kull.");
  dutch("HH 31", 75, "1654-12-05", "Jan Gerritsen van Immen", "Communipaw bayfront", "jersey", "25 morgens", "Forty rods along the bay between Gemoenepaen and Kill van Kull.");
  dutch("HH 32", 75, "1654-12-05", "Jan Cornelissen Schoenmaecker", "Communipaw bayfront", "jersey", "25 morgens", "Forty rods of frontage and inland courses from the west shore.");
  dutch("HH 33", 75, "1654-12-05", "Gerrit Pietersen", "Communipaw bayfront", "jersey", "25 morgens", "Forty rods of shore frontage between Communipaw and Kill van Kull.");
  dutch("HH 34", 75, "1654-12-05", "Lubbert Gysbertsen", "West Hudson river tract", "jersey", "50 morgens", "Bounded by Jan Vingje and Jan Cornelisz Buys.");
  dutch("HH 35", 76, "1654-12-05", "Jan Cornelissen Crynnen", "Communipaw bayfront", "jersey", "25 morgens", "Frontage runs southwest between Gemoenepaen and Kill van Kull.");
  dutch("HH 36", 76, "1654-12-05", "Gysbert Lubbertsen", "Communipaw bayfront", "jersey", "25 morgens", "The survey runs southwest along the west bank of the bay.");
  dutch("HH 37", 76, "1654-12-05", "Hendrick Jansz van Schalckwyck", "Communipaw bayfront", "jersey", "25 morgens", "The parcel follows the shore between Communipaw and the Kill van Kull.");
  dutch("HH 38", 77, "1654-12-10", "Reyck Leydecker", "Mespat marsh tract", "newtown", "25 morgens", "Begins at the butcher Roeloff Jansen’s boundary.");
  dutch("HH 39", 77, "1654-12-10", "Roeloff Jansz", "Mespat marsh tract", "newtown", "25 morgens", "Beside William Bocker’s marked boundary and the marsh path.");
  dutch("HH 40", 77, "1654-12-15", "Jan Swaen", "Mespat marsh tract", "newtown", "25 morgens", "Road and marsh at Mespat identify the parcel.");
  dutch("HH 41", 77, "1654-12-15", "Dirck Smit", "Mespat marsh tract", "newtown", "54 morgens", "Between Sergeant Jacob Luby and Jan Swaen.");
  dutch("HH 42", 78, "1654-12-16", "Adriaen Jansz van Leyden", "Beverwyck highway garden", "albany", null, "The road along its south side runs to the palisades.");
  dutch("HH 44", 78, "1655-08-26", "Abraham Clock", "Burger Joris pathway lot", "town", null, "Between Richard Smith and Burger Joris’s path.");
  dutch("HH 45", 78, "1655-08-26", "Cornelis van der Donck", "Muscoote (The Flatts)", "upper", "50 morgens", "The northern Manhattan tract is described as surrounded by marsh.");
  dutch("HH 48", 79, "1655-12-01", "Ysack Foreest", "Midwout road farm", "midwout", "27 morgens", "Between Jan Eversen and Cornelis Jansz.");
  dutch("HH 49", 79, "1656-03-27", "Nicasius de Sille", "Mespat land on Doughty’s boundary", "newtown", "126 morgens", "A creek on Franscoys Douthey’s boundary marks the start.");
  dutch("HH 51", 80, "1656-05-18", "Pieter Rudolf", "Sheep Pasture house and garden", "town", null, "Jacob Kip’s lot forms the north side.");
  dutch("HH 52", 80, "1656-05-18", "Nicolaes Backer", "Michiel Jansen street lot", "town", null, "The grant measures along the street beside Michiel Jansen.");
  dutch("HH 53", 81, "1656-05-27", "Jochem Gerritsen Cock", "Breuckelen village house and garden", "brooklyn", null, "Twenty-five rods along the highway west of the road.");
  dutch("HH 54a", 81, "1656-06-16", "Philip Pietersz Schuyler", "Beverwyck house and garden enlargement", "albany", null, "Sander Leendertsz, Pieter Hartger, a road and the hill identify the property. The increased grant annulled its predecessor.", "enlarged replacement patent");
  dutch("HH 54b", 81, "1656-06-20", "Hans Dreeper", "Baker’s opposite street lot", "town", null, "Facing the property of Hendrick Willemsen Backer.");
  dutch("HH 55a", 81, "1656-06-20", "Willem Beeckman", "Freshwater house tract", "manhattan", null, "The lot where Beeckman’s house stood adjoined Augustyn Herman.");
  dutch("HH 55b", 82, "1656-06-20", "Samuel Edsall", "Smit and Backer street lot", "town", null, "Between Hendrick Jansz Smit and Nicolaes Backer.");
  dutch("HH 56", 82, "1656-06-21", "Isack Kip", "Sheep Pasture house lot", "town", null, "Street frontage on the east side, beside Jacob Kip’s holding.");
  dutch("HH 57", 82, "1656-06-21", "Jacob Kip", "Sheep Pasture house lot", "town", null, "Street frontage on the east side. The adjacent grant names his brother Isack.");
  dutch("HH 59", 83, "1656-08-21", "Jan Catjou", "Mespat marsh farm", "newtown", "25 morgens", "Between Jacob Lube and Roeloff Jansen, 32 rods wide at the marsh.");
  dutch("HH 60", 83, "1656-08-25", "Hendrick Jansen van Jeveren", "Hell Gate tract of Jeveren", "hellgate", "25 morgens", "Between Lieven Jansz and Adriaen Dirckz. The survey had been laid out for Jeurriaen Fradel.");
  dutch("HH 66", 85, "1656-09-19", "Hendrick Jansen de Boer", "Rear lot of Hendrick Jansz Smit", "town", null, "The description gives the lot behind Smit.");
  dutch("HH 68", 85, "1656-09-25", "Christoffel Davids", "Esopus large-creek farm", "esopus", "36 morgens", "West of the large creek, about a mile from the Hudson and opposite Thomas Chambers.");
  dutch("HH 71", 86, "1656-12-28", "Pieter Jansen Winckelhoeck", "Mespats Creek plantation", "newtown", "25 morgens", "Richard Bridnel and Richard Coolfacx held the neighboring lands.");
  dutch("HH 72", 86, "1657-01", "Nicolaes Bernard", "Sheep Pasture house and garden", "town", null, "West side on the street, measured in wood feet.");
  dutch("HH 74", 87, "1657-03-27", "Johanne de Laet", "Esopus marsh, woods and arable land", "esopus", "500 morgens", "Thomas Chambers and Christoffel Davids lay on its northern boundary.");
  dutch("HH 82", 90, "1657-04-23", "Margrietge Provoost", "Sheep Pasture house and garden", "town", null, "North boundary at Eysack Kip.");
  dutch("HH 83", 91, "1657-06-01", "Cornelis Theunissen", "Amesfoort (Flatlands) farm", "flatlands", "25 morgens", "From Pieter Claesz’s palisades to the road from the Stroom Kill.");
  dutch("HH 88a", 92, "1657-08-01", "Christiaen Barentsen Timmerman", "Country gate house and garden", "town", null, "The house lot lay beside the city land gate.");
  dutch("HH 88b", 92, "1657-08-25", "Hans Jongh and Daniel Stiger", "Long Island ferry lot", "brooklyn", null, "The survey describes the irregular dimensions at the ferry.");
  dutch("HH 89", 92, "1657-08-27", "Jacques Corteljou", "Werckhooven village marsh", "gravesend", "130 morgens", "Van Salee bounded this parcel opposite Coney Island; the register cancels it and replaces it with HH 90 on the same day.", "canceled patent", "Petrus Stuyvesant and the New Netherland council", "1657-08-28");
  dutch("HH 90", 93, "1657-08-27", "the Inhabitants of Utrecht", "New Utrecht village marsh", "gravesend", "130 morgens", "Replaces HH 89 for the Utrecht inhabitants; west and northwest bounds adjoin Antony van Salee.", "replacement patent");
  dutch("HH 92", 93, "1657-09-15", "Claes Hendricksen", "Beverwyck house and garden", "albany", null, "Between Tomas Chambers and Willem Bout.");
  dutch("HH 93", 93, "1657-12-19", "Nicasius de Sille", "New Amsterdam waterfront lot", "town", null, "Fronts the water and has sides measured in feet.");
  dutch("HH 94a", 94, "1658-02-09", "Fredrick Philipssen", "Market field house and garden", "town", null, "Next to Jacob Varrevanger’s lot, by Joost the baker.");
  dutch("HH 94b", 94, "1658-03-25", "Jan Hendrixsen Steelman", "Douthy’s former Mespat farm", "newtown", "34 morgens 563 rods overall", "The parcel followed the marsh to N. Fransman. The patent distinguishes separate measurements.");
  dutch("HH 95", 94, "1658-03-25", "Jeremias van Rensselaer", "Beverwyck house and garden", "albany", null, "Bordered Casper Jacobsen near Fort Orange.");
  dutch("HH 96", 94, "1658-07-13", "Sander Leendertsen Glen", "Beverwyck lot beside Van Rensselaer", "albany", null, "West of Jeremias van Rensselaer and north of Casper Caspersz.");
  dutch("HH 99", 95, "1658-09-10", "Phillip Pietersen Schuyler", "Beverwyck orchard and garden", "albany", null, "Along the property of Jeremias van Rensselaer.");
  dutch("HH 100", 95, "1658-10-04", "Bruyn Barentsen", "Breuckelen cemetery house and garden", "brooklyn", null, "Between the cemetery and Albert at the bay.");
  dutch("HH 101", 95, "1658-10-31", "Pieter Meersen", "Beverwyck wagon-road lot", "albany", null, "West of the road near Fort Orange.");
  dutch("HH 102", 95, "1658-11-08", "Tomas Chambers", "Beverwyck house and garden", "albany", null, "Front and back each measured ten rods and eight feet.");
  dutch("HH 103a", 96, "1658-12-02", "Jan Jansen van Langedyck", "New Amsterdam street lot", "town", null, "Unequal widths were recorded on the north and south sides.");
  dutch("HH 103b", 96, "1658-02-23", "Pieter Jacobsen", "Beverwyck First Kill house and garden", "albany", null, "The northern side ran by the hill.");
  dutch("HH 104", 96, "1659-03-31", "Volckert Jansen and Jan Thomassen", "Bevers Kill river pasture", "albany", null, "Beyond the creek, measuring 100 rods along the river.");
  dutch("HH 105", 96, "1659-04-19", "Jan Andriesen", "Bevers Kill tract", "albany", null, "North of Jan Tomas opposite the creek.");
  dutch("HH 106a", 96, "1659-04-23", "Arent van Curler", "Beverwyck house lot", "albany", null, "The instrument places the property in the village near Fort Orange.");
  dutch("HH 106b", 97, "1659-04-23", "Govert Loockermans, Cornelis van Ruyven and Jacobus Backer", "Matinneconcq (Hog’s Neck / Hog’s Island)", "oyster", null, "Tidal water separated the neck from the mainland. The patent recites Loockermans’s 1650 purchase from Indigenous owners.");
  dutch("HH 107a", 97, "1659-04-21", "Gustavus Danielis", "Midwout millhouse lot", "midwout", null, "Between the former millhouse and Jan Cornelissen.");
  dutch("HH 107b", 97, "1659-05-23", "Cornelis van Nes", "Amesfoort woods and flats", "flatlands", "50 morgens", "Starts at the oak marking Wolphert Gerritsz’s boundary.");
  dutch("HH 108", 97, "1659-09-01", "Pieter Hartgers", "Beverwyck plain and road tract", "albany", null, "South of the plain and east of a road.");
  dutch("HH 109", 98, "1659-09-01", "Pieter Hartgers", "Beverwyck house site", "albany", null, "Beside Willem Teller’s house and lot.");
  dutch("HH 110", 98, "1660-02-05", "Jan Dareth", "Beverwyck plain house and garden", "albany", null, "Beside the highway on the plain.");
  dutch("HH 111", 98, "1660-08-17", "Pieter Mees", "Beverwyck roadside land", "albany", null, "South of Symon Root and east of the road.");
  dutch("HH 112", 98, "1660-07-11", "Andries Andriesz", "Smee Street lot", "town", null, "West of the street beside Cosyntie.");
  dutch("HH 113", 99, "1660-07-13", "Albert Cornelisse", "New Amsterdam lot beside Pieter de Noorman", "town", null, "Between Pieter de Noorman and Teuntie Straetmans.");
  dutch("HH 114", 99, "1660-08-20", "Jan Martensen", "Amesfoort land and marsh", "flatlands", "12 morgens, 182 rods and 10 morgens", "Northwest of Pieter Claesen and east of an inland marsh.");
  dutch("HH 116", 99, "1660-10-19", "Elske Jans", "Smee Street house and garden", "town", null, "Between Janneken Bonus and Tuyn Street.");
  dutch("HH 117", 100, "1660-10-19", "Jan Martyn", "East River ferry land", "brooklyn", null, "Next to Jan Martyn’s existing property east of the East River.");
  dutch("HH 118", 100, "1661-01-29", "Roeloff Martensen", "Amesfoort tract beside Jan Martensz", "flatlands", "23 morgens and 75 rods", "The northeast side adjoins land near the village.");
  dutch("HH 119", 100, "1661-03-07", "Jan van Aecken", "Beverwyck house and garden", "albany", null, "South of Jochim Ketelheyn’s property.");
  dutch("HH 120", 100, "1661-03-10", "Jan Tomassen", "Beverwyck street lot", "albany", null, "Four rods and additional feet of frontage along the street; compare the distinct hill lot at HH 121.");
  dutch("HH 121", 101, "1661-03-10", "Jan Tomassen", "Beverwyck hillside lot", "albany", null, "At the hill with the street to its south. The register records another lot for the same man on the same date.");
  dutch("HH 122", 101, "1661-03-10", "Andries Herpertsz and Rutger Jacobsen", "Pachonakellick (Mahicanders Island)", "bethlehem", null, "In the Hudson opposite Bethlehem. The grantees had to surrender it for compensation if the Rensselaerswyck boundary put it within that colony.");
  dutch("HH 123", 101, "1661-03-14", "Pieter Andriesen", "Jacob Jansen Moesman boundary lot", "town", null, "The house and garden lay west of Moesman’s lot.");
  dutch("HH 126", 102, "1661-04-15", "Adriaen van Laer", "Blaurock and Jansen lot", "town", null, "Between Hendrick Blaurock and Cornelis Jansen.");
  dutch("HH 127", 102, "1661-04-15", "Jacob Kip", "Sheep Pasture tract", "town", null, "South of the holding of Isaacq Kip.");
  dutch("HH 127b", 103, "1661-06-14", "Elbert Elbertsz", "Baes Jeuriaens’s Point", "flatlands", "20 morgens 200 rods overall", "Below Amesfoort, southwest of the Roeloff Martensen tract.");
  dutch("HH 128", 103, "1661-06-17", "Jan West", "Mespath wagon-path farm", "newtown", "21 morgens, 200 rods and 3 morgens, 500 rods", "A wagon path divided the property from Robbert Jackson’s land.");
  dutch("HH 130", 103, "1664-01-04", "Jan Pietersen Slot", "Ceulen’s Point parcel", "upper", "8 morgens", "Above the point, between Pieter Jansz and Nicolaes Meyer.");
  dutch("HH 131", 104, "1664-01-29", "Claes Claesen", "New Utrecht plantation", "utrecht", "24 morgens and 2 morgens, 160 rods", "Between Jacob Swart and Albert Albertsz.");
  dutch("HH 132", 104, "1664-01-29", "Nicolaes Meyer", "Jochim Pietersz tract and associated parcels", "upper", "6 morgens, 400 rods and 13 morgens, 200 rods and 12 morgens, 360 rods and 3 morgens and 3 morgens and 6 morgens", "The patent describes multiple pieces near Daniel Terneur and Symon Dreunen with separate areas.");
  dutch("HH 133", 104, "1664-02-26", "Cornelis van Ruyven", "Midwout farm and related parcels", "midwout", "25 morgens and 2 morgens and 3 morgens and 2 morgens, 300 rods", "The first tract bordered Cornelis Jansz Bongaert. Additional parcels are specified separately.");
  dutch("HH 134", 105, "1664-01-24", "Gerrit Snediger", "Middewout roadside farm", "midwout", "27 morgens, 240 rods and 2 morgens and 3 morgens", "West of the road and north of the church’s land.");
  dutch("HH 135a", 105, "1664-01-26", "Adriaen Huybertsen", "Mespat millstream tract", "newtown", "24 morgens", "Between Charman and Borger Jorissen at the latter’s millstream.");
  dutch("HH 135b", 105, "1664-01-26", "Marten Cregier", "Replacement for Cregier’s fort lot", "town", null, "West of the great highway between Anna Cocx and Francois Boon. Cregier returned his 1643 parcel to the company in exchange.", "replacement patent");
  dutch("HH 136", 106, "1664-04-05", "Ide Cornelisz van Vorst", "Ahasemus (Harsimus) lot", "jersey", null, "Between Claes Jansz and the public road.");
  dutch("HH 137", 106, "1664-04-05", "Ide Cornelis van Vorst", "Schreyer’s Point lot", "town", null, "The triangular lot bordered Nicolaes Backer.");
  dutch('GG 23',8,'1638','Wouter van Twiller','Sapokanickan plantation','manhattan','100 morgens','The strand road and neighboring plantations bounded the tract. Existing paths and roads had to remain open. The copy lacks an execution date; Stokes dates the ground brief to 1638.');
  dutch('GG 50',16,'1642','Cornelis Melyn','Staten Island patroon grant','staten',null,'The patent covers Staten Island except the farm already granted to David Pietersz de Vries. The text has no day; the archive catalog assigns it to 1642. The de Vries exception lacks a mapped perimeter.');
  dutch('GG 56',17,'1642-11-20','Jan Pietersen and Abraham Rycken','Heyl boundary house lot','town',null,'Beside Mr. Heyl, at the later Broad Street. The text lacks an execution date; Stokes identifies it with the 20 November grant.');
  dutch('GG 67',20,'1643-06-22','Evert Duyckingh','Company marsh house lot','town',null,'Between the land of Claes de Veeringh’s widow and a property held by Black residents, with the company marsh behind.');
  dutch('GG 67 (endorsement)',20,'1650-04-30','Evert Duyckingh','Company marsh garden addition','town',null,'A point of land south of the garden was added on condition that the grantee allow a future street through it without compensation.','enlargement');
  dutch('GG 169',48,'1647-02-08','Anna van Angola, widow of Andries d’Angola','Woodland between Tamboer and Briel','manhattan','3 morgens 2 rods','The Dutch copy omits the day. The English confirmation in Patents 2:126 recites 8 February 1647.');
  dutch('GG 161 (endorsement)',46,'1664-05-13','Gerrit Hendricksz','Schout’s Farm marsh addition','unclear',null,'The endorsement converts the original 1646 privilege to use the marsh into ownership inheritable by Hendricksz’s successors.','enlargement');
  dutch('GG 179 (endorsement)',50,'1650-05-14','Jacob Hendricksen Veervanger','East River garden frontage addition','town',null,'After remeasurement the grantee received two additional feet of width on the south side of the former Olof Stevensz lot.','enlargement');
  dutch('GG 214b (endorsement)',60,'1658-02-26','Teunis Kraay (Tonis Kray)','Common canal company-land addition','town',null,'A new survey found company land inside the fence. The grant enabled Kraay to complete his earlier sale to Salomon La Chair.','enlargement');
  dutch('HH 13 (endorsement)',70,'1654-06-18','Adriaen Dircksen Coen','Hell Gate marsh and woods addition','hellgate','16 morgens 282 rods','A point enclosed by a creek. The endorsement bears a date four days earlier than the main patent.','additional grant');
  dutch('HH 14',70,'1654-07-04','Annetje Jans, widow of Everardus Bogardus','North River strand and Kalckhoeck farm','manhattan','31 morgens','The road was to remain unobstructed. Old Jan’s land, the company fence and the Kalckhoeck gate feature in the courses. The day comes from the A1880 catalog.');
  dutch('HH 16 (endorsement)',71,'1664-04-18','Harck Syboutsen','Poors’ Farm meadow additions','hellgate','3 morgens 96 rods of salt meadow and 5 morgens of fresh meadow','Two creeks bounded the salt meadow by the Deacon’s meadow; the fresh meadow lay inland by Syboutsen and Abraham Rycken.','enlargement');
  dutch('HH 43',78,'1654-12','Pieter Stoutenburch','Marsh beside Burger Jorissen','newtown','6 morgens 240 rods','Between Captain Fyn and Pieter Andriesz, starting at the creek. The manuscript has no date; the archival catalog places it in December.','patent','Supreme Council of New Netherland');
  dutch('HH 54a (recital)',81,'1653-10-25','Philip Pietersz Schuyler','Beverwyck original lot','albany',null,'The regrant explicitly dates and annuls this earlier lot. The addition was allowed by local magistrates on 8 June 1656.','grant recited in later patent','New Netherland colonial administration','1656-06-16');
  dutch('HH 58',82,'1656-06-30','Jacob Wolphertsen van Couwenhoven','Old Church waterfront lot','town',null,'Confirms the purchase at public sale on 8 April. Between the lane by Van Tienhoven and Hendrick Jansen Smit, extending from street to shore. The property was sold under execution on 8 September.','confirmation','Petrus Stuyvesant and the New Netherland council','1656-09-08');
  dutch('HH 58 (endorsement)',82,'1664-04-16','Isaacq Foreest','Old Church adjoining lane','town',null,'Stuyvesant granted the lane beside Foreest’s house on the former church site.','enlargement');

  function deed(id, page, from, grantors, grantee, tract, place, boundary) {
    dutch(id, page, from, grantee, tract, place, null, boundary, 'Indigenous deed recorded before the council', grantors);
  }
  deed('GG 1',1,'1630-07-12','Arommeauw, Tekwappo and Sackwomeck','Michiel Paauw','Hobocanhackingh (Hoboken)','jersey','The Hudson, Ahasimus to the south and marshes to the west defined the tract; the parties contemplated ratification by other co-owners.');
  deed('GG 4',2,'1631-08-06','Cottamack, Nawanemit, Abantsene, Sagiskwa and Kanamoack','Kiliaen van Rensselaer','Gesmesseeck and upper Hudson tracts','albany','The record distinguishes joint holdings near Fort Orange from Nawanemit’s land opposite Castle Island and land from Mill Creek to Nejagonse.');
  deed('GG 6',3,'1630-08-10','Krahorat, Tamekap, Tetemakwemama, Wieromies, Siearewach, Sackwewew, Wissipoock and Saheinsios','Michiel Paauw','Staten Island deed','staten','The deed names the whole island west of the Narrows. The map edge clips the island.');
  deed('GG 7',3,'1630-11-22','Kikitoauw and Aiarouw, also acting for other proprietors','Michiel Paauw','Ahasimus and Aressick (Hoere Hoeck)','jersey','Across from Manhattan between Hoboken and the marshland. Aressick was a separate island.');
  deed('GG 9',4,'1631-04-18','Paepechkene, Kemptas, Nanaucontamhat and Sickeposem','Kiliaen van Rensselaer','Sannahhagag (Sanckhagag)','bethlehem','From above Beeren Island to Smackx Island, with an inland depth of two days’ travel. The GG copy lacks a year. The NNI Guide to Dutch Manuscripts dates the purchase 1631; some catalogs date it 1630.');
  const flatsGrantors = 'Tirkirauw, Ketamau, Ararykan, Asvachkou, Suarinkehinck, Wappittawackenis and Ehetyn, with the local chiefs and community';
  deed('GG 12',5,'1636-06-16',flatsGrantors,'Jacobus van Corler','Castuteeuw middle flat','flatlands','The middle of three flats lay between a stream from the sea, marshland and woods.');
  deed('GG 14',5,'1636-06-16',flatsGrantors,'Andries Hudde and Wolphert Gerritsz','Keskateuw western flat','flatlands','The western flat included its marsh and extended inland from a tidal stream.');
  deed('GG 15',6,'1636-07-16',flatsGrantors,'Wouter van Twiller','Castetuen eastern flat','flatlands','The easternmost of three flats, bounded by a creek, marsh and woods.');
  deed('GG 17',6,'1637-06-16','Cacapeteyno and Pewihas, with Keshaechquereren community consent','Wouter van Twiller','Pagganck (Nut Island / Governors Island)','pagganck','The island between the North and East rivers opposite Manhattan is shown along the map’s registered shore.');
  deed('GG 18',7,'1637-07-16','Seyseys and Neumers of Mareychkenwikingh','Wouter van Twiller','Tenkenas and Minnahanonck','hellgate','Two Hell Gate islands, the smaller west of the larger. Their historical channels cannot be separated reliably on this sheet.');
  deed('GG 27',8,'1638-08-01','Kakapoteyno, Menqueuw and Suwirau of Keskaechquerem','Dutch West India Company','Rinnegackonck to Mespaechtes','newtown','About a mile and a half from Rapalje’s land toward Mespaechtes, and about a mile inland from the East River to thickets.');
  deed('GG 28',9,'1639-01-15','Mechowodt, with Piscamoc, Wattewochkouw, Kachpohor and Ketachkwawars','Dutch West India Company','Suan Hacky (Marossepinck and Sintsinck)','islandUnclear','Reckouw Hacky, Sicketeuw Hacky, Martin Gerritsen’s Bay and Vlaecks Kil are named. The combination of shoreline names leaves the tract’s placement uncertain.');
  deed('GG 30',10,'1639-08-03','Tequemeck, Rechgawac and Packamieus','Dutch West India Company','Keskeskick (Kekeskich)','yonkers','North of Manhattan, along the flats and the creek behind the island. The point identifies the Yonkers vicinity.');
  deed('GG 52',16,'1645-09-10','Seysey, Sepinto and Ponitaranachgyne','Dutch West India Company','Coney Island–Gouwanes–Weywitsprittner tract','gravesend','The description follows two shores from Coney Island and then runs back to Gouwanes. It overlaps earlier colonial claims.');
  deed('GG 222',62,'1649-07-14','Megtegichkama, Oteyochque and Wegtakochken, witnessed by Seyseykimus','Dutch West India Company','Eastern Wiequaes Keck tract','greenwich','The description names the Byram and Mianus rivers. The proprietors conveyed the eastern half and retained the western half; the dividing line through the woods is unresolved.');
  // The extents here follow named sites on the existing artwork. When both
  // ends of a grant cannot be located, the inventory uses a locality point.
  const shelterShore = window.authorityRecords.find(r => r.name === 'Manhanset sachemship')?.ring;
  const manor1 = 'https://beta.nygb.org/articles/manors-new-york-part-one';
  const manor2 = 'https://www.newyorkfamilyhistory.org/knowledgebase/manors-new-york-part-two';
  const oysterBook = 'https://longislandgenealogy.com/OysterBay.html';
  const harpur = 'https://library.stonybrook.edu/special-collections-university-archives/manuscripts-papers/manuscripts-papers-subject-list/';
  const dutchess = 'https://flexpub.com/epubs/history/epub/chap_0001_split_000';
  const hunt = 'https://www.nycourts.gov/reporter/pdfs/2002/2002_30119.pdf';
  function western(region, from, tract, authority, grantee, location, geometry, instrument, acreage, boundary, citation, url, until = null) {
    const ring = geometry && Array.isArray(geometry[0]);
    const detail = authority + ' • ' + instrument + ' to ' + grantee + '. ' + boundary +
      (acreage ? ' Recorded extent: ' + acreage + '.' : '') +
      (ring ? ' The outline follows the illustrated island shore.' : geometry ? ' The point identifies ' + location + '. The corners remain unregistered.' : ' The locality cannot be placed precisely on this sheet.') + ' ' + citation;
    const record = {region, from, until, name:tract + ' • ' + grantee, status:'claim', detail, url,
      tract, authority, grantee, location, instrument, acreage, boundary, citation};
    if (geometry) record[ring ? 'ring' : 'point'] = geometry;
    window.authorityRecords.push(record);
  }
  western(island,'1640-10-17','Fishers Island / Fisher’s Island','Massachusetts General Court','John Winthrop Jr.','Fishers Island',fishersShore,'conditional island grant',null,'The court reserved the rights asserted by Connecticut and Saybrook. The island lies off the Thames estuary.','Court session 7 October 1640 Julian.','https://www.seekingmyroots.com/members/files/H000565.pdf');
  western(island,'1641-04-19','Fishers Island / Fisher’s Island','Connecticut General Court','John Winthrop Jr.','Fishers Island',fishersShore,'colonial confirmation',null,'Connecticut allowed Winthrop’s island grant subject to the colony’s own jurisdictional rights. Winthrop subsequently acquired a separate Indigenous conveyance.','Connecticut General Court, 9 April 1641 Julian.','https://blockbefore.com/ct/history-new-london-county-1906-001-text-new-london-ct.html');
  western(island,'1668-04-07','Fishers Island / Winthrop Manor','Governor Richard Nicolls of New York','John Winthrop Jr.','Fishers Island',fishersShore,'manorial patent',null,'The whole island at the eastern mouth of Long Island Sound was constituted a separate township and manor. Massachusetts and Connecticut had earlier issued grants.','NY Patents 3:5–7, 28 March 1668 Julian.',manor1);
  western(island,'1666-06-10','Shelter Island / Manhansucke Ahaquatsuwamocke','Governor Richard Nicolls of New York','Constant and Nathaniel Silvester (Sylvester)','Shelter Island',shelterShore,'manorial confirmation',null,'The patent confirms earlier deeds for the island between East Hampton, Southampton and Southold and establishes an independent township and manor subject to the provincial government. Earlier Manhanset objections remain documented.','NY Patents 1:65–68, 31 May 1666 Julian. Horsford, Manor of Shelter Island, transcript.','https://www.seekingmyroots.com/members/files/H007465.pdf','1673-08-29');
  western(island,'1673-08-29','Shelter Island / Manhanset','Restored New Netherland Council','Nathaniel Silvester (Sylvester)','Shelter Island',shelterShore,'Dutch restoration patent',null,'The separate Dutch patent names Nathaniel alone. The earlier English patent named Nathaniel and his brother Constant.','NYSA A1881, vol. 23, item 41, box 17, 29 August 1673 Gregorian.','https://encyclopedia.nahc-mapping.org/document/patent-nathaniel-silvester-shelter-island');
  western(hudson,'1667-10-29','Anna van Angola woodland confirmation','Governor Richard Nicolls of New York','Anna van Angola','Manhattan',places.manhattan[2],'confirmation','3 morgens 2 rods','The patent confirms GG 169 to the widow of Andries d’Angola and recites the earlier Dutch grant of 8 February 1647.','NYSA 12943-78, Patents 2:126, 19 October 1667 Julian.','https://www.newyorkfamilyhistory.org/new_netherland_settlers/anna-van-angola');
  western(hudson,'1664-10-28','Rensselaerswyck (Rensselaerswijck)','Governor Richard Nicolls of New York','Van Rensselaer family','upper Hudson near Albany',places.albany[2],'confirmation',null,'Nicolls confirmed possession after the English takeover. The later manorial patent recites this act and the 1665 confirmation.','General Entries 1:54–55; recited in Patents 5:102–110.',manor2);
  western(hudson,'1665-10-22','Rensselaerswyck (Rensselaerswijck)','Governor Richard Nicolls of New York','Van Rensselaer family','upper Hudson near Albany',places.albany[2],'confirmation',null,'The second English confirmation concerned the patroonship lands surrounding Albany. Dongan’s 1685 manorial patent recites both confirmations.','General Entries 1:54–55; recited in Patents 5:102–110.',manor2);
  western(hudson,'1666-10-16','Pell’s township (Pelham)','Governor Richard Nicolls of New York','Thomas Pell','Pelham Bay vicinity',[720,6770],'manorial patent',null,'The tract lay on the Westchester shore of Long Island Sound. The patent created local autonomy over land claimed through Pell’s 1654 deed.','NY Patents 1:74–77. Pelliana, new series 1:61–63.',manor2,'1687-10-30');
  western(hudson,'1687-10-30','Lordship and Manor of Pelham','Governor Thomas Dongan of New York','John Pell','Pelham Bay vicinity',[720,6770],'manorial confirmation',null,'Confirms the coastal holdings inherited from Thomas Pell, with local courts. The lordship’s jurisdiction overlapped continued Indigenous use.','NY Patents 6:306–313; De Lancey, pp. 156–157.','https://historicpelham.blogspot.com/2018/09/17th-century-agreement-to-settle-land.html');
  western(hudson,'1671-11-23','Fordham Manor','Governor Francis Lovelace of New York','John Archer','Fordham, Bronx',[623,6780],'manorial patent',null,'Archer’s holdings in the Bronx were constituted a township and manor. Separate authority for its own court followed in 1673.','NY Patents 4:83–85, 13 November 1671 Julian; Mellick, Manor of Fordham, pp. 70–72.',manor1);
  western(hudson,'1672-10-26','Fox Hall / Foxhall','Governor Francis Lovelace of New York','Thomas Chambers','Kingston vicinity',places.esopus[2],'manorial patent',null,'The grant establishes a manor on Chambers’s property north of Kingston. The 1686 patent restated the lordship.','General Entries 1:511–512, 16 October Julian. Olde Ulster 2:103–104.',manor1,'1686-11-07');
  western(hudson,'1686-11-07','Foxhall / Fox Hall','Governor Thomas Dongan of New York','Thomas Chambers','Kingston vicinity',places.esopus[2],'manorial confirmation',null,'The Dongan patent renewed Chambers’s lordship over his Esopus holdings.','NY Patents 5:582–592, 28 October 1686 Julian.',manor1);
  western(hudson,'1687-04-10','Cassiltown (Castleton) on Staten Island','Governor Thomas Dongan of New York','John Palmer','northern Staten Island',places.staten[2],'manorial patent',null,'The northern Staten Island properties constituted the manor, spanning parts of the later Castleton and Northfield.','NY Patents 6:197–202, 31 March 1687 Julian.',manor1);
  western(hudson,'1694-09-30','Fletcherdon / Evans patent','Governor Benjamin Fletcher of New York','John Evans','west bank of the Hudson in Orange and Ulster counties',null,'manorial patent',null,'The uncertain extent crossed parts of present Orange and Ulster counties. The colonial assembly revoked the grant on 16 May 1699 Julian.','NY Patents 6:461–467, 20 September 1694 Julian.',manor1,'1699-05-26');
  western(hudson,'1695-12-22','Kingsfeild / Kingsfield','Governor Benjamin Fletcher of New York','Nicholas Bayard','Mohawk Valley northwest of Schenectady',null,'manorial patent',null,'The grant was described as about 24 miles northwest of Schenectady. The 1699 act of revocation ended it.','NY Patents 7:1–4, 12 December 1695 Julian.',manor1,'1699-05-26');
  western(hudson,'1697-05-16','Morrisania Manor','Governor Benjamin Fletcher of New York','Lewis Morris','southern Bronx',[592,6836],'manorial patent',null,'The manorial grant embraced the Morris estate in the Bronx. Earlier acquisitions were separate instruments.','NY Patents 7:64–70, 6 May 1697 Julian. De Lancey, pp. 157–159.',manor1);
  western(island,'1686-09-02','Eaton Manor / Eaton’s Neck','Governor Thomas Dongan of New York','Richard and Alexander Bryan','Eaton’s Neck vicinity',[1464,6764],'manorial patent',null,'The peninsula on the north side of Huntington was held as a separate manor within the area claimed in Huntington’s town patent.','NY Patents 5:508–513. Huntington Town Records 1:451–456, 23 August 1686 Julian.',manor1);
  western(island,'1691-06-04','Mastic and Connecticut River tract','John Mayhew, Unkechaug leader','William “Tangier” Smith','Mastic Neck vicinity',[2435,7043],'Indigenous deed',null,'Between the Mastic and Connecticut rivers, bounded by the bay and the country road. The 1693 survey records prior patents and Brookhaven’s claims to meadows.','Stony Brook University, Robert Harpur Collection, 1693 survey and description; acquisition dated 25 May 1691 Julian.',harpur);
  western(island,'1693-10-19','Manor of St. George / St. George’s Manor','Governor Benjamin Fletcher of New York','William “Tangier” Smith','Mastic Neck vicinity',[2435,7043],'manorial patent',null,'The patent included the Mastic and Connecticut river lands, beach, bay and islands. It conflicted with earlier holdings around Yaphank Neck. The survey identified three existing patents and Brookhaven meadow rights.','NY Patents 6:433–439. Brookhaven Town Records, pp. 77–83, 9 October 1693 Julian.','https://brookhavensouthaven.org/wp-content/uploads/2021/08/PatentOf1693-1.pdf');
  western(island,'1697-06','Manor of St. George eastern annexation','Governor Benjamin Fletcher of New York','William “Tangier” Smith','east of Mastic River',[2480,7030],'enlargement',null,'The annexation extended toward Southampton, excluding the Moriches and Mamanok necks. Existing settlers asserted competing rights. Accounts differ between 9 and 17 June Julian; both dates fall in Gregorian June.','NY Patents 7:106–110. Brookhaven Town Records, pp. 89–91.',manor2);
  western(island,'1697-11-27','Moriches Patentship / Moriches Patent','Governor Benjamin Fletcher of New York','Richard Smith, son of Richard Smith of Smithtown','Moriches vicinity',[2500,7042],'patent',null,'The smaller holding remained outside William Smith’s St. George annexation. The two Smith grants were distinct.','Manor of St George, account of the Moriches patent dated 17 November 1697 Julian.','https://brookhavensouthaven.org/manor-of-st-george-mastic-neck-ny/');
  western(hudson,'1686-11-03','Minnisinck / Sanders and Harmense patent','Governor Thomas Dongan of New York','Robert Sanders and Myndert Harmense','Poughkeepsie vicinity',[476,4760],'patent',null,'The description names Sovryn the baker’s land, Wynachkee creek, falls and marshes. Uncertain bounds conflicted with Schuyler’s claim.','Hasbrouck, History of Dutchess County, ch. IV, pp. 37–39, 24 October 1686 Julian.',dutchess);
  western(hudson,'1688-06-12','Schuyler patent / Maghdalen Island and Long Reach tracts','Governor Thomas Dongan of New York','Pieter Schuyler','Poughkeepsie and Red Hook',[476,4760],'patent',null,'Two separate Hudson frontage tracts near Red Hook and south of Poughkeepsie. The point locates the southern tract. Portions overlapped preparations by Sanders and Harmense.','Hasbrouck, History of Dutchess County, ch. IV, pp. 37–39, 2 June 1688 Julian.',dutchess);
  western(hudson,'1688-06-12','Artsen / Arentsen patent','Governor Thomas Dongan of New York','Gerrit Artsen, Arie Rosa and Jan Elton','southwestern Rhinebeck',[489,4190],'patent','1,200 acres','The original tract lay in southwestern Rhinebeck. Earlier Indigenous conveyance dated 8 June 1686; adjoining Hendrick Kip land had a distinct deed.','Hasbrouck, History of Dutchess County, ch. IV, p. 39, 2 June 1688 Julian.',dutchess);
  western(hudson,'1696-05-21','Pawling patent','Governor Benjamin Fletcher of New York','Neiltie Pawling and her seven children','Crom Elbow Creek vicinity',[480,4438],'patent','4,000 acres','The grant was north and west of Crom Elbow Creek. Neiltie was the widow of Henry Pawling.','Hasbrouck, History of Dutchess County, ch. IV, p. 39, 11 May 1696 Julian.',dutchess);
  western(hudson,'1697-05-02','Beekman’s Rhinebeck patent (original)','Governor Benjamin Fletcher of New York','Henry Beekman','Rhinebeck, opposite Esopus Creek',[489,4190],'patent',null,'This is the river tract opposite Esopus Creek, distinct from Beekman’s inland tract east of the Rombout patent. Both were surrendered and replaced in 1703. The source dates the grant 22 April Julian; its Gregorian date is 2 May.','Hasbrouck, History of Dutchess County, ch. IV, pp. 40–41.',dutchess,'1703-07-06');
  western(hudson,'1697-05-17','Poughkeepsie / Ten Eyck patent','Governor Benjamin Fletcher of New York','Henry Ten Eyck and eight associates','Poughkeepsie vicinity',[476,4760],'overlapping patent claim',null,'The claimed land overlapped earlier patents. The record of issuance does not resolve those competing titles.','Hasbrouck, History of Dutchess County, ch. IV, p. 39, 7 May 1697 Julian.',dutchess);
  const vanWyck = 'https://longislandgenealogy.com/LIpatents.pdf';
  const nicolls = 'Governor Richard Nicolls of New York';
  const dongan = 'Governor Thomas Dongan of New York';
  const andros = 'Governor Edmund Andros of New York';
  const hempstead = [1100,7121], flatlands = [547,7301], canarsie = [579,7300], oysterBay = [1237,6856], setauket = [2010,6683];
  western(island,'1664-05-20','Canarsie / Canarissen','Director General Petrus Stuyvesant','Govert Loockermans','Canarsie',canarsie,'Dutch grant',null,'A separate tract at Canarsie, recited within the English confirmation.','Van Wyck, Long Island Colonial Patents, pp. 22–23, NY Patents IV:31.',vanWyck);
  western(island,'1667-04-08','Canarsie / Canarissen',nicolls,'Govert Loockermans','Canarsie',canarsie,'confirmation',null,'Confirmed the 20 May 1664 Dutch grant to Loockermans.','Van Wyck, pp. 22–23, NY Patents IV:31, 29 March 1667 Julian.',vanWyck);
  western(island,'1667-10-14','Amesford / Amesfoort / Flatlands',nicolls,'Elbert Elberts, Govert Lockermans, Roeloffe Martens, Pieter Claes, Willem Garrits, Thomas Hillebrants, Steven Coersten and Coert Stevens','Flatlands',flatlands,'town patent',null,'From Stramme Kill to Firkins Hook, with a marked tree at Midwout and divisions of meadow. Earlier purchases and future acquisitions were distinguished.','Van Wyck, pp. 131–135, NY Patents IV:44, 4 October Julian.',vanWyck);
  western(island,'1667-11-11','Kaskuteusuhane / western of the three flats',nicolls,'Elbert Elbertsen','Flatlands',flatlands,'individual confirmation',null,'Recites Hudde and Gerritsen’s original Dutch groundbrief. The western plain lay within the later town patent.','Van Wyck, pp. 135–138, NY Patents I:91, 1 November Julian.',vanWyck);
  western(island,'1669-02-15','Canarite / Canarsie addition','Governor Francis Lovelace of New York','Flatlands patentees and associates','Canarsie',canarsie,'town enlargement',null,'Lovelace confirmed the purchase dated 23 April 1665 Julian as an addition to the Nicolls town patent.','Van Wyck, pp. 138–139, NY Patents IV:168, 5 February 1668/69 Julian.',vanWyck);
  western(island,'1686-03-21','Flatlands / New Amersfort',dongan,'Elbert Elberts, Roeloff Martens, Pieter Claessen, Willem Gerretsen, Coert Stevensen, Leucas Stevensen and John Teunissen','Flatlands',flatlands,'town confirmation',null,'Recites the Nicolls town patent and subsequent additional lands. The text includes the town’s meadows, watercourses and appurtenances.','Van Wyck, pp. 140–144, NY Patents V:300, 11 March 1685/86 Julian.',vanWyck);
  western(island,'1644-11-16','Hempstead / Heemstede / Great Plains','Director Willem Kieft and Council of New Netherland','Robert Fordham, John Stickland, John Ogden, John Carman, John Laurence and Jonas Wood','Hempstead Plains',hempstead,'town patent',null,'Granted privileges of settlement on the Great Plains to the patentees and their associates on terms involving acquisition of Indigenous land.','Van Wyck, pp. 145–150, citing Laws and Ordinances of New Netherland, pp. 42–46.',vanWyck);
  western(island,'1667-03-16','Hempstead / Hempsteed',nicolls,'John Hicks, John Seaman, Richard Gildersleeve, Robert Jackson, John Carman, John Smith Senior and John Smith Junior','Hempstead Plains',hempstead,'town confirmation',null,'Preserves individual lawful claims within the bounds. The parallel recorded text in IV:55 is endorsed recalled, names James Pyne, and treats unpurchased native lands separately. The two copies are linked here.','Van Wyck, pp. 150–156, NY Patents I:76 and IV:55, 6 March 1666/67 Julian.',vanWyck);
  western(island,'1685-04-27','Hempstead / Hempsteed',dongan,'John Seaman, Symon Sareing, John Jackson, James Pine Senior, Richard Gildersleeve Senior and Nathaniell Pearsall','Hempstead Plains',hempstead,'town confirmation',null,'Includes Hempstead Harbour and the line from the marked tree at the head of Mattagarett’s Bay toward the Sound. Earlier grants and outstanding proprietary rights appear in the recitals.','Van Wyck, pp. 156–161, NY Patents V:182, 17 April 1685 Julian.',vanWyck);
  western(island,'1666-03-13','Nesaquauke / Smithtown',nicolls,'Richard Smith','Nissequogue River',[1850,6759],'conditional patent',null,'Extends from the Raconkamuck pond to the river. The dispute with Huntington affected claims on the western bank. The later Andros patent was a separate instrument.','Van Wyck, pp. 162–165, Town Records of Smithtown, pp. 6–8, 3 March 1665/66 Julian.',vanWyck);
  western(hudson,'1667-04-06','Dominie’s Bouwerie / Bogardus farm',nicolls,'Children of Anneke Bogardus','Manhattan',[447,7165],'confirmation','62 acres','Recites the Dutch grant to Anneke Jans of the farm on Manhattan.','Van Wyck, pp. 172–173, NY Patents IV:28, 27 March 1667 Julian.',vanWyck);
  western(island,'1653','Oyster Bay / Oysterbay','Asiapum and Mohenes','Peter Wright, Samuel Mayo, William Leverich and associates','Oyster Bay',oysterBay,'Indigenous deed',null,'Between the Oyster and Papaquatunk rivers, except Hog Island and the point of Canteaiug.','Oyster Bay Town Records, Liber B, fol. 57, Oyster Bay Historical Society transcription p. 1.',oysterBook);
  western(island,'1677-10-09','Oyster Bay / Oysterbay',andros,'Henry Townsend Senior, Nicholas Wright, Thomas Townsend, Gedeon Wright, Richard Harcker, Joseph Carpenter and Joseph Lating','Oyster Bay',oysterBay,'town patent',null,'Confirmed existing holdings subject to prior rights. Further purchases were required for land still held by Indigenous owners.','Oyster Bay Historical Society transcription pp. 3–4, 29 September 1677 Julian.',oysterBook);
  const oysterAllotments = [
    ['Francis Weeks','Matinicuck Creek meadow',null,'66 by 26½ poles north of Sagamore Hill.'],
    ['Nicholas Simkens','Oyster Bay planting lot','7 acres and 32 poles','The recorded survey gives the area of this separate allotment.'],
    ['Henry Townsend','Oyster Bay swamp allowance lot','20 acres','92 by 40 poles with an allowance for swamp. The schedule repeats this allotment.'],
    ['John Townsend','Oyster Bay ten-acre lot','10 acres','The schedule records a separate ten-acre allotment.'],
    ['Anthony Wright','Oyster Bay ten-acre lot','10 acres','Recorded separately from John Townsend’s adjoining series of allotments.'],
    ['Als Crab','Old Planting Field lots','two lots of 10 acres','Near the Old Planting Field west of Mile River.'],
    ['Joseph Sutton','Mile River hollow lot','20 acres','South of the hollow at Mile River.'],
    ['Thomas Armitage','Mile River lot','10 acres','East of Joseph Sutton’s allotment.'],
    ['Benjamin Hubbard','Mile River lot','13 acres','Most of the tract lay west of Joseph Sutton’s allotment.'],
    ['Mathias Harvey','Mile River head lot','20 acres','Near the head of Mile River and the Hempstead highway.'],
    ['Francis Weeks','Huckleberry Point lot','10 acres','A second allotment described at Huckleberry Point.'],
    ['James Cock','Huckleberry Point vicinity','10 acres','South of Francis Weeks’s allotment.'],
    ['John Townsend Junior','Beaver Swamp road lot',null,'64 by 40 poles south of the road to Beaver Swamp.']
  ];
  for (const [grantee,tract,area,bounds] of oysterAllotments) {
    western(island,'1663',tract,'Town of Oyster Bay',grantee,'Oyster Bay',oysterBay,'town allotment',area,bounds+' Survey schedule follows the town order of 14 September 1663 Julian. The individual surveys carry no separate day.','Oyster Bay Historical Society transcription p. 2, town order fol. 42.',oysterBook);
  }
  western(island,'1664-12-21','Cold Spring Bay lot','Town of Oyster Bay','Robert Furman','Oyster Bay',oysterBay,'town allotment','20 acres','Laid out at Cold Spring Bay.','Oyster Bay Historical Society transcription p. 2, 11 December 1664 Julian.',oysterBook);
  western(island,'1664','Oak Neck lot','Town of Oyster Bay','Jonas Halstead','Oyster Bay',oysterBay,'town allotment','20 acres','At Oak Neck in the schedule following Furman’s December allotment.','Oyster Bay Historical Society transcription p. 2.',oysterBook);
  western(island,'1664','Hempstead road lot','Town of Oyster Bay','John Underhill','Oyster Bay',oysterBay,'town allotment','10 acres','Near Nicholas Wright and the road to Hempstead, following Furman’s December allotment.','Oyster Bay Historical Society transcription p. 2.',oysterBook);
  const brookhavenBook = 'https://www.brookhavenny.gov/525/Establishment-of-Brookhaven';
  western(island,'1655-04-24','Setauket / Brookhaven founding purchase','Setauket Indigenous grantors','English purchasers for the Setauket settlement','Setauket',setauket,'Indigenous deed',null,'The initial purchase lay near Setauket. Subsequent colonial instruments claimed a larger tract.','Town of Brookhaven, original deed of 14 April 1655 Julian.','https://www.brookhavenny.gov/ArchiveCenter/ViewFile/Item/563');
  western(island,'1667-03-17','Setauket / Brookhaven',nicolls,'John Tooker, Daniel Lane, Richard Woodhull, Henry Perring and John Jenner','Setauket',setauket,'town patent',null,'From the Smithtown line east to Red Creek or Wading River, from Sound to ocean. The patent authorized further purchases.','Town of Brookhaven, Nicolls patent, 7 March 1666/67 Julian.',brookhavenBook);
  western(island,'1687-01-06','Brookhaven / Setauket',dongan,'Trustees of the Freeholders and Commonalty of Brookhaven','Setauket',setauket,'town confirmation',null,'Confirmed the town and vested the common estate in the trustees.','Town of Brookhaven, Dongan patent, 27 December 1686 Julian.',brookhavenBook);
  const oldTown = 'https://www.nyc.gov/assets/records/pdf/KingsCountyOldTownMicrofilmInventory.pdf';
  const huntington = [1496,6815];
  const huntBounds = 'https://dos.ny.gov/system/files/documents/2019/04/lloydharborsii.pdf';
  western(island,'1644','Munnatawket / Fishers Island','Pequot owners, individual names unconfirmed','John Winthrop Jr.','Fishers Island',fishersShore,'reported Indigenous conveyance',null,'The later English patent recites a purchase. The original deed is missing. The island was subsequently contested between Connecticut and New York.','Henry L. Ferguson, Archeological Exploration of Fishers Island, historical introduction.','https://fergusonmuseum.org/wp-content/uploads/2013/02/archeological-exp00ferg.pdf');
  western(island,'1645-10-10','Vlissingen / Flushing','Director Willem Kieft and Council of New Netherland','Thomas Farrington, John Townsend, Thomas Stiles, Thomas Saull, John Marston, Robert Field, Thomas Applegate, Thomas Beddard, Laurence Dutch, John Laurence, William Laurence, William Thorne, Henry Sautell, William Pigeon, Michaell Milleard, Robert Firman, John Hicks and Edward Hart','Flushing',[739,7056],'town patent',null,'From Flushing Creek to Mathew Garretsons Bay, including Tues Neck, between Doughty’s and Hempstead’s grants.','Laws and Ordinances of New Netherland, p. 48, 10 October 1645.','https://www.bownehouse.org/records-of-bownes-trial/flushing-charter');
  western(island,'1645-12-19','Gravesande / Gravesend','Director Willem Kieft and Council of New Netherland','Deborah Moody, Henry Moody, George Baxter, James Hubbard and their associates','Gravesend',places.gravesend[2],'town patent',null,'Begins at the creek beside Coney Island. Adjacent farms and shoreline mark the mainland tract. Grazing on Coney Island was expressly granted.','NYC Municipal Archives, Kings County Old Town Records, reel 164, envelope 5, original sealed patent.','https://www.archives.nyc/new-visions-of-old-new-york/gravesend');
  western(island,'1667','Gravesend',nicolls,'Patentees and inhabitants of Gravesend','Gravesend',places.gravesend[2],'town confirmation recorded in draft form',null,'Recites the Kieft bounds and cattle grazing on Coney Island. The surviving manuscript bears a year endorsement.','New York Historical Manuscripts, English, document 22:33, pp. 58–60.','https://www.newnetherlandinstitute.org/download_file/view/8733d840-9f9f-4254-812f-e0e6fa3533ba/321');
  western(island,'1670-07-11','Gravesend','Governor Francis Lovelace of New York','Inhabitants of Gravesend','Gravesend',places.gravesend[2],'town confirmation and boundary settlement',null,'Includes disputed meadow and upland claimed by Francis Brown, subject to articles of agreement.','NYC Municipal Archives, Kings County Old Town Records, reel 164, envelope 6, original, 1 July 1670 Julian.',oldTown);
  western(island,'1686-09-20','Gravesend',dongan,'Freeholders of Gravesend','Gravesend',places.gravesend[2],'town confirmation and enlargement',null,'Revised and extended the town limits described in the Lovelace confirmation.','NYC Municipal Archives, Kings County Old Town Records, reel 164, envelope 7, original, 10 September 1686 Julian.',oldTown);
  western(island,'1653-04-12','Huntington first purchase','Raskokan of Matinecock and other signatories','Richard Houldbrook, Robert Williams and Daniel Whitehead','Huntington',huntington,'Indigenous deed',null,'The description follows the Sound between Nackaquetock and Opcatkantyoke and names the inland limits. The town later claimed additional tracts.','Huntington Town Records I, first purchase, 2 April 1653 Julian.','https://www.seekingmyroots.com/members/files/H008662.pdf');
  western(island,'1656-08-09','Huntington eastern purchase','Indigenous owners of the tract','Huntington purchasers','Huntington',huntington,'Indigenous deed',null,'Added land east of the first purchase. The separate acquisitions appear in the recitals of the 1666 patent.','Huntington Legal Manuscripts, second purchase, 30 July 1656 Julian.','https://ftp.nyheritage.org/collections/huntington-legal-manuscripts');
  western(island,'1666-12-10','Huntington',nicolls,'Jonas Wood, William Leveridge, Robert Seeley, John Ketcham, Thomas Scidmore, Isaac Platt, Thomas Jones and Thomas Weekes','Huntington',huntington,'town patent',null,'Confirmed the 1653 purchase, the eastern 1656 purchase and nine necks along Great South Bay.','Huntington Town Records I, Nicolls patent, 30 November 1666 Julian. NY Department of State, Lloyd Harbor, section II.',huntBounds);
  western(island,'1688-08-12','Huntington',dongan,'Trustees of the Freeholders and Commonalty of Huntington','Huntington',huntington,'town confirmation',null,'Vested the town property and the power to make dispositions in elected trustees. Individual manors and lands still held by Indigenous owners complicated the claim.','Huntington Town Records I, Dongan patent, 2 August 1688 Julian. NY Department of State, Lloyd Harbor, section II.',huntBounds);
  western(island,'1694-10-15','Huntington','Governor Benjamin Fletcher of New York','Trustees of the Freeholders and Commonalty of Huntington','Huntington',huntington,'town confirmation',null,'Repeated the trust and empowered purchase of outstanding Indigenous holdings. The boundary description ran from Cold Spring to the Atlantic shore.','Huntington Town Records, Fletcher patent, 5 October 1694 Julian. NY Department of State, Lloyd Harbor, section II.',huntBounds);
  western(island,'1675-04-12','Plum Island / Great Gull Island',andros,'Samuel Wyllys','Plum Island and Great Gull Island',[3688,6160],'island patent',null,'Includes two named islands. The point marks Plum Island. The two islands are physically separate. Southold’s subsequent town claim also encompassed these waters.','NY Patents IV:97–98, 2 April 1675 Julian.',manor2);
  dutch('GG 47',14,'1642-03-26','Govert Loockmans and Cornelis Leendersz','East River enclosed house and land','town',null,'The company sold the house with the Provoost enclosure by fresh water and Tienhoven’s palisades. The parties shared a private wagon-road easement.','company sale');
  western(hudson,'1667','East River enclosed house and land',nicolls,'Govert Loockermans, other lawful purchasers and their heirs','New Amsterdam',places.town[2],'confirmation',null,'Confirms the unsold portion to Loockermans and separately recognizes purchasers from the original estate. The printed copy gives an impossible year for 18 April. The inventory uses the editorial 1667 dating without a day.','Van Wyck, pp. 173–175, NY Patents II:11, corresponding to GG 47.',vanWyck);
  // Each number identifies an individual text within A1881, volume 23, register 433.
  const restoredPatents = [
    ['1','1673-11-29','John Ogden, Jaspar Crane, Jacob Melyn, Samuel Hopkins, John Ward, Abraham Pierson Senior and Stephen Freeman for Newark','Achter Coll / Kingsland plantation','jersey',null,'Two thirds of the neck between the Passaic and Hackensack rivers, previously confiscated from Nathaniel Kingsland. William Sandford retained the other third.'],
    ['10','1674-03-19','Gertrude, widow of John Hubon','Brooklyn ferry lot','brooklyn',null,'The lot adjoined the Long Island ferry landing.'],
    ['19','1673-10-14','Nicholas Bayard','High Street confiscated lot','town',null,'The lot on High Street was confiscated from William Pattison.'],
    ['20','1673-10-14','Cornelis van Borsum, husband of Sara van Borsum','Kalckhook road lot','town',null,'Granted in recognition of Sara’s work as an interpreter. The lot lay northwest of the windmill and west of the road to Kalckhook.'],
    ['21','1674-05-22','Paulus Regrinar','Marlet’s Point bay tract','staten','70 morgens','On the bay about one Dutch mile from Gideon Marlet’s point.'],
    ['22','1674-05-22','Peter Stoutenbergh','Company garden lot 3','town',null,'Number 3 of the subdivided West India Company garden west of Broadway.'],
    ['23','1674','Gerrit Janse Roos','Company garden lot 2','town',null,'Adjoined lot 3. Its separate entry lacks an execution day in both the calendar and archival description.'],
    ['24','1674-05-22','William van Vredenburgh','Company garden lot 1','town',null,'Adjoined lot 2 on the west side of Broadway.'],
    ['25','1674-05-22','George Cobbet','Company garden lot 4','town',null,'Lot 4 adjoined the Lutheran congregation’s lot.'],
    ['26','1674-05-22','Lutheran congregation of New Orange','Company garden lot 5','town',null,'Between George Cobbet’s lot and the city wall.'],
    ['27','1674-05-24','Peter de Riemer','Lovelace house east of Fort Willem Hendrick','town',null,'A confiscated house and lot formerly owned by Governor Francis Lovelace.'],
    ['28','1674-05-24','Simon Barentse Blanck','Brewer Street lot','town',null,'The neighboring lot was granted to Peter Slodt.'],
    ['29','1674-05-24','Peter Jansen Slodt','Brewer Street lot','town',null,'Adjoined Simon Barentse Blanck.'],
    ['30','1674-05-24','Jan Dirckse Meyer','Bridge Street lot','town',null,'A lot on Bridge Street in New Orange.'],
    ['31','1674-05-24','Andries Meyer','Bridge Street lot','town',null,'A separate lot on Bridge Street.'],
    ['32','1674-05-24','Peter Janse Mesier','Bridge Street lot by the Five Houses','town',null,'East of the Five Houses.'],
    ['33','1674-05-24','Ephraim Herman','High Street lot','town',null,'East of the highway in New Orange.'],
    ['34','1674-05-24','Martin Janse Meyer','Sheep Pasture house and lot','town',null,'Former Thomas Delaval property east of the pasture, confiscated by the restored Dutch government.'],
    ['35','1674-05-24','Lodewyck Post','East River house and lot','town',null,'A riverside house confiscated from William Pattison.'],
    ['36','1674-05-24','Peter Harmse','Smith Street corner house','town',null,'On the little corner of Smith Street, confiscated from William Pattison.'],
    ['37','1674-02-15','Jacobus van de Water','Pearl Street house and lot','town',null,'Another Pattison property, on Pearl Street.'],
    ['38','1674-02-15','Gerrit Hendrickse, butcher','Smith Street house and lot','town',null,'A confiscated Pattison property.'],
    ['40','1674-07-17','Ephraim Herman','Smith’s Valley garden and orchard','town',null,'A house lot with garden and orchard outside the city.'],
    ['41','1674-05-24','Johannis van Brugh','Hoboocken / Wiehaacken valley','jersey','about 5–6 morgens','Between Hoboken and Weehawken creeks on the west bank of the Hudson.'],
    ['42','1674-05-21','Obadiah Bruen, Samuel Kitchell, Michael Tamkins, John Brown, Robert Denison and the inhabitants','New Worke / Newark at Achter Coll','jersey',null,'From the bay and Passaic River to Weequahic, the Watchung ridge and Yantakah. The point locates the regional harbor approach. The inland extent is unresolved on the sheet.'],
    ['45','1674-07-17','Martin Janse Meyer','Smith’s Valley orchard lot','town',null,'Garden and orchard beyond the city of New Orange.'],
    ['47','1674-09-04','Roelof van der Linde, Jan Spieringh, Jan van der Linde and Hans Spieringh','Northwest hook of Staten Island','staten',null,'The corner is named, but the numerical area is missing in the calendar.'],
    ['50','1674-07-17','Peter Jansen Mesier','Smith’s Valley lot','town',null,'Outside the settled city in Smith’s Valley.'],
    ['52','1674-07-17','Peter Stoutenbergh','Dr. Taylor’s garden lot','town',null,'Adjoined Dr. Henry Taylor’s garden.'],
    ['53','1674-10-26','Martin Cregier Junior','Lutheran churchyard house and lot','town',null,'Adjoined the churchyard and formerly belonged to Governor Francis Lovelace.'],
    ['54','1674-10-10','Jan Teunissen van Pelt','Blackpoint / Kill van Kull','staten',null,'At Blackpoint on the Kill van Kull.'],
    ['55','1674-10-10','Jacob Gerritsen and Seger Gerritsen','Fresh Kill tract','staten','72 morgens','South of the Fresh Kill. The single point marks Staten Island at regional scale.'],
    ['57a','1674-10-30','Elizabeth Drisius','Couwenhoven adjoining lot','town',null,'Next to the widow Couwenhoven’s lot.'],
    ['57b','1674-10-30','Jan Scholten','Kill van Kull land','staten','30 morgens','The grant lay on the Kill van Kull.'],
    ['57c','1674-11-03','Gerrit Jansen Roos','New Orange lot','town',null,'The calendar identifies a city lot. An earlier undated company-garden instrument names the same grantee.']
  ];
  const calEnglish = 'https://archive.org/details/cu31924092229446';
  for (const [folio, date, grantee, tract, place, area, bounds] of restoredPatents) {
    const [region, locality, point] = places[place];
    western(region,date,tract,'Governor Anthony Colve of New Netherland',grantee,locality,point,'Dutch restoration patent',area,bounds,
      'NYSA A1881, vol. XXIII, register 433, fol. '+folio+'. O’Callaghan, Calendar of Historical Manuscripts II, pp. 28–31.',
      'https://newnetherlandinstitute.org/research/volume-xxiii-colve-papers-1673-1674/');
  }
  const secondCalendar = [
    ['1665-09-16','XXII:2','Land opposite Apes’ Island',nicolls,'Jacob Jansen Flodder','albany','guarantee','3 morgens','Opposite present Van Rensselaer Island near Albany.'],
    ['1673-10-17','XXIII:124','Richard Morris plantation','Restored New Netherland Council','Lewis Morris for his deceased brother Richard’s orphan child','bronx','conditional grant',null,'The plantation was conferred for the child’s benefit. The later English patent established Morrisania.'],
    ['1675-06-06','XXIV:107','Albany town lot','Magistrates of Albany','Adrian Gerritse','albany','town deed',null,'The calendar identifies a lot in Albany.'],
    ['1658-12-27','XXV:62','Bunnen Kil island, first conveyance','Indigenous grantors whose names are omitted from the calendar','Volckert Jansen and Jan Tomassen','bethlehem','Indigenous deed',null,'Half of the island facing their farm in the Bunnen Kil. The later deed extended their claim.'],
    ['1661-01-25','XXV:62','Bunnen Kil and Little Cooper’s Island','Indigenous grantors whose names are omitted from the calendar','Volckert Jansen and Jan Tomassen','bethlehem','Indigenous deed and enlargement',null,'Conveyed the whole island named in the 1658 deed and Little Cooper’s Island.'],
    ['1676-05-30','XXV, printed p. 45','Esplanade Street corner','Commissaries of Albany','Jacob Tys van der Heyden','albany','town deed',null,'Adjoined the new churchyard at the Esplanade Street corner.'],
    ['1676-10-13','XXV:204','Cow Neck tract',andros,'John Cornell','oyster','individual grant','100 acres','Ordered after Cornell was driven from his eastern settlement. The tract was on Cow Neck, west of Oyster Bay.'],
    ['1678-12-30','XXVIII, printed p. 76','Popgassit and Whale Island','Indigenous grantors whose names are omitted from the calendar','Robert Sanders','dutchess','Indigenous deed',null,'A named east-bank Hudson tract and Whale Island. Distinct from the later Sanders–Harmense patent.'],
    ['1680-04-30','XXIX:81','Flushing grant to Elias Doughty','Town of Flushing','Elias Doughty','flushing','town grant','200 acres','The calendar locates the land within Flushing.'],
    ['1680-07-19','XXIX:145','Hurley and Marbletown tract',andros,'Henry Pawling','esopus','grant','60 acres','Straddled Hurley and Marbletown. A Kingston sessions award also appears at XXIX:131.'],
    ['1684-11-28','XXXII:26','Hempstead grant to Thomas Dongan','Town of Hempstead','Thomas Dongan','hempstead','town grant','200 acres','The later Flushing grant adjoined this tract.'],
    ['1684-12-03','XXXII:28','Hempstead grant to John Spragge','Town of Hempstead','John Spragge','hempstead','town grant','150 acres','The grant to the provincial secretary survives in a transcript from the town records.'],
    ['1686-10-21','XXXIII:60','Hurly / Hurley farm',dongan,'Matthew Blanjohn','esopus','patent','62¾ acres and 36 rods','Located in Hurley, Ulster County.'],
    ['1686-08-08','XXXIII:79','East Hampton contested grant','Governor and Council of New York','Robert Cady and associates','eastHampton','disputed grant','300 acres','Thomas James, Samuel Mulford and associates sought revocation, disputing the patentees’ claim to have borne local taxes.'],
    ['1687-04-09','XXXV, printed p. 166','Adriutha / Adriucha / Cuyler’s Flat',dongan,'Hendrick Cuyler of Albany','schenectady','patent','about 40 acres of low land and 50 of upland','Four flats on the Mohawk near Lewis Creek, between marked trees and associated islands. Pearson, Schenectady Patent, p. 157, also transcribes the bounds.']
  ];
  const morePlaces = {dutchess:[hudson,'east Hudson, Poughkeepsie vicinity',[476,4760]],flushing:[island,'Flushing',[739,7056]],hempstead:[island,'Hempstead',hempstead],eastHampton:[island,'East Hampton',[3694,6604]],schenectady:[hudson,'Schenectady vicinity',[683,2285]]};
  for (const [date, id, tract, authority, grantee, place, instrument, area, bounds] of secondCalendar) {
    const [region, locality, point] = morePlaces[place] || places[place];
    western(region,date,tract,authority,grantee,locality,point,instrument,area,bounds,
      'O’Callaghan, Calendar of Historical Manuscripts, English, part II (1866), '+id+'.',calEnglish);
  }
  const cowNeck = [1076,6835];
  const exhibits = 'https://hallapproved.com/ny/cases/supreme-court/1936/5581846/';
  for (const [date, grantee, acres, exhibit] of [
    ['1686-05-05','Thomas Willett','200 acres',25],['1686-12-05','Richard Cornwall / Cornell','200 acres',17],
    ['1686-12-05','Elly Doughty','100 acres',19],['1686-12-05','Thomas Hicks','100 acres',23],
    ['1686-12-23','John Cornell','100 acres',21]
  ]) {
    western(island,date,'Cow Neck reserved tract',dongan,grantee,'Cow Neck vicinity',cowNeck,'individual patent',acres,
      'One of five grants described in the court’s reconstruction of the 700-acre exception to the 1685 Hempstead patent. The patents cover separate holdings.',
      'Conde Nast v. Town of North Hempstead, 160 Misc. 267, 270 (1936), plaintiff’s exhibit '+exhibit+'.',exhibits);
  }
  western(island,'1686-11-04','Newtown / New Towne',dongan,'Inhabitants of New Towne','Newtown',places.newtown[2],'town confirmation',null,'Reconfirmed the town’s common property. Claims of adjoining Brooklyn, Flatbush and Bushwick affected the disputed boundary.','NY Letters Patent VI:10ff. Seymann, Colonial Charters, Patents and Grants, pp. 559–567, 25 October Julian.',calEnglish);
  for (const [grantee, tract,place,description] of [
    ['Joseph Sackett','Newtown individual grant','newtown','The separate grant was listed beside the town confirmation.'],
    ['Benjamin Smith','Brookhaven holding','setauket','The calendar distinguishes this individual holding from the Brookhaven town confirmation.'],
    ['John Seaman','Oyster Bay holding','oyster','A holding in Oyster Bay.'],
    ['Samuel Eburne','Snake’s Neck','setauket','A separate holding at Snake’s Neck on the south shore. The point marks the Brookhaven area.'],
    ['Samuel Eburne','Setauket / Seatalcot meadow','setauket','The 27 December order for Eburne’s adjoining meadow was subject to prior rights. See XXXIII:90.'],
    ['Andrew Gibb','Brookhaven holding','setauket','Other entries record challenges to the Gibb patent.'],
    ['Jacob Sullivan','Staten Island holding','staten','The island is named. The parcel corners are unresolved.'],
    ['Richard Lloid / Lloyd','Seatalcott holding','setauket','The provincial list places the claim at Setauket.'],
    ['William Nicolls','Islands near Huntington','huntIslands','The summary identifies islands in the Huntington vicinity without identifying each one.']
  ]) {
    const [region,loc,point] = ({setauket:[island,'Brookhaven vicinity',setauket],huntIslands:[island,'unidentified islands near Huntington',null]})[place] || places[place];
    western(region,'1686',tract,dongan,grantee,loc,point,'individual confirmation',null,description,'NY Colonial Manuscripts XXXV:161, 1686 list of confirmatory grants, O’Callaghan II, p. 171.',calEnglish);
  }
  const schenBook = 'https://schenectadyhistory.org/resources/patent/05.html';
  const schen = [683,2285];
  western(hudson,'1672-07-13','Schenectady enlarged purchase','Tohorywachqua and Crage representing the four Mohawk castles and the named owners','Sander Leendertse Glen, John Van Epps and Sweer Teunissen for the inhabitants','Schenectady vicinity',schen,'Indigenous deed',null,'From the settlement upstream to Canaquarioeny and downstream to Ael Place, extending inland on both sides. Recited in the 1684 patent.','Pearson, Schenectady Patent, ch. V, deed of 3 July 1672 as recited in the English patent.',schenBook);
  western(hudson,'1684-11-11','Schenectady / Schenectade',dongan,'William Teller, Ryer Schermerhorn, Sweer Teunise, Jan Van Epps and Myndert Wemp in trust for the inhabitants','Schenectady vicinity',schen,'town confirmation and enlargement',null,'Included land already held separately and the enlarged 1672 acquisition, with a separate quit-rent on corn and sawmills and a limit on cutting timber.','Pearson, Schenectady Patent, ch. V, transcription of 1 November 1684 Julian.',schenBook);
  western(hudson,'1684-10-23','Seventh Flat, western half','Trustees of Schenectady','Carel Hansen Toll','Schenectady vicinity',schen,'proprietor allotment',null,'The west half and adjacent upland on the north bank adjoined the east half taken by Reyer Schermerhorn.','Pearson, Schenectady Patent, pp. 157–158, 13 October 1684 Julian.','https://mail.schenectadyhistory.org/resources/patent/toll.html');
  western(hudson,'1686-12-23','Adriutha / Adriucha / Cuyler’s Flat','Mohawk owners','Hendrick Cuyler','Schenectady vicinity',schen,'Indigenous deed',null,'The 1687 patent recites this acquisition of Mohawk River flats and adjacent islands. Dongan had issued a separate purchase license on 2 September.','Pearson, Schenectady Patent, p. 157, 13 December 1686 Julian.','https://mail.schenectadyhistory.org/resources/patent/toll.html');
  western(hudson,'1673-06-17','Hurley confirmation','Governor Francis Lovelace of New York','Matthias Blanchan','Hurley, Esopus',places.esopus[2],'confirmation','36 acres','Distinct from the larger 1686 Hurley farm patent.','NY Colonial Manuscripts XXII:153, 7 June 1673 Julian.',calEnglish);
  western(hudson,'1675-11-11','Fresh Kill / Cornwall tract',andros,'Richard Cornwall','Staten Island',places.staten[2],'patent','150 acres of upland and 20 acres of fresh and salt meadow','South of Fresh Kill. William Pinhorne’s petition recites Cornwall’s grant and his subsequent 1686 private transfer.','O’Callaghan, English Manuscripts, Pinhorne petition, fol. 178, citing original 1 November 1675 Julian.',calEnglish);
}

