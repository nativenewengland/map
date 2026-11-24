# Inline footnote definition audit

The `description` fields in `data/features.csv` were scanned for footnote definition markers preceded by horizontal whitespace rather than a newline. All eight affected records could be safely normalized without changing their citation URLs, except for the specifically requested removal of tracking parameters from Hokum Rock's Wicked Local URL.

| Feature name | Label | Normalized | Definition empty | Reference lacked definition |
| --- | --- | --- | --- | --- |
| Unknown Fort or Palisade Village (Nauset remains) | ¹ | Yes | No | No |
| Unknown Fort or Palisade Village (Pamet River) | ¹ | Yes | No | No |
| A'pcinic | 1 | Yes | No | No |
| Two Unidentified Homes Encountered by Pilgrams | 1 | Yes | No | No |
| Hokum Rock | 1 | Yes | No | No |
| Hokum Rock | 2 | Yes | No | No |
| Hokum Rock | 3 | Yes | No | No |
| Cappoaquit | 1 | Yes | No | No |
| Nonotuck | 1 | Yes | No | No |
| Muhheconneok | 1 | Yes | No | No |

After normalization, a second scan found no remaining inline definition markers matching the audit pattern.
