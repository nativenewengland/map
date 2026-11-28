// Takemmy, eight pixels east of its existing label on the land mask. The shared point locates
// the plantation, where most lot calls depend on lost trees, paths and fences.
{
  const region = 'Plymouth and Wampanoag country';
  const takemmy = [6277,5579];
  const book = 'https://ldsgenealogy.com/MA/Records-of-the-town-of-Tisbury-Mass-beginning-June-29-1669-and-ending-May-16-1864.htm';
  const part2 = book.replace('/MA/', '/MA/books/').replace('.htm','-part-2.htm');
  function entry(from, name, detail, url = part2, point = takemmy) {
    window.authorityRecords.push({region, from, until: null, name, status: 'claim', detail: detail + ' The point locates the community. The original parcel corners remain unregistered.', point, url});
  }
  entry('1669','Tackamy • Josias’s original conveyance','Josias (Katanummin), sachem of Takemmy, conveyed the western necks to William Peabody, Josiah Standish, James Allen and James Skiffe. The later enlargement recites the original bounds from near Popamike’s field to the road near Tichpitt’s house. The first sale required herding cattle. Tisbury Town Records, pp. 2–4, recitals of the 1669 deed.',book);
  entry('1669-07-09','Holmes Hole • John Eddy’s conditional exchange','John Eddy conveyed his sixth of Thomas Layton’s purchase to Peabody, Standish and Allen in exchange for rights to a lot at Takemmy. The Holmes Hole interest would revert if the town failed to settle. Tisbury Town Records, p. 1, 29 June 1669 Old Style.',book);
  entry('1669-11-29','Takemmy mill and eighth share • Joseph Merry','Benjamin Church sold Joseph Merry the mill on the westernmost brook and an eighth of the first purchase from Josias. The price was £120. Tisbury Town Records, p. 2, 19 November 1669 Old Style.',book);
  entry('1670-06-27','Tackamy commons • grazing privilege','Josias released Peabody, Standish, Allen and associates from the herding condition in their earlier purchase in exchange for five shillings. The deed applies to grazing in the commons. Tisbury Town Records, pp. 2–3, 17 June 1670 Old Style.',book);
  entry('1671-07-18','Tisbury township • Takemmy','Governor Francis Lovelace confirmed the freeholders’ township on Martha’s Vineyard. The charter recites the Mayhew grant and purchases from Indigenous owners. The separate manor patent covered other tracts. Tisbury Town Records, opening Town Charter, 8 July 1671 Old Style.',book);
  entry('1671-07-18','Edgartown township • Great Harbor','Governor Francis Lovelace chartered the inhabitants’ township on eastern Martha’s Vineyard. The division with Tisbury ran from near the head of Tashmoo toward South Beach. Several villages were within the charter bounds. Martha’s Vineyard Museum Quarterly 62(3), pp. 42–45, 8 July 1671 Old Style.', 'https://mvmuseum.org/wp-content/uploads/2022/05/MVMQ-August-2021.pdf#page=44',[6614,5648]);
  entry('1672-02-10','Takemmy • eastern enlargement by Josias','Josias conveyed additional ground east to the wooded valley on the cart road, for fifteen shillings, to the town, James Allen and associates. The marked trees were identified with John Eddy. The original and enlarged bounds appear together in Tisbury Town Records, pp. 3–4, 31 January 1671 Old Style.');
  const houseLots = [
    ['1673','James Redfield','25 acres between Joseph Doggett and Isaac Robinson. The record identifies an unpaid purchase price and a 1/32 common share.','4'],
    ['1673','Joseph Doggett','25 acres east of the brook between Redfield and Charles Crosthwait, together with a share in the neck and undivided lands.','4–5'],
    ['1673-07-07','Jeremiah Whitten','40 acres at the brook beside James Allen, with the sixth lot toward the point on the neck by John Eddy.','5–6'],
    ['1675-02-15','Samuel Tilton','A 22-acre half lot running east from the river by the highway, with a half lot on the neck and common rights.','7–8'],
    ['1675-02-15','James Skiffe senior','40 acres between Thomas West and the highway, a Great Neck lot and a sixteenth of the undivided land and meadow.','8'],
    ['1675','James Allen','48 acres beside Nathaniel Skiffe and Jeremiah Whitten on the river, with a Great Neck lot and a sixteenth of the commons.','8'],
    ['1675-11-07','James Allen • replacement half share','The town reassigned John Sleeper’s conditional half share, north of Thomas West at the river, in exchange for the lot Allen had purchased of John Rogers.','8–9'],
    ['1675-11','Thomas Berrick • confirmation','The town confirmed Charles Crosthwait’s former 22-acre half lot after the sale to Berrick. It lay between Doggett and the highway at the river.','9'],
    ['1678-11-19','Thomas West • lowland share','The town granted swamp east of the brook, opposite his house lot and equal to it in breadth.','12'],
    ['1680-05-29','Nathan Skiffe • lowland share','The town allotted swamp from his field to Thomas West’s swamp and east to the hill where a fence had stood.','14'],
    ['1681-12-26','John Cace • new mill river','The town granted a tract north of the new mill river, forty rods by eighty, with common rights for wood and grazing.','14–15']
  ];
  for (const [from, name, bounds, pages] of houseLots) {
    entry(from, 'Tisbury allotment • ' + name, 'Tisbury town and proprietor records. ' + bounds + ' Tisbury Town Records, pp. ' + pages + '.');
  }
  entry('1678-11-01','Tisbury • Old Mill River division','The town divided strips north of the old mill river among Robinson, Whitten, Briggs, Eddy, Manter, the minister, Luce, Nathan and James Skiffe, Merry, Allen, Daggett, Tucker and West. The recorded draw skips one number. A subsequent renewal describes stakes, trees and a three-rod access way to the Sound. Tisbury Town Records, pp. 11–12 and 30–31. Draw held 22 October 1678 Old Style.');
  const part3 = part2.replace('part-2','part-3');
  const part4 = part2.replace('part-2','part-4');
  entry('1687-10-29','Tisbury • Charles’s Neck division','The freeholders ordered the neck divided among proprietors in proportion to their holdings. The vote supplies no individual survey. Tisbury Town Records, meeting of 19 October 1687 Old Style.',part3);
  entry('1688-02-25','Tisbury • Tissisa meadow and marsh division','The town ordered the proprietors’ shares of meadow and marsh laid out on this neck. The proportion depended on each existing proprietary interest. Tisbury Town Records, 15 February 1687/88 Old Style.',part3);
  entry('1690-02-04','Arthur Biven • river swamp allotment','The town voted a parcel north of Biven’s land beside the river. Merry and Daggett’s later return bounded it by the brook, hillside, stump and marked tree. Tisbury Town Records, vote of 25 January 1689/90 Old Style and subsequent survey.',part3);
  entry('1692-02-12','John Manter junior • house land','The freeholders granted a parcel at Manter’s dwelling, between Little Neck lots, the road to Great Neck, his fence and a swamp. Tisbury Town Records, vote of 2 February 1691/92 Old Style.',part3);
  entry('1693-07-25','Peter Robinson • meadow at Sekunkeoet','The freeholders recognized Robinson’s claim to meadow opposite Sekunkeoet on the south side. He claimed an earlier purchase from Indigenous owners. A separate vote asserted town rights to nearby hay for three years and sought to exclude Indigenous users. Tisbury Town Records, 15 July 1693 Old Style.',part3);
  entry('1699-12-09','Tisbury • west of Old Mill Brook','The freeholders commissioned James Allen, Samuel Merry and Samuel Athearn to divide the common west of the brook toward Chilmark according to the proprietors’ shares. The return set out sixteen lots, highways and access ways, and reserved clay for inhabitants. Tisbury Town Records, pp. 32–33, vote of 29 November 1699 Old Style.',part4);
  entry('1700-03-09','Tisbury • Old Mill Brook proprietors’ draw','The freeholders authorized sixteen proprietors to draw the western lots under their existing rights. A separate vote ordered sixteen more allotments east of the brook. The later return set out ways and bounds between the mill brooks. Tisbury Town Records, pp. 33–36, votes of 27 February 1699/1700 Old Style.',part4);
  entry('1700','Simon Athearn • second and sixteenth mill-brook lots','The proprietors’ division allotted Athearn lots two and sixteen between the old and new mill brooks. The clerk recorded the result on 14 August 1700 Old Style and referred to the February division order. The actual draw day is uncertain. Tisbury Town Records, p. 38.',part4);
}
