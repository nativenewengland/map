// Municipal organization from the state registers. The symbol identifies the
// approximate locality of government. Jurisdiction extended beyond these points.
{
  const bay = 'Massachusetts Bay and interior', sound = 'Connecticut and the Sound';
  const mass = 'https://www.sec.state.ma.us/divisions/cis/historical/incorporation-settlement.htm';
  const ct = 'https://portal.ct.gov/csl/Research/CT-Towns-Counties';
  const rows = [
    [bay, '1668', 'Amesbury', [6050, 2186]],
    [bay, '1646', 'Andover', [5534, 2670]],
    [bay, '1668', 'Beverly', [6008, 2880]],
    [bay, '1655', 'Billerica', null],
    [bay, '1685', 'Boxford', [5791, 2567]],
    [bay, '1640', 'Braintree', [5712, 3727]],
    [bay, '1636', 'Cambridge', [5439, 3406]],
    [bay, '1630', 'Charlestown', [5575, 3353]],
    [bay, '1655', 'Chelmsford', [5138, 2799]],
    [bay, '1635', 'Concord', [5063, 3166]],
    [bay, '1636', 'Dedham', [5348, 3583]],
    [bay, '1630', 'Dorchester', [5575, 3558]],
    [bay, '1700', 'Framingham', [4961, 3517]],
    [bay, '1642', 'Gloucester', [6303, 2706]],
    [bay, '1661', 'Hadley', [2870, 3338]],
    [bay, '1670', 'Hatfield', [2798, 3264]],
    [bay, '1641', 'Haverhill', [5761, 2296]],
    [bay, '1635', 'Hingham', [5916, 3641]],
    [bay, '1644', 'Hull', [5866, 3473]],
    [bay, '1649', 'Malden', [5636, 3246]],
    [bay, '1649', 'Marblehead', [6089, 2960]],
    [bay, '1651', 'Medfield', [5180, 3811]],
    [bay, '1630', 'Medford', [5507, 3272]],
    [bay, '1662', 'Milton', [5552, 3607]],
    [bay, '1635', 'Newbury', [6030, 2397]],
    [bay, '1688', 'Newton', [5364, 3488]],
    [bay, '1644', 'Reading', [5576, 2977]],
    [bay, '1639', 'Rowley', [6043, 2451]],
    [bay, '1630', 'Roxbury', [5530, 3508]],
    [bay, '1639', 'Salisbury', [6034, 2185]],
    [bay, '1674', 'Sherborn', [5064, 3698]],
    [bay, '1683', 'Stow', [4844, 3213]],
    [bay, '1639', 'Sudbury', [4983, 3300]],
    [bay, '1650', 'Topsfield', [5871, 2778]],
    [bay, '1630', 'Watertown', [5325, 3380]],
    [bay, '1643', 'Wenham', [5985, 2848]],
    [bay, '1669', 'Westfield', [2577, 3832]],
    [bay, '1635', 'Weymouth', [5842, 3769]],
    [bay, '1642', 'Woburn', [5439, 3160]],
    [sound, '1683', 'Enfield', [2993, 4189]],
    [sound, '1645-12', 'Farmington', [2696, 4731]],
    [sound, '1693-05', 'Glastonbury', [3132, 4863]],
    [sound, '1668-10', 'Haddam', [3044, 5411]],
    [sound, '1651-09', 'Middletown', [2914, 5217]],
    [sound, '1687-10', 'Preston', [3934, 5360]],
    [sound, '1670-05', 'Wallingford', [2629, 5423]],
    [sound, '1686-05', 'Waterbury', [2279, 5131]],
    [sound, '1692-05', 'Windham', [3704, 4857]],
    [sound, '1690-03', 'Woodstock', [3919, 4263]],
  ];
  for (const [region, from, name, point] of rows) {
    const colony = ['Woodstock','Enfield'].includes(name) ? 'Massachusetts' : region === sound ? 'Connecticut' : 'Massachusetts';
    const url = region === sound ? ct : mass;
    let detail = 'The state register identifies municipal organization here in ' + from + '. ';
    if (name === 'Woodstock') detail = 'New Roxbury, settled under Massachusetts, became Woodstock in March 1690. Annexation to Connecticut came in 1749. ';
    if (name === 'Middletown') detail = 'Connecticut established the town in September 1651 and gave the plantation the name Middletown in 1653. ';
    if (name === 'Enfield') detail = 'Massachusetts incorporated Enfield in 1683. Its transfer to Connecticut took place in the eighteenth century. ';
    if (name === 'Glastonbury') detail = 'The register lists 1690 and records separation from Wethersfield in May 1693. This entry uses the separation. ';
    detail += point ? 'The point locates the town approximately. The register gives no contemporary perimeter or parcel-by-parcel account of occupation.' : 'The legacy town position lacks a reliable land match. Its seventeenth-century seat and perimeter remain unplaced on this sheet.';
    window.authorityRecords.push({region, from, until:null, point, name:name + ' town, ' + colony, status:'english', detail, url});
  }
}
